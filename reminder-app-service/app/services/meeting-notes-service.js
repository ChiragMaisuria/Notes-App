import MeetingNotes from "../models/meeting-notes.js";

// Service async func.: To persist the new meetingNote.
export const addNewMeeting = async (meetingNote) => {
  const addMeetingNote = new MeetingNotes(meetingNote);
  return await addMeetingNote.save();
};

// Service async func.: To search in DB using keywords, startDate, and endDate.
export const searchInMeetingNotes = async (params = {}) => {
  const keyword = params.keywords;
  const lowerRange = params.startDate;
  const upperRange = params.endDate;
  let meetingNotesFound = await MeetingNotes.find(params).exec();
  let filter = {};

  // console.log("keyword: " + keyword);
  if (keyword === undefined) {
    // meetingNotesFound = await MeetingNotes.find(params).exec();
    // filter = params;
  } else {
    const keywordRegex = new RegExp(keyword, "i");
    filter = {
      $or: [
        { title: { $regex: keywordRegex } },
        { content: { $regex: keywordRegex } },
        {'listOfActions.task': {$regex: keywordRegex}}
      ],
    };
  }

  if (lowerRange && upperRange) {
    filter["createdDate"] = {
      $gte: lowerRange,
      $lte: upperRange,
    };
  } else if (lowerRange) {
    filter["createdDate"] = {
      $gte: lowerRange,
    };
  } else if (upperRange) {
    filter["createdDate"] = {
      $lte: upperRange,
    };
  }
  meetingNotesFound = await MeetingNotes.find(filter).exec();
  return meetingNotesFound;
};

// Service async func.: To update any existing meetingNote.
export const updateExistingMeetingNote = async (meetingNote) => {
  const updateMeetingNote = new MeetingNotes(meetingNote);
  const id = { id: meetingNote.id };
  return await MeetingNotes.findOneAndUpdate(id, meetingNote);
};

// Service async func.: To delete existing meeting Note using Object.
export const deleteExistingMeetingNote = async (meetingNote) => {
  const deleteMeetingNote = new MeetingNotes(meetingNote);
  const id = { id: meetingNote.id };
  return await MeetingNotes.findOneAndDelete(id);
};

// Service async func.: To delete existing meetingNote using Id.
export const deleteExistingMeetingNoteById = async (id) => {
  return await MeetingNotes.findOneAndDelete({ id: id });
};
