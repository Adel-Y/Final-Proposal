const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

//const User = require('./models/User');
//const router = express.Router();
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const nodeRoutes = require('./routes/nodeRoutes'); // Import the user routes
// const port = 4000;

app.use(cors({
  origin: 'http://localhost:4000', // Specify your React app's origin
  methods: 'GET,POST,PUT,DELETE',  // Specify allowed methods
  credentials: true                // Allow cookies and credentials
}));


//mongoose connection
mongoose.connect('mongodb://localhost:27017/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  app.use(express.json())
  
  app.use('/api', userRoutes);

  // app.use('/test', nodeRoutes);

//regular comment



// CRUD FUNCTIONS TO BE USED
app.get('/', (req, res) => {
  res.json('YA ZAHRAA!');
});

app.get('/two', (req, res) => {
    res.json('Hello World!')
  })

app.post('/three', (req, res) => {
    res.send('Got a POST request')
  })

app.put('/four', (req, res) => {
    res.send('Got a PUT request at /user')
  })

app.delete('/five', (req, res) => {
    res.send('Got a DELETE request at /user')
  })
//


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
