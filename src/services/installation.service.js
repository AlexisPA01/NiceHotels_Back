import { getConnection } from "./../database/database";
import { Op } from "sequelize";
import { Installation } from "../models/Installation";
import { City } from "../models/City";
import { Hotel } from "../models/Hotel";
import { InstallationMedia } from "../models/InstallationMedia";

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
                model: InstallationMedia,
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

const getAsyncInstallationByCodHotelTypeInstallation = async (codHotel, ) => 
{
    return await Installation.findAll(
        {
            where: {
                CodHotel: codHotel
            },
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
                        "Address",                        
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
        },
            
    );
}

const postAsyncInstallation = async (installation) => 
{
    return await Installation.create(
        {
            CodHotel: installation.CodHotel,
            Name: installation.Name,
            Description: installation.Description,
            Schedule: installation.Schedule,
            DressCode: installation.DressCode
        }  
    )
    
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
    getAsyncInstallationByCodHotelTypeInstallation,
    postAsyncInstallation,
    updateAsyncInstallation,
    deleteAsyncInstallation
};