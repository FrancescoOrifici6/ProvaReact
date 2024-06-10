import { useState, useEffect } from "react";
import axios from "axios";
import { columnsDispatcher, entityDispatcherUrl } from "../services/entityHandler.service";

export const useGetArchiveData = (entity) => {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const token = JSON.parse(sessionStorage.getItem('token_current')).token
        const entityUrl = entityDispatcherUrl(entity);
        const tokens = JSON.parse(sessionStorage.getItem('token_current'));
        console.log(tokens);
        const fetchData = async () => {
            try {
                const response = await axios.get(entityUrl,
                    {
                        headers: {
                            Authorization: `Bearer ${tokens}`
                        }
                    })
                setData(response.data);
                setCols(columnsDispatcher(entity));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        if (entity) {
            fetchData();
        }
    }, [entity]);

    return { data, cols, loading };
};