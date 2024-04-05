import mongoose from "mongoose";


//MeetingNote object has id, title, content, list of action items, and createdDate properties.
const Schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  listOfActions: {
    type: Array,
    required: true
  },
  createdDate: {
    type: Date,
    required: false
  },
});

const model = mongoose.model('meetingNotes', Schema);

export default model;