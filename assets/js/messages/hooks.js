import { useState, useCallback } from 'react'

async function jsonFetch(url, method = 'GET', data = null) {

    const params = {
        method: method,
        headers: {
            'Accept': 'application/ld+json',
            'Content-type': 'application/json'
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
            const response = await jsonFetch(url)
            setItems(response['hydra:member'])
        } catch (error) {
            console.error(error)
        }
        setLoading(false)

        //d
    }, [url])
   
    return {
        items, load, loading
    }
}

export function useFetch(url, method = 'POST', callback = null) {
    const [loading, setLoading] = useState(false)
    const load = useCallback(async (data = null) => {
        setLoading(true)
        try {
            const response = await jsonFetch(url, method, data)
            if (callback)
                callback(response)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)

    }, [url, method, callback])
    return {
        load, loading}
}