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
  patientName: String,
  patientAge: Number,
  patientGender: String,
  appointmentDate: String,
  appointmentTime: String,
});

const Doctor = new mongoose.model("doctorAppointment", doctorAppointment);

//API routes

app.get("/getAllReminder", (req, res) => {
  Doctor.find({}, (err, reminderList) => {
    if (err) {
      console.log(err);
    }
    if (reminderList) {
      res.send(reminderList);
    }
  });
});

app.post("/addReminder", (req, res) => {
  const { reminderMsg, remindAt } = req.body;
  const reminder = new Reminder({
    reminderMsg,
    remindAt,
    isReminded: false,
  });
  Doctor.save((err) => {
    if (err) {
      console.log(err);
    }
    Reminder.find({}, (err, reminderList) => {
      if (err) {
        console.log(err);
      }
      if (reminderList) {
        res.send(reminderList);
      }
    });
  });
});

app.post("/deleteReminder", (req, res) => {
  Doctor.deleteOne({ _id: req.body.id }, () => {
    Reminder.find({}, (err, reminderList) => {
      if (err) {
        console.log(err);
      }
      if (reminderList) {
        res.send(reminderList);
      }
    });
  });
});
