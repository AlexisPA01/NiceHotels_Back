import { Op } from "sequelize";
import { RecommendedSite } from "../models/RecommendedSite";
import { Hotel } from "../models/Hotel";
import { City } from "../models/City";
import { RecommendedSiteMedia } from "../models/RecommendedSiteMedia";

import { methods as recommendedSiteMediaService } from "./recommendedSiteMedia.service";

const getAsyncRecommendedSites = async () => 
{
    return await RecommendedSite.findAll(
        {
            attributes: [
                "Id",
                "Name",
                "Description",
                "Address",
                "Ubication"
            ],
            include: {
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
                        model:City,
                    }
                ]
                
            }
        }
    );
}

const getAsyncRecommendedSite = async (Id) => 
{
   return await RecommendedSite.findByPk(
    Id,
    {
        attributes: [
            "Id",
            "Name",
            "Description",
            "Address",
            "Ubication"
        ],
        include: {
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
                    model:City
                }
            ]
            
        }
    }
   );
}

const getAsyncRecommendedSiteByCodHotel = async (codHotel) => 
{
    return await RecommendedSite.findAll(
        {
            where: {CodHotel: codHotel},
            attributes: [
                    "Id",
                    "Name",
                    "Description",
                    "Address",
                    "Ubication"
                ],
                include: [{
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
                            model:City
                        }                    
                    ]
                },{
                model:RecommendedSiteMedia,
                as : 'Medias'    
            }]
        }
    );
}

const getAsyncRecommendedSiteByCodHotelName = async (codHotel,name) => 
{
    return await RecommendedSite.findOne(
        {
            where: {
                [Op.and]: [
                    {
                        CodHotel: codHotel
                    },
                    {
                        Name: name
                    }
                ]
            },
            attributes: [
                "Id",
                "Name",
                "Description",
                "Address",
                "Ubication"
            ],
            include: {
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
                        model:City
                    }                    
                ]
            }
        }
    );
}

const postAsyncRecommendedSite = async (rs) => 
{
    let recommendedSiteCheck = await getAsyncRecommendedSiteByCodHotelName(rs.CodHotel, rs.Name);

    if(!recommendedSiteCheck){
        let rsite = await RecommendedSite.create(
            {
            CodHotel:rs.CodHotel,
            Name:rs.Name,
            Description:rs.Description,
            Address:rs.Address,
            Ubication: rs.Ubication
            }
        );

        await recommendedSiteMediaService.postAsyncRecommendedSiteMedia({
            IdRecommendedSite: rsite.Id,
            Name:"placeholder recommended site media",
            FileType:"png",
            URL:"https://www.infobae.com/new-resizer/dbcnD_OL_e2ND2vT9T_GyAa7IpA=/1200x900/filters:format(webp):quality(85)//arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/L2W3PEXXGVAAPFDVDWCHAC73EM.jpg"
         })
    }else{
        return 'Duplicated';
    }
}

const updateAsyncRecommendedSite = async (rs) => 
{
    return await RecommendedSite.update(
        {
            CodHotel:rs.CodHotel,
            Name:rs.Name,
            Description:rs.Description,
            Address:rs.Address,
            Ubication: rs.Ubication
        },
        {
            where: {Id: rs.Id}
        }
    );
}

const deleteAsyncRecommendedSite = async (id) => 
{
    return await RecommendedSite.destroy(
        {
            where: {Id: id}
        }
    );
}

export const methods = {
    getAsyncRecommendedSites,
    getAsyncRecommendedSite,
    getAsyncRecommendedSiteByCodHotel,
    getAsyncRecommendedSiteByCodHotelName,
    postAsyncRecommendedSite,
    updateAsyncRecommendedSite,
    deleteAsyncRecommendedSite
};