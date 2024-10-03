const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

//const User = require('./models/User');
//const router = express.Router();
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const nodeRoutes = require('./routes/nodeRoutes'); // Import the node routes
const edgeRoutes = require('./routes/edgeRoutes'); // Import the edge routes
const queryRoutes = require('./routes/queryRoutes'); 
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

  app.use('/test', nodeRoutes);

  app.use('/connect', edgeRoutes);

  app.use('/retrieve', queryRoutes);



  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
