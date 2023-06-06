import { methods as recommendedSiteService } from "./../services/recommendedSite.service";
import { methods as recommendedSiteMediaService } from "./../services/recommendedSiteMedia.service";
import response from "./../entities/response";

const getRecommendedSites = async (req, res) => {
    try {
        var recommendedSites = await recommendedSiteService.getAsyncRecommendedSites();
        res.json(new response("OK Result", 200,recommendedSites));
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getRecommendedSite = async (req, res) => {
    try {
        const {Id} = req.params;
        var recommendedSite = await recommendedSiteService.getAsyncRecommendedSite(Id);
        if(!recommendedSite)
        {
            res.json(new response("Record not found",404,null));
        }else
        {
            var recommendedSite = recommendedSite;
            res.json(new response("OK Result",200, recommendedSite));
        }
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getRecommendedSitesByCodHotel = async (req, res) => {
    try {
        const {Cod} = req.params;
        var recommendedSites = await recommendedSiteService.getAsyncRecommendedSiteByCodHotel(Cod);
        if(recommendedSites.length <= 0 || !recommendedSites) { res.json(new response("Record not found", 404, null)); }
        else
        {
            res.json(new response("OK Result", 200, recommendedSites));
        }
        
    } catch (error) {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const postRecommendedSite = async (req,res) => {
    try {
        const { CodHotel, Name, Description, Address, IdCity, Ubication} = req.body;

        if( Name === undefined || CodHotel === undefined || Description === undefined || Address === undefined)
        { res.status(400).json(new response("Bad request. Please fill all fields.",400,null)); }
        else
        {
            let  recommendedSiteCheck = await recommendedSiteService.postAsyncRecommendedSite(
                {
                    CodHotel,
                    Name,
                    Description,
                    Address,
                    IdCity,
                    Ubication
                }
            );
            if(recommendedSiteCheck === 'Duplicated')
            {
                res.status(401).json(new response("Duplicate record", 401, null));
            }else{ 
                res.json(new response("OK Result", 200, "Record added."));
            }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const updateRecommendedSite = async (req,res) => {
    try
    {
        const { Id } = req.params;
        const { CodHotel, Name, Description, Address, Ubication} = req.body;

        if( CodHotel == undefined || Id === undefined || Name === undefined ||  Address === undefined )
        { res.status(400).json(new response("Bad request. Please fill all fields.",400,null)); }
        else
        {
                var recommendedSite = await recommendedSiteService.getAsyncRecommendedSite(Id);
                if(recommendedSite) {
                    await recommendedSiteService.updateAsyncRecommendedSite(
                        {
                            Id,
                            Name,
                            Description,
                            Address,
                            Ubication
                        }
                    );
                    res.json(new response("OK Result",200,"Record updated."));
                }
                else { 
                    res.status(404).json(new response("Duplicate record",404,null));
                }

        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const deleteRecommendedSite = async (req,res) => {
    try
    {
        const {Id} = req.params;
        const recommendedSite = await recommendedSiteService.getAsyncRecommendedSite(Id);
        if(!recommendedSite) {
            res.json(new response("Error", 404, "Record not found"));
        }
        else {
            await recommendedSiteService.deleteAsyncRecommendedSite(Id);
            res.json(new response("OK Result", 200, "Delete record"));    
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

export const methods = {
    getRecommendedSites,
    getRecommendedSite,
    getRecommendedSitesByCodHotel,
    updateRecommendedSite,
    deleteRecommendedSite,
    postRecommendedSite,
}