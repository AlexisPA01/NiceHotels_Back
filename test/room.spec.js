import request from 'supertest';
import app from '../src/app';
import { Room } from "../src/models/Room";
import { Hotel } from "../src/models/Hotel";
import { City } from "../src/models/City";
import { RoomMedia } from "../src/models/RoomMedia";
import { RoomNumber } from "../src/models/RoomNumber";

describe("getAsyncRoom", () => {
    it("should return an room with the specified Id", async () => {

        const room = await Room.findByPk(1, {
            attributes: ["Cod", "Name", "Description", "CostNight"],
            include: [
                {
                    model: Hotel,
                    attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
                    include: [
                        {
                            model: City,
                        },
                    ],
                },
                {
                    model: RoomMedia,
                    as: 'Medias'
                }
            ],
        });

        const response = await request(app).get('/api/room/1');

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            {
                Cod: room.Cod,
                Name: room.Name,
                Description: room.Description,
                CostNight: room.CostNight,
                Hotel: {
                    Cod: room.Hotel.Cod,
                    Name: room.Hotel.Name,
                    Description: room.Hotel.Description,
                    Ubication: room.Hotel.Ubication,
                    Address: room.Hotel.Address,
                    City: {
                        Id: room.Hotel.City.Id,
                        Name: room.Hotel.City.Name
                    }
                },
                Medias: room.Medias.map(media => ({
                    Id: media.Id,
                    CodRoom: media.CodRoom,
                    Name: media.Name,
                    FileType: media.FileType,
                    URL: media.URL,
                    TypeMedia: media.TypeMedia,
                }))
            }
        );
    });

    it('returns a 404 if the room does not exist', async () => {

        const response = await request(app).get('/api/room/2');
    
        expect(response.body).toEqual({
          data: null,
          message: "Record not found",
          status: 404
        })
      });

    it('returns a 500 error if there is a error', async () => {

        const mockCityFindAll = jest.spyOn(Room, 'findByPk').mockImplementation(() => {
          throw new Error('Intentional error');
        });
    
        const response = await request(app).get('/api/room/1');
    
        expect(response.status).toBe(500);
    
        mockCityFindAll.mockRestore();
      });
});

describe("getAsyncRoomByCodHotel", () => {
    it("should return a list of rooms for the specified hotel Cod", async () => {

        const rooms = await Room.findAll({
            where: { CodHotel: 1 },
            attributes: ["Cod", "Name", "Description", "CostNight"],
            include: [
                {
                    model: Hotel,
                    attributes: ["Cod", "Name", "Description", "Ubication", "Address"],
                    include: [
                        {
                            model: City
                        }
                    ],
                },
                {
                    model: RoomMedia,
                    as: 'Medias'
                }
            ],
        });

        const response = await request(app).get("/api/room/hotel-room/1");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining(
                rooms.map(room => ({
                    Cod: room.Cod,
                    Name: room.Name,
                    Description: room.Description,
                    CostNight: room.CostNight,
                    Hotel: {
                        Cod: room.Hotel.Cod,
                        Name: room.Hotel.Name,
                        Description: room.Hotel.Description,
                        Ubication: room.Hotel.Ubication,
                        Address: room.Hotel.Address,
                        City: {
                            Id: room.Hotel.City.Id,
                            Name: room.Hotel.City.Name
                        }
                    },
                    Medias: room.Medias.map(media => ({
                        Id: media.Id,
                        CodRoom: media.CodRoom,
                        Name: media.Name,
                        FileType: media.FileType,
                        URL: media.URL,
                        TypeMedia: media.TypeMedia,
                    }))
                }))
            )
        );

    });

    it('returns a 500 error if there is a error', async () => {

        const mockCityFindAll = jest.spyOn(Room, 'findAll').mockImplementation(() => {
          throw new Error('Intentional error');
        });
    
        const response = await request(app).get('/api/room/hotel-room/1');
    
        expect(response.status).toBe(500);
    
        mockCityFindAll.mockRestore();
      });
});

describe('updateAsyncRoom', () => {
    let room;

    beforeEach(async () => {
        room = await Room.create({
            CodHotel: 1,
            Name: 'Test Room update',
            Description: 'Test description room update',
            CostNight: 120,
        });
    });

    afterEach(async () => {
        await room.destroy();
    });

    it('updates a Room', async () => {
        const updatedRoom = {
            Cod: room.Cod,
            CodHotel: room.CodHotel,
            Name: 'Test Room after',
            Description: 'Test description room after',
            CostNight: 120,
        };

        const response = await request(app)
            .put(`/api/room/${room.Cod}`)
            .send(updatedRoom);

        expect(response.status).toBe(200);

        const roomAfterUpdate = await Room.findByPk(room.Cod);

        expect(roomAfterUpdate.CodHotel).toBe(updatedRoom.CodHotel);
        expect(roomAfterUpdate.Name).toBe(updatedRoom.Name);
        expect(roomAfterUpdate.Description).toBe(updatedRoom.Description);
        expect(roomAfterUpdate.CostNight).toBe(updatedRoom.CostNight);
    });

    it('returns a 404 error if the room does not exist', async () => {
        const updatedRoom = {
            Cod: 999,
            CodHotel: room.CodHotel,
            Name: 'Test Room asasa',
            Description: 'Test description asasa',
            CostNight: 120
        };

        const response = await request(app)
            .put(`/api/room/${updatedRoom.Cod}`)
            .send(updatedRoom);

        expect(response.status).toBe(404);
    });
});

describe('postAsynRoom', () => {

    it('should create a new room in the database', async () => {
        const mockRoom = {
            CodHotel: 1,
            Name: 'Test room post'+ Math.floor(Math.random() * 10000),
            Description: 'Test description room post',
            CostNight: 120,
        };

        const result = await request(app)
            .post(`/api/room`)
            .send(mockRoom);

        expect(result.body.data).toBe("Record added.");
        expect(result.body.message).toBe("OK Result");
        expect(result.body.status).toBe(200);
    });
});


describe('deleteAsyncRoom', () => {
    let roomDelete;

    beforeAll(async () => {
        // Crear una room para eliminar en la prueba
        roomDelete = await Room.create({
            CodHotel: 1,
            Name: 'Test room delete',
            Description: 'Test description room delete',
            CostNight: 120
        });
    });

    test('should delete a Room', async () => {
        const response = await request(app).delete(`/api/room/${roomDelete.Cod}`);
        expect(response.status).toBe(200);

        // Verificar que el installation ha sido eliminado
        const room = await Room.findByPk(roomDelete.Cod);
        expect(room).toBeNull();
    });

    afterAll(async () => {
        // Eliminar el installation creado para la prueba
        await Room.destroy({
            where: { Cod: roomDelete.Cod },
        });
    });
});

