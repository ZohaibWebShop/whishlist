import axios  from '~/axios'
import { useEffect, useMemo, useState } from '~/react';
import useComon from '@hook/useComon';
import NProgress from '~/nprogress'
import { usePage } from '~/@inertiajs/react';



function useWishlist(customer_id){
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
    const { formatDateToCustomFormat, axiosHttp, chunkArray } = useComon();
    const { user, base_url,  } = usePage().props;

    const sortfilter = (e) =>{
        setSort(sort === 'asc' ? 'desc' : 'asc');
    }

    const resetFilter = () =>{
        setSearchQuery('');
    }

    const searchFilter = (search) =>{
        setSearchQuery(search);
    }

    const getWishlist  = useMemo(()=>{

        let filteredArray = [...data];

        if (searchQuery.trim() !== '') {
            filteredArray = chunkArray(wishlists.filter((wishlist) =>
                wishlist.name?.toLowerCase().includes(searchQuery.toLowerCase())
            ), 10)[0] || [];
        }

        const sortedArray = [...filteredArray];

        if (sort === 'asc') {
            sortedArray.sort((a, b) => a.id - b.id);
        } else {
            sortedArray.sort((a, b) => b.id - a.id);
        }

        return sortedArray.map((wishlist)=>{
            return {
                id:wishlist?.id,
                name:wishlist?.name,
                isDefault:wishlist?.default?true:false,
                products:wishlist?.products?.length,
                created_at: formatDateToCustomFormat(wishlist?.created_at),
            };
        });
    }, [data, sort, searchQuery, wishlists]);






    useEffect(()=>{
        setLoading(true),
        NProgress.start()
        axiosHttp.get(`${base_url}/api/front/customer/${customer_id}/wishlists?shop=${user.name}`)
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





    return {
        getWishlist,
        loading,
        pageInfo,
        searchFilter,
        sortfilter,
        resetFilter,
    };
}


export default useWishlist;
