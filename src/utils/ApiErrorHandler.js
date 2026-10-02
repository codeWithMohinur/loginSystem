class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        data,
        errors = [],
        stack,
        success
    ){
        super(message),
        this.statusCode = statusCode,
        this.message = message,
        this.data = null,
        this.errors = errors,
        this.success = success < 300
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }