import { Router } from "express"
import { check } from "express-validator"
import { cargarArchivoOnLocal, mostrarImagen } from "../controllers/archivosController.js"
import { coleccionesPermitidas } from "../helpers/index.js"
import { validarArchivoEnviado, validarCamposExpress, validarTokenOnHeader } from "../middlewares/index.js"

const archivosRouter = Router()

archivosRouter.post("/", [validarTokenOnHeader, validarArchivoEnviado], cargarArchivoOnLocal) 
 
archivosRouter.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCamposExpress,
  ],
  mostrarImagen
) 

export { archivosRouter }