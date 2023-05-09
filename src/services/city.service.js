import { City } from "../models/City";

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