import Page from '@components/Page';
import React from '~/react'
import Layout from '@components/Layout';
import useProducts from '@hook/useProducts';
import ProductTable from '@components/ProductTable'
import { router } from '~/@inertiajs/react';

function Products({ customer_id,  wishlist_id }) {
    const { loading, getProducts, pageInfo, sortfilter, searchFilter, setLoading, setApi } = useProducts(customer_id, wishlist_id);

    return (
     <Page
        title="Products"
        backAction={{content:'Home', onAction:()=>{
            router.visit(`/customer/${customer_id}/wishlists`)
        }}}>
       <ProductTable
              isLoading={loading}
              pageInfo={pageInfo}
              setLoading={setLoading}
              products={getProducts}
              sortFilter={sortfilter}
              searchFilter={searchFilter}
              customerId={customer_id}
              setApi={setApi} />
     </Page>
  )
}

Products.layout = page => <Layout children={page}  />


export default Products
