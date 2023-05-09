import { methods as cityService } from "../services/city.service";
import response from "../entities/response";

const getAsyncCities = async (req,res) => 
{
    try
    {
        var cities = await cityService.getAsyncCities();
        res.json(new response("OK Result",200,cities));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}


export const methods = 
{
    getAsyncCities,
}