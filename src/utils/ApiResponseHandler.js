class ApiResponse{
    constructor(
        statusCode,
        message,
        data
    ){
        super(message),
        this.statusCode = statusCode,
        this.message = message,
        this.data = data
    }
}


export { ApiResponse }