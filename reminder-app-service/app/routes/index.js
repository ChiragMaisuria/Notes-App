import MeetingNotesRouter from './meeting-notes-route.js';

const initializeRoutesForMeetingNotes = (app) => {
    // Configure base url and all the routes for the base url starting with "/meetingNotes".
    app.use('/meetingNotes', MeetingNotesRouter);
}

export default initializeRoutesForMeetingNotes;