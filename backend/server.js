const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const seedAdmin = require('./config/defaultAdmin');

dotenv.config();
const app = express();
app.use(express.json());

const allowedOrigins = [
    "https://crio-mern-xexit.onrender.com",
    "https://crio-mern-xexit.vercel.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// DB connection
mongoose.connect("mongodb+srv://dhinadts:Qwerty%40123@cluster0.g8vjqco.mongodb.net/resignationDB?appName=Cluster0")
    .then(async () => {
        console.log("MongoDB Connected");
        await seedAdmin(); // Seed default admin after DB connection
    })
    .catch(err => console.error(err));




// Routes
app.use('/api/auth', verifyToken, authRoutes);
app.use('/api/user', verifyToken, userRoutes);
app.use('/api/admin', verifyToken, adminRoutes);

console.log("Calendarific Key:", process.env.CALENDARIFIC_KEY);

app.listen(3001, () => console.log("Server running on PORT 3001"));
