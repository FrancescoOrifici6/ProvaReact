import { useState, useEffect } from "react";
import { getEntityById } from "../services/patch.service";

export const useGetMultipleRows = (ids, linkedEntity, entityId) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initImages(ids, linkedEntity);
    }, [entityId]);



    const updateData = (newItem) => {
        setData([...data, newItem]);
    }



    const initImages = async (keys, entityFinder) => {

        setData([]);
        if (keys && keys.length) {

            setLoading(true);
            const images = [];
            for (let key of keys) {
                images.push(await getEntityById(entityFinder, key));
            }

            setData(images);
            setLoading(false);
        }
    }





    return { data, loading, setData, updateData };
};