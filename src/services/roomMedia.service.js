import { RoomMedia } from "../models/RoomMedia";

const postAsyncRoomMedia = async (media) => {
    return await RoomMedia.create({
        CodRoom: media.CodRoom,
        Name: media.Name,
        FileType: media.FileType,
        URL: media.URL
    });
};

export const methods = {
    postAsyncRoomMedia
};