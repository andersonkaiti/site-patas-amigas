'use strict';

const router = require("express").Router();
const userController = require("../controllers/user-controller");
const { deleteUser } = require("../../config/firebase");

// validação
router.get("/validation", userController.verifyToken, userController.validation);

// registra o usuário e criptografa a senha
router.post("/register", userController.register);

// valida o token antes de editar os dados do usuário
router.post("/user-edit-validation", userController.verifyTokenUser);

// atualiza o nome e telefone do usuário
router.put("/update-user", userController.updateUser);

// loga o usuário e retorna um token como cookie
router.post("/login", userController.login);

// solicitação para sair da conta, removendo o cookie com token
router.get("/logout", userController.logout);

// obtém o nome, o email e o telefone do usuário
router.post("/user-data", userController.getUserData);

// delete a conta, incluindo os dados dos pets cadastrados e as imagens do firebase
router.post("/delete-user", userController.verifyToken, deleteUser, userController.deleteUser);

module.exports = router;