// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./src/routes/index');

dotenv.config();



// Middleware
// app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api", router)



mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Appartment Server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message));




// app.get('/', (req, res) => {
//   res.send('Backend is running!');
// });

// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
