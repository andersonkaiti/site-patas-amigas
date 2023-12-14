"use strict";

require("dotenv").config();
const db = require("../../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

exports.register = (name, email, password, phone, res) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT * FROM doador
            WHERE email = ?
        `;
    db.query(sql, email, (error, result) => {
      if (result.length == 0) {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            reject(error);
          } else {
            const sql = `
                            INSERT INTO doador
                            (name, email, password, phone)
                            VALUES (?, ?, ?, ?)
                        `;
            db.query(sql, [name, email, hash, phone], (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve({ status: "success" });
              }
            });
          }
        });
      } else {
        res.json({
          status: "error",
        });
      }
    });
  });
};

exports.verifyTokenUser = (email, id, res) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT email
            FROM doador
            WHERE id = ?
        `;
    db.query(sql, id, (error, result) => {
      if (result[0].email == email) {
        resolve({ status: "success" });
      } else {
        res.json({ status: "unauthorized" });
      }
    });
  });
};

exports.updateUser = (phone, name, id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            UPDATE doador
            SET phone = ?, name = ?
            WHERE id = ?
        `;
    db.query(sql, [phone, name, id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          result,
          status: "success",
        });
      }
    });
  });
};

exports.login = (email, password, res) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT * FROM doador
            WHERE email = ?
        `;
    db.query(sql, email, (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.length > 0) {
          const { email, id } = result[0];
          bcrypt.compare(password, result[0].password, (error, result) => {
            if (result) {
              const secret = process.env.SECRET;
              const token = jwt.sign(
                {
                  email,
                  id,
                },
                secret,
                {
                  expiresIn: "1h",
                }
              );
              res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
              });
              resolve({ status: "success" });
            } else {
              res.json({ status: "unauthorized" });
            }
          });
        } else {
          res.json({ status: "unauthorized" });
        }
      }
    });
  });
};

exports.getUserData = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            SELECT name, email, phone
            FROM doador
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

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
            DELETE FROM pet
            WHERE id_doador = ?
        `;
    db.query(sql, id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const sql = `
                    SET FOREIGN_KEY_CHECKS = 0;
                `;
        db.query(sql, (error, result) => {
          if (error) {
            reject(error);
          } else {
            const sql = `
                  DELETE FROM doador
                  WHERE id = ?
                        `;
            db.query(sql, id, (error, result) => {
              const sql = `
                                SET FOREIGN_KEY_CHECKS = 1;
                            `;
              db.query(sql, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ status: "success" });
                }
              });
            });
          }
        });
      }
    });
  });
};
