import Page from '@components/Page';
import React from '~/react'
import Layout from '@components/Layout';
import useWishlistToken from '@hook/useWishlistToken';
import Table from '@components/Table'

function Home() {
    const { loading, getWishlist, pageInfo, sortfilter, searchFilter, setLoading, setApi } = useWishlistToken();

  return (
     <Page title="Wishlists">
       <Table
              isLoading={loading}
              pageInfo={pageInfo}
              setLoading={setLoading}
              wishlist={getWishlist}
              sortFilter={sortfilter}
              searchFilter={searchFilter}
              setApi={setApi} />
     </Page>
  )
}

Home.layout = page => <Layout children={page}  />


export default Home
