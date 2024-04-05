import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import RoutesForMeetingNotes from './routes/index.js';

const initializeMeetingNotes = (app) =>{
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    // Connect to mongoose DB.
    mongoose.connect(process.env.MONGO_CONNECTION);
    // Initialize Routes for meetingNotes app.
    RoutesForMeetingNotes(app);
}

export default initializeMeetingNotes;