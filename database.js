import mysql from "mysql";

//mySQL Configuration
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Deepak",
    database: "PatientManagement",
});

//Connect to mySQL
const connect = () => {
    connection.connect((err) => {
        if (err) return console.log("Error connecting to mySQl. " + err);
        console.log("Connected to mySQL.");
    });
};
connect();

//Create a database
const createDatabase = () => {
    const sql = `CREATE DATABASE IF NOT EXISTS PatientManagement`;
    connection.query(sql, (err) => {
        if (err) return console.log(`Error creating database ` + err);
        console.log(`Database created.`);
    });
};
// createDatabase();

//Create Hospital Table
const hospitalTables = () => {
    const sql = `CREATE TABLE IF NOT EXISTS hospitals (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL
        );`;

    connection.query(sql, (err) => {
        if (err) return console.log(`Error creating hospital table ` + err);
        console.log("Hospital Table Created.");
    })
}
hospitalTables();

//Create Psychiatrist Table
const psychiatristTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS psychiatrists (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL,
        hospId INT,
        FOREIGN KEY (hospId) REFERENCES hospitals(id)
        );`;

    connection.query(sql, (err) => {
        if (err) return console.log(`Error creating psychiatrist table ` + err);
        console.log("Psychiatrist Table Created.");
    })
}
psychiatristTable();

//Create Patient table
const patientTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS patients(
        ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        password VARCHAR(15) NOT NULL,
        photo BLOB NOT NULL,
        psyId INT,
        FOREIGN KEY (psyId) REFERENCES psychiatrists(id)
        );`;

    connection.query(sql, (err) => {
        if (err) return console.log(`Error creating patient table ` + err);
        console.log("Patient Table Created.");
    });
};
patientTable();

export default connection;