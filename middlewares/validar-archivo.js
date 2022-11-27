import { request, response } from "express"

export const validarArchivoEnviado = (req = request, res = response, next) => { 
  console.log({ files: req.files })
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "No files were uploaded - Archivo." })
  }
  next()
}