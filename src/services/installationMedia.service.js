import {InstallationMedia} from "../models/InstallationMedia";
import { getConnection } from "./../database/database";
import { Op } from "sequelize";
import { Installation } from "../models/Installation";
import { City } from "../models/City";
import { Hotel } from "../models/Hotel";



const postAsyncInstallationMedia = async (im) => 
{
    return await InstallationMedia.create(
        {
            IdInstallation:im.IdInstallation,
            Name:im.Name,
            URL:im.URL,
            FileType:im.FileType,
        }
    )
}

const getAsyncInstallationMediaByIdInstallationName = async (idInstallation, name) => 
{
    return await InstallationMedia.findOne(
        {
            attributes: [
                "Id",
                "IdInstallation",
                "Name",
                "URL",
                "FileType"
            ],
            where: {
                [Op.and]: [
                    {
                        IdInstallation: idInstallation
                    },
                    {
                        Name: name
                    }
                ]
            }
        },
    )
}

const getAsyncInstallationMedia = async (Id) => 
{
    return await InstallationMedia.findByPk(
        Id,
        {
            attributes: [
                "Id",
                "Name",
                "Url",
                "FileType"
            ],
            include: {
                model: Installation,
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
                                model:City
                            }
                        ]
                    },
                ]
            }
        }
    );
}

const getAsyncInstallationMediaByIdInstallation = async (idInstallation) => 
{
    return await InstallationMedia.findAll(
        {
            where: {
                [Op.and]: [
                    {
                        IdInstallation: idInstallation
                    },
                    {
                        FileType: 'application/pdf'
                    }
                ]
            },
            attributes: [
                "Id",
                "Name",
                "URL",
                "FileType"
            ],
            include: {
                model: Installation,
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
                    }
                ]
            }
        }
    );
}


export const methods = {
    postAsyncInstallationMedia,
    getAsyncInstallationMediaByIdInstallationName,
    getAsyncInstallationMediaByIdInstallation,
    getAsyncInstallationMedia,

}
