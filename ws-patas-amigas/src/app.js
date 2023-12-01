'use strict';

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: ["http://patas-amigas.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

const petRouter = require("./routes/pet-router");
const userRouter = require("./routes/user-router");

app.use("/", petRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
    res.status(200).send({
        title: "Patas Amigas API"
    });
});

module.exports = app;