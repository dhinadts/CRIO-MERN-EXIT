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

app.use(cors(
    {
        origin: "http://localhost:3000", // allow React dev server 
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
));
// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        await seedAdmin(); // Seed default admin after DB connection
    })
    .catch(err => console.error(err));




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

console.log("Calendarific Key:", process.env.CALENDARIFIC_KEY);

app.listen(3001, () => console.log("Server running on PORT 3001"));
