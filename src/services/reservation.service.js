import { Reservation } from "../models/Reservation";
import crypto from "crypto";

const getAsyncReservations = async () => 
{
    return await Reservation.findAll({});
}

const postAsyncReservation = async (reservation) => {
    return await Reservation.create({
        StartDate: reservation.StartDate,
        EndDate: reservation.EndDate,
        TotalAdults: reservation.TotalAdults,
        TotalKids: reservation.TotalKids,
        TotalBabys: reservation.TotalBabys,
        NumberNights: reservation.NumberNights,
        Total: reservation.Total,
        IdRoom: reservation.IdRoom,
        IdGuest: reservation.IdGuest
    });
};

export const methods = {
    getAsyncReservations,
    postAsyncReservation
};