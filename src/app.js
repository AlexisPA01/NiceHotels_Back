import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";

//Routes
import hotelRoutes from "./routes/hotel.routes";
import roomRoutes from "./routes/room.routes";
import cityRoutes from "./routes/city.routes";
import installationRoutes from "./routes/installation.routes";
import installationMediaRoutes from "./routes/installationMedia.routes";
import productRoutes from "./routes/product.routes";
import roomNumberRoutes from "./routes/roomNumber.routes";
import guestRoutes from "./routes/guest.routes";
import recommendedSiteRoutes from "./routes/recommendedSite.routes";
import reservationRoutes from "./routes/reservation.routes";

const cors = require("cors");
const app = express();

// Settingss
app.set("port", 3000);
//
//Todo el mundo()
app.use(cors()); 
// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/hotel", hotelRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/installation", installationRoutes);
app.use("/api/product", productRoutes);
app.use("/api/room-number", roomNumberRoutes);
app.use("/api/recommended-site", recommendedSiteRoutes);
app.use("/api/installation-media", installationMediaRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/reservation", reservationRoutes);

export default app;
