import { methods as roomService } from "./../services/room.service";
import { methods as roomNumberService } from "./../services/roomNumber.service";
import { methods as roomMediaService } from "./../services/roomMedia.service";
import response from "../entities/response";

const getRoomsForHotel = async (req, res) => {
   try {
      const { CodHotel } = req.params;
      var rooms = await roomService.getAsyncRoomsByCodHotel(CodHotel);
      res.json(new response("OK Result", 200, rooms));
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const getRoom = async (req, res) => {
   try {
      const { Cod } = req.params;
      var room = await roomService.getAsyncRoom(Cod);
      if (!room) {
         res.json(new response("Record not found", 404, null));
      } else {
         res.json(new response("OK Result", 200, room));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const postRoom = async (req, res) => {
   try {
      const {
         Name,
         Description,
         CodHotel,
         CostNight,
      } = req.body;

      if ( Name === undefined || Description === undefined || CodHotel === undefined || CostNight === undefined)
      { res.status(400).json({message: "Bad request. Please fill all fields.",}); } 
      else {
         let room = await roomService.getAsyncRoomByCodHotelName(CodHotel,Name);
         if (!room) {
            let roomCreated = await roomService.postAsyncRoom(
               {
                  Name,
                  CodHotel,
                  Description,
                  CostNight,
               }
            );

            await roomMediaService.postAsyncRoomMedia({
               CodRoom: roomCreated.Cod,
               Name:"placeholder room media",
               FileType:"png",
               URL:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/habitacion-alquilar-1563544275.jpg"
            })

            res.json(new response("OK Result",200,"Record added."));
         } else {
            res.status(400).json(new response("Duplicate record", 400, null));
         }
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const updateRoom = async (req, res) => {
   const { Cod } = req.params;
   const {
      Name,
      Description,
      CodHotel,
      CostNight
   } = req.body;
   try {
      if ( Name === undefined || CodHotel === undefined || Description === undefined || CostNight === undefined) 
      { res.status(400).json({ message: "Bad request. Please fill all fields.", });} 
      else {
         let room = await roomService.getAsyncRoom(Cod);
         if (room) {
            //---No ingresa float a la base de datos
            await roomService.updateAsyncRoom({ 
               Cod,
               Name,
               Description,
               CostNight,
               CodHotel
            });
            res.json(new response("OK Result", 200, "Record updated"));
         } 
         else { res.status(404).json(new response("Record not found",404,null));}
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const deleteRoom = async (req, res) => {
   try {
      const { Cod } = req.params;
      await roomService.deleteAsyncRoom(Cod);
      res.json(new response("OK Result", 200, "Delete record"));
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

export const methods = {
   getRoomsForHotel,
   getRoom,
   postRoom,
   updateRoom,
   deleteRoom,
};
