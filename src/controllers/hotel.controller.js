import response from "./../entities/response";
import { methods as hotelService } from "./../services/hotel.service";
import { methods as hotelMediaService } from "./../services/hotelMedia.service";

const getAsyncHotels = async (req, res) => {
   try {
      var hotels = await hotelService.getAsyncHotels();
      res.json(new response("OK Result", 200, hotels));
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const getAsyncHotel = async (req, res) => {
   try {
      var { Cod } = req.params;
      var hotel = await hotelService.getAsyncHotel(Cod);

      if (!hotel) {
         res.json(new response("Record not found", 404, null));
      } else {
         res.json(new response("OK Result", 200, hotel));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const postAsyncHotel = async (req, res) => {
   try {

      const { Name, Description, IdCity, Ubication, Address } = req.body;

      if (Name === undefined || IdCity === undefined || Address === undefined) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {
         let hotelCheck = await hotelService.postAsyncHotel({
            Name,
            Description,
            IdCity,
            Ubication,
            Address,
         });

         if (hotelCheck === 'Duplicated') {
            res.status(401).json(new response("Duplicate record", 401, null));
         }
         else {
            res.json(new response("OK Result", 200, "Record added."));
         }
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const udpateAsyncHotel = async (req, res) => {
   try {
      const { Cod } = req.params;

      const { Name, Description, IdCity, IdCountry, Ubication, Address } =
         req.body;
      if (
         Name === undefined ||
         IdCity === undefined ||
         /* Ubication === undefined || */ Address === undefined
      ) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {

         var hotel = await hotelService.getAsyncHotel(Cod);
         if (!hotel) {
            res.status(404).json(new response("Record not found", 400, null));
         } else {
            var h = await hotelService.getAsyncHotel(Cod);
            if (h) {

               await hotelService.updateAsyncHotel({
                  Cod,
                  Name,
                  Description,
                  IdCity,
                  IdCountry,
                  Ubication,
                  Address,
               });

               res.json(new response("OK Result", 200, "Record updated"));
            } else {
               res.status(400).json(
                  new response("Duplicate record", 400, null)
               );
            }
         }
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const deleteAsyncHotel = async (req, res) => {
   try {
      const { Cod } = req.params;
      const hotel = await hotelService.getAsyncHotel(Cod);
      if (hotel === null) {
         res.json(new response("Error", 404, "Record not found"));
      } else {
         await hotelService.deleteAsyncHotel(Cod);
         res.json(new response("OK Result", 200, "Record deleted"));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

export const methods = {
   getAsyncHotels,
   getAsyncHotel,
   postAsyncHotel,
   udpateAsyncHotel,
   deleteAsyncHotel,
};
