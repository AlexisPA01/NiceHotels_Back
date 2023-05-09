import response from "../entities/response";
import { methods as roomServiceService} from "../services/roomService.service";

const getRoomService = async (req,res) => 
{
    try
    {
        const { CodHotel } = req.params;

        var RoomServices= await roomServiceService.getRoomServiceByCodHotel(CodHotel);

        res.json(new response("OK Result", 200, RoomServices));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

export const methods = 
{
    getRoomService
}