import { AppProvider } from '~/@shopify/polaris'
import React from '~/react'
import lang from '~/@shopify/polaris/locales/en.json'
import { Provider } from '~/@shopify/app-bridge-react'
import { router, usePage } from '~/@inertiajs/react'
import nProgress from '~/nprogress'
import AppContextProvider from '@context/AppContextProvider'

function Layout({ children }) {
    const { api_key, host } = usePage().props

    router.on('start', () => nProgress.start());
    router.on('finish', () => nProgress.done());

    const config = {
        apiKey:api_key,
        host:host,
        forceRedirect:true,
    };


  return (
    <Provider
        config={config}
        >
        <AppProvider

            i18n={lang}>
            <AppContextProvider>
                {children}
            </AppContextProvider>
        </AppProvider>
    </Provider>
  )
}

export default Layout
