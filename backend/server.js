const express = require("express");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let applications = [
  {
    id: uuidv4(),
    company: "Capital One",
    position: "Associate Software Engineer",
    location: "Plano, TX",
    dateApplied: "2026-06-03",
    status: "Applied",
    notes: "Reached out to recruiter on LinkedIn."
  }
];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/api/applications", (req, res) => {
  res.json(applications);
});

app.post("/api/applications", (req, res) => {
  const newApplication = {
    id: uuidv4(),
    company: req.body.company,
    position: req.body.position,
    location: req.body.location,
    dateApplied: req.body.dateApplied,
    status: req.body.status || "Applied",
    notes: req.body.notes || ""
  };

  applications.push(newApplication);
  res.status(201).json(newApplication);
});

app.put("/api/applications/:id", (req, res) => {
  const { id } = req.params;

  const existingApplication = applications.find((appItem) => appItem.id === id);

  if (!existingApplication) {
    return res.status(404).json({ message: "Application not found" });
  }

  applications = applications.map((appItem) =>
    appItem.id === id ? { ...appItem, ...req.body } : appItem
  );

  const updatedApplication = applications.find((appItem) => appItem.id === id);

  res.json(updatedApplication);
});

app.delete("/api/applications/:id", (req, res) => {
  const { id } = req.params;

  applications = applications.filter((appItem) => appItem.id !== id);

  res.json({ message: "Application deleted" });
});

// Serve React frontend in production
const frontendPath = path.join(__dirname, "public");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});