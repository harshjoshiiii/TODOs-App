const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Correct route prefix
const userRoutes = require('./routes/userRoute');
app.use('/users', userRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("MongoDB Connection Successful"))
    .catch((error) => console.error("MongoDB Connection Error:", error.message));

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
