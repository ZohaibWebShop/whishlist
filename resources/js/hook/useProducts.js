import axios  from '~/axios'
import { useEffect, useMemo, useState } from '~/react';
import useComon from '@hook/useComon';
import NProgress from '~/nprogress'
import { usePage } from '~/@inertiajs/react';
import useURL from './useURL';



function useProducts(customer_id, wishlist_id){

    const [products, setProducts] = useState([]);
    const [productsChunk, setProductsChunk] = useState([]);
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


    const nextPage = (index) =>{
        setData(productsChunk[index]);
        setPageInfo({
            ...pageInfo,
            next_page:productsChunk.next(index),
            prev_page:productsChunk.prev(index),
            current_page:index,
        })
    }

    const prevPage = (index) =>{
        setData(productsChunk[index]);
        setPageInfo({
            ...pageInfo,
            next_page:productsChunk.next(index),
            prev_page:productsChunk.prev(index),
            current_page:index,
        })
    }

    const sortfilter = (e) =>{
        setSort(sort === 'asc' ? 'desc' : 'asc');
    }

    const resetFilter = () =>{
        setSearchQuery('');
    }

    const searchFilter = (search) =>{
        setSearchQuery(search);
    }

    const deleteProduct = (id) =>{
        setLoading(true);
        axios.get(`${base_url}/api/front/product/delete/${id}`)
        .then((res)=>{
            const filteredArray = products.filter(product => product.id !== id);
            setProducts(filteredArray);
            const array = chunkArray(filteredArray, 10);
            setProductsChunk(array);
            setData(array[0]);
            setLoading(false);
        }).catch((err)=>{
            setLoading(false);
        });
    }

    const getProducts  = useMemo(()=>{
        let filteredArray = data?[...data]:[];


        if (searchQuery.trim() !== '') {
            filteredArray = chunkArray(products?.filter((product) =>
                product?.product?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
            ), 10)[0] || [];
        }


        const sortedArray = filteredArray?[...filteredArray]:[];

        if (sort === 'asc') {
            sortedArray?.sort((a, b) => a.id - b.id);
        } else {
            sortedArray?.sort((a, b) => b.id - a.id);
        }

        return sortedArray?.map((product)=>{
            return {
                id:product?.id,
                product:product?.product,
                created_at: formatDateToCustomFormat(product?.created_at),
            };
        });
    }, [data, sort, searchQuery, products]);





    useEffect(()=>{
        setLoading(true),
        NProgress.start()
        axiosHttp.get(`${base_url}/api/front/customer/${customer_id}/wishlist/${wishlist_id}?shop=${user.name}`)
        .then(function(res){
            var array = chunkArray(res.data, 10);
            setProducts(res.data);
            setProductsChunk(array);
            setData(array[0]);
            setLoading(false);
            setPageInfo({
                ...pageInfo,
                next_page:array.next(0),
                prev_page:array.prev(0),
                last_page:array.last_index(),
                current_page:0,
                total:array.length,
            });
            NProgress.done();
        }).catch(function(err){
            setLoading(false);
            NProgress.done();
            console.log(err, 'products');
        })
    }, []);



    return {
        getProducts,
        loading,
        pageInfo,
        searchFilter,
        sortfilter,
        resetFilter,
        nextPage,
        prevPage,
        deleteProduct
    };
}


export default useProducts;
