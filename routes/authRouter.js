import { Router } from "express";
import { loginAction, logoutAction, refreshTokenAction, registerAction } from "../controllers/authController.js";
import { bodyLoginValidator, bodyRegisterValidator, requireRefreshToken } from "../middlewares/index.js";

const authRouter = Router();

// Ruta de registro
authRouter.post("/register", [bodyRegisterValidator], registerAction);

// Ruta de login
authRouter.post("/login", [bodyLoginValidator], loginAction);

// Construir un nuevo Token
authRouter.get("/refresh", [requireRefreshToken], refreshTokenAction);

// Remover las cookies
authRouter.get("/logout", logoutAction);

export { authRouter };
