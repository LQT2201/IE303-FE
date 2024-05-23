import { Box, Card, CardContent, CardMedia, Container, Grid, Rating, Typography } from '@mui/material'
import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Book from './Book';


const LatestBook = ({books}) => {

  return (
    <Container disableGutters  maxWidth="lg" sx={{marginTop:"15px", borderRadius:"10px", backgroundColor:"#fff"}}> 
      <Box padding="">
        <Box display="flex" borderRadius="10px 10px  0 0" bgcolor='#FCDDEF' padding={3}>
          <TrendingUpIcon color="red" sx={{margin:" 0px 10px 0 0", fontSize:"30px", color:"red"}}/>
          <Typography fontWeight={700} sx={{fontSize:"20px"}}>
            Sản phẩm mới
          </Typography>
        </Box>
      </Box>
      <Grid container marginTop={5}>
        {books.map((book) => (
          <Grid item md={2.4} key={book.id}>
            <Book book={book}/>
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" marginTop={5}>
        <Box sx={{cursor:"pointer"}}>
          <Typography 
            lineHeight={2.5} 
            margin="0 auto" 
            width={200} 
            height={40} 
            border="2px solid #C92127"
            color="#C92127"
            fontSize={14}
            fontWeight={700}
            borderRadius={2}
          >
            Xem Thêm
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default LatestBook