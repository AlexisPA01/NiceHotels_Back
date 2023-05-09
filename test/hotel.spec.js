import request from 'supertest';
import app from '../src/app';
import { Hotel } from "../src/models/Hotel";
import { City } from "../src/models/City";
import { HotelMedia } from "../src/models/HotelMedia";

describe('getAsyncHotels', () => {
  it('should return all hotels with their attributes and medias', async () => {
    const hotels = await Hotel.findAll({
      attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
      include: [
         {
            model: City,
         },
         {
            model: HotelMedia,
            as : 'Medias' 
         }
      ],
    });

    const res = await request(app).get('/api/hotel');

    expect(res.statusCode).toEqual(200);

    expect(res.body.data).toEqual(
      expect.arrayContaining(
        hotels.map(hotel => ({
          Cod: hotel.Cod,
          Name: hotel.Name,
          Description: hotel.Description,
          Ubication: hotel.Ubication,
          Address: hotel.Address,
          City: {
            Id: hotel.City.Id,
            Name: hotel.City.Name
          },
          Medias: hotel.Medias.map(media => ({
            Id: media.Id,
            CodHotel: media.CodHotel,
            Name: media.Name,
            FileType: media.FileType,
            URL: media.URL,
          })),
        }))
      )
    );
  });
});

describe('getAsyncHotel', () => {
  it('should return a hotel with its attributes and medias', async () => {
    const hotel = await Hotel.findOne({
      attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
      include: [
         {
            model: City
         },
         {
            model: HotelMedia,
            as : 'Medias' 
         }
      ],
    });

    const res = await request(app).get(`/api/hotel/${hotel.Cod}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual({
      data: {
        Cod: hotel.Cod,
        Name: hotel.Name,
        Description: hotel.Description,
        Ubication: hotel.Ubication,
        Address: hotel.Address,
        City: {
          Id: hotel.City.Id,
          Name: hotel.City.Name
        },
        Medias: hotel.Medias.map(media => ({
            Id: media.Id,
            CodHotel: media.CodHotel,
            Name: media.Name,
            FileType: media.FileType,
            URL: media.URL,
        })),
      },
      "message":"OK Result",
      "status":200
    });

  });
});


describe('updateAsyncHotel', () => {
    let hotel;
  
    beforeEach(async () => {
      hotel = await Hotel.create({
        Name: 'Test Hotel',
        Description: 'Test description',
        IdCity: 1,
        Ubication: 'Test location',
        Address: 'Test address',
      });
    });
  
    afterEach(async () => {
      await hotel.destroy();
    });
  
    it('updates a hotel', async () => {
      const updatedHotel = {
        Cod: hotel.Cod,
        Name: 'Updated Hotel',
        Description: 'Updated description',
        IdCity: 2,
        Ubication: 'Updated location',
        Address: 'Updated address',
      };
  
      const response = await request(app)
        .put(`/api/hotel/${hotel.Cod}`)
        .send(updatedHotel);
  
      expect(response.status).toBe(200);
  
      const hotelAfterUpdate = await Hotel.findByPk(hotel.Cod);
  
      expect(hotelAfterUpdate.Name).toBe(updatedHotel.Name);
      expect(hotelAfterUpdate.Description).toBe(updatedHotel.Description);
      expect(hotelAfterUpdate.IdCity).toBe(updatedHotel.IdCity);
      expect(hotelAfterUpdate.Ubication).toBe(updatedHotel.Ubication);
      expect(hotelAfterUpdate.Address).toBe(updatedHotel.Address);
    });
  
    it('returns a 404 error if the hotel does not exist', async () => {
      const updatedHotel = {
        Cod: 999,
        Name: 'Updated Hotel',
        Description: 'Updated description',
        IdCity: 2,
        Ubication: 'Updated location',
        Address: 'Updated address',
      };
  
      const response = await request(app)
        .put(`/api/hotel/${updatedHotel.Cod}`)
        .send(updatedHotel);
  
      expect(response.status).toBe(404);
    });
  });

  describe('postAsyncHotel', () => {
  
    it('should create a new hotel in the database', async () => {
      const mockHotel = {
        Name: 'Hotel Test',
        Description: 'Descripción del hotel test',
        IdCity: 1,
        Ubication: 'Ubicación del hotel test',
        Address: 'Dirección del hotel test',
      };
  
      const result = await request(app)
      .post(`/api/hotel`)
      .send(mockHotel);
        
      expect(result.body.data).toBe("Record added.");
      expect(result.body.message).toBe("OK Result");
      expect(result.body.status).toBe(200);
    });
  });
  

describe('deleteAsyncHotel', () => {
    let hotelToDelete;
  
    beforeAll(async () => {
      // Crear un hotel para eliminar en la prueba
      hotelToDelete = await Hotel.create({
        Name: 'Hotel para eliminar',
        Description: 'Descripción del hotel para eliminar',
        IdCity: 1,
        Ubication: 'Ubicación del hotel para eliminar',
        Address: 'Dirección del hotel para eliminar',
      });
    });
  
    test('should delete a hotel', async () => {
      const response = await request(app).delete(`/api/hotel/${hotelToDelete.Cod}`);
      expect(response.status).toBe(200);
  
      // Verificar que el hotel ha sido eliminado
      const hotel = await Hotel.findByPk(hotelToDelete.Cod);
      expect(hotel).toBeNull();
    });
  
    afterAll(async () => {
      // Eliminar el hotel creado para la prueba
      await Hotel.destroy({
        where: { Cod: hotelToDelete.Cod },
      });
    });
  });
