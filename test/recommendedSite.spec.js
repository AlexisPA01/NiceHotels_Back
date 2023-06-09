import request from 'supertest';
import app from '../src/app';
import { RecommendedSite } from "../src/models/RecommendedSite";
import { Hotel } from "../src/models/Hotel";
import { City } from "../src/models/City";
import { RecommendedSiteMedia } from "../src/models/RecommendedSiteMedia";

import crypto from "crypto";

describe('getAsyncRecommendedSites', () => {
    it('should return an array of RecommendedSites with the correct fields and relationships', async () => {

        const recommendedSites = await RecommendedSite.findAll(
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
                            model: City,
                        }
                    ]

                }
            }
        )

        // Make request to API endpoint
        const response = await request(app).get('/api/recommended-site');

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining(
                recommendedSites.map(recommendedSite => ({
                    Id: recommendedSite.Id,
                    Name: recommendedSite.Name,
                    Description: recommendedSite.Description,
                    Ubication: recommendedSite.Ubication,
                    Address: recommendedSite.Address,
                    Hotel: {
                        Cod: recommendedSite.Hotel.Cod,
                        Name: recommendedSite.Hotel.Name,
                        Description: recommendedSite.Hotel.Description,
                        Ubication: recommendedSite.Hotel.Ubication,
                        Address: recommendedSite.Hotel.Address,
                        City: {
                            Id: recommendedSite.Hotel.City.Id,
                            Name: recommendedSite.Hotel.City.Name
                        }
                    }
                }))
            )
        );
    });

    it('returns a 500 error if there is a error', async () => {

        const mockCityFindAll = jest.spyOn(RecommendedSite, 'findAll').mockImplementation(() => {
            throw new Error('Intentional error');
        });

        const response = await request(app).get('/api/recommended-site');

        expect(response.status).toBe(500);

        mockCityFindAll.mockRestore();
    });
});

describe("getAsyncRecommendedSite", () => {
    it("should return an RecommendedSite with the specified Id", async () => {

        const recommendedSite = await RecommendedSite.findByPk(
            1,
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
                            model: City
                        }
                    ]

                }
            }
        );

        const response = await request(app).get('/api/recommended-site/1');

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            {
                Id: recommendedSite.Id,
                Name: recommendedSite.Name,
                Description: recommendedSite.Description,
                Ubication: recommendedSite.Ubication,
                Address: recommendedSite.Address,
                Hotel: {
                    Cod: recommendedSite.Hotel.Cod,
                    Name: recommendedSite.Hotel.Name,
                    Description: recommendedSite.Hotel.Description,
                    Ubication: recommendedSite.Hotel.Ubication,
                    Address: recommendedSite.Hotel.Address,
                    City: {
                        Id: recommendedSite.Hotel.City.Id,
                        Name: recommendedSite.Hotel.City.Name
                    }
                }
            }
        );
    });

    it('returns a 404 if the hotel does not exist', async () => {

        const response = await request(app).get('/api/recommended-site/2');

        expect(response.body).toEqual({
            data: null,
            message: "Record not found",
            status: 404
        })
    });

    it('returns a 500 error if there is a error', async () => {

        const mockCityFindAll = jest.spyOn(RecommendedSite, 'findByPk').mockImplementation(() => {
            throw new Error('Intentional error');
        });

        const response = await request(app).get('/api/recommended-site/1');

        expect(response.status).toBe(500);

        mockCityFindAll.mockRestore();
    });
});

describe("getAsyncRecommendedSiteByCodHotel", () => {
    it("should return a list of RecommendedSite for the specified hotel Cod", async () => {

        const recommendedSites = await RecommendedSite.findAll(
            {
                where: { CodHotel: 1 },
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
                            model: City
                        }
                    ]
                }, {
                    model: RecommendedSiteMedia,
                    as: 'Medias'
                }]
            }
        )

        const response = await request(app).get("/api/recommended-site/by-cod-hotel/1");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining(
                recommendedSites.map(recommendedSite => ({
                    Id: recommendedSite.Id,
                    Name: recommendedSite.Name,
                    Description: recommendedSite.Description,
                    Ubication: recommendedSite.Ubication,
                    Address: recommendedSite.Address,
                    Hotel: {
                        Cod: recommendedSite.Hotel.Cod,
                        Name: recommendedSite.Hotel.Name,
                        Description: recommendedSite.Hotel.Description,
                        Ubication: recommendedSite.Hotel.Ubication,
                        Address: recommendedSite.Hotel.Address,
                        City: {
                            Id: recommendedSite.Hotel.City.Id,
                            Name: recommendedSite.Hotel.City.Name
                        }
                    },
                    Medias: recommendedSite.Medias.map(media => ({
                        Id: media.Id,
                        IdRecommendedSite: media.IdRecommendedSite,
                        Name: media.Name,
                        FileType: media.FileType,
                        URL: media.URL,
                        TypeMedia: media.TypeMedia,
                    }))
                }))
            )
        );
    });

    it('returns a 404 if the hotel does not exist', async () => {

        const response = await request(app).get('/api/recommended-site/by-cod-hotel/2');

        expect(response.body).toEqual({
            data: null,
            message: "Record not found",
            status: 404
        })
    });

    it('returns a 500 error if there is a error', async () => {

        const mockCityFindAll = jest.spyOn(RecommendedSite, 'findAll').mockImplementation(() => {
            throw new Error('Intentional error');
        });

        const response = await request(app).get('/api/recommended-site/by-cod-hotel');

        expect(response.status).toBe(500);

        mockCityFindAll.mockRestore();
    });
});

describe('updateAsyncRecommendedSite', () => {
    let recommendedSite;

    beforeEach(async () => {
        recommendedSite = await RecommendedSite.create({
            CodHotel: 1,
            Name: 'Test recommendedSite update',
            Description: 'Test description recommendedSite update',
            Address: 'address recommendedSite',
            Ubication: 'ubication recommendedSite',
        });
    });

    afterEach(async () => {
        await recommendedSite.destroy();
    });

    it('updates a recommendedSite', async () => {
        const updatedRecommendedSite = {
            Id: recommendedSite.Id,
            CodHotel: recommendedSite.CodHotel,
            Name: 'Test recommendedSite after',
            Description: 'Test recommendedSite description after',
            Address: 'address recommendedSite',
            Ubication: 'ubication recommendedSite'
        };

        const response = await request(app)
            .put(`/api/recommended-site/${recommendedSite.Id}`)
            .send(updatedRecommendedSite);

        expect(response.status).toBe(200);

        const recommendedSiteAfterUpdate = await RecommendedSite.findByPk(recommendedSite.Id);

        expect(recommendedSiteAfterUpdate.CodHotel).toBe(updatedRecommendedSite.CodHotel);
        expect(recommendedSiteAfterUpdate.Name).toBe(updatedRecommendedSite.Name);
        expect(recommendedSiteAfterUpdate.Description).toBe(updatedRecommendedSite.Description);
        expect(recommendedSiteAfterUpdate.Address).toBe(updatedRecommendedSite.Address);
        expect(recommendedSiteAfterUpdate.Ubication).toBe(updatedRecommendedSite.Ubication);
    });

    it('returns a 404 error if the recommendedSite does not exist', async () => {
        const updatedRecommendedSite = {
            Id: 999,
            CodHotel: recommendedSite.CodHotel,
            Name: 'Test recommendedSite asasas',
            Description: 'Test description recommendedSite asasas',
            Address: 'address recommendedSite asasa',
            Ubication: 'ubication recommendedSite asasas'
        };

        const response = await request(app)
            .put(`/api/recommended-site/${updatedRecommendedSite.Id}`)
            .send(updatedRecommendedSite);

        expect(response.status).toBe(404);
    });

    it('returns a 400 error if there is missing fields', async () => {

        const mockRecommendedSite = {
            Name: 'Test recommendedSite jest after',
            Description: 'Test recommendedSite description after',
            Address: 'address recommendedSite',
            Ubication: 'ubication recommendedSite'
        };

        const response = await request(app)
            .put('/api/recommended-site/3')
            .send(mockRecommendedSite);

        expect(response.status).toBe(400);
    });

    it('returns a 500 error if there is a error', async () => {
        const mock = {
            Id: 999,
            CodHotel: 1,
            Name: 'Test recommendedSite jest asasas',
            Description: 'Test description jest recommendedSite asasas',
            Address: 'address recommendedSite jest asasa',
            Ubication: 'ubication recommendedSite asasas'
        };
        
        const mockCityFindAll = jest.spyOn(RecommendedSite, 'update').mockImplementation(() => {
            throw new Error('Intentional error');
        });

        const response = await request(app)
            .put('/api/recommended-site/3')
            .send(mock);

        expect(response.status).toBe(500);

        mockCityFindAll.mockRestore();
    });
});

describe('postAsynRecommendedsite', () => {

    it('should create a new recommendedSite in the database', async () => {
        const mockRecommendedSite = {
            CodHotel: 1,
            Name: 'Test recommendedSite post '+ +crypto.randomUUID(),
            Description: 'Test description recommendedSite post',
            Address: 'address recommendedSite post',
            Ubication: 'ubication recommendedSite post',
        };

        const result = await request(app)
            .post(`/api/recommended-site`)
            .send(mockRecommendedSite);

        expect(result.body.data).toBe("Record added.");
        expect(result.body.message).toBe("OK Result");
        expect(result.body.status).toBe(200);
    });

    it('returns a 400 error if there is missing fields', async () => {

        const mockRecommendedSite = {
            Name: 'Test recommendedSite jest after',
            Description: 'Test recommendedSite description after',
            Address: 'address recommendedSite',
            Ubication: 'ubication recommendedSite'
        };

        const response = await request(app)
            .post('/api/recommended-site')
            .send(mockRecommendedSite);

        expect(response.status).toBe(400);
    });

    it('returns a 401 error if there is duplicated record', async () => {

        const mockRecommendedSite = {
            CodHotel:3,
            Name: 'Centro Historico',
            Description: 'Test recommendedSite description after',
            Address: 'address recommendedSite',
            Ubication: 'ubication recommendedSite'
        };

        const response = await request(app)
            .post('/api/recommended-site')
            .send(mockRecommendedSite);

        expect(response.status).toBe(401);
    });

    it('returns a 500 error if there is a error', async () => {
        const mock = {
            Id: 999,
            CodHotel: 1,
            Name: 'Test recommendedSite jest asasas',
            Description: 'Test description jest recommendedSite asasas',
            Address: 'address recommendedSite jest asasa',
            Ubication: 'ubication recommendedSite asasas'
        };
        
        const mockCityFindAll = jest.spyOn(RecommendedSite, 'create').mockImplementation(() => {
            throw new Error('Intentional error');
        });

        const response = await request(app)
            .post('/api/recommended-site')
            .send(mock);

        expect(response.status).toBe(500);

        mockCityFindAll.mockRestore();
    });
});


describe('deleteAsyncRecommendedsite', () => {
    let recommendedSiteDelete;

    beforeAll(async () => {
        // Crear una recommendedSite para eliminar en la prueba
        recommendedSiteDelete = await RecommendedSite.create({
            CodHotel: 1,
            Name: 'Test recommendedSite delete',
            Description: 'Test description recommendedSite delete',
            Address: 'address recommendedSite delete',
            Ubication: 'ubication recommendedSite delete',
        });
    });

    test('should delete a recommendedSite', async () => {
        const response = await request(app).delete(`/api/recommended-site/${recommendedSiteDelete.Id}`);
        expect(response.status).toBe(200);

        // Verificar que el recommendedSite ha sido eliminado
        const recommendedSite = await RecommendedSite.findByPk(recommendedSiteDelete.Id);
        expect(recommendedSite).toBeNull();
    });

    afterAll(async () => {
        // Eliminar el recommendedSite creado para la prueba
        await RecommendedSite.destroy({
            where: { Id: recommendedSiteDelete.Id },
        });
    });

    it('returns a 404 error if the recommendedSite does not exist', async () => {
        const response = await request(app).delete(`/api/recommended-site/4`)
    
        expect(response.body).toEqual({
          data: "Record not found",
          message: "Error",
          status: 404
        })
      });

    it('returns a 500 error if there is a error', async () => {
        const mock = jest.spyOn(RecommendedSite, 'destroy').mockImplementation(() => {
          throw new Error('Intentional error');
        });
    
        const response = await request(app)
        .delete('/api/recommended-site/3')
    
        expect(response.status).toBe(500);
    
        mock.mockRestore();
      });
});