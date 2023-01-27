const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

exports.listeGet = [
    async function (req, res) {
        try {
            db = await MongoClient.connect(url);
            let dbo = db.db("taches");
            let datas = await dbo.collection("listes").find({user: req.session.user}).toArray();
            res.status(200).json(datas);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err })
        }
    }
];

exports.listePost = [
    async function (req, res, next) {
        let liste = req.body;
        liste.user = req.session.user;
        try {
            db = await MongoClient.connect(url);
            let dbo = db.db("taches");
            let datas = await dbo.collection("listes").find({titre: liste.titre}).toArray();
            if(datas.length === 0) {
                await dbo.collection("listes").insertOne(liste);
            }
            res.status(200).json(liste);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err })
        }
    }
];

exports.listeDelete = [
    async function (req, res, next) {
        try {
            db = await MongoClient.connect(url);
            let dbo = db.db("taches");
            await dbo.collection("listes").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err })
        }
    }
];