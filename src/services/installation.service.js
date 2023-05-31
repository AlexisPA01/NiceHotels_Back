import { Op } from "sequelize";
import { Installation } from "../models/Installation";
import { City } from "../models/City";
import { Hotel } from "../models/Hotel";
import { InstallationMedia } from "../models/InstallationMedia";

import { methods as installationServiceMedia } from "./installationMedia.service";


const getAsyncInstallations = async () => 
{
    return await Installation.findAll(
        {
            attributes: [
                "Id",
                "Name",
                "Description",
                "Schedule",
                "DressCode"
            ],
            include: [
                {
                    model: InstallationMedia,
                    as: 'Medias'
                }
            ]
        }
    )
}

const getAsyncInstallation = async (Id) => 
{
    return await Installation.findByPk(
        Id,
        {
           attributes: [
            "Id",
            "Name",
            "Description",
            "Schedule",
            "DressCode"
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
                        model:City,
                    }
                ]
            },
            {
                model:InstallationMedia,
                as: 'Medias'
            }
        ] 
    }
    );
}

const getAsyncInstallationByCodHotel = async (codHotel) => 
{
    return await Installation.findAll(
        {
                attributes: [
                    "Id",
                    "Name",
                    "Description",
                    "Schedule",
                    "DressCode"
                ],
                include: [
                    {
                        model: InstallationMedia,
                        as: 'Medias'
                    }
                ],
            where: { CodHotel:  codHotel}
        },
    )
}

const getAsyncInstallationByCodHotelName = async (codHotel, name) => 
{
    return await Installation.findOne(
        {
            attributes: [
                "Id",
                "Name",
                "Description",
                "Schedule",
                "DressCode"
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
                            model:City,
                        }
                    ]
                },
                {
                    model: InstallationMedia,
                    as: 'Medias'
                }
            ],
            where: {
                [Op.and]: [
                    {
                        CodHotel: codHotel
                    },
                    {
                        Name: name
                    },
                ]
            },
        }
    )
}

const postAsyncInstallation = async (installation) => 
{

    let installationCheck = await getAsyncInstallationByCodHotelName(installation.CodHotel,installation.Name);

    if(!installationCheck){
        let i = await Installation.create(
            {
                CodHotel: installation.CodHotel,
                Name: installation.Name,
                Description: installation.Description,
                Schedule: installation.Schedule,
                DressCode: installation.DressCode
            }  
        )

        await installationServiceMedia.postAsyncInstallationMedia({
            IdInstallation:i.Id,
            Name:"placeholder installation media",
            URL:"https://www.eltiempo.com/files/image_640_428/uploads/2022/11/11/636ec9b036dfd.png",
            FileType:"png",
        })

        return i;
    }else{
        return 'Duplicated';
    }
}

const updateAsyncInstallation = async (installation) => 
{
    return await Installation.update(
        {
            CodHotel: installation.CodHotel,
            Name: installation.Name,
            Description: installation.Description,
            Schedule: installation.Schedule,
            DressCode: installation.DressCode
        },
        {
            where: { Id: installation.Id }
        }
    )
}

const deleteAsyncInstallation = async (id) => 
{
    return await Installation.destroy(
        {
            where: {Id: id}
        }
    );
}

export const methods = {
    getAsyncInstallations,
    getAsyncInstallation,
    getAsyncInstallationByCodHotel,
    getAsyncInstallationByCodHotelName,
    postAsyncInstallation,
    updateAsyncInstallation,
    deleteAsyncInstallation
};