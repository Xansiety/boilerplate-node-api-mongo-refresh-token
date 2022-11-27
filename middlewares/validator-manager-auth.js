import { check } from "express-validator";
import { emailExiste, esRolValido } from "../helpers/validator-db.js";
import { validarCamposExpress } from "./validar-campos.js";

export const bodyRegisterValidator = [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("email", "El correo es obligatorio").not().isEmpty(),
  check("email", "El correo no es un formato valido")
    .trim()
    .isEmail()
    .normalizeEmail(),
  check("email").custom((email) => emailExiste(email)),
  check("password", "La contraseña es obligatoria").trim().not().isEmpty(),
  check("password", "La contraseña debe ser de mínimo 6 caracteres").isLength({
    min: 6,
  }),
  check("rePassword", "Las Contraseñas no coinciden").custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }
  ),
  check("rol", "El rol es obligatorio").not().isEmpty(),
  check("rol").custom(esRolValido),
  validarCamposExpress,
];

export const bodyLoginValidator = [
  check("email", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  validarCamposExpress,
];
