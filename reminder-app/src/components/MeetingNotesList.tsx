import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Typography from '@mui/material/Typography';
import React from 'react';
import { MeetingNoteModel } from '../models/MeetingNoteModel';

// Defining props used for meetingNotesLists.
type Props = {
    meetingNotesList: Array<MeetingNoteModel>,
    selectMeetingNote: (meetingNote: MeetingNoteModel) => void
}

export default function MeetingNotesList(props: Props) {

    // method that will check if number of words in the list display is more than 10,
    // then trim the content and add '...' ellipsis.
    function display10Words(content: string, maxLimit: number): string{
        const numberOfWords = content.split(' ');
        if(numberOfWords.length > maxLimit){
            return numberOfWords.splice(0, maxLimit).join(' ') + "...";
        }
        return content;
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {props.meetingNotesList.map((meetingNoteItem) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start" onClick={() => props.selectMeetingNote(meetingNoteItem)}>
                                <ListItemAvatar>
                                    <EditNoteIcon />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography>{`${meetingNoteItem.title}`}</Typography>}
                                    secondary={
                                        <React.Fragment>
                                            {display10Words(meetingNoteItem.content, 10)}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    );
                })}
            </List>
        </>
    );
}