import { Product } from "../models/Product";
import { Installation } from "../models/Installation";
import { Hotel } from "../models/Hotel";
import { City } from "../models/City";
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
   return await Product.create({
      IdInstallation: p.IdInstallation,
      Name: p.Name,
      Description: p.Description,
      Cost: p.Cost,
      IsRoomService: p.IsRoomService,
   });
};

const updateAsyncProduct = async (Id,  Name, Description) => {
   return await Product.update(
      {
         Name: Name,
         Description: Description,
      },
      {
         where: { Id: Id },
      }
   );
};

const deleteAsyncProduct = async (Id) => {
   return await Product.destroy({
      where: { Id: Id },
   });
};

export const methods = {
   getAsyncProduct,
   getAsyncProductByIdInstallation,
   getAsyncProductByIdInstallationName,
   postAsyncProduct,
   updateAsyncProduct,
   deleteAsyncProduct,
};
