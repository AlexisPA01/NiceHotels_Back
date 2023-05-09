import { methods as roomService } from "./../services/room.service";
import { methods as roomNumberService } from "./../services/roomNumber.service";
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
         RoomNumbers,
         RoomEquipments,
      } = req.body;

      if (
         Name === undefined ||
         Description === undefined ||
         CodHotel === undefined ||
         CostNight === undefined ||
         RoomEquipments === undefined
      ) {
         res.status(400).json({
            message: "Bad request. Please fill all fields.",
         });
      } else {
         var room = await roomService.getAsyncRoomByCodHotelName(
            CodHotel,
            Name
         );
         if (room) {
            res.status(400).json(new response("Duplicate record", 400, null));
         } else {
            var roomCreated = await roomService.postAsyncRoom({
               Name,
               Description,
               CodHotel,
               CostNight,
            });
            console.log("aqui esta el objjeto room Creado", roomCreated);
            res.json(new response("OK Result", 200));
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
      CostNight,
      RoomNumbers,
      RoomEquipments,
   } = req.body;
   try {
      if (
         Name === undefined ||
         CodHotel === undefined ||
         Description === undefined ||
         CostNight === undefined
      ) {
         res.status(400).json({
            message: "Bad request. Please fill all fields.",
         });
      } else {
         let room = await roomService.getAsyncRoom(Cod);
         if (room) {
            //---No ingresa float a la base de datos
            await roomService.UpdateAsyncRoomByCodHotelData(
               Cod,
               Name,
               Description,
               CostNight
            );
            res.json(new response("OK Result", 200, "Record updated"));
         } else {
            console.log("error");
            res.status(400).json(new response("Duplicate record", 400, null));
         }
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
