import { Guest } from '../models/Guest';
import { DocumentType } from '../models/DocumentType';

const getAsyncGuestByDoc = async (doc) => {
    return await Guest.findOne(
        {
            where: {Document: doc},
            attributes: [
                "Id",
                "Name",
                "LastName",
                "Document",
                "IdDocumentType",
                "Gender",
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
}

export const methods = {
    getAsyncGuestByDoc,
}