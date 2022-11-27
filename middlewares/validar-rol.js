import { request, response } from "express"

export const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: "Se quiere validar el rol, sin validar el token" })
  }
  const { rol, nombre } = req.usuario
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      ok: false,
      msg: `El usuario ${nombre} no tiene los privilegios suficientes para realizar esta acción`,
    })
  } 
  next()
}

export const rolesPermitidos = (...roles) => {
  return (req = request, res = response, next) => {
    // console.log(roles, req.usuario.rol)
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      })
    }
    next()
  }
}