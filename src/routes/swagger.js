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
    apis: [
      "src/routes/installation.routes.js",
      "src/routes/hotel.routes.js",
      "src/routes/room.routes.js",
      "src/routes/recommendedSite.routes.js"
    ]
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