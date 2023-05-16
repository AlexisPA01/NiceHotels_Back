import { City } from "../models/City";
import { Hotel } from "../models/Hotel";
import { Room } from "../models/Room";
import { RoomNumber } from "../models/RoomNumber";

const getAsyncRoomNumber = async (num) => {
    return await RoomNumber.findOne(
        {
            where: { Num: num },
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
                include: [
                    {
                        model: Hotel,
                        attributes: [
                            "Cod",
                            "Name",
                            "Description",
                            "Ubication",
                            "Address"
                        ],
                        include: [
                            {
                                model: City,
                            }
                        ]
                    }
                ],
            }
        }
    );
}

const getAsyncRoomNumbers = async () => {
    return await RoomNumber.findAll(
        {
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
                ]
            }
        }
    );
}

const getAsyncRoomsNumberByRoom = async (codRoom) => {
    return await RoomNumber.findAll(
        {
            where: { CodRoom: codRoom },
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
                include: [
                    {
                        model: Hotel,
                        attributes: [
                            "Cod",
                            "Name",
                            "Description",
                            "Ubication",
                            "Address"
                        ],
                        include: [
                            {
                                model: City,
                            }
                        ]
                    }
                ],
            }
        }
    );
}

const postAsyncRoomNumber = async (roomNumber) => {
    return await RoomNumber.create({
        Num: roomNumber.Num,
        CodRoom: roomNumber.CodRoom,
        IsAvailable: roomNumber.IsAvailable,
    });
}

const updateAsyncRoomNumber = async (roomNumber) => {
    return await RoomNumber.update({
        CodRoom: roomNumber.CodRoom,
        IsAvailable: roomNumber.IsAvailable,
    }
        ,
        {
            where: { Num: roomNumber.Num }
        }
    )
}

const deleteAsyncRoomNumber = async (num) => {
    return await RoomNumber.destroy(
        {
            where: { Num: num }
        }
    );
}

const deleteAsyncRoomNumberByCodRoom = async (Cod) => {
    return await RoomNumber.destroy(
        {
            where: { CodRoom: Cod }
        }
    );
}

export const methods =
{
    getAsyncRoomNumber,
    getAsyncRoomNumbers,
    getAsyncRoomsNumberByRoom,
    postAsyncRoomNumber,
    updateAsyncRoomNumber,
    deleteAsyncRoomNumber,
    deleteAsyncRoomNumberByCodRoom
};