import { Page } from '~/@shopify/polaris'
import React from '~/react'

function Loading() {
  return (
    <Page>
         <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}>
                <Loading />
        </div>
    </Page>
  )
}

export default Loading
