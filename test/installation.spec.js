import request from 'supertest';
import app from '../src/app';
import { Installation } from '../src/models/Installation';
import { Hotel } from "../src/models/Hotel";
import { City } from "../src/models/City";
import { InstallationMedia } from '../src/models/InstallationMedia';

describe('getAsyncInstallations', () => {
    it('should return an array of installations with the correct fields and relationships', async () => {

        const installations = await Installation.findAll(
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

        // Make request to API endpoint
        const response = await request(app).get('/api/installation');

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining(
                installations.map(installation => ({
                    Id: installation.Id,
                    Name: installation.Name,
                    Description: installation.Description,
                    Schedule: installation.Schedule,
                    DressCode: installation.DressCode,
                    Medias: installation.Medias.map(media => ({
                        Id: media.Id,
                        IdInstallation: media.IdInstallation,
                        Name: media.Name,
                        FileType: media.FileType,
                        URL: media.URL,
                        TypeMedia: media.TypeMedia,
                    }))
                }))
            )
        );
    });
});

describe("getAsyncInstallation", () => {
    it("should return an installation with the specified Id", async () => {

        const installation = await Installation.findByPk(
            1,
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
                                model: City,
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

        const response = await request(app).get('/api/installation/1');

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            {
                Id: installation.Id,
                Name: installation.Name,
                Description: installation.Description,
                Schedule: installation.Schedule,
                DressCode: installation.DressCode,
                Hotel: {
                    Cod: installation.Hotel.Cod,
                    Name: installation.Hotel.Name,
                    Description: installation.Hotel.Description,
                    Ubication: installation.Hotel.Ubication,
                    Address: installation.Hotel.Address,
                    City: {
                        Id: installation.Hotel.City.Id,
                        Name: installation.Hotel.City.Name
                    }
                },
                Medias: installation.Medias.map(media => ({
                    Id: media.Id,
                    IdInstallation: media.IdInstallation,
                    Name: media.Name,
                    FileType: media.FileType,
                    URL: media.URL,
                    TypeMedia: media.TypeMedia,
                }))
            }
        );
    });
});

describe("getAsyncInstallationByCodHotel", () => {
    it("should return a list of installations for the specified hotel Cod", async () => {

        const installations = await Installation.findAll(
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
                where: { CodHotel: 1 }
            },
        )

        const response = await request(app).get("/api/installation/by-cod-hotel/1");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining(
                installations.map(installation => ({
                    Id: installation.Id,
                    Name: installation.Name,
                    Description: installation.Description,
                    Schedule: installation.Schedule,
                    DressCode: installation.DressCode,
                    Medias: installation.Medias.map(media => ({
                        Id: media.Id,
                        IdInstallation: media.IdInstallation,
                        Name: media.Name,
                        FileType: media.FileType,
                        URL: media.URL,
                        TypeMedia: media.TypeMedia,
                    }))
                }))
            )
        );

    });
});


describe('updateAsyncInstallation', () => {
    let installation;
  
    beforeEach(async () => {
        installation = await Installation.create({
        CodHotel: 1,
        Name: 'Test Installation update',
        Description: 'Test description update',
        Schedule: 'lunes a viernes update',
        DressCode: 'vestido update',
      });
    });
  
    afterEach(async () => {
      await installation.destroy();
    });
  
    it('updates a Installation', async () => {
      const updatedInstallation = {
        Id: installation.Id,
        CodHotel: installation.CodHotel,
        Name: 'Test Installation after',
        Description: 'Test description after',
        Schedule: 'lunes a viernes after',
        DressCode: 'vestido',
      };
  
      const response = await request(app)
        .put(`/api/installation/${installation.Id}`)
        .send(updatedInstallation);
  
      expect(response.status).toBe(200);
  
      const installationAfterUpdate = await Installation.findByPk(installation.Id);
  
      expect(installationAfterUpdate.CodHotel).toBe(updatedInstallation.CodHotel);
      expect(installationAfterUpdate.Name).toBe(updatedInstallation.Name);
      expect(installationAfterUpdate.Description).toBe(updatedInstallation.Description);
      expect(installationAfterUpdate.Schedule).toBe(updatedInstallation.Schedule);
      expect(installationAfterUpdate.Ubication).toBe(updatedInstallation.Ubication);
      expect(installationAfterUpdate.DressCode).toBe(updatedInstallation.DressCode);
    });
  
    it('returns a 404 error if the installation does not exist', async () => {
      const updatedInstallation = {
        Id:999,
        CodHotel: installation.CodHotel,
        Name: 'Test Installation asasa',
        Description: 'Test description asasa',
        Schedule: 'lunes a viernes  asasas',
        DressCode: 'vestido asas',
      };
  
      const response = await request(app)
        .put(`/api/installation/${updatedInstallation.Id}`)
        .send(updatedInstallation);
  
      expect(response.status).toBe(404);
    });
  });

  describe('postAsynInstallation', () => {
  
    it('should create a new installation in the database', async () => {
      const mockInstallation = {
        CodHotel: 1,
        Name: 'Test Installation post',
        Description: 'Test description post',
        Schedule: 'lunes a viernes post',
        DressCode: 'vestido post',
      };
  
      const result = await request(app)
      .post(`/api/installation`)
      .send(mockInstallation);
        
      expect(result.body.data).toBe("Record added.");
      expect(result.body.message).toBe("OK Result");
      expect(result.body.status).toBe(200);
    });
  });
  

describe('deleteAsyncInstallation', () => {
    let installationDelete;
  
    beforeAll(async () => {
      // Crear una installation para eliminar en la prueba
      installationDelete = await Installation.create({
        CodHotel: 1,
        Name: 'Test Installation delete',
        Description: 'Test description delete',
        Schedule: 'lunes a viernes delete',
        DressCode: 'vestido delete',
      });
    });
  
    test('should delete a Installation', async () => {
      const response = await request(app).delete(`/api/installation/${installationDelete.Id}`);
      expect(response.status).toBe(200);
  
      // Verificar que el installation ha sido eliminado
      const installation = await Installation.findByPk(installationDelete.Id);
      expect(installation).toBeNull();
    });
  
    afterAll(async () => {
      // Eliminar el installation creado para la prueba
      await Installation.destroy({
        where: { Id: installationDelete.Id },
      });
    });
  });

