import { methods as guestServices } from "../services/guest.service";
import response from "../entities/response";
import  jwt  from "jsonwebtoken";
import moment from "moment/moment";


const getGuest = async (req, res) => {
    const doc = req.params.Document;

    if(doc == undefined) {
        res.status(400).json(new response ("Bad request. Please fill all fields.", 400, null));
    }
    else {
        const guest = await guestServices.getAsyncGuestByDoc(doc);
        if(!guest) {
            res.json(new response("Guest not found", 404, null));  
        }
        else {
            res.json(new response("OK", 200, guest));
        }
    }
}

//LOGIN
const loginGuest = async (req, res) => {
    try {
        const { Document, RoomNumber, DateBirth } = req.body;
        //validacion de campos

        if( Document == undefined || RoomNumber == undefined || DateBirth == undefined) {
            res.status(400).json(new response ("Bad request. Please fill all fields.", 400, null));
        }
        else {
            const guest = await guestServices.getAsyncGuestByDoc(Document);
            //validar sí existe la cuenta en la base de datos
            if(!guest) {
                res.json(new response("Account not found", 404, null));  
            }
            else {
                const roomNumber = guest.RoomReservated.RoomNumber.Num;

                const dateGuest = moment(guest.DateBirth).format('YYYY-MM-DD');

                if(Document === guest.Document && DateBirth == dateGuest && RoomNumber == roomNumber) {
                     //Generar token
                     const token = jwt.sign(
                        {
                            document: Document,
                            roomNumber: RoomNumber,
                            dateBirth: DateBirth
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: 10800000 //3 hours
                        }
                    );
                    res.json(new response("Account loged", 200, {token, guest}));
                }
                else {
                    res.json(new response("Unauthorized", 401, 'incorrects credentials.'));
                }
            }

        }
    } catch (error) {
        res.json(new response(error.message,500, null));
    }
}

export const methods = {
    loginGuest,
    getGuest
}
