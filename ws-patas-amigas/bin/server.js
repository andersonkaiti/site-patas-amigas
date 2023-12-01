'use strict';

const app = require("../src/app");
const http = require("http");
const express = require("express");

const server = http.createServer(app);
const port = normalizePort(process.env.PORT || "3306");
server.listen(port, () => {
    console.log(`Ouvindo a porta ${port}.`);
});

function normalizePort(val) {
    const port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}