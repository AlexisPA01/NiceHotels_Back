import { methods as productService } from "./../services/product.service";
import response from "./../entities/response";

const getProductsByIdInstallation = async (req, res) => {
   try {
      const { IdInstallation } = req.params;
      var products = await productService.getAsyncProductByIdInstallation(
         IdInstallation
      );
      res.json(new response("OK Result", 200, products));
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const getProduct = async (req, res) => {
   try {
      const { Id } = req.params;
      var product = await productService.getAsyncProduct(Id);
      if (!product) {
         res.json(new response("Record not found", 404, null));
      } else {
         res.json(new response("OK Result", 200, product));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const getAsyncRoomServiceProduct = async (req, res) => {
   try {
      const { Id } = req.params;
      var roomService = await productService.getAsyncRoomServiceProduct(Id);
      if (!roomService) {
         res.json(new response("Record not found", 404, null));
      } else {
         res.json(new response("OK Result", 200, roomService));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const getAsyncRoomServicesProduct = async (req, res) => {
   try {
      const { Cod } = req.params;
      var products =
         await productService.getAsyncRoomServicesProductForHotelCod(Cod);
      res.json(new response("OK Result", 200, products));
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const postProduct = async (req, res) => {
   try {
      const {
         IdInstallation,
         IdProductCategory,
         Name,
         Description,
         Cost,
         IsRoomService,
      } = req.body;

      console.log(req.body);
      if (
         Name === undefined ||
         Description === undefined ||
         IdInstallation === undefined ||
         Cost === undefined ||
         IsRoomService === undefined
      ) {
         res.status(400).json(
            new response("Bad request. Please fill all fields.", 400, null)
         );
      } else {
         console.log("entra");
         var product = await productService.getAsyncProductByIdInstallationName(
            IdInstallation,
            Name
         );
         if (product) {
            res.status(400).json(new response("Duplicate record", 400, null));
         } else {
            await productService.postAsyncProduct({
               IdInstallation,
               IdProductCategory,
               Name,
               Description,
               Cost,
               IsRoomService,
            });
            res.json(new response("OK Result", 200, "Record added"));
         }
      }
   } catch (error) {
      console.log(error);
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const updateProduct = async (req, res) => {
   try {
      const { Id } = req.params;
      const {
         IdInstallation,
         IdProductCategory,
         Name,
         Description,
         Cost,
         IsRoomService,
      } = req.body;

      console.log(Name, Description, IdProductCategory, Id);
      if (
         Id === undefined ||
         Name === undefined ||
         IdInstallation === undefined ||
         Cost === undefined ||
         IsRoomService === undefined
      ) {
         res.status(400).json({
            message: "Bad request. Please fill all fields.",
         });
      } else {
         // TODO: Solo se actualizan el Name, Descption, IdProductCategory si se quiere cambiar el Cost se debe actualizar:
         let productUpdate = await productService.updateAsyncProduct(
            Id,
            IdProductCategory,
            Name,
            Description
         );
         res.json(new response("OK Resultado", 200, productUpdate));
      }
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

const deleteProduct = async (req, res) => {
   try {
      const { Id } = req.params;
      await productService.deleteAsyncProduct(Id);
      //--- Falta borrado en cascada
      res.json(new response("OK Result", 200, "Delete record"));
   } catch (error) {
      res.status(500);
      res.json(new response(error.message, 500, null));
   }
};

export const methods = {
   getProductsByIdInstallation,
   getProduct,
   getAsyncRoomServicesProduct,
   getAsyncRoomServiceProduct,
   postProduct,
   updateProduct,
   deleteProduct,
};
