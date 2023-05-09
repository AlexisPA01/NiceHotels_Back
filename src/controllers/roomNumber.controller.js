import { methods as roomNumberService } from "../services/roomNumber.service";
import response from "../entities/response";

const getAsyncRoomNumbers = async (req,res) => 
{
    try
    {
        var roomNumbers = await roomNumberService.getAsyncRoomNumbers();
        res.json(new response("OK Result",200,roomNumbers));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const getAsyncRoomNumber = async (req,res) => 
{
    try
    {
        var roomNumber = await roomNumberService.getAsyncRoomNumber(req.params.Num);
        if(!roomNumber) {
            res.json(new response("ERROR", 404, 'Record not found'))
        }
        else {
            res.json(new response("OK Result", 200, roomNumber))
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message, 500, null));
    }
}

const getAsyncRoomsNumberByRoom = async (req,res) => 
{
    try
    {
        var RoomNumber = await roomNumberService.getAsyncRoomsNumberByRoom(req.params.Cod);
        res.json(new response("OK Result",200,RoomNumber))
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const postAsyncRoomNumber = async (req,res) => 
{
    try
    {
        const { Num, CodRoom, IsAvailable } = req.body;
        console.log('req',CodRoom, IsAvailable, Num);
        if( Num === undefined || CodRoom === undefined || IsAvailable == undefined )
        {
            console.log('error');
            res.status(400).json(new response ("Bad request. Please fill all fields.", 400, null));
        }else
        {
            console.log('entraa');
            var roomNumber = await roomNumberService.getAsyncRoomNumber(Num);
            if(!roomNumber)
            {
                await roomNumberService.postAsyncRoomNumber(
                    {
                        Num,
                        CodRoom,
                        IsAvailable
                    }
                );
                res.json(new response("OK Result",200,"Record added."));
            }else
            {
                res.status(400).json(new response("Duplicate record",400,null));
            }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const updateAsyncRoomNumber = async (req,res) => 
{
    try
    {
        const { Num } = req.params;
        const { CodRoom, IsAvailable} = req.body;
        if( Num === undefined || CodRoom === undefined || IsAvailable == undefined )
        {
            res.status(400).json(new response("Bad request. Please fill all fields.",400,null));
        }else
        {
            console.log('entra');
            var roomNumber = await roomNumberService.getAsyncRoomNumber(Num);
            if(!roomNumber)
            {
                res.status(404).json(new response("Record not found",400,null));
            }else
            {
                const { Num } = req.params;
                var roomNumber = await roomNumberService.getAsyncRoomNumber(Num);
                if(roomNumber)
                {
                    await roomNumberService.updateAsyncRoomNumber({Num, CodRoom, IsAvailable});
                    res.json(new response("OK Result", 200, "Record updated"));
                }else
                {
                    res.status(400).json(new response("Duplicate record",400,null));
                }
            }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const deleteAsyncRoomNumber = async (req,res) => 
{
    try
    {
        const {Num} = req.params;
        const roomNumber = roomNumberService.getAsyncRoomNumber(Num);
        if(!roomNumber) {
            res.json(new response("ERROR", 404, "Record not found"));
        }
        else {
            await roomNumberService.deleteAsyncRoomNumber(Num);
            res.json(new response("OK Result", 200, "Record deleted"));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const deleteAsyncRoomNumberByCodRoom = async (req,res) => 
{
    try
    {
        const {Cod} = req.params;
        await roomNumberService.deleteAsyncRoomNumberByCodRoom(Cod);
        res.json(new response("OK Result", 200, "Record deleted"));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

export const methods = 
{
    getAsyncRoomNumbers,
    getAsyncRoomNumber,
    getAsyncRoomsNumberByRoom,
    postAsyncRoomNumber,
    updateAsyncRoomNumber,
    deleteAsyncRoomNumber,
    deleteAsyncRoomNumberByCodRoom
}