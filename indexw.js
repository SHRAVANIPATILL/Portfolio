// Import required modules
import express from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());

dotenv.config();
app.use(express.json());


// Middleware to parse JSON requests
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

// Create a model based on the schema
const Project = mongoose.model('Project', projectSchema);

// Function to fetch and log all projects from the database
const fetchAndLogProjects = async () => {
  try {
    const projects = await Project.find(); // Fetch projects from MongoDB
    console.log('Projects fetched:', projects); // Log fetched data to the console
  } catch (err) {
    console.error('Error fetching :', err); // Handle errors
  }
};

// Deployment code
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

// API route to fetch projects
app.get('/api/projects', async (req, res) => {
  console.log('Received GET request to /api/projects');
  try {
    const projects = await Project.find();  // Fetch projects from MongoDB
    if (projects.length === 0) {
      console.log('No projects found');
    }
    res.json(projects);  // Send the data as JSON to the frontend
    console.log("Fetched Projects:",projects)
  } catch (err) {
    console.error('Error fetching:', err);
    res.status(500).json({ error: 'Could not fetch projects' });
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});