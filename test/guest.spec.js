import request from 'supertest';
import app from '../src/app';
import { GuestRoomReservated } from "../src/models/GuestRoomReservated";
import { RoomReservated } from "../src/models/RoomReservated";
import { RoomNumber } from "../src/models/RoomNumber";
import { DocumentType } from "../src/models/DocumentType";
import { City } from "../src/models/City";
import { Guest } from '../src/models/Guest';
import express from 'express';

describe('getGuest', () =>{
    it('should return all guest with their attributes', async () => {
        const guests = await Guest.findAll({
         attributes: ["Cod", "Name", "LastName", "Document", "Gender", "PhoneNumber", "Email", "Address"],
         inclued: [
             {
                 model: City,
             },
             {
                 model: DocumentType
             }
         ],  
        });

        // Realizar la petición GET al endpoint de invitado
        const res = await request(app).get('api/guest');
    
        // Verificar que la respuesta tenga un status 200
       
        expect(res.statusCode).toEqual(200);
        // Verificar que la respuesta tenga un array con las ciudades esperadas
        expect(res.body.data).toEqual(
            expect.arrayContaining(
                guests.map(guest =>({
                    Cod : guest.Cod,
                    Name: guest.Name,
                    LastName: guest.LastName,
                    Document: guest.Document,
                    Gender: guest.Gender,
                    PhoneNumber: guest.PhoneNumber,
                    Email: guest.Email,
                    Address: guest.Address,
                    DocumentType:{
                        Id: guest.DocumentType.Id,
                        Name: guest.DocumentType.Name
                    },
                    City: {
                        Id: hotel.City.Id,
                        Name: hotel.City.Name
                    }
                }))
            )
        );
    });
});

