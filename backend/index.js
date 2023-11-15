import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js"
import bookRoute from "./routes/bookRoute.js"
import cors from "cors";

const app = express();

app.use(express.json());


//middleware for handling cors policy
// app.use(cors(
//     //     {
//     //     origin: "http://localhost:3000",
//     //     method: ['GET', 'POST', 'PUT', 'DELETE']
//     // }
// ));

app.use(cors());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("welcome to mern stack");
});

app.use("/books", bookRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    }).catch((err) => {
        console.log(err);
    });


