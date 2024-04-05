import express from "express";
import * as MeetingNotesController from './../controller/meeting-notes-controller.js';

// Initializing router to create routes.
const router = express.Router();

// Route: To delete meetingNote using Id of the certain meetingNote.
router.route("/:id")
    .delete(MeetingNotesController.deleteMeetingById);


// Route: 
router.route("/")
    // To search in all meetingNotes.
    .get(MeetingNotesController.searchMeeting)
    // To create new meetingNote.
    .post(MeetingNotesController.newMeeting)
    // To update meetingNote.
    .put(MeetingNotesController.updateMeeting)
    // To update certain part of the meetingNote.
    .patch(MeetingNotesController.updateSubMeeting)
    // To delete the meetingNote.
    .delete(MeetingNotesController.deleteMeeting);


export default router;