import Grid from '@mui/material/Grid';
import MeetingNotesList from './MeetingNotesList';
import MeetingNote from './MeetingNote';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MeetingNoteModel } from '../models/MeetingNoteModel';

// Defining props for seachedKeyword from searchBar in AppBar to GridView.
type Props = {
    searchedKeyword: string | ''
}

export default function GridView(props: Props) {

    // useState: To update meetingNotesList. 
    const [meetingNotesListState, setMeetingNotesList] = useState<MeetingNoteModel[]>([]);
    // useState: To update the selected meeting note to display in Expanded View.
    const [meetingNoteSelectedState, setSelectedMeetingNote] = useState<MeetingNoteModel>();
    // useState: To get all meetingNotes Ids, 
    // helps in creating unique Id for new meetingNote, and
    // update if Id already exists
    const [allMeetingNotesListId, setAllMeetingNotesListId] = useState<number[]>([]);

    // method to fetch and update meetingNotes list using keyword.
    const updateMeetingNotesListStateKeyword = async (keyword: string) => {
        const url = new URL('http://localhost:3000/meetingnotes');
        url.searchParams.append('keywords', keyword);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch meeting notes');
            }
            const data = await response.json();
            console.log('Fetched meeting notes from keyword:', data);
            setMeetingNotesList(data)
        } catch (error) {
            console.error('Error fetching meeting notes:', error);
            return null;
        }
    }

    // useEffect: To update meetingNotes List when the value for searchedKeyword changes.
    useEffect(() => {
        updateMeetingNotesListStateKeyword(props.searchedKeyword);
    }, [props.searchedKeyword]);

    // method to set the selected meetingNote.
    const selectMeetingNote = async (meetingNote: MeetingNoteModel) => {
        setSelectedMeetingNote(JSON.parse(JSON.stringify(meetingNote)));
    }

    // method to fetch all the meetingNotes.
    const fetchMeetingNotes = async () => {
        console.log("fetchMeetingNotes() function invoked");
        try {
            const response = await fetch('http://localhost:3000/meetingnotes');
            if (response.status === 200) {
                const data = await response.json();
                setMeetingNotesList(data);
                console.log('Fetched meeting notes: ', data);
                updateAllMeetingNotesListId(data);
            } else {
                console.error('Failed to fetch meeting notes');
            }
        } catch (error) {
            console.error('Error fetching meeting notes:', error);
        }
    }

    // Invoke function after render completes
    useEffect(() => {
        fetchMeetingNotes()
    }, []);

    // method to add new meetingNote in the DB and update the meetingNotesList in UI[refresh].
    const addNewMeetingNotesList = async (newMeetingNote: MeetingNoteModel) => {
        console.log("newMeetingNote.id: " + newMeetingNote.id);
        try {
            const response = await fetch(`http://localhost:3000/meetingnotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMeetingNote)
            });
            if (response.ok) {
                console.log('Meeting note added successfully');
            } else {
                console.error('Failed to add meeting note');
            }
        } catch (error) {
            console.error('Error adding meeting note:', error);
        }
        setMeetingNotesList(meetingNotesListState.concat([newMeetingNote]));
        refreshMeetingNotesList();
    }

    useEffect(() => {
        console.log('Updated meeting note:', meetingNoteSelectedState);
    }, [meetingNoteSelectedState]);

    // method to generate new and unique meetingNote Id.
    const generateNewMeetingNoteId = () => {
        const arrIds = [];
        for (let i = 0; i < meetingNotesListState.length; i++) {
            arrIds.push(meetingNotesListState[i].id);
        }
        let randomId = Math.floor(10000 + Math.random() * 90000);
        while (arrIds.includes(randomId)) {
            randomId = Math.floor(10000 + Math.random() * 90000);
        }
        return randomId;
    }

    // method to create new blank MeetingNote.
    const createNewMeetingNote = () => {
        setSelectedMeetingNote({
            id: generateNewMeetingNoteId(),
            title: '',
            content: '',
            listOfActions: [],
            createdDate: new Date().toString().substring(0, 10)
        });
    }

    // method to refresh the meetingNotes list.
    const refreshMeetingNotesList = () => {
        fetchMeetingNotes();
    }

    // method to update all meetingNotes Ids list.
    const updateAllMeetingNotesListId = (allMeetingNotes: MeetingNoteModel[]) => {
        const listOfIds = [];
        for (let i = 0; i < allMeetingNotes.length; i++) {
            listOfIds.push(allMeetingNotes[i].id);
        }
        setAllMeetingNotesListId(listOfIds);
    }

    // method to update the meetingNote in DB and also update the meetingNotes list accordingly [refresh].
    const updateMeetingNotesList = async (updateMeetingNote: MeetingNoteModel) => {
        try {
            const response = await fetch(`http://localhost:3000/meetingnotes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateMeetingNote)
            });
            if (response.ok) {
                console.log('Meeting note updated successfully');
            } else {
                console.error('Failed to update meeting note');
            }
        } catch (error) {
            console.error('Error updating meeting note:', error);
        }
        refreshMeetingNotesList();
    }

    const buttonStyle = {
        backgroundColor: '#009196',
        color: 'white', // text color
    };

    // Display: If the server is down and no meetingNotes are fetched.
    if (meetingNotesListState.length == 0) {
        return (
            <>
                <h1>No Meeting Notes are present currently.</h1>
            </>
        );
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item >
                    <Typography variant='h5' sx={{ pt: '18px', pb: '16px', textAlign: 'center', fontWeight: '600', color: '#007d7f' }}>All Meeting Notes</Typography>
                    <Divider variant='fullWidth' />
                    <MeetingNotesList meetingNotesList={meetingNotesListState} selectMeetingNote={selectMeetingNote}></MeetingNotesList>
                </Grid>
                <Grid item lg='auto'>
                    <Box component="div" sx={{ p: 2, width: '60vw', textAlign: 'center' }}>
                        <Button variant="contained" style={buttonStyle} onClick={createNewMeetingNote}>Add New Meeting</Button>
                    </Box>
                    <MeetingNote meetingNoteSelected={meetingNoteSelectedState} updateMeetingNotesList={updateMeetingNotesList} addNewMeetingNotesList={addNewMeetingNotesList} refreshMeetingNotesList={refreshMeetingNotesList} allMeetingNotesListId={allMeetingNotesListId}></MeetingNote>
                </Grid>
            </Grid>
        </>
    );
}