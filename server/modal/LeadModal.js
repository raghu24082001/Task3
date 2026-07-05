import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    trim: true,
    default: "",
  },
  courseInterested: {
    type: String,
    trim: true,
    default: "",
  },
  leadSource: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"],
    default: "New",
  },
  assignedEmployee: {
    type: String,
    trim: true,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  notes: [noteSchema],
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
