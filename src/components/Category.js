import { Box, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Link from 'next/link';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

const Category = ({genres}) => {
  return (
    <Container maxWidth="lg" sx={{backgroundColor:"white", marginTop:"24px", borderRadius:"20px"}}>
        <Box display="flex" sx={{backgroundColor:"transparent", padding:"16px"}}>
            <CategoryOutlinedIcon size='large' sx={{color:"red"}}/>
            <Typography component="span" sx={{color:"#212121", fontSize:"20px", fontWeight:"bold",lineHeight:"35px", paddingLeft:"5px"}}> 
                Danh mục thể loại sách
            </Typography>
        </Box>
        <Divider sx={{ color:"red" }}/>
        <Box sx={{display:"grid", gridTemplateColumns:"repeat(8,1fr)"}}> 
            {genres.map((genre) => 
              (<Link key={genre.id} href={`/genres/${genre.id}`}>
                <Card >
                <CardContent sx={{textAlign:"center", padding:"10px 0 0 0 "}}>
                  <Typography 
                    component="span"
                    className='category_title'
                  >
                    {genre.name}
                  </Typography>
                </CardContent>
              </Card>
              </Link>)
            )}
        </Box>
    </Container>
  )
}

export default Category