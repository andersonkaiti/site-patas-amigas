'use strict';

const router = require("express").Router();
const petController = require("../controllers/pet-controller");
const multer = require("../../config/multer");
const { uploadImage, updateImage, deleteImage } = require("../../config/firebase");

// tela inicial
router.get("/pets-data", petController.getPetsData);

// exibir os dados de apenas um pet: tela inicial
router.post("/pet-data-filter-id", petController.getPetDataFilterId);

// verificação para entrar na conta e retorno do id do doador
router.get("/doar-pet", petController.verifyToken, petController.doarPet);

// exibir os dados no formulário de edição de dados
router.post("/pet-data-edit", petController.verifyToken, petController.getPetDataEdit);

// exibir os dados dos pets para o usuário específico
router.get("/pets-data-user", petController.verifyToken, petController.getPetsDataUser);

// verifica o token para que o usuário possa registrar o pet
router.post("/register-pet-validation", petController.verifyTokenUser);

// registra o pet e envia a imagem para o firebase
router.post("/register-pet", petController.verifyToken, multer.single("image"), uploadImage, petController.registerPet);

// verifica o token para que o usuário possa atualizar dados do pet
router.post("/update-pet-validation", petController.verifyTokenPetEdit);

// atualiza os dados do pet
router.put("/update-pet", multer.single("image"), petController.verifyToken, updateImage, petController.updatePet);

// deleta o registro do pet
router.post("/delete-pet", petController.verifyToken, deleteImage, petController.deletePet);

module.exports = router;