import request from 'supertest';
import app from '../src/app';
import { DocumentType } from "../src/models/DocumentType";
import { Guest } from '../src/models/Guest';

describe('getGuest', () => {
    it('should return an Guest with the specified Doc', async () => {
        const guest = await Guest.findOne(
            {
                where: { Document: 1007008009 },
                attributes: [
                    "Id",
                    "Name",
                    "LastName",
                    "Document",
                    "IdDocumentType",
                    "DateBirth",
                    "Gender",
                    "PhoneNumber",
                    "Email"
                ],
                include: [
                    {
                        model: DocumentType
                    }
                ]
            }
        )

        // Realizar la petición GET al endpoint de invitado
        const res = await request(app).get('/api/guest/by-doc/1007008009');

        // Verificar que la respuesta tenga un status 200

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toEqual(
            {
                Id: guest.Id,
                Name: guest.Name,
                LastName: guest.LastName,
                Document: guest.Document,
                IdDocumentType: guest.IdDocumentType,
                DateBirth: guest.DateBirth.toISOString(),
                Gender: guest.Gender,
                PhoneNumber: guest.PhoneNumber,
                Email: guest.Email,
                DocumentType: {
                    Id: guest.DocumentType.Id,
                    Name: guest.DocumentType.Name
                }
            }
        );
    });

    it('returns a 404 if the guest does not exist', async () => {

        const response = await request(app).get('/api/guest/by-doc/');

        expect(response.status).toBe(404);
    });
});