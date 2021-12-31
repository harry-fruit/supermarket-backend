export class HttpHandlerExeption {
    
    private status!: string;
    private statusCode!: number;
    private message!: string;

    constructor(
        status: string,
        statusCode: number,
        message: string | any,
        ){
            this.status = status;
            this.statusCode = statusCode;
            this.message = message;
    }
    private createResponse(status: string, statusCode: number, message: string){
        const response = { status, statusCode, message }
        return response
    }

    public onSucess (): { status:string, statusCode: number, message: string } {
        return this.createResponse(this.status, this.statusCode, this.message);
    }

    public onError (): { status:string, statusCode: number, message: string } {
        return this.createResponse(this.status, this.statusCode, this.message);
    }

}