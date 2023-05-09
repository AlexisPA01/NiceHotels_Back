class response 
{
    constructor (message, status, data)
    {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    setMessage(message){this.message = message;}

    getMessage(){return this.message;}

    setStatus(status){this.status = status;}

    getStatus(){return this.status;}
    
    setData(data){this.data = data;}

    getData(){return this.data;}
}

export default response;