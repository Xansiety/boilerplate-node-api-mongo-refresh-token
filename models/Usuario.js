import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";


const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: [true, "la contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    required: true,
    type: String,
    /*enum: ["ADMIN_ROLE", "USER_ROLE", ""],*/
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//override -> sobrescribir para solo devolver y omitir propiedades en el retorno
usuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};
// Antes de guardar en la base de datos
// Debe ser function f ya que se debe tener al alcance el this
usuarioSchema.pre("save", async function (next) {
  const user = this;

  // si no se modifica seguimos
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10); //creamos los saltos
    const hashPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashPassword;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Fallo el hash de contraseña");
  }
});

// Metodo para comparar contraseñas
usuarioSchema.methods.comparePassword = async function (candidatePassword) {
  //validar la contraseña
  return await bcryptjs.compareSync(candidatePassword, this.password);
};

export const Usuario = model("Usuario", usuarioSchema);
