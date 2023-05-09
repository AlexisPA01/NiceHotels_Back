import { getConnection } from "./../database/database";
import { Product } from "../models/Product";
import { Installation } from "../models/Installation";
import { Hotel } from "../models/Hotel";
import { City } from "../models/City";
import { RoomService } from "../models/RoomService";
import { RoomReservated } from "../models/RoomReservated";
import { Reservation } from "../models/Reservation";
import { RoomNumber } from "../models/RoomNumber";
import { Room } from "../models/Room";
import { RoomServiceDetail } from "../models/RoomServiceDetail";
import { Op } from "sequelize";

const getAsyncProduct = async (Id) => {
   return await Product.findByPk(Id, {
      attributes: [
         "Id",
         "Name",
         "Description",
         "Cost",
         "IsRoomService",
         "IdProductCategory",
      ],
      include: [
         {
            model: Installation,
            key: "IdInstallation",
            attributes: ["Id", "Name", "Description", "Schedule", "DressCode"],
            include: {
               model: Hotel,
               include: {
                  model: City,
               },
            },
         }
      ],
   });
};

const getAsyncProductByIdInstallation = async (idInstallation) => {
   return await Product.findAll({
      where: { IdInstallation: idInstallation },
   });
};

const getAsyncRoomServiceProduct = async (id) => {
   return await RoomService.findOne(
      {
         where: { Id: id },
      },
      {
         attributes: ["Id", "DateRoomService", "SubTotal", "Total"],
         include: [
            {
               model: RoomServiceDetail,
            },
            {
               model: RoomReservated,
            },
            {
               model: Product,
            },
            {
               model: Installation,
            },
            {
               model: Hotel,
            },
         ],
      }
   );
};

const getAsyncRoomServicesProductForHotelCod = async (codHotel) => {
   return await RoomService.findAll({
      attributes: ["Id", "DateRoomService", "SubTotal", "Total"],
      include: [
         {
            model: RoomServiceDetail,
            attributes: ["Quantity", "Observations", "Taxes", "Total"],
            include: {
               model: Product,
               attributes: [
                  "Id",
                  "Name",
                  "Description",
                  "Cost",
                  "IsRoomService",
               ],
               include: [
                  {
                     model: Installation,
                  }
               ],
            },
         },
         {
            model: RoomReservated,
            attributes: ["Id", "NumberAdults", "NumberKids", "NumberBabys"],
            include: [
               {
                  model: RoomNumber,
                  attributes: ["Id", "Num", "IsAvailable"],
                  include: [
                     {
                        model: Room,
                        where: { CodHotel: codHotel },
                     },
                  ],
               },
            ],
         },
      ],
   });
};

const getAsyncProductByIdInstallationName = async (idInstallation, name) => {
   return await Product.findOne({
      where: {
         [Op.and]: [{ IdInstallation: idInstallation }, { Name: name }],
      },
      attributes: ["Id", "Name", "Description", "Cost", "IsRoomService"],
      include: {
         model: Installation,
         attributes: ["Id", "Name", "Description", "Schedule", "DressCode"],
      }
   });
};

const postAsyncProduct = async (p) => {
   console.log(p);
   return await Product.create({
      IdInstallation: p.IdInstallation,
      Name: p.Name,
      Description: p.Description,
      Cost: p.Cost,
      IsRoomService: p.IsRoomService,
   });
};

const updateAsyncProduct = async (Id,  Name, Description) => {
   try {
      return await Product.update(
         {
            Name: Name,
            Description: Description,
         },
         {
            where: { Id: Id },
         }
      );
   } catch (error) {
      console.log(error);
   }
};

const deleteAsyncProduct = async (Id) => {
   await RoomServiceDetail.destroy({
      where: { IdProduct: Id },
   });

   return await Product.destroy({
      where: { Id: Id },
   });
};

export const methods = {
   getAsyncProduct,
   getAsyncProductByIdInstallation,
   getAsyncProductByIdInstallationName,
   getAsyncRoomServicesProductForHotelCod,
   getAsyncRoomServiceProduct,
   postAsyncProduct,
   updateAsyncProduct,
   deleteAsyncProduct,
};
