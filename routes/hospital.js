import express from "express";
import { getHospitalData } from "../controllers/hospital.js";

const router = express.Router();

router.get("/", getHospitalData);

export default router;