import React, { useContext, useEffect } from '~/react'
import { Page as PolarisPage }  from '~/@shopify/polaris';
import { AppContext } from '@context/AppContextProvider';
import { Layout, Spinner } from '@shopify/polaris';


function Page({ title, children,primaryAction, backAction  }) {

  const { app_loading } = useContext(AppContext);

  return (
    <>
        {app_loading?(
          <PolarisPage
            fullWidth
            title={title}
            primaryAction={primaryAction}
            backAction={backAction}
            >
            <Layout>
                <Layout.Section>
                    <div style={{ textAlign:'center', padding:'30px 0px' }}>
                        <Spinner />
                    </div>
                </Layout.Section>
            </Layout>
        </PolarisPage>
        ):(
            <PolarisPage
                fullWidth
                title={title}
                primaryAction={primaryAction}
                backAction={backAction}
                >
                <Layout>
                    <Layout.Section>
                        {children}
                    </Layout.Section>
                </Layout>
            </PolarisPage>
        )}
    </>
  )
}

export default Page
