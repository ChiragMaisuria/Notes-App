import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { SetStateAction, useState } from 'react';

// Default style for AppBar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// Defining props for keyword search to fetch the value from SearchBar.
type Props = {
  searchKeyword: (keyword: string) => void
}

export default function AppSearchBar(props: Props) {

  // useState: to set searchedKeyword value.
  const [searchedKeyword, setSearchKeyword] = useState('');
  
  // onChange method for the searchBar.
  const onChangeKeyword = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchKeyword(event.target.value);
    props.searchKeyword(searchedKeyword);
    console.log(searchedKeyword);
  }

  return (
    <>
    <AppBar position="static" sx={{backgroundColor: '#007d7f'}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block'}}}
          >
            Reminder App
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Reminders…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChangeKeyword}
            />
          </Search>
        </Toolbar>
      </AppBar></>
  );
}

