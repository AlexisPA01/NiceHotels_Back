import { methods as reservationService } from "../services/reservation.service";
import response from "../entities/response";

const getAsyncReservations = async (req,res) => 
{
    try
    {
        var cities = await reservationService.getAsyncReservations();
        res.json(new response("OK Result",200,cities));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}


const postAsyncReservation = async (req,res) => {
    try {
        const { StartDate , EndDate, TotalAdults, TotalKids, TotalBabys, NumberNights, Total, IdRoom, IdGuest } = req.body;

        if( StartDate === undefined || EndDate === undefined || TotalAdults === undefined || TotalKids === undefined
            || TotalBabys === undefined || NumberNights === undefined || Total === undefined || IdRoom === undefined || IdGuest === undefined )
        { res.status(400).json(new response("Bad request. Please fill all fields.",400,null)); }
        else
        {
            await reservationService.postAsyncReservation(
                {
                    StartDate, 
                    EndDate, 
                    TotalAdults, 
                    TotalKids, 
                    TotalBabys, 
                    NumberNights, 
                    Total,
                    IdRoom,
                    IdGuest
                }
            );

            res.json(new response("OK Result",200,"Record added."));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}


export const methods = 
{
    getAsyncReservations,
    postAsyncReservation
}