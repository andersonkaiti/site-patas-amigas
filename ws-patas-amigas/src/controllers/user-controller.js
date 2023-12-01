'use strict';

require("dotenv").config();
const repository = require("../repositories/user-repository");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        res.json({ status: "unauthorized" });
    } else {
        const secret = process.env.SECRET;

        try {
            const decoded = jwt.verify(token, secret);
            req.body.id_doador = decoded.id;
            next();
        } catch(error) {
            if(error.name === "TokenExpiredError") {
                res.json({ status: "unauthorized" });
            } else if(error.name === "JsonWebTokenError") {
                res.json({ status: "unauthorized" });
            } else {
                res.json({ status: "unauthorized" });
            }
        }
    }
};

exports.validation = (req, res) => {
    res.json({
        status: "success"
    });
}

exports.register = async(req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const data = await repository.register(name, email, password, phone, res);
        res.status(201).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.verifyTokenUser = async(req, res) => {
    const token = req.cookies.token;
    if(!token) {
        res.status(401).json({ status: "unauthorized" });
    } else {
        const secret = process.env.SECRET;

        try {
            const { id } = req.body;
            const decoded = jwt.verify(token, secret);
            const data = await repository.verifyTokenUser(decoded.email, id, res);
            res.status(200).json(data);
        } catch(error) {
            if(error.name === "TokenExpiredError") {
                res.json({ status: "unauthorized" });
            } else if(error.name === "JsonWebTokenError") {
                res.json({ status: "unauthorized" });
            } else {
                res.json({ status: "unauthorized" });
            }
        }
    }
}

exports.updateUser = async(req, res) => {
    try {
        const { phone, name, id } = req.body;
        const data = await repository.updateUser(phone, name, id);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const data = await repository.login(email, password, res);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        status: "success"
    })
}

exports.getUserData = async(req, res) => {
    try {
        const { id } = req.body;
        const data = await repository.getUserData(id);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        const { id_doador } = req.body;
        const data = await repository.deleteUser(id_doador);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}