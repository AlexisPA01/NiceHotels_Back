import { HotelMedia } from "../models/HotelMedia";

const postAsyncHotelMedia = async (media) => {
    return await HotelMedia.create({
        CodHotel: media.CodHotel,
        Name: media.Name,
        FileType: media.FileType,
        URL: media.URL,
    });
};

export const methods = {
    postAsyncHotelMedia
};