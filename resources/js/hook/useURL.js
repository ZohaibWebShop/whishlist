import React, { useState } from '~/react'

function useURL(api) {
    const [params, setParams] = useState({});


    const addParams = (key, value) =>{
        const url = new URL(api);
        if (typeof key === "object") {
            // Loop through the keys of the object
            for (const objKey in key) {
                if (key.hasOwnProperty(objKey) && params.hasOwnProperty(objKey)) {
                    // Update the key if it exists in params
                    setParams({
                        ...params,
                        [objKey]:key[objKey]
                    })
                }
            }
        } else if (typeof key === "string") {
            // If key is a string, set it as a query parameter
            url.searchParams.set(key, value);

            // Check if the key exists in params and update if needed
            if (params.hasOwnProperty(key)) {
                setParams({
                    ...params,
                    [key]:value
                });
            }
        }

        return url.toString();
    }

    return { addParams };
}

export default useURL
