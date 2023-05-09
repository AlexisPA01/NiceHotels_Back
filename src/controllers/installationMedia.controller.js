import response from "./../entities/response";
import { methods as installationMediaService } from "../services/installationMedia.service";

const postInstallationMedia = async (req,res) => {
    try {
        const { IdInstallation, Name, URL, FileType} = req.body;

        if( Name === undefined || IdInstallation === undefined || FileType === undefined)
        { res.status(400).json(new response("Bad request. Please fill all fields.",400,null)); }
        else
        {
            var installationMedia = await installationMediaService.getAsyncInstallationMediaByIdInstallationName(IdInstallation, Name);
            if(!installationMedia)
            {
                await installationMediaService.postAsyncInstallationMedia({
                    IdInstallation,
                    Name,
                    URL,
                    FileType
                });
                res.json(new response("OK Result",200,"Record added."));
            }else{ res.status(400).json(new response("Duplicate record",400,null)); }
        }
    }catch(error)
    {

        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getAsyncInstallationMediaByIdInstallation = async (req, res) => {
    try {
        const {Id} = req.params;
        var installationMedia = await installationMediaService.getAsyncInstallationMediaByIdInstallation(Id);

        if(!installationMedia)
        {
            res.json(new response("Record not found",404,null));
        }else
        {
            res.json(new response("OK Result",200, installationMedia));
        }
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

export const methods = {
    postInstallationMedia,
    getAsyncInstallationMediaByIdInstallation,
}