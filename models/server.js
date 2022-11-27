import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Import your routes here
import { demoRouter } from "../routes/demo-router.js";
import { authRouter } from "../routes/authRouter.js";
import { archivosRouter } from "../routes/archivosRouter.js";
// Rate Limiting
import rateLimit from "express-rate-limit";
// Database Config
import { openMongoDbConnection } from "../database/MongoDB/openMongoDbConnection.js";
// loading files
import fileUpload from "express-fileupload"


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.demoPath = "/api/demo"; // Path for the demo router
    this.authPath = "/api/auth"; // Path for the auth router
    this.files = "/api/files"; // Path for the files router

    // Call the database
    this.ConnectToDatabase();

    // Call the middleware's
    this.Middlewares();

    // Call the routes
    this.Routes();
  }

  // Connect to the database
  async ConnectToDatabase() {
    await openMongoDbConnection();
  }

  // Middleware's
  Middlewares() {
    // CORS for everyone
    // this.app.use(cors()) 
    //CORS for a specific origins
    const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];
    this.app.use(
      cors({
        origin: function (origin, callback) {
          console.log("⚡ => ", origin);
          if (!origin || whiteList.includes(origin)) {
            return callback(null, origin);
          }
          return callback("Error CORS: " + origin + " - Not authorized.");
        },
        credentials: true /*Enable credentials on browser*/,
      })
    );

    // Rate limit for blocking brute force attacks
    this.app.use(
      rateLimit({
        windowMs: 60000, // 15 minutes
        max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: true, // Disable the `X-RateLimit-*` headers
        statusCode: 200,
        message: {
          status: 429, // optional, of course
          limiter: true,
          type: "error",
          message: "Maximum exceded request calling API ",
        },
      })
    );

    // Read cookies from the request browser
    this.app.use(cookieParser());

    // Parse the body of the request
    this.app.use(express.json());

    // Show a public folder
    // this.app.use(express.static("public"));


    // manage files upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true /*Para crear la carpeta si no existe */,
      })
    )

  }

  // Routes
  Routes() {
    this.app.use(this.demoPath, demoRouter); 
    this.app.use(this.authPath, authRouter);
    this.app.use(this.files, archivosRouter);
  }

  // Start the server
  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Example app listening on port ${this.port}, Link: http://localhost:${this.port}`
      );
    });
  }
}


// Export the server
export default Server;