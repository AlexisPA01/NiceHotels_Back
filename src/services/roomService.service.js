import { Guest } from "../models/Guest";
import { GuestRoomReservated } from "../models/GuestRoomReservated";
import { Room } from "../models/Room";
import { RoomNumber } from "../models/RoomNumber";
import { RoomReservated } from "../models/RoomReservated";
import { RoomService } from "../models/RoomService";

const getRoomServiceByCodHotel = async (codHotel) => 
{
    return await RoomService.findAll({
        attributes:[
            "Id",
            "DateRoomService",
            "SubTotal",
            "Total"
        ],
        include:[
            {
                model : RoomReservated,
                include:[
                    {
                        model: RoomNumber,
                        include:{
                            model:Room,
                            where:{
                                CodHotel : codHotel
                            }
                        }
                    },
                    {
                        model: GuestRoomReservated,
                        include:[
                            {
                                model: Guest
                            }
                        ]
                    }
                ]
            },
        ]
    });
    
}

export const methods = 
{
    getRoomServiceByCodHotel
}