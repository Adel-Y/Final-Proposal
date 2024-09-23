// routes/userRoutes.js
console.log('I entered')
const express = require('express');
const Edge = require('../models/Edge');
const router = express.Router();

// POST route to create a new user
router.post('/edges', async (req, res) => {
  try {
    const edge = new Edge(req.body);
    await edge.save();
    res.status(201).json(edge);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// GET route to fetch all users
router.get('/edges', async (req, res) => {
  try {
    const edges = await Edge.find();
    res.send(edges);
  } catch (err) {
    res.status(500).send(err.message);
  }
});




// POST route to fetch a single user by ID
router.get('/oneEdge/:id', async (req, res) => {
  console.log(req.params)
  try {
    const edge = await Edge.findOne({"id":req.params.id});
    if (!edge) {
      return res.status(404).send('edge not found');
    }
    res.send(edge);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT route to update a user by ID
router.put('/edges/:id', async (req, res) => {
  try {
    // edge.deleteOne({"id":req.params.id})
    const edge = await Edge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!edge) {
      return res.status(404).send('User not found');
    }
    res.send(edge);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.put('/edges/data/:id', async (req, res) => {
  //console.log(req.body)

  const {id,data}=req.body[0]


  console.log(id,data);
  try {

    // edge.deleteOne({"id":req.params.id})
    const edge = await Edge.updateOne({"id":req.params.id},{$set:{'data':req.body[0].data}}, {
      new: true,
      runValidators: true,
    });
    if (!edge) {
      return res.status(404).send('User not found');
    }
    res.send(edge);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.put('/edges/position/:id', async (req, res) => {
  // console.log(req.body)
  try {

    // edge.deleteOne({"id":req.params.id})
    const edge = await Edge.updateOne({"id":req.params.id}, {$set:{'position':req.body[0].position}}, {
      new: true,
      runValidators: true,
    });
    if (!edge) {
      return res.status(404).send('User not found');
    }
    res.send(edge);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// DELETE route to remove a user by ID
router.delete('/edges/:id', async (req, res) => {
  try {
    const edge = await Edge.deleteOne({"id":req.params.id});
    if (!edge) {
      return res.status(404).send('User not found');
    }
    res.send(edge);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
