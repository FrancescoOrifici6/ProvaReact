// #region constants

import { useEffect, useState } from "react";
import Keycloak from 'keycloak-js'

// #endregion


// #region functions

// #endregion

/**
 * 
 */
const useKeycloakAuth = () => {
    const [isLogged, setLogged] = useState(false);


    useEffect(() => {

        const client = new Keycloak({
            clientId: 'C&T',
            realm: '035',
            url: "http://128.0.0.7:8010",
        });

        client.init({ 
            onLoad: "check-sso",
            checkLoginIframe: false, 
         }).then((res) => { setLogged(true) });

    }, [])

    return isLogged;
}

export default useKeycloakAuth;