import { Service } from "../models/Service";

const getAsyncAllServices = async () => {
   return await Service.findAll();
};

const getAsyncAllServicesbyCodHotel = async (CodHotel) => {
   return await Service.findAll({
      where: {
         CodHotel: CodHotel,
      },
   });
};

const getAsyncOneService = async (Id) => {
   return await Service.findOne({
      where: {
         Id: Id,
      },
   });
};

const postAsyncService = async (service) => {
   return await Service.create({
      CodHotel: service.CodHotel,
      IdServiceCategory: service.IdServiceCategory,
      Name: service.Name,
      Description: service.Description,
      Cost: service.Cost,
   });
};

const updateAsyncServiceHotel = async (Id, service) => {
   return await Service.update(
      {
         CodHotel: service.CodHotel,
         IdServiceCategory: service.IdServiceCategory,
         Name: service.Name,
         Description: service.Description,
         Cost: service.Cost,
      },
      {
         where: { Id: Id },
      }
   );
};

const deleteAsyncServiceHotel = async (Id) => {
   return await Service.destroy({
      where: { Id: Id },
   });
};

export const methods = {
   getAsyncAllServices,
   getAsyncAllServicesbyCodHotel,
   postAsyncService,
   getAsyncOneService,
   updateAsyncServiceHotel,
   deleteAsyncServiceHotel,
};
