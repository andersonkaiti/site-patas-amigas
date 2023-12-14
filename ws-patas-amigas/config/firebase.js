require("dotenv").config();
var admin = require("firebase-admin");

var serviceAccount = require("../firebase-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET
});

if(admin.app().name) {
    console.log("Firebase conectado com sucesso!");
} else {
    console.error("Erro ao se conectar ao Firebase.");
}

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
    const image = req.file;

    // gera um nome para o arquivo com base no tempo em milissegundos e a extensão do arquivo enviado
    const imageName = Date.now() + "." + image.originalname.split(".").pop();

    // gera uma referência do bucket
    const file = bucket.file(`imagens/${req.body.id}/${imageName}`);

    // cria a stream
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype
        }
    });

    stream.on("error", error => {
        console.error(error);
    });

    stream.on("finish", async() => {
        // torna o arquivo público
        await file.makePublic();

        // obtém a URL pública
        req.file.firebaseUrl = `https://storage.googleapis.com/${process.env.BUCKET}/imagens/${req.body.id}/${imageName}`;

        next();
    });

    stream.end(image.buffer);
}

const updateImage = async(req, res, next) => {
    if(!req.file) return next();

    const fileRef = bucket.file(req.body.image_ref);
    try {
        const { id_doador } = req.body;
        await fileRef.delete();

        const image = req.file;
        const imageName = Date.now() + "." + image.originalname.split(".").pop();
        const file = bucket.file(`imagens/${id_doador}/${imageName}`);

        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype
            }
        });

        stream.on("error", error => {
            console.error(error);
        });

        stream.on("finish", async() => {
            await file.makePublic();

            req.file.firebaseUrl = `https://storage.googleapis.com/${process.env.BUCKET}/imagens/${req.body.id}/${imageName}`;

            next();
        });

        stream.end(image.buffer);
    } catch(error) {
        console.error(error);
    }
}

const deleteImage = async(req, res, next) => {
    const fileRef = bucket.file(req.body.image_ref);
    try {
        await fileRef.delete();
        next();
    } catch(error) {
        console.error(error);
    }
}

const deleteUser = async(req, res, next) => {
    const folderPath = `imagens/${req.body.id_doador}`;

    try {
        // listas os arquivos na pasta
        const [files] = await bucket.getFiles({ prefix: folderPath });

        // excluir cada arquivo
        await Promise.all(files.map(file => file.delete()));

        // excluir a própria pasta
        await bucket.deleteFiles({ prefix: folderPath });
        next();
    } catch(error) {
        console.error(error);
    }
}

module.exports = {
    uploadImage,
    updateImage,
    deleteImage,
    deleteUser
};