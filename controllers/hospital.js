import connection from "../database.js";

export const getHospitalData = async (req, res) => {
    const { id } = req.body;

    if (!id || id.trim() == "") {
        return res.status(400).json({
            status: 400,
            message: `req body doesn't get id !`
        })
    }

    const sql = `SELECT     
    H.name AS HospitalName,     
    COUNT(DISTINCT P.id) AS TotalPsychiatristCount,          
    COUNT(DISTINCT Pt.id) AS TotalPatientsCount,     
    GROUP_CONCAT(DISTINCT "{Id: ",P.id, ", Name: ",P.Name,", PatientCount: ",
    (SELECT
        COUNT(DISTINCT Pt.id) AS PatientCount
    FROM
        psychiatrists P1
    LEFT JOIN
        patients Pt ON P1.id = Pt.psyId
    Where P.hospId = H.id and P1.id = P.id
    GROUP BY
        H.id
    ),"}" SEPARATOR ' , ')  AS PsychiatristDetails 
    FROM     
    hospitals H 
    LEFT JOIN 
    psychiatrists P ON H.id = P.hospId 
    LEFT JOIN     
    patients Pt ON P.id = Pt.psyId 
    WHERE H.id = ?
    GROUP BY     
    H.id;`;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(400).json({
            status: 400,
            message: `${err}`
        })
        if (results.length === 0) {
            return res.status(202).json({
                status: 202,
                message: "Data not found !"
            })
        } else {
            return res.status(200).json(results);
        }
    })
}