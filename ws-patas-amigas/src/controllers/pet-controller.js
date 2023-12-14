"use strict";

require("dotenv").config();
const db = require("../../config/database");
const repository = require("../repositories/pet-repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ status: "unauthorized" });
  } else {
    const secret = process.env.SECRET;

    try {
      const decoded = jwt.verify(token, secret);
      req.body.id_doador = decoded.id;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.json({ status: "unauthorized" });
      } else if (error.name === "JsonWebTokenError") {
        res.json({ status: "unauthorized" });
      } else {
        res.json({ status: "unauthorized" });
      }
    }
  }
};

exports.getPetsData = async (req, res) => {
  try {
    const data = await repository.getPetsData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPetDataEdit = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await repository.getPetDataEdit(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.doarPet = (req, res) => {
  res.json({
    status: "success",
    id_doador: req.body.id_doador,
  });
};

exports.getPetsDataUser = async (req, res) => {
  try {
    const { id_doador } = req.body;
    const data = await repository.getPetsDataUser(id_doador);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPetDataFilterId = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await repository.getPetDataFilterId(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.verifyTokenUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ status: "unauthorized" });
  } else {
    const secret = process.env.SECRET;

    try {
      const { id } = req.body;
      const decoded = jwt.verify(token, secret);
      const id_doador = decoded.id;
      const data = await repository.verifyTokenUser(
        decoded.email,
        id,
        id_doador,
        res
      );
      res.status(202).json(data);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.json({ status: "unauthorized" });
      } else if (error.name === "JsonWebTokenError") {
        res.json({ status: "unauthorized" });
      } else {
        res.json({ status: "unauthorized" });
      }
    }
  }
};

exports.registerPet = async (req, res) => {
  try {
    const { name, race, description, id } = req.body;
    const { firebaseUrl } = req.file;
    const data = await repository.registerPet(
      firebaseUrl,
      name,
      race,
      description,
      id
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.verifyTokenPetEdit = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ status: "unauthorized" });
  } else {
    const secret = process.env.SECRET;

    try {
      const { id, race } = req.body;
      const decoded = jwt.verify(token, secret);
      const data = await repository.verifyTokenPetEdit(decoded.email, id, res);
      res.status(202).json(data);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.json({ status: "unauthorized" });
      } else if (error.name === "JsonWebTokenError") {
        res.json({ status: "unauthorized" });
      } else {
        res.json({ status: "unauthorized" });
      }
    }
  }
};

exports.updatePet = async (req, res) => {
  try {
    const { name, race, description, id } = req.body;
    const data = await repository.updatePet(name, race, description, id, req);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await repository.deletePet(id, res);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
