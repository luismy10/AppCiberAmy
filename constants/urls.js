
/** 
 * DOMINIO DEL SERVIDOR PRINCIPAL
 */
const DOMINIO_HTTPS = "https://ciberamy.net.pe/";

/** 
 * DOMINIO DEL SERVIDOR PRINCIPAL
 */
const DOMINIO_PRU = "http://192.168.101.76:5000/";

/**
 * EXTECIÓN PARA USO EN PRODUCCIÓN
 */


const DOMINIO = DOMINIO_PRU;

const SIGN_IN = DOMINIO + "api/usuario/app/login";
const SIGN_UP = DOMINIO + "api/usuario/add";
const USUARIO = DOMINIO + "api/usuario/app/id";
const TRANSACCIONES = DOMINIO + "api/usuario/transacciones";

export default {
  SIGN_IN,
  SIGN_UP,
  USUARIO,
  TRANSACCIONES
}