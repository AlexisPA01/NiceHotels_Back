import app from "./app";
import { swaggerDocs } from './routes/swagger'
import config from "./config";

const main = () =>
{
    app.listen(app.get("port"));
    swaggerDocs(app, app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
    console.log('Backend funcionando correctamente');
    console.log(config.database)
    console.log(config.host)
    console.log(config.password)
    console.log(config.user)
};

main();
