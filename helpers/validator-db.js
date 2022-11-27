import mongoose from "mongoose"
import { Role, Usuario } from "../models/index.js"
   
export const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({
    rol,
  }) /*Validamos que exista en la base de datos */ 
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
  }
}

export const emailExiste = async (correo = "") => {
  //verificar si el correo existe
  const existeEmail = await  Usuario.findOne({ correo }) //buscar en mongo si existe 
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya se encuentra registrado`)
  }
}

export const usuarioExistPorId = async (id = "") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`El id usuario proporcionado no tiene el formato valido`)
  }
  const usuarioExiste = await Usuario.findById(id)
  if (!usuarioExiste) {
    throw new Error(`El usuario no se encuentra registrado en la base de datos`)
  }
}
 
export const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion)
  if (!incluida) {
    throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`)
  } 
  return true
}
 