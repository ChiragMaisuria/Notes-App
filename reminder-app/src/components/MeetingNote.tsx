import { Box, Checkbox, Divider, List, ListItem, TextField, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { MeetingNoteModel } from "../models/MeetingNoteModel";
import { SetStateAction, useEffect, useState } from "react";

// Defining props that will be used in meetinNote component.
type Props = {
    meetingNoteSelected: MeetingNoteModel | undefined
    addNewMeetingNotesList: (newMeetingNote: MeetingNoteModel) => void
    updateMeetingNotesList: (newMeetingNote: MeetingNoteModel) => void
    refreshMeetingNotesList: () => void
    allMeetingNotesListId: number[] | undefined
}

export default function MeetingNote(props: Props) {
    // useState: To update the meetingNote.
    const [meetingNote, setMeetingNote] = useState(props.meetingNoteSelected );
    // useState: To update the meetingNote Title.
    const [meetingNoteTitle, setMeetingNoteTitle] = useState(meetingNote?.title || '');
    // useState: To update the meetingNote content.
    const [meetingNoteContent, setMeetingNoteContent] = useState(meetingNote?.content || '');
    // useState: To update the meetingNote listOfActions.
    const [meetingNoteListOfAction, setMeetingNoteListOfAction] = useState(meetingNote?.listOfActions || []);
    const meetingNoteDate = meetingNote?.createdDate.toString().substring(0, 10);

    // useEffect: Defined for all the keys in the meetingNote Object.
    useEffect(() => {
        setMeetingNoteListOfAction(meetingNote?.listOfActions || []);
    }, [meetingNote?.listOfActions]);

    useEffect(() => {
        setMeetingNote(props.meetingNoteSelected);
    }, [props.meetingNoteSelected]);

    useEffect(() => {
        setMeetingNoteTitle(meetingNote?.title || '');
    }, [meetingNote?.title]);

    useEffect(() => {
        setMeetingNoteContent(meetingNote?.content || '');
    }, [meetingNote?.content]);

    // onChange method to update the title of the meetingNote.
    const updateMeetingNoteTitle = (event: { target: { value: SetStateAction<string>; }; }) => {
        setMeetingNoteTitle(event.target.value);
    };

    // onChange method to update the content of the meetingNote.
    const updateMeetingNoteContent = (event: { target: { value: SetStateAction<string>; }; }) => {
        setMeetingNoteContent(event.target.value);
    }

    // method to generate new and unique taskIds for all the new tasks created in the meetingNote.
    const generateTaskId = () => {
        const taskIds = [];
        const idPrefix = meetingNote?.id;
        for(let i=0; i<meetingNoteListOfAction.length; i++){
            taskIds.push(meetingNoteListOfAction[i].toDoId);
        }
        console.log("taskIds: ", taskIds);
        let randomId = Math.floor(100 + Math.random() * 900);
        // console.log("idPrefix: ", );
        // console.log("randomId: ", randomId);
        while(taskIds.includes(idPrefix * 1000 + randomId)){
            randomId = Math.floor(100 + Math.random() * 900);
            console.log("InWhile randomId: ", idPrefix * 1000 + randomId);
        }
        return idPrefix * 1000 + randomId;
    }

    // method to add new task in the meetingNote.
    const addNewTask = () => {
        // setMeetingNote(props.meetingNoteSelected);
        setMeetingNoteListOfAction(meetingNoteListOfAction?.concat([{
            toDoId: generateTaskId(),
            task: '',
            status: false
        }]));
        console.log('meetingNoteListOfAction: ' + meetingNoteListOfAction?.length);
    }

    // method to save the new/edited meeting Note.
    const saveMeetingNote = () => {
        console.log("id: ", meetingNote?.id);
        console.log("title: ", meetingNoteTitle);
        console.log("content: ", meetingNoteContent);
        console.log("listOfActions: ", meetingNoteListOfAction);
        console.log("meetingNoteDate: ", meetingNoteDate);
        const id = meetingNote?.id;
        const updatedMeetingNote = {
            ...props.meetingNoteSelected,
            id: id ?? -1,
            title: meetingNoteTitle,
            content: meetingNoteContent,
            listOfActions: meetingNoteListOfAction ?? [],
            createdDate: meetingNoteDate ?? new Date().toString().substring(0, 10)
        };

        if(props.allMeetingNotesListId?.includes(updatedMeetingNote.id)){
            props.updateMeetingNotesList(updatedMeetingNote);
        }else{
            props.addNewMeetingNotesList(updatedMeetingNote);
        }
    }

    // method to update the tasks with new task content.
    const updateTaskList = (updateTask: string, index: number) => {
        meetingNoteListOfAction[index].task = updateTask;
        setMeetingNoteListOfAction(meetingNoteListOfAction);
        console.log("After Task content update: ", meetingNoteListOfAction);
    }

    // methodto update the status of the task, whether completed or not.
    const updateTaskStatus = (index: number) => {
        const updatedMeetingNoteListOfAction = [...meetingNoteListOfAction];
        updatedMeetingNoteListOfAction[index].status = !updatedMeetingNoteListOfAction[index].status;
        setMeetingNoteListOfAction(updatedMeetingNoteListOfAction);
        console.log("After Task status update: ", meetingNoteListOfAction);
    }

    // method to delete the meetingNote from DB and refreshing UI.
    const deleteMeetingNote = async () => {
        try {
            const response = await fetch(`http://localhost:3000/meetingnotes/${props.meetingNoteSelected?.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Meeting note successfully deleted, update your state or perform any necessary actions
                console.log('Meeting note deleted successfully');
                // For example, you can update the meeting notes list after deleting
                props.refreshMeetingNotesList();
            } else {
                console.error('Failed to delete meeting note:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting meeting note:', error);
        }
    };

    return (
        <>
            <Card variant="outlined" sx={{ textAlign: 'center', borderRadius: '10px' }}>
                <CardContent>
                    <TextField
                        // label="Enter Text"
                        value={meetingNoteTitle}
                        onChange={updateMeetingNoteTitle}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                    />
                    <Typography sx={{ color: 'grey', }} variant="subtitle2">Date Created: {meetingNoteDate}</Typography>
                    <Divider sx={{ paddingTop: 0.5 }}></Divider>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        value={meetingNoteContent}
                        onChange={updateMeetingNoteContent}
                        sx={{ pt: 2, width: '55vw', height: '30vh' }}
                        maxRows={7}
                    />
                    <Divider sx={{ paddingTop: 0.5 }}></Divider>
                    <Typography variant="h6">Actions</Typography>
                    <Divider ></Divider>
                    <Box sx={{ height: '160px', overflow: 'auto' }}>
                        <List dense>
                            {meetingNoteListOfAction?.map((task, index) => {
                                return (
                                    <ListItem key={task.toDoId} sx={{ paddingTop: 0, paddingBottom: 0 }}>
                                        <Checkbox
                                            // checked={task.status || false}
                                            onChange={() => updateTaskStatus(index)}
                                            defaultChecked={task.status}
                                        />
                                        <TextField
                                            defaultValue={task.task}
                                            variant="standard"
                                            onChange={(event) => updateTaskList(event.target.value, index)}
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Divider sx={{ paddingTop: 0.5 }}></Divider>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="outlined" onClick={addNewTask}>Add New Task</Button>
                    <Button variant="contained" color="success" onClick={saveMeetingNote}>Save note</Button>
                    <Button variant="outlined" color="error" onClick={deleteMeetingNote}>Delete note</Button>
                </CardActions>
            </Card>


        </>
    );
}