import * as dotenv from "dotenv";
import Server from "./models/server.js"; 

dotenv.config(); // Load the environment variables, on level top of the app to be available for all the app

const server = new Server();

server.listen();
