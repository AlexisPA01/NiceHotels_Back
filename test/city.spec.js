import request from 'supertest';
import app from '../src/app';
import { City } from '../src/models/City';

describe('getAsyncCities', () => {
  it('should return all cities with their ids and names', async () => {
    
    const cities = await City.findAll(
        {
            attributes: [
                "Id",
                "Name"
            ],
        }
    );

    // Realizar la petición GET al endpoint de ciudades
    const res = await request(app).get('/api/city');

    // Verificar que la respuesta tenga un status 200
    expect(res.statusCode).toEqual(200);

    // Verificar que la respuesta tenga un array con las ciudades esperadas
    expect(res.body.data).toEqual(
      expect.arrayContaining(
        cities.map(city => ({
          Id: city.Id,
          Name: city.Name,
        }))
      )
    );
  });
});
