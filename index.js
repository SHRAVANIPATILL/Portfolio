// Import required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';

// Enable CORS for frontend
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Load environment variables
dotenv.config();
app.use(express.json());

// MongoDB URI (use your local MongoDB URI or MongoDB Atlas URI)
const mongoURI = process.env.MONGO_URI; // Change this if you're using a remote DB

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully");
    fetchAndLogProjects(); // Fetch and log projects after successful connection
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Define a schema and model for your collection
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  link: String,
  image: String,
});
const Project = mongoose.model('Project', projectSchema);


// Define a schema for the contact form submission
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);


// API route for form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Save form data to MongoDB
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    res.status(200).json({ message: "Form submitted and data saved to database!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Could not save data. Please try again later." });
  }
});


// API route to fetch projects
app.get('/api/projects', async (req, res) => {
  console.log('Received GET request to /api/projects');
  try {
    const projects = await Project.find();  // Fetch projects from MongoDB
    if (projects.length === 0) {
      console.log('No projects found');
    }
    res.json(projects);  // Send the data as JSON to the frontend
    console.log("Fetched Projects:", projects)
  } catch (err) {
    console.error('Error fetching:', err);
    res.status(500).json({ error: 'Could not fetch projects' });
  }
});


// Function to fetch and log all projects from the database
const fetchAndLogProjects = async () => {
  try {
    const projects = await Project.find(); // Fetch projects from MongoDB
    console.log('Projects fetched:', projects); // Log fetched data to the console
    console.log('Projects count:', projects.length);
  } catch (err) {
    console.error('Error fetching:', err); // Handle errors
  }
};

// Deployment code
const __dirname = path.resolve();

// Serve API routes first, then static files
app.use('/api', express.Router()); // Ensure /api routes are handled first

// Only serve static files if the environment is production
if (process.env.NODE_ENV === "production") {
  // Static file handling after API routes
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  // Catch-all route for any unmatched URLs to serve the static frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
