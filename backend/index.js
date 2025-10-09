const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const { patientRoute } = require("./route/patientRoute");
const { doctorRoute } = require("./route/doctorRoute");
const { appointmentRoute } = require("./route/appointmentRoute");
const { adminRoute } = require("./route/adminRoute");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Doctor Appointment Booking Backend");
});

app.use("/patients", patientRoute);
app.use("/doctors", doctorRoute);
app.use("/appointments", appointmentRoute);
app.use("/admin", adminRoute);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
