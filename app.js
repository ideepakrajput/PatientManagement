import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import PatientRouter from "./routes/patient.js";
import hospitalRouter from "./routes/hospital.js";

const PORT = 8000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/patients/", express.static("upload/images"));
app.use("/api/patient", PatientRouter);
app.use("/api/hospital", hospitalRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "OK Tested !"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
