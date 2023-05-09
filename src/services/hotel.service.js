import { getConnection } from "./../database/database";
import { Hotel } from "../models/Hotel";
import { City } from "../models/City";
import { HotelMedia } from "../models/HotelMedia";

const getAsyncHotels = async () => {
   return await Hotel.findAll({
      attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
      include: [
         {
            model: City,
            include: [
               {
                  model: Country,
               },
            ],
         },
         {
            model: HotelMedia,
            as : 'Medias' 
         }
      ],
   });
};

const getAsyncHotel = async (Cod) => {
   return await Hotel.findByPk(Cod, {
      attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
      include: [
         {
            model: City,
            include: [
               {
                  model: Country,
               },
            ],
         },
         {
            model: HotelMedia,
            as : 'Medias' 
         }
      ],
   });
};

const getAsyncHotelByName = async (name) => {
   var hotel = await Hotel.findOne({ where: { Name: name } });
   return hotel;
};

const postAsyncHotel = async (hotel) => {
   return await Hotel.create({
      Name: hotel.Name,
      Description: hotel.Description,
      IdCity: hotel.IdCity,
      Ubication: hotel.Ubication,
      Address: hotel.Address,
   });
};

const updateAsyncHotel = async (hotel) => {
   return await Hotel.update(
      {
         Name: hotel.Name,
         Description: hotel.Description,
         IdCity: hotel.IdCity,
         Ubication: hotel.Ubication,
         Address: hotel.Address,
      },
      {
         where: { Cod: hotel.Cod },
      }
   );
};

const deleteAsyncHotel = async (cod) => {
   return await Hotel.destroy({
      where: { Cod: cod },
   });
};

export const methods = {
   getAsyncHotels,
   getAsyncHotel,
   getAsyncHotelByName,
   postAsyncHotel,
   updateAsyncHotel,
   deleteAsyncHotel,
};