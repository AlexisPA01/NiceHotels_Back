import { methods as installationService } from "./../services/installation.service";
import response from "./../entities/response";

const getInstallations = async (req, res) => {
    try {
        var installations = await installationService.getAsyncInstallations();
        res.json(new response("OK Result", 200,installations));
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getInstallation = async (req, res) => {
    try {
        const {Id} = req.params;
        var installation = await installationService.getAsyncInstallation(Id);
        if(!installation)
        {
            res.json(new response("Record not found",404,null));
        }else
        {
            res.json(new response("OK Result", 200, installation));
        }
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getInstallationsByCodHotel = async (req, res) => {
    try {
        const {CodHotel} = req.params;
        var installations = await installationService.getAsyncInstallationByCodHotel(CodHotel);
        console.log(installations);
        if(installations.length <= 0) { 
            res.json(new response("Record not found",404,null)); 
        }
        else
        {
            res.json(new response("OK Result", 200, installations));
        }
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getInstallationsByCodHotelTypeInstallation = async (req, res) => {
    try {
        const {CodHotel, TypeInstallation} = req.params;
        
        var installations = await installationService.getAsyncInstallationByCodHotelTypeInstallation(CodHotel,TypeInstallation);

        if(installations.length === 0) { res.json(new response("Record not found",404,null)); }
        else
        {
            res.json(new response("OK Result", 200, installations));
        }
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getRoomServiceByHotelCod = async (req, res) => {
    try {
        const {CodHotel} = req.params;
        var installation = await installationService.getAsyncInstallationByCodHotelTypeInstallation(CodHotel,2);
        if(!installation) {
            await installationService.postAsyncInstallation(
                {
                    CodHotel: CodHotel,
                    IdInstallationType: 2,
                    Name: 'servicio al cuarto'
                }
            );
            res.json(new response("OK Result", 200, "Record added."));
        }
        res.json(new response("OK Result", 200, installation));
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const postInstallation = async (req,res) => {
    try {
        const { CodHotel, IdInstallationType , Name, Description, Schedule, DressCode} = req.body;

        if( Name === undefined || CodHotel === undefined || Schedule === undefined || DressCode === undefined)
        { res.status(400).json(new response("Bad request. Please fill all fields.",400,null)); }
        else
        {
            var installation = await installationService.getAsyncInstallationByCodHotelName(CodHotel,Name);
            if(!installation)
            {
                var i = await installationService.postAsyncInstallation(
                    {
                        Name,
                        CodHotel,
                        IdInstallationType,
                        Description,
                        Schedule,
                        DressCode
                    }
                );
                
                res.json(new response("OK Result",200,i));
            }
            else
            { res.status(400).json(new response("Duplicate record",400,null)); }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const updateInstallation = async (req,res) => {
    try
    {
        const { Id } = req.params;
        const { CodHotel, IdInstallationType ,Name, Description, Schedule, DressCode} = req.body;

        if( Id === undefined || Name === undefined ||  Schedule === undefined ||  DressCode === undefined)
        { res.status(400).json(new response("Bad request. Please fill all fields.",400,null)); }
        else
        {
                var installation = await installationService.getAsyncInstallation(Id);
                if(installation)
                {
                    await installationService.updateAsyncInstallation({
                        CodHotel,
                        IdInstallationType,
                        Name,
                        Description,
                        Schedule,
                        DressCode,
                        Id
                    });
                    res.json(new response("OK Result",200,"Record updated."));

                }
                else { res.status(404).json(new response("Record not found",404,null));}

        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const deleteInstallation = async (req,res) => {
    try
    {
        const {Id} = req.params;
        const installation = await installationService.getAsyncInstallation(Id);
        if(!installation) {
            res.json(new response("Error", 404, "Record not found"));
        }
        else {
            await installationService.deleteAsyncInstallation(Id);
            //--- Falta borrado en cascada
            res.json(new response("OK Result",200,"Delete record"));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

export const methods = {
    getInstallations,
    getInstallation,
    getInstallationsByCodHotel,
    getInstallationsByCodHotelTypeInstallation,
    getRoomServiceByHotelCod,
    updateInstallation,
    deleteInstallation,
    postInstallation,
}