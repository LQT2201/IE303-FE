import { Box, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';


const Category = () => {
  return (
    <Container maxWidth="lg" sx={{backgroundColor:"white", marginTop:"24px", borderRadius:"20px"}}>
        <Box display="flex" sx={{backgroundColor:"transparent", padding:"16px"}}>
            <CategoryOutlinedIcon size='large' sx={{color:"red"}}/>
            <Typography component="span" sx={{color:"#212121", fontSize:"20px", fontWeight:"bold",lineHeight:"35px", paddingLeft:"5px"}}> 
                Danh mục sản phẩm mới
            </Typography>
        </Box>
        <Divider sx={{ color:"red" }}/>
        <Box sx={{display:"grid", gridTemplateColumns:"repeat(8,1fr)"}}> 
        
            <Card>
              <CardMedia
                sx={{margin:"0 auto", width:"100px"}}
                component="img"
                height="100px"
                image='https://cdn0.fahasa.com/media/wysiwyg/hieu_kd/2023-08-frame/b1_-HNN.png'
              />
              <CardContent sx={{textAlign:"center", padding:"10px 0 0 0 "}}>
                <Typography 
                  component="span"
                  className='category_title'
                >
                   Sách học ngoại ngữ
                </Typography>
              </CardContent>
            </Card>
        </Box>
    </Container>
  )
}

export default Category