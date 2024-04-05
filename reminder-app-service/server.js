import express from 'express';
import dotenv from 'dotenv';
import initializeMeetingNotes from './app/app.js';

// Configure Environment Variables.
dotenv.config();

// Create an express app.
const app = express();
const port = process.env.PORT;

// Initialize meetingNotes app with express.
initializeMeetingNotes(app);

// Listen on port.
app.listen(port, () => console.log(`Server running on port ${port}`));