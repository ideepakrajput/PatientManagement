import connection from "../database.js";

export const registerPatient = async (req, res) => {
    const { name, address, email, phone_number, password, photo } = req.body;


    if (address.length < 10) {
        return res.status(400).json({
            status: 400,
            message: `Address should not be less than 10 characters !`,
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 400,
            message: `Please provide a valid email address !`,
        });
    }

    if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({
            status: 400,
            message: `Please provide a valid phone number !`,
        });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            status: 400,
            message: `Password must contain one upper character, one lower character and a number. and has max length 15 and min length 8 !`,
        });
    }

    const sql = `INSERT INTO patients (name, address, email, phone_number, password, photo) VALUES (?)`;
    const values = [name, address, email, phone_number, password, photo];

    connection.query(sql, [values], (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                message: `${err}`,
            });
        }
        return res.status(200).json({
            status: 200,
            message: `Data inserted successfully`,
        });
    });
}