import axios from "axios";

export const getMenu = async (e) => {

    axios.get('cope/COPE/odl/menu')
        .then((response) => {
           return response.data;
        })
        .catch((error) => {
            alert('Errore durante la chiamata HTTP:', error);
        });

};