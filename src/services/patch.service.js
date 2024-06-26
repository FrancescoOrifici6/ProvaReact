import axios from "axios";
import * as jsonpatch from 'fast-json-patch/index.mjs';




import { entityDispatcherUrl } from "./entityHandler.service";

export const dataPatch = async (entity, id, data1, data2) => {

    try {

        const entityUrl = entityDispatcherUrl(entity);
        const tokens = JSON.parse(sessionStorage.getItem('token_current'));
        const response = await axios.patch(entityUrl + `/${id}`, jsonpatch.compare(data1, data2),
            {
                headers: {
                    'content-type': 'application/json+patch',
                    Authorization: `Bearer ${tokens}`
                }
            })
        return response.data;

    } catch (error) {
        console.error(error);
    }


};



export const getEntityById = async (entity, id) => {

    try {

        const entityUrl = entityDispatcherUrl(entity);
        const tokens = JSON.parse(sessionStorage.getItem('token_current'));
        const response = await axios.get(entityUrl + `/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${tokens}`
                }
            })
        return response.data;

    } catch (error) {
        console.error(error);
    }


};