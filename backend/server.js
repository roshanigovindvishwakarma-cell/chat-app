import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// send message
app.post("/send", (req, res) => {
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).json({ error: "Missing data" });
  }

  res.json({
    success: true,
    user,
    message,
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});