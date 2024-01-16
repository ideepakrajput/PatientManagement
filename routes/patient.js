import express from "express";
import multer from "multer";
import path from "path";

import { registerPatient } from "../controllers/patient.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})


router.post("/register", upload.single("photo"), registerPatient);

export default router;