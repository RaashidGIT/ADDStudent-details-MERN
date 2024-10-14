// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express application
const app = express();

// Set the port for the server
const PORT = 5000;

// Middleware
// Enable CORS for all routes
app.use(cors());
// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  district: String,
});

// Create the Student model based on the schema
const Student = mongoose.model('Student', studentSchema);

// POST endpoint to create a new student
app.post('/students', async (req, res) => {
  // Extract data from the request body
  const { name, age, gender, district } = req.body;

  // Create a new Student object with the extracted data
  const student = new Student({ name, age, gender, district });

  // Try to save the student to the database
  try {
    await student.save();
    res.status(201).json({ message: 'Student added successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add student.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});