import { Hotel } from "../models/Hotel";
import { City } from "../models/City";
import { HotelMedia } from "../models/HotelMedia";

import { methods as hotelMediaService } from "./hotelMedia.service";

const getAsyncHotels = async () => {
   return await Hotel.findAll({
      attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
      include: [
         {
            model: City,
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
            model: City
         },
         {
            model: HotelMedia,
            as : 'Medias' 
         }
      ],
   });
};

const getAsyncHotelByName = async (Name) => {
   return await Hotel.findOne({
      where: {
         Name
      }
   })
}

const postAsyncHotel = async (hotel) => {

   let hotelCheck = await getAsyncHotelByName(hotel.Name);

   if(!hotelCheck){
      let h = await Hotel.create({
         Name: hotel.Name,
         Description: hotel.Description,
         IdCity: hotel.IdCity,
         Ubication: hotel.Ubication,
         Address: hotel.Address,
      });

      await hotelMediaService.postAsyncHotelMedia({
         CodHotel: h.Cod,
         Name: "Banner",
         FileType: "png",
         URL: "https://prod-be-palace-brand.s3.amazonaws.com/playa_del_carmen_resort_7769c7222e.jpg",
      })

      await hotelMediaService.postAsyncHotelMedia({
         CodHotel: h.Cod,
         Name: "Logo",
         FileType: "png",
         URL: "https://i.pinimg.com/originals/de/f7/b6/def7b694904830d5804ee5975b69e9ed.png",
      })

      return h;
   }else{
      return 'Duplicated';
   }   
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
   postAsyncHotel,
   updateAsyncHotel,
   deleteAsyncHotel,
};