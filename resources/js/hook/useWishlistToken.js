import axios  from 'axios'
import { useContext, useEffect, useMemo, useState } from 'react';
import useComon from './useComon';
import NProgress from '~/nprogress'
import { usePage } from '~/@inertiajs/react';



function useWishlistToken(){
   const [wishlists, setWishlists] = useState([]);
   const [wishlistsChunk, setWishlistsChunk] = useState([]);
   const [data, setData] = useState([]);
   const [sort, setSort] = useState('asc');
   const [searchQuery, setSearchQuery] = useState('');
   const [pageInfo, setPageInfo] = useState({
        next_page:0,
        prev_page:0,
        current_page:0,
        total:0,
   });
   const [loading, setLoading] = useState(true);
   const { formatDateToCustomFormat, axiosHttp, chunkArray, next } = useComon();
   const { user, base_url } = usePage().props;

   const sortfilter = (s) =>{
      setSort(sort === 'asc' ? 'desc' : 'asc');
  }

   const searchFilter = (search) =>{
      setSearchQuery(search);
   }

    const resetFilter = () =>{
        setSearchQuery('');
    }

  const getWishlist = useMemo(()=>{
    let filteredArray = [...data];

    if (searchQuery.trim() !== '') {
        filteredArray = chunkArray(wishlists.filter((wishlist) =>
            `${wishlist.customer?.first_name} ${wishlist.customer?.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            wishlist.customer?.email.toLowerCase().includes(searchQuery.toLowerCase())
        ), 10)[0] || [];
      }


    const sortedArray = [...filteredArray]; // Create a copy of the data to avoid mutating it

    if (sort === 'asc') {
      sortedArray.sort((a, b) => a.id - b.id);
    } else {
      sortedArray.sort((a, b) => b.id - a.id);
    }

    return sortedArray.map((wishlist) => ({
        id: wishlist?.id,
        customer: wishlist?.customer,
        customer_id: wishlist?.customer_id,
        name: `${wishlist?.customer?.first_name} ${wishlist?.customer?.last_name}`,
        email: wishlist?.customer?.email,
        total: wishlist?.wishlists_count?.length,
        created_at: formatDateToCustomFormat(wishlist?.created_at),
    }));

  }, [data, sort, searchQuery, wishlists]);



    useEffect(()=>{
        setLoading(true),
        NProgress.start()
        axiosHttp.get(`${base_url}/api/front/customers?shop=${user.name}`)
        .then(function(res){
            var array = chunkArray(res.data, 10);
            setWishlists(res.data);
            setWishlistsChunk(array);
            setData(array[0]);
            setLoading(false);
            setPageInfo({
                ...pageInfo,
                next_page:next(array, 1),
                last_page:array.length -1,
                current_page:0,
                total:array.length,
            });
            NProgress.done();
        }).catch(function(err){
            setLoading(false);
            NProgress.done();
            console.log(err, 'wishlist');
        })
    }, []);







    return { loading, getWishlist, pageInfo,  sortfilter, resetFilter, searchFilter };

}


export default useWishlistToken;
