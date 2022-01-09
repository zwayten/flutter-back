var express = require("express");
const Pay = require("../models/pays");
var router = express.Router();
const multer = require("multer");
const { POINT_CONVERSION_COMPRESSED } = require("constants");

const picsPath = require("path").resolve(__dirname, "../uploads");

router.get("/img/:nom", function(req, res) {
    let nom = req.params.nom;
    const file = picsPath + "/" + nom;
    console.log(file, "hy");
    res.sendFile(file); // Set disposition and send it.
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        var filetype = "";
        var fileExtension = "";
        if (file.mimetype === "image/gif") {
            filetype = "image-";
            fileExtension = "gif";
        }
        if (file.mimetype === "image/png") {
            filetype = "image-";
            fileExtension = "png";
        }
        if (file.mimetype === "image/jpeg") {
            filetype = "image-";
            fileExtension = "jpeg";
        }

        cb(null, filetype + Date.now() + "." + fileExtension);
        h = cb;
    },
});
var upload = multer({
    storage: storage,
});
// download picture to the server


router.post("/file", upload.single("file"), function(req, res, next) {
    if (!req.file) {
        res.status(500);
        return next(err);
    }
    res.json({
        img: req.file.filename,
    });
});

/* GET pays listing. */


router.get("/", async(req, res, next) => {
    try {
        const pays = await Pay.find();
        res.json(pays);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//add Pay

router.post("/add", async(req, res, next) => {
    console.log(req.body);
    const pay = new Pay({
        image: req.body.image,
        country: req.body.country,
        town: req.body.town,
        temperature: req.body.temperature
    });
    try {
        const newPay = await pay.save();

        res.status(201).json({ newPay });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.json({ isemail: true });
        }
    }
});




module.exports = router;