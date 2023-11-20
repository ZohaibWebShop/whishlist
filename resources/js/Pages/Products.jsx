import Page from '@components/Page';
import React from '~/react'
import Layout from '@components/Layout';
import useProducts from '@hook/useProducts';
import ProductTable from '@components/ProductTable'
import { router } from '~/@inertiajs/react';

function Products({ customer_id,  wishlist_id }) {
    const { loading, getProducts, pageInfo, resetFilter, sortfilter, searchFilter, nextPage, prevPage, deleteProduct } = useProducts(customer_id, wishlist_id);

    return (
     <Page
        title="Products"
        backAction={{content:'Home', onAction:()=>{
            router.visit(`/customer/${customer_id}/wishlists`)
        }}}>
       <ProductTable
              isLoading={loading}
              pageInfo={pageInfo}
              products={getProducts || []}
              resetFilter={resetFilter}
              sortFilter={sortfilter}
              searchFilter={searchFilter}
              nextPage={nextPage}
              prevPage={prevPage}
              deleteProduct={deleteProduct}
              customerId={customer_id} />
     </Page>
  )
}

Products.layout = page => <Layout children={page}  />


export default Products
