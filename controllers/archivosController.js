import { request, response } from "express";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { Usuario } from "../models/index.js";
import { v2 as cloudinary } from "cloudinary";
import { subirArchivos } from "../helpers/subir-archivos.js";

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
  secure: true,
});
 
//Needed for Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
export const cargarArchivoOnLocal = async (req = request, res = response) => {
  //imágenes
  try {
    // const nombre = await subirArchivos(req.files, ["text", "md"], "Documents")
    const nombre = await subirArchivos(req.files, undefined, "images");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const actualizarImagen = async (req = request, res = response) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    default:
      return res
        .status(500)
        .json({ msg: `Se me olvido validar esta opción ${coleccion}` });
  }

  // limpiar imágenes previas
  if (modelo.img) {
    //hay que borrar la imagen del servidor si existe
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  modelo.img = await subirArchivos(req.files, undefined, coleccion);
  await modelo.save();

  res.json(modelo);
};

export const mostrarImagen = async (req = request, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    default:
      return res
        .status(500)
        .json({ msg: `Se me olvido validar esta opción ${coleccion}` });
  }
  // limpiar imágenes previas
  if (modelo.img) {
    //hay que borrar la imagen del servidor si existe
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const placeholderImage = path.join(__dirname, "../assets", "no-image.jpg");
  return res.sendFile(placeholderImage);
};

// CLOUDINARY

export const actualizarImagenCloudinary = async (
  req = request,
  res = response
) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    default:
      return res
        .status(500)
        .json({ msg: `Se me olvido validar esta opción ${coleccion}` });
  }

  // limpiar imágenes previas
  if (modelo.img) {
    //hay que borrar la imagen del servidor si existe
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id, extension] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save();
  res.json(modelo);
};
