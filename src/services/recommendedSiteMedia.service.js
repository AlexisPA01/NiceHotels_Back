import { RecommendedSiteMedia } from "../models/RecommendedSiteMedia";

const postAsyncRecommendedSiteMedia = async (media) => {
    return await RecommendedSiteMedia.create({
        IdRecommendedSite: media.IdRecommendedSite,
        Name: media.Name,
        FileType: media.FileType,
        URL: media.URL,
    });
};

export const methods = {
    postAsyncRecommendedSiteMedia
};