import { Guest } from "../models/Guest";

import { RoomNumber } from "../models/RoomNumber";

const getAsyncGuestByDocument = async (Document) => {
   try {
      return await Guest.findOne({
         where: { Document: Document },
      });
   } catch (error) {
      console.log(error);
   }
};

const getAsyncAccountGuestByDocument = async (Document, DateBirth) => {
   try {
      return await Guest.findOne({
         where: { Document: Document, DateBirth: DateBirth },
      });
   } catch (error) {
      console.log(error);
   }
};

const updateAsyncAcconuntGuest = async (Document, guest) => {
   try {
      return await Guest.update(
         {
            Name: guest.Name,
            LastName: guest.LastName,
            Email: guest.Email,
            PhoneNumber: guest.PhoneNumber,
         },
         {
            where: { Document: Document },
         }
      );
   } catch (error) {
      console.log(error);
   }
};

const getAsyncRoomNum = async (Num) => {
   try {
      return await RoomNumber.findOne({
         where: {
            Num: Num,
         },
      });
   } catch (error) {
      console.log(error);
   }
};

export const methods = {
   getAsyncGuestByDocument,
   updateAsyncAcconuntGuest,
   getAsyncAccountGuestByDocument,
   getAsyncRoomNum,
};
