import Keycloak from 'keycloak-js'



// Configura l'istanza di Keycloak come necessario
// Passa le opzioni di inizializzazione come necessario o lascia vuoto per caricare da 'keycloak.json'
export const keycloak = new Keycloak(
    {
        clientId: 'C&T',
        realm: '035',
        url: "http://128.0.0.7:8010",
    }
);


export const keycloakProviderInitConfig = {
    onLoad: 'login-required',
}