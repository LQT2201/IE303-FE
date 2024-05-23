import { Box, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import formater from 'src/utils/formatCurrency';


const Book = ({book}) => {
  const [value, setValue] = React.useState(5);
    

  return (
    <Card sx={{padding:"5px",boxShadow:"none", 
        transition: "box-shadow 0.3s ease-in-out",
        ':hover': {
        boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.1)"
      }
    }}>
          <Box sx={{justifyContent:"center", alignItems:"center", textAlign:"center", display:"flex", overflow:"hidden"}}>
            <Link href={`/products/${encodeURIComponent(book.id)}`}>
              <CardMedia 
                sx={{maxWidth:"190px", maxHeight:"190px",cursor:"pointer"}}
                component="img"
                src={book.image}
              />
            </Link>
          </Box>
          
          <CardContent sx={{paddingTop:"10px"}}>
            <Link href={`/products/${encodeURIComponent(book.id)}`}>
              <Typography 
                fontSize={13} 
                fontWeight={600} 
                className='book-title_card'  
                component="span"
                sx={{cursor:"pointer"}}
              >
                {book.bookName}
              </Typography>
            </Link>
            <Box display="flex">
              <Typography color="#C92127" fontWeight={600} fontSize={16}> 
                { formater.format(book.salePrice) }
              </Typography>
              <Box className='sale-percent' component="span">
                10%
              </Box>
            </Box>
            <Typography 
              sx={{textDecoration:"line-through"}}
              component="span" 
              color="#888888"  
              fontSize={14}
              fontWeight={500}
            >
                {formater.format(book.oldPrice)}
            </Typography>
            <Box display="flex">
              <Rating name="read-only" value={book.rating} readOnly size='small' sx={{borderRight:"2px solid #7A7E7F"}}/>
              <Typography marginLeft={3} fontSize={10} color="#7A7E7F">
                Đã bán <strong> {book.soldQty} </strong>
              </Typography>
            </Box>
          </CardContent>
    </Card>
  )
}

export default Book