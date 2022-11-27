import { v4 as uuidv4 } from "uuid"

import path from "path"
import { fileURLToPath } from "url"
//Needed for Path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const subirArchivos = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files
    const nombreNormalizado = archivo.name.split(".")
    const extension = nombreNormalizado[nombreNormalizado.length - 1]
    // validar la extension
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `la extension ${extension} no es valida, asegúrate de seleccionar una ${extensionesValidas}`
      )
    }
    const nombreTemporal = uuidv4() + "." + extension
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      nombreTemporal
    )
    archivo.mv(uploadPath, function (err) {
      if (err) {
        return reject(err)
      }
      resolve(nombreTemporal)
    })
  })
}