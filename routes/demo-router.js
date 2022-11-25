import { Router } from "express";
import { actionPUT, actionGET, actionPOST, actionDELETE, actionPATCH } from "../controllers/controller-demo.js";

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

// Export the router
export { demoRouter };
