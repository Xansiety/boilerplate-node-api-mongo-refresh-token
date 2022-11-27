import { request, response } from "express"; // To add intellisense to the request and response objects

export const actionGET = (request, response) => {    
    // Your logic here (interact with the database, etc.)
    return response.status(200).json({
        ok: true,
        message: "Method GET"
    }); // Return a JSON object    
}


export const actionProtectedGET = (request, response) => {    
    // Your logic here (interact with the database, etc.)
    return response.status(200).json({
        ok: true,
        message: "Method GET Protected with JWT"
    }); // Return a JSON object    
}


export const actionProtectedOnlyAdminGET = (request, response) => {    
    // Your logic here (interact with the database, etc.)
    return response.status(200).json({
        ok: true,
        message: "Method GET Protected with JWT for only admin"
    }); // Return a JSON object    
}


export const actionPOST = (request, response) => {    
    // Your logic here (interact with the database, etc.)
    return response.status(200).json({
        ok: true,
        message: "Method POST"
    }); // Return a JSON object    
}

export const actionPUT = (request, response) => {    
    // Your logic here (interact with the database, etc.)
    return response.status(200).json({
        ok: true,
        message: "Method PUT"
    }); // Return a JSON object    
}
export const actionDELETE = (request, response) => {    
    // Your logic here (interact with the database, etc.)
    return response.status(200).json({
        ok: true,
        message: "Method DELETE"
    }); // Return a JSON object    
}

export const actionPATCH = (request, response) => {    
    // Your logic here (interact with the database, etc.)
    return response.status(200).json({
        ok: true,
        message: "Method PATCH"
    }); // Return a JSON object    
}