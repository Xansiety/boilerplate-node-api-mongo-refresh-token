import { Router } from "express";
import { actionPUT, actionGET, actionPOST, actionDELETE, actionPATCH, actionProtectedGET, actionProtectedOnlyAdminGET } from "../controllers/controller-demo.js";
import { validarTokenOnHeader, esAdminRole } from "../middlewares/index.js";

// Create a new instance of the Router class
const demoRouter = Router();

// Get method
demoRouter.get("/", actionGET )

// Post method
demoRouter.post("/", actionPOST)

// Put method
demoRouter.put("/:id", actionPUT)

// Delete method
demoRouter.delete("/:id", actionDELETE)

// Patch method
demoRouter.patch("/", actionPATCH)

// Get Only Admin Route
demoRouter.get("/onlyAdminRol",[validarTokenOnHeader, esAdminRole], actionProtectedOnlyAdminGET)


// Protected Route with JWT
demoRouter.get("/protected",[validarTokenOnHeader], actionProtectedGET)


// Export the router
export { demoRouter };
