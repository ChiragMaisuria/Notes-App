// Import for main Container
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// Import for MeetingNotesList SideBar.
// import MeetingNotesList from "../components/MeetingNotesList";
import AppSearchBar from "../components/AppSearchBar";
// import NewMeetingButton from "../components/NewMeetingButton";
import GridView from "../components/GridView";
import { useState } from "react";

export const ReminderApp = function ReminderApp() {
  // useState: To get the searched keyword from searchBar and pass it to GridView.
  const [searchedKeyword, setSearchedKeyword] = useState('');
  // method to set the searched keyword.
  const getSearchedKeyword = (keyword: string) => {
    setSearchedKeyword(keyword);
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", width: "100vw" }} />
        <AppSearchBar searchKeyword={getSearchedKeyword}></AppSearchBar>
        {/* <MeetingNotesList></MeetingNotesList>
                <NewMeetingButton></NewMeetingButton> */}
        <GridView searchedKeyword={searchedKeyword}></GridView>
      </Container>
    </>
  );
};
