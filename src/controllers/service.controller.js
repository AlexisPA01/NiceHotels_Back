import { methods as serviceService } from "../services/service.service";
import response from "../entities/response";

const getAsyncAllService = async (req, res) => {
   try {
      let services = await serviceService.getAsyncAllServices();
      res.json(new response("OK Result", 200, services));
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const getAsyncAllServiceByCodHotel = async (req, res) => {
   try {
      const { CodHotel } = req.params;

      if (!CodHotel) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {
         let servicesOfHotel =
            await serviceService.getAsyncAllServicesbyCodHotel(CodHotel);
         res.json(new response("OK Result", 200, servicesOfHotel));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const getAsyncOneService = async (req, res) => {
   try {
      const { Id } = req.params;

      if (!Id) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {
         let category = await serviceService.getAsyncOneService(Id);

         res.json(new response("OK Result", 200, category));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const postAsyncServiceOfHotel = async (req, res) => {
   try {
      const { CodHotel, IdServiceCategory, Name, Description, Cost } = req.body;

      console.log(
         "datos",
         CodHotel,
         IdServiceCategory,
         Name,
         Description,
         Cost
      );
      if (!CodHotel || !IdServiceCategory || !Name || !Description) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {
         await serviceService.postAsyncService({
            CodHotel,
            IdServiceCategory,
            Name,
            Description,
            Cost,
         });

         res.json(new response("OK Result", 200, "Service Created"));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const updateAsyncServiceOfHotel = async (req, res) => {
   try {
      const { Id } = req.params;
      const { CodHotel, IdServiceCategory, Name, Description, Cost } = req.body;

      console.log(
         "datos",
         Id,
         CodHotel,
         IdServiceCategory,
         Name,
         Description,
         Cost
      );

      if (!Id || !CodHotel || !IdServiceCategory || !Name || !Description) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {
         await serviceService.updateAsyncServiceHotel(Id, {
            CodHotel,
            IdServiceCategory,
            Name,
            Description,
            Cost,
         });

         res.json(new response("OK Result", 200, "Service update"));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const deleteAsyncServiceOfHotel = async (req, res) => {
   try {
      const { Id } = req.params;

      if (!Id) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {
         await serviceService.deleteAsyncServiceHotel(Id);

         res.json(new response("OK Result", 200, "Service Delete"));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

export const methods = {
   getAsyncAllService,
   getAsyncAllServiceByCodHotel,
   getAsyncOneService,
   postAsyncServiceOfHotel,
   updateAsyncServiceOfHotel,
   deleteAsyncServiceOfHotel,
};