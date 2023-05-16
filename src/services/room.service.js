import { Room } from "../models/Room";
import { Hotel } from "../models/Hotel";
import { City } from "../models/City";
import { Op } from "sequelize";
import { RoomNumber } from "../models/RoomNumber";
import { RoomMedia } from "../models/RoomMedia";

const getAsyncRoom = async (Cod) => {
   return await Room.findByPk(Cod, {
      attributes: ["Cod", "Name", "Description", "CostNight"],
      include: [
         {
            model: Hotel,
            attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
            include: [
               {
                  model: City,
               },
            ],
         },
         {
            model : RoomMedia,
            as : 'Medias'
         }
      ],
   });
};

const getAsyncRoomsByCodHotel = async (codHotel) => {
   return await Room.findAll({
      where: { CodHotel: codHotel },
      attributes: ["Cod", "Name", "Description", "CostNight"],
      include: [
         {
            model: Hotel,
            attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
            include: [
               {
                  model: City
               }
            ],
         },
         {
            model : RoomMedia,
            as : 'Medias'
         }
      ],
   });
};

const getAsyncRoomByCodHotelName = async (codHotel, name) => {
   return await Room.findOne({
      where: {
         [Op.and]: [
            {
               CodHotel: codHotel,
            },
            {
               Name: name,
            },
         ],
      },
      attributes: ["Cod", "Name", "Description", "CostNight"],
      include: [
         {
            model: Hotel,
            attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
            include: [
               {
                  model: City
               },
            ],
         },
         {
            model : RoomMedia,
            as : 'Medias'
         }
      ],
   });
};

const postAsyncRoom = async (room) => {
   return await Room.create({
      CodHotel: room.CodHotel,
      Name: room.Name,
      Description: room.Description,
      CostNight: room.CostNight,
   });
};

const updateAsyncRoom = async (room) => {
   return await Room.update(
      {
         CodHotel: room.CodHotel,
         Name: room.Name,
         Description: room.Description,
         CostNight: room.CostNight,
      },
      {
         where: {Cod: room.Cod}
      }
   );
};

const UpdateAsyncRoomByCodHotelData = async (
   Cod,
   Name,
   Description,
   CostNight
) => {
   try {
      const room = await Room.findByPk(Cod);

      room.Name = Name;
      room.Description = Description;
      room.CostNight = CostNight;

      await room.save();
   } catch (error) {
      console.log(error);
   }
};

const deleteAsyncRoom = async (Cod) => {
   return await Room.destroy({
      where: { Cod: Cod },
   });
};

export const methods = {
   getAsyncRoom,
   getAsyncRoomsByCodHotel,
   getAsyncRoomByCodHotelName,
   postAsyncRoom,
   updateAsyncRoom,
   deleteAsyncRoom,
   UpdateAsyncRoomByCodHotelData,
};
