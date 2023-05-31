import app from "./app";
import { swaggerDocs } from './routes/swagger'

const main = () =>
{
    app.listen(app.get("port"));
    swaggerDocs(app, app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
    console.log('Backend funcionando correctamente');
};

main();
