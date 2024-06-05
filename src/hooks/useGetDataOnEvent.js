
import { useState } from 'react';
import axios from 'axios';


// Hook che manda dati su evento
// Espone il metodo fetch data che è colui che chiama API e restiuisce i dati
// data , loading ed error sono proprietà dell' hook relative alla chiamata e al suo stato

// Creazione del custom hook
export function useFetchOnEvent() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
}

