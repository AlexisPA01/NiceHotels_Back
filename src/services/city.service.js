import { City } from "../models/City";
import { getConnection } from "./../database/database";

const getAsyncCities = async () => 
{
    return await City.findAll(
        {
            attributes: [
                "Id",
                "Name"
            ],
        }
    );
}


export const methods = 
{
    getAsyncCities,
};