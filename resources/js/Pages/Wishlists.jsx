import Page from '@components/Page';
import React from '~/react'
import Layout from '@components/Layout';
import useWishlist from '@hook/useWishlist';
import WishlistTable from '@components/WishlistTable'
import useComon from '@hook/useComon';
import { router } from '~/@inertiajs/react';
import { useEffect } from 'react';
import useExport from '../hook/useExport';

function Wishlists({ customer_id }) {
    const { loading, getWishlist, pageInfo, sortfilter, resetFilter, searchFilter, nextPage, prevPage, deleteWishlist } = useWishlist(customer_id);
    const { loadingExport, onCustomerExport } = useExport();



    return (
     <Page
        title="Wishlists"
        primaryAction={{
            content:"Export",
            loading:loadingExport,
            onClick:()=>{
                onCustomerExport(customer_id)
                }
            }}
        backAction={{content:'Home', onAction:()=>{
            router.visit('/')
        }}}>
       <WishlistTable
              isLoading={loading}
              pageInfo={pageInfo}
              wishlist={getWishlist || []}
              sortFilter={sortfilter}
              searchFilter={searchFilter}
              resetFilter={resetFilter}
              nextPage={nextPage}
              prevPage={prevPage}
              deleteWishlist={deleteWishlist}
              customerId={customer_id} />
     </Page>
  )
}

Wishlists.layout = page => <Layout children={page}  />


export default Wishlists
