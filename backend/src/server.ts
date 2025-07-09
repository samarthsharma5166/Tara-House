import express, { NextFunction, Request, Response } from "express";
const app = express();
import userRoute from "./routes/user.route"
import productRoute from './routes/product.route'
import { AppError } from "./utils/AppError";
import cors from 'cors'
import categoryRoute from "./routes/category.route";
import cookieParser from "cookie-parser";
import companyRoute from "./routes/company.route";
import{ v2 as cloudinary} from "cloudinary";
import dotenv from 'dotenv'
dotenv.config();
// middleware
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      "https://tara-house.onrender.com",
      "https://tara-house-user.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );


// routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/company", companyRoute);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    status: err.statusCode,
    success: false,
  });
});
export default app;