import React, { useContext, useEffect } from '~/react'
import { Page as PolarisPage }  from '~/@shopify/polaris';
import { AppContext } from '@context/AppContextProvider';


function Page({ title, loading, children,backAction, pageNext, pagePrev  }) {

  const { app_loading } = useContext(AppContext);

  return (
    <>
        {app_loading?(
           <h1>Loading</h1>
        ):(
            <PolarisPage
                fullWidth
                title={title}
                backAction={backAction}
                pagination={{
                    hasPrevious: pageNext?true:false,
                    hasNext: pagePrev?true:false,
                }}
                >
                {children}
            </PolarisPage>
        )}
    </>
  )
}

export default Page
