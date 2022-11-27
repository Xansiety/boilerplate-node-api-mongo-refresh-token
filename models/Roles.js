import { Schema, model } from "mongoose"
const rolesSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
})

// INSERT MANUALLY IN MONGO ATLAS NEXT RECORDS:
// ADMIN_ROLE
// USER_ROLE
export const Role = model("Role", rolesSchema)
 