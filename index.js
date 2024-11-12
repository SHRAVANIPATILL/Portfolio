// Import required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Initialize the app and port
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());

// Load environment variables
dotenv.config();
app.use(express.json());

// MongoDB URI (use your local MongoDB URI or MongoDB Atlas URI)
const mongoURI = process.env.MONGO_URI; // Change this if you're using a remote DB

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    fetchAndLogProjects(); // Fetch and log projects after successful connection
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for your collection
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  link: String,
  image: String,
});

const Project = mongoose.model("Project", projectSchema);

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
}, { timestamps: true });

// Create the Contact model
const Contact = mongoose.model('Contact', contactSchema);

// POST route to handle contact form submissions
app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    const newContact = new Contact({ firstName, lastName, email, phone, message });
    await newContact.save(); // Save to MongoDB
    res.json({ code: 200, message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 500, message: 'Something went wrong, please try again later.' });
  }
});

// API route to fetch projects
app.get("/api/projects", async (req, res) => {
  console.log("Received GET request to /api/projects");
  try {
    const projects = await Project.find(); // Fetch projects from MongoDB
    if (projects.length === 0) {
      console.log("No projects found");
    }
    res.json(projects); // Send the data as JSON to the frontend
    console.log("Fetched Projects:", projects);
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ error: "Could not fetch projects" });
  }
});

// Function to fetch and log all projects from the database
const fetchAndLogProjects = async () => {
  try {
    const projects = await Project.find(); // Fetch projects from MongoDB
    // console.log("Projects fetched:", projects); // Log fetched data to the console
    console.log("Projects count:", projects.length);
  } catch (err) {
    console.error("Error fetching:", err); // Handle errors
  }
};

// Deployment code
const __dirname = path.resolve();

// Serve API routes first, then static files
app.use("/api", express.Router()); // Ensure /api routes are handled first

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
