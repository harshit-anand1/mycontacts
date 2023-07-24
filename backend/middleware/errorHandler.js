const {constants} = require("../constants");
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
        case VALIDATION_ERROR: 
            res.json({title: "VALIDATION FAILED",message: err.message, stackTrace : err.stack}); 
            break;

        case UNAUTHORIZED:
            res.json({title: "UNAUTHORIZED",message: err.message, stackTrace : err.stack});
            break; 
        case FORBIDDEN:
            res.json({title: "FORBIDDEN",message: err.message, stackTrace : err.stack});
            break; 


        case 404:
            res.json({title: "Not Found",message: err.message, stackTrace : err.stack});
            break; 
        case SERVER_ERROR:
            res.json({title: "SERVER ERROR",message: err.message, stackTrace : err.stack});
            break; 
        default:
            console.log("No error");
            break;
    }
    
   
};
module.exports = errorHandler;
