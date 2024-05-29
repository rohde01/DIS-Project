const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const LinechartRouter = require('./routes/linechart');
const TeamListRouter = require('./routes/teamlist');
const CreateCustomer = require('./queries/create-user');

const app = express();

// Use CORS middleware to allow all origins
app.use(cors());

// Middleware
app.use(bodyParser.json());

app.use('/customer', LinechartRouter);
app.use('/team', TeamListRouter);

// Route to handle user creation
app.post('/create-user', async (req, res) => {
    const userData = req.body;
    console.log('Received payload:', userData);

    try {
        const result = await CreateCustomer(userData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

const PORT = process.env.PORT || 3001;  // Changed port here
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
