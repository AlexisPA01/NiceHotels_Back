import response from "./../entities/response";
import { methods as installationMediaService } from "../services/installationMedia.service";

const getAsyncInstallationMediaByIdInstallation = async (req, res) => {
    try {
        //Menus
        const {Id} = req.params;
        
        let installationMedia = await installationMediaService.getAsyncInstallationMediaByIdInstallation(Id);

        if(installationMedia.length === 0)
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
    getAsyncInstallationMediaByIdInstallation
}