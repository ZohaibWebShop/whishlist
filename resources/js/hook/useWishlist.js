import axios  from '~/axios'
import { useEffect, useMemo, useState } from '~/react';
import useComon from '@hook/useComon';
import NProgress from '~/nprogress'
import { usePage } from '~/@inertiajs/react';
import useURL from './useURL';



function useWishlist(customer_id){
    const [wishlists, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { formatDateToCustomFormat, axiosHttp } = useComon();
    const { user, base_url,  } = usePage().props;
    const [api, setApi] = useState(`${base_url}/api/front/customer/${customer_id}/wishlists?shop=${user.name}`);

    const getWishlist = [];
    // const getWishlist  = useMemo(()=>{
    //     return wishlists.map((wishlist)=>{
    //         return {
    //             id:wishlist?.id,
    //             token:wishlist?.wishlist_token,
    //             total:wishlist?.wishlists_count?.length,
    //             customer_id:wishlist?.customer_id,
    //             created_at: formatDateToCustomFormat(wishlist?.created_at),
    //             name: `${wishlist?.customer?.first_name} ${wishlist?.customer?.last_name}`,
    //             email:wishlist?.customer?.email
    //         };
    //     });
    // }, [wishlists]);


    // const sortfilter = (sort) =>{
    //     useFilter(`${api}&sort=${sort}`);
    // }

    // const searchFilter = (search) =>{
    //     setTimeout(()=>{
    //         useFilter(`${api}&query=${search}`);
    //     }, 2000);
    // }

    const pageInfo = [];

    // const [pageInfo, setPageInfo] = useState({
    //     total:0,
    //     last_page:0,
    //     links:[],
    //     next:false,
    //     prev:false,
    //     per_page:0,
    // });


    useEffect(()=>{
        setLoading(true),
        NProgress.start()
        axiosHttp.get(api)
        .then(function(res){
            // setWishlist(res.data.data);
            setLoading(false);
            // setPageInfo({
            //     ...pageInfo,
            //     total:res?.data?.meta?.total,
            //     last_page:res?.data?.meta?.last_page,
            //     next:res?.data?.links?.next,
            //     prev:res?.data?.links?.prev,
            //     per_page:res?.data?.per_page
            // });
            NProgress.done();
        }).catch(function(err){
            setLoading(false);
            NProgress.done();
            console.log(err, 'wishlist');
        })
    }, [api]);


    //  const useFilter = (api) =>{
    //     setLoading(true),
    //     NProgress.start()
    //     axiosHttp.get(api)
    //     .then(function(res){
    //         setWishlist(res.data.data);
    //         setLoading(false);
    //         setPageInfo({
    //             ...pageInfo,
    //             total:res.data.total,
    //             last_page:res.data.last_page,
    //             links:res.data.links,
    //             per_page:res.data.per_page
    //         });
    //         NProgress.done();
    //     }).catch(function(err){
    //         setLoading(false);
    //         NProgress.done();
    //         console.log(err, 'wishlist');
    //     })
    //  }


    // const paginate = (number) =>{
    //     const { links } = pageInfo;
    //     setApi(links[number]['url']);
    // }

    return {
        getWishlist,
        loading
    };
}


export default useWishlist;
