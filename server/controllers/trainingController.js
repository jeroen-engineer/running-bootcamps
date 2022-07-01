import asyncHandler from "express-async-handler";
import Training from "../models/trainingModel.js";

// @desc    Fetch all trainings
// @route   GET /api/trainings
// @access  Public
const getTrainings = asyncHandler(async (req, res) => {
  const filter = {};
  const trainings = await Training.find(filter);

  res.status(200).json(trainings);
});

// @desc    Fetch single training
// @route   GET /api/trainings/:id
// @access  Public
const getTrainingById = asyncHandler(async (req, res) => {
  const training = await Training.findById(req.params.id);

  if (training) {
    res.json(training);
  } else {
    res.status(404);
    throw new Error("Training not found");
  }
});

// @desc    Delete a training
// @route   DELETE /api/trainings/:id
// @access  Private/Admin
const deleteTraining = asyncHandler(async (req, res) => {
  const training = await Training.findById(req.params.id);

  if (training) {
    await training.remove();
    res.json({ message: "Training removed" });
  } else {
    res.status(404);
    throw new Error("Training not found");
  }
});

// @desc    Create a training
// @route   POST /api/trainings
// @access  Private/Admin
const createTraining = asyncHandler(async (req, res) => {
  const training = new Training({
    user: req.body.user,
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    trainer: req.body.trainer,
    price: req.body.price,
    maxRunners: req.body.maxRunners,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
  });

  const createdTraining = await training.save();
  res.status(201).json(createdTraining);
});

// @desc    Update a training
// @route   PUT /api/trainings/:id
// @access  Private/Admin

const updateTraining = asyncHandler(async (req, res) => {
  const {
    title,
    user,
    category,
    description,
    trainer,
    price,
    maxRunners,
    location,
    date,
    time,
  } = req.body;

  const training = await Training.findById(req.params.id);

  if (training) {
    training.user = user;
    training.title = title;
    training.category = category;
    training.description = description;
    training.trainer = trainer;
    training.price = price;
    training.maxRunners = maxRunners;
    training.location = location;
    training.date = date;
    training.time = time;

    const updatedTraining = await training.save();
    res.json(updatedTraining);
  } else {
    res.status(404);
    throw new Error("Training not found");
  }
});

// @desc    Reserve spot in training
// @route   POST /api/products/:id/reviews
// @access  Private
const reserveSpotInTraining = asyncHandler(async (req, res) => {
  const training = await Training.findById(req.params.id);

  if (training) {
    const alreadyReserved = training.participants.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReserved) {
      res.status(400);
      throw new Error("You already reserved your spot");
    }

    const reserve = {
      name: req.user.name,
      user: req.user._id,
    };

    training.participants.push(reserve);

    training.numParticipants = training.participants.length;

    await training.save();
    res.status(201).json({ message: "You reserved a spot, thank you!" });
  } else {
    res.status(404);
    throw new Error("Training not found");
  }
});

export {
  getTrainings,
  getTrainingById,
  deleteTraining,
  createTraining,
  updateTraining,
  reserveSpotInTraining,
};
