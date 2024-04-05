import * as MeetingNotesServices from "../services/meeting-notes-service.js";
import { setResponse, setError } from "./responseHandler.js";

// Controller Async func.: To create a new meeting.
export const newMeeting = async (req, resp) => {
  try {
    const meetingNote = {...req.body};
    meetingNote.createdDate = new Date();
    // console.log("newMeeting - body: ", meetingNote);
    const meetingNoteAfterAdding = await MeetingNotesServices.addNewMeeting(meetingNote);
    setResponse(meetingNoteAfterAdding, resp);
  } catch (error) {
    setError(error, resp);
  }
};

// Controller Async func.: To search all meetingNotes.
export const searchMeeting = async (req, resp) => {
  try {
    const parameters = {...req.query};
    const meetingNotes = await MeetingNotesServices.searchInMeetingNotes(parameters);
    setResponse(meetingNotes, resp);
  } catch (error) {
    setError(error, resp);
  }
};

// Controller Async func.: To update any meetingNote.
export const updateMeeting = async (req, resp) => {
  try {
    const meetingNote = {...req.body};
    const meetingNoteAfterUpdate = await MeetingNotesServices.updateExistingMeetingNote(meetingNote);
    setResponse(meetingNoteAfterUpdate, resp);
  } catch (error) {
    setError(error, resp);
  }
};

// Controller Async func.: To update certain part of the meetingNote object.
export const updateSubMeeting = async (req, resp) => {
  try{
    const meetingNote = {...req.body};
    const meetingNoteAfterUpdate = await MeetingNotesServices.updateExistingMeetingNote(meetingNote);
    setResponse(meetingNoteAfterUpdate, resp);
  }catch(error){
    setError(error, resp)
  }
}

// Controller Async func.: To delete meetingNote using Object.
export const deleteMeeting = async (req, resp) => {
  try {
    const meetingNote = {...req.body};
    const meetingNoteDeleted = await MeetingNotesServices.deleteExistingMeetingNote(meetingNote);
    setResponse(meetingNoteDeleted, resp);
  } catch (error) {
    setError(error, resp);
  }
};

// Controller Async func.: To delete meetingNote using meetingNote Id.
export const deleteMeetingById = async (req, resp) => {
    try {
      const meetingNoteDeleted = await MeetingNotesServices.deleteExistingMeetingNoteById(req.params.id);
      setResponse(meetingNoteDeleted, resp);
    } catch (error) {
      setError(error, resp);
    }
  };
