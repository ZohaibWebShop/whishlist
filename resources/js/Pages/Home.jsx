import Page from '@components/Page';
import React, { useEffect } from '~/react'
import Layout from '@components/Layout';
import useWishlistToken from '@hook/useWishlistToken';
import Table from '@components/Table'

function Home() {
    const { getWishlist, pageInfo, loading, sortfilter, searchFilter, resetFilter, nextPage, prevPage, deleteCustomer } = useWishlistToken();


  return (
     <Page title="Wishlists">
       <Table
              isLoading={loading}
              pageInfo={pageInfo}
              wishlist={getWishlist}
              sortFilter={sortfilter}
              searchFilter={searchFilter}
              resetFilter={resetFilter}
              nextPage={nextPage}
              prevPage={prevPage}
              deleteCustomer={deleteCustomer} />
     </Page>
  )
}

Home.layout = page => <Layout children={page}  />


export default Home
