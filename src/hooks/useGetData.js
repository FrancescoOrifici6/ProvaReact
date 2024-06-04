import { useState, useEffect } from "react"

export const useGetData = (url) => {

    const [data, setData] = useState([])

    useEffect(() => {

        // dichiarazione metodo
        const fetchTodos = async () => {
            fetch(url)
                .then(response => response.json())
                .then(json => setData(json)).catch(error => setError(error))
        }

        if (url) {
            try {

                // success api call handling
                fetchTodos()
                setLoading(false)
            } catch (error) {
                // error handling

            }
        }


    }, [url])

    return { data, setData }
}