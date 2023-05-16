import request from 'supertest';
import app from '../src/app';
import { InstallationMedia } from "../src/models/InstallationMedia";
import { Op } from "sequelize";

describe("getAsyncInstallationMedia", () => {
    it("should return all installation media with the specified Id", async () => {

        const installationMedias = await InstallationMedia.findAll(
            {
                where: {
                    [Op.and]: [
                        {
                            IdInstallation: 1
                        },
                        {
                            FileType: 'application/pdf'
                        }
                    ]
                },
                attributes: [
                    "Id",
                    "Name",
                    "URL",
                    "FileType"
                ]
            }
        );

        const response = await request(app).get('/api/installation-media/by-id-installation/1');

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining(
                installationMedias.map(installationMedia => ({
                    Id: installationMedia.Id,
                    Name: installationMedia.Name,
                    URL: installationMedia.URL,
                    FileType: installationMedia.FileType
                })
                ))
        );
    });

    it('returns a 404 if the installation media does not exist', async () => {
        const response = await request(app).get('/api/installation-media/by-id-installation/4');

        expect(response.body).toEqual({
            data: null,
            message: "Record not found",
            status: 404
        })
    });

    it('returns a 500 error if there is a error', async () => {
        const mockCityFindAll = jest.spyOn(InstallationMedia, 'findAll').mockImplementation(() => {
            throw new Error('Intentional error');
        });

        const response = await request(app).get('/api/installation-media/by-id-installation/1');

        expect(response.status).toBe(500);

        mockCityFindAll.mockRestore();
    });
});