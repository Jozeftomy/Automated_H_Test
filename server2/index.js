// Import necessary modules
const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const cors = require("cors");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const mongoose = require("mongoose");

// Create Express app
const app = express();
app.use(cors());
app.use(express.json()); // Add JSON middleware

// Create HTTP server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Initialize SerialPort and parser
const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

let sendData = false;

// Trigger data sending
app.get("/test", (req, res) => {
  sendData = true;
  res.send("Data sending is triggered");
});

// Handle incoming data from serial port
parser.on("data", (data) => {
  console.log(data);
  if (sendData) {
    if (data == 8 || data == 4) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });

      sendData = false;
    }
  }
});

// MongoDB connection string
const connectionString =
  "mongodb+srv://josephtomy02:nypTxnJpT33mUMxx@cluster0.q0pzxp5.mongodb.net/automated_h_test?retryWrites=true&w=majority";

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  slotNo: Number,
  status: String,
  result: String,
});

// Create User model
const User = mongoose.model("users", userSchema);

// Connect to MongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Route to get users
app.get("/users", async (req, res) => {
  try {
    const user = await User.find({}).sort({ createdAt: -1 }).limit(1);
    res.json(user);
  } catch (error) {
    console.error("Error retrieving the last created user:", error);
    res.status(500).send(error);
  }
});

// Route to update user status
app.post("/update-status", async (req, res) => {
  try {
    const { status } = req.body;
    // Update user status in the database
    await User.updateOne({}, { status });
    res.status(200).send("Status updated successfully");
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send(error);
  }
});

// Start listening on port
const PORT = 8000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
