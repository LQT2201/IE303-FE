import { useState} from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid, Link } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #CDCFD0",
  backgroundColor: "white",
  '&:hover': {
    backgroundColor: "white",
  },
  marginRight: theme.spacing(10),
  width: '90%',
  height:"40px",
  lineHeight:"40px",
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',

  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({ 
  cursor:"pointer",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position:"absolute",
  top:"5px",
  right:"5px",
  background:"#C92127",
  width:"72px",
  height:"30px",
  border:"2px solid #C92127",
  borderRadius:"8px"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#545759',
  width: '90%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));


export default function SearchAppBar() {

  const [search,setSearch] = useState("");

  return (
    <AppBar sx={{background:"#ffffff"}}>
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item md={3}>
              <Link href="/">
                <Box width="220px">
                  <Box 
                    component="img"
                    width="220px"
                    src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                  />
                </Box>
              </Link>
            </Grid>
            <Grid item md={6}>
              <Search>
                <StyledInputBase
                  placeholder="Tìm kiếm ..."
                  onChange={e => setSearch(e.target.value)}
                />
                <SearchIconWrapper>
                    <Link href={`/search${search ? `?title=${search}` : ''}`}> 
                      <IconButton color='white'>
                        <SearchIcon sx={{color:"white"}}/>
                      </IconButton>
                    </Link>
                  </SearchIconWrapper>
             </Search>
            </Grid>
            <Grid item md={1}/>
            <Grid item md={2} textAlign="center" flexDirection="row" display="flex" justifyContent="space-between">
              
              <Link href="/cart">
              <Box flexDirection="column" display="flex">
                <IconButton sx={{padding:'0px'}}>
                  <ShoppingCartOutlinedIcon/>
                </IconButton>
                <Typography component="span" sx={{fontSize:"13px", lineHeight:"18px", color:"#7A7E7F"}}>
                  Giỏ hàng
                </Typography>
              </Box>
              </Link>
              <Link href="/profile">
              <Box flexDirection="column" display="flex">
                <IconButton sx={{padding:'0px'}}>
                  <AccountBoxOutlinedIcon/>
                </IconButton>
                <Typography component="span" sx={{fontSize:"13px", lineHeight:"18px", color:"#7A7E7F"}}>
                  Tài khoản
                </Typography>
              </Box>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
