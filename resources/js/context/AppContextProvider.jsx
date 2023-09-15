import { useAppBridge } from '~/@shopify/app-bridge-react';
import { getSessionToken } from '~/@shopify/app-bridge-utils';
import React, { createContext, useEffect, useState } from '~/react'


export const AppContext = createContext();




function AppContextProvider({ children }) {

    const [state, setState] = useState({
        app_loading:false,
        sessionToken:'',
     });



    useEffect(()=>{
        setState({
          ...state,
          app_loading:true,
        })
        setTimeout(()=>{
          const getToken = () =>{
            localStorage.setItem('front_sesstion_token', `Bearer ${window.sessionToken}`);
              setState({
                      ...state,
                  sessionToken:window.sessionToken
            });
          }
          getToken();
          setInterval(()=>{
            getToken();
            if(state.app_loading){
              setState({
                ...state,
                app_loading:false
              })
            }
          }, 2000);
        }, 2000);

    }, []);




  return (
    <AppContext.Provider  value={state}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
