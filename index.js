require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");

// APP config

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB Config

// app.get("/", (req, res) => res.send("Hello world!")); // For Hosting Test
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build")); // set static folder
  //returning frontend for any route other than api
  // app.get("*", (req, res) => {
  //   res.sendFile(
  //     path.resolve(__dirname, "notifierapp-frontend", "build", "index.html")
  //   );
  // });
}

const DB = process.env.MONGO_DB_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connected!...`);
  })
  .catch((err) => console.log(err));

const doctorAppointment = new mongoose.Schema({
  doctor: String,
  patientName: String,
  patientAge: Number,
  phone: Number,
  patientGender: String,
  appointmentDate: String,
  appointmentTime: String,
});

const Doctor = new mongoose.model("doctorAppointment", doctorAppointment);

//API routes

app.get("/getAllData", (req, res) => {
  Doctor.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      res.send(data);
    }
  });
});

app.post("/book-appointment", async (req, res) => {
  const {
    doctor,
    patientName,
    patientAge,
    phone,
    patientGender,
    appointmentDate,
    appointmentTime,
  } = req.body;

  const newData = new Doctor({
    doctor,
    patientName,
    patientAge,
    phone,
    patientGender,
    appointmentDate,
    appointmentTime,
  });

  await newData.save((err) => {
    if (err) {
      console.log(err);
    }
    Doctor.find({}, (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        res.send(data);
      }
    });
  });
});

app.post("/delete", (req, res) => {
  const { id } = req.body;
  Doctor.findByIdAndDelete(id, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      res.send(data);
    }
  });
});

app.post("/update", (req, res) => {
  const {
    id,
    doctor,
    patientName,
    patientAge,
    phone,
    patientGender,
    appointmentDate,
    appointmentTime,
  } = req.body;
  Doctor.findByIdAndUpdate(
    id,
    {
      doctor,
      patientName,
      patientAge,
      phone,
      patientGender,
      appointmentDate,
      appointmentTime,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        res.send(data);
      }
    }
  );
});
