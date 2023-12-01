"use strict";

require("dotenv").config();
const db = require("../../config/database");

exports.getPetsData = () => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT * FROM pet
        `;
    db.query(sql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getPetDataEdit = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT * FROM pet
            WHERE id = ?
        `;
    db.query(sql, id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getPetsDataUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT * FROM pet
            WHERE id_doador = ?
        `;
    db.query(sql, id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getPetDataFilterId = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT
            pet.id, doador.name, pet.pet_name,
            doador.email, doador.phone, pet.race,
            pet.description, pet.url
            FROM doador
            INNER JOIN pet
            ON doador.id = pet.id_doador
            WHERE pet.id = ?
        `;
    db.query(sql, id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.verifyTokenUser = (email, id, id_doador, res) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT email
            FROM doador
            WHERE id = ?
        `;
    db.query(sql, id || id_doador, (error, result) => {
      if (result.length === 0 || result[0].email === undefined) {
        res.json({ status: "unauthorized" });
      } else {
        if (result[0].email === email) {
          resolve({ status: "success" });
        } else {
          res.json({ status: "unauthorized" });
        }
      }
    });
  });
};

exports.registerPet = (url, name, race, description, id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            INSERT INTO pet
            (url, pet_name, race, description, id_doador)
            VALUES (?, ?, ?, ?, ?)
        `;
    db.query(sql, [url, name, race, description, id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ status: "success" });
      }
    });
  });
};

exports.verifyTokenPetEdit = (email, id, res) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT doador.email
            FROM pet
            INNER JOIN doador
            ON pet.id_doador = doador.id
            WHERE pet.id = ?
        `;
    db.query(sql, id, (error, result) => {
      if (result.length === 0 || result[0].email === undefined) {
        res.json({ status: "unauthorized" });
      } else {
        if (result[0].email === email) {
          resolve({ status: "success" });
        } else {
          res.json({ status: "unauthorized" });
        }
      }
    });
  });
};

exports.updatePet = (name, race, description, id, req) => {
  return new Promise((resolve, reject) => {
    if (!req.file) {
      const sql = `
                UPDATE pet SET
                pet_name = ?,
                race = ?,
                description = ?
                WHERE id = ?
            `;
      db.query(sql, [name, race, description, id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ status: "success" });
        }
      });
    } else {
      const sql = `
                UPDATE pet SET
                pet_name = ?,
                race = ?,
                description = ?,
                url = ?
                WHERE id = ?
            `;
      db.query(
        sql,
        [name, race, description, req.file.firebaseUrl, id],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({ status: "success" });
          }
        }
      );
    }
  });
};

exports.deletePet = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            DELETE FROM pet
            WHERE id = ?
        `;
    db.query(sql, id, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ status: "success" });
      }
    });
  });
};
