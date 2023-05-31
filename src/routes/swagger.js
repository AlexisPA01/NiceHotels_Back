import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

//import { City } from "./City";

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: 'Crossfit WOD API', version: '1.0.0'},
    },
    components: {
        schemas: {
          Error: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    apis: ["src/routes/installation.routes.js","src/routes/hotel.routes.js"]
    // apis: ['src/routes/city.routes.js','/routes/hotel.routes.js','/routes/room.routes.js',
    // './installation.routes.js','./src/routes/installationMedia.routes.js','/routes/product.routes.js',
    // '/routes/roomNumber.routes.js','/routes/guest.routes.js','/routes/recommendedSite.routes.js']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
    app.use('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    })

    console.log(`Version Docs are available at http://localhost:${port}/api/docs`)
}

module.exports = {swaggerDocs}