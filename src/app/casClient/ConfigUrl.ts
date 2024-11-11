


///Dominio LocalHost Prueba
export let CONFIG = {
    Settings: {
        CASLOGIN: 'https://seguridad.espoch.edu.ec/cas/login?',
        CASLOGOUT: 'https://seguridad.espoch.edu.ec/cas/logout?',
        CASVALIDATE: 'https://seguridad.espoch.edu.ec/cas/p3/serviceValidate?',
        // REDIRECT_URI: 'https://pyariel.espoch.edu.ec:8080/cas',
        // REDIRECT_URI: 'https://localhost:4200/cas',
        // LOGOUT_REDIRECT: 'https://localhost:4200/logout/',
        REDIRECT_URI: 'https://planestrategico.espoch.edu.ec/cas',
        LOGOUT_REDIRECT: 'https://planestrategico.espoch.edu.ec/logout/',
        LOGOUT_CORREO: 'https://login.microsoftonline.com/common/oauth2/logout?',
        VALIDATEJAVA:'https://servicioscomprobante.espoch.edu.ec/ServicioWebComprobantes/ServiciosComprobantes/ValidateCas/'
       
        }
};


///Dominio Pruebas
/*export let CONFIG = {
    Settings: {
        CASLOGIN: 'https://seguridad.espoch.edu.ec/cas/login?',
        CASLOGOUT: 'https://seguridad.espoch.edu.ec/cas/logout?',
        CASVALIDATE: 'https://seguridad.espoch.edu.ec/cas/p3/serviceValidate?',
        REDIRECT_URI: 'https://pruebasw.espoch.edu.ec:5050/ingreso',
        LOGOUT_REDIRECT: 'https://pruebasw.espoch.edu.ec:5050/logout/',
        LOGOUT_CORREO: 'https://login.microsoftonline.com/common/oauth2/logout?',
        VALIDATEJAVA:'https://pruebasw.espoch.edu.ec:3011/rutaCentral/validarCas/'
        }
};*/


//Servidor Produccion
// export let CONFIG = {
//     Settings: {
//         CASLOGIN: 'https://seguridad.espoch.edu.ec/cas/login?',
//         CASLOGOUT: 'https://seguridad.espoch.edu.ec/cas/logout?',
//         CASVALIDATE: 'https://seguridad.espoch.edu.ec/cas/p3/serviceValidate?',
//         REDIRECT_URI: 'https://centromedico.espoch.edu.ec/ingreso',
//         LOGOUT_REDIRECT: 'https://centromedico.espoch.edu.ec/logout/',
//         LOGOUT_CORREO: 'https://login.microsoftonline.com/common/oauth2/logout?',
//         VALIDATEJAVA:'https://servicioscomprobante.espoch.edu.ec/ServicioWebComprobantes/ServiciosComprobantes/ValidateCas/'
//     }
// };


/*export let CONFIG = {
    Settings: {
       CLIENT_ID: 'fdc35fe1-2393-45cf-98b4-d75b2a383bec', // https://apps.dev.microsoft.com’
        TENANT_ID: 'd7f86710-01e1-461d-8599-758de4542e2b', // found in Azure->Active Directory->Properties Pane, TennantID = Directory ID
        AUTHORITY: 'https://login.microsoftonline.com/espoch.edu.ec/',
        RESPONSE_TYPE: 'id_token',
        RESPONSE_MODE: 'id_token',
        STATE: '',
        MS_GRAPH_URI: 'https://graph.microsoft.com/',
        REDIRECT_URI: 'https://comprobanteelectronico.espoch.edu.ec/',
        POST_LOGOUT_REDIRECT: 'https://comprobanteelectronico.espoch.edu.ec/logout',
        MSGRAPH_BETA_API: 'https://graph.microsoft.com/beta/',
        MSGRAPH_v1_API: 'https://graph.microsoft.com/v1.0/',
        SCOPES: ['User.Read'],
        ADMIN_CONSENT: true
    }
};*/

