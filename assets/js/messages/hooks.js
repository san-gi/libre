import { useState, useCallback } from 'react'

async function jsonFetch(url, method = 'GET', data = null) {

    const params = {
        method: method,
        headers: {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/json'
        }
    }
    if (data) {
        params.body = JSON.stringify(data)
    }
    const response = await fetch(url, params)
    if (response.status == 204) {
        return null
    }
    const responseData = await response.json()
    if (response.ok) {
        return responseData
        
    } else {
        throw responseData
    }

}

export function useMessagesFetch(url) {

   
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
   
    const load = useCallback(async () => {
        
      
        setLoading(true)
        try {
            console.log("lo2")
            const response = await jsonFetch(url)
           
            const response2 = await jsonFetch(response['hydra:view']['hydra:last'])
            let nurl = response['hydra:view']['hydra:last'].split("=")
            nurl[1]-=1;
            nurl = nurl.join("=")
            const response3 = await jsonFetch(nurl)
           response2['hydra:member'] = response3['hydra:member'].concat(response2['hydra:member'])
            setItems(response2['hydra:member'])
        } catch (error) {
            console.error(error)
        }
        setLoading(false)

    }, [url])
   
    return {
        items,setItems, load, loading
    }
}

export function useFetch(url, method = 'POST', callback = null) {
    const [loading, setLoading] = useState(false)
    const load = useCallback(async (data = null) => {
        setLoading(true)
        try {
            const response = await jsonFetch(url, method, data)
            setLoading(false)
            if (callback)
                callback(response)
        } catch (error) {
            setLoading(false)
         
        }
       

    }, [url, method, callback])
    return {
        load, loading}
}