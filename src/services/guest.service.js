import { Guest } from '../models/Guest';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import { RoomNumber } from '../models/RoomNumber';
import { RoomReservated } from '../models/RoomReservated';

const getAsyncGuestByDoc = async (doc) => {
    console.log(doc);
    return await Guest.findOne(
        {
            where: {Document: doc},
            attributes: [
                "Id",
                "Name",
                "LastName",
                "Document",
                "DocumentType",
                "DateBirth",
                "Gender",
                "PhoneNumber",
                "Email"                
            ],
            include: [
                {
                    model: RoomReservated,
                    attributes: [
                        "Id",
                        "NumberAdults",
                        "NumberKids",
                        "NumberBabys"
                    ],
                    include: {
                        model: RoomNumber,
                        attributes: [
                            "Id",
                            "Num",
                            "IsAvailable"
                        ],
                        include: {
                            model: Room,
                            attributes: [
                                "Cod",
                                "Name",
                                "Description",
                                "CostNight"
                            ],
                            include: {
                                model: Hotel
                            }
                        }
                    }
                }
            ]
        }
    )
}

export const methods = {
    getAsyncGuestByDoc,
}