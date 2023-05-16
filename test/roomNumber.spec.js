import request from 'supertest';
import app from '../src/app';
import { City } from "../src/models/City";
import { Hotel } from "../src/models/Hotel";
import { Room } from "../src/models/Room";
import { RoomNumber } from "../src/models/RoomNumber";

describe('getAsyncRoomNumbers', () => {
    it('should return all room numbers', async () => {
      const rooms = await RoomNumber.findAll(
        {
            attributes: [
                "Id",
                "Num",
                "IsAvailable"
            ],
            include: {
                model: Room,
                attributes: [
                    "Cod",
                    "Name",
                    "Description",
                    "CostNight"
                ]
            }
        }
    );
  
      const res = await request(app).get('/api/room-number');
  
      expect(res.statusCode).toEqual(200);
  
      expect(res.body.data).toEqual(
        expect.arrayContaining(
          rooms.map(room => ({
            Id: room.Id,
            Num: room.Num,
            IsAvailable: room.IsAvailable,
            Room:{
                Cod:room.Room.Cod,
                Name:room.Room.Name,
                Description:room.Room.Description,
                CostNight:room.Room.CostNight
            }
          }))
        )
      );
    });
  
    it('returns a 500 error if there is a error', async () => {
  
      const mockFindAll = jest.spyOn(RoomNumber, 'findAll').mockImplementation(() => {
        throw new Error('Intentional error');
      });
  
      const response = await request(app).get('/api/room-number');
  
      expect(response.status).toBe(500);
  
      mockFindAll.mockRestore();
    });
  });