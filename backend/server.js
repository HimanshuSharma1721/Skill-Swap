require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const SwapRequest = require("./models/SwapRequest");
const Rating = require("./models/Rating");

const app = express();
app.use(express.json());
const cors = require("cors")
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Skill Swap API Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

/*app.get("/create-user", async (req, res) => {
  const user = new User({
    name: "Himanshu",
    email: "test@gmail.com",
    password: "123456",
    skillsOffered: ["JavaScript"],
    skillsWanted: ["React"]
  });

  await user.save();

  res.send("User created!");
});
*/

const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, skillsOffered, skillsWanted } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      skillsOffered,
      skillsWanted
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

app.post("/login", async (req, res) => {
  try {
    

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ CREATE TOKEN
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" }
    );

    // ✅ SEND TOKEN ALSO
    res.json({
      message: "Login successful 🎉",
      token: token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/profile", authMiddleware, async (req, res) => {
  console.log("TOKEN DATA:", req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/match", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const matches = await User.find({
      _id: { $ne: currentUser._id },

      skillsOffered: { $in: currentUser.skillsWanted },

      skillsWanted: { $in: currentUser.skillsOffered }
    }).select("-password");

    res.json(matches);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  // POST /swap-request — send a swap request
app.post("/swap-request", authMiddleware, async (req, res) => {
  try {
    const { to } = req.body;

    // can't send request to yourself
    if (req.user.id === to) {
      return res.status(400).json({ message: "You can't send a request to yourself" });
    }

    // check if request already exists
    const existing = await SwapRequest.findOne({ from: req.user.id, to });
    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = new SwapRequest({
      from: req.user.id,
      to,
    });

    await request.save();

    res.status(201).json({ message: "Swap request sent! ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /swap-request/:id/accept — accept a swap request
app.put("/swap-request/:id/accept", authMiddleware, async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // only the receiver can accept
    if (request.to.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "accepted";
    await request.save();

    res.json({ message: "Swap request accepted! 🎉" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /swap-request/:id/reject — reject a swap request
app.put("/swap-request/:id/reject", authMiddleware, async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // only the receiver can reject
    if (request.to.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Swap request rejected ❌" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /swap-requests — see all incoming swap requests
app.get("/swap-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await SwapRequest.find({ to: req.user.id })
      .populate("from", "name email skillsOffered skillsWanted")
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT /profile — update your profile
app.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, skillsOffered, skillsWanted } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, skillsOffered, skillsWanted },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated! ✅", user: updatedUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /rate — rate a user after a swap
app.post("/rate", authMiddleware, async (req, res) => {
  try {
    const { to, rating, comment, swapRequestId } = req.body;

    // check if swap request exists and is accepted
    const swapRequest = await SwapRequest.findById(swapRequestId);

    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    if (swapRequest.status !== "accepted") {
      return res.status(400).json({ message: "Can only rate after a swap is accepted" });
    }

    // check if the logged in user is part of this swap
    const isPartOfSwap =
      swapRequest.from.toString() === req.user.id ||
      swapRequest.to.toString() === req.user.id;

    if (!isPartOfSwap) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // check if already rated
    const existingRating = await Rating.findOne({
      from: req.user.id,
      swapRequest: swapRequestId,
    });

    if (existingRating) {
      return res.status(400).json({ message: "You have already rated this swap" });
    }

    const newRating = new Rating({
      from: req.user.id,
      to,
      rating,
      comment,
      swapRequest: swapRequestId,
    });

    await newRating.save();

    res.status(201).json({ message: "Rating submitted! ⭐" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /ratings/:userId — see all ratings of a user
app.get("/ratings/:userId", authMiddleware, async (req, res) => {
  try {
    const ratings = await Rating.find({ to: req.params.userId })
      .populate("from", "name email")
      .sort({ createdAt: -1 });

    // calculate average rating
    const average =
      ratings.length === 0
        ? 0
        : ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    res.json({
      average: average.toFixed(1),
      total: ratings.length,
      ratings,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
