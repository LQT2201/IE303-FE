import { Box, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import Link from 'next/link';
import formater from 'src/utils/formatCurrency';


const Book = ({ book }) => {
  return (
    <Card sx={{
      padding: "5px", boxShadow: "none",
      transition: "box-shadow 0.3s ease-in-out",
      ':hover': {
        boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.1)"
      }
    }}>
      <Box sx={{ justifyContent: "center", alignItems: "center", textAlign: "center", display: "flex", overflow: "hidden" }}>
        <Link href={`/products/${encodeURIComponent(book.id)}`}>
          <img
            height={'150'}
            sx={{cursor:'pointer'}}
            src={book.images[0]}
          />
        </Link>
        <Typography marginLeft={3} fontSize={10} color="#7A7E7F">
          Đã bán <strong> {book.soldQty} </strong>
        </Typography>
      </Box>

      <CardContent sx={{ paddingTop: "10px" }}>
        <Link href={`/products/${encodeURIComponent(book.id)}`}>
          <Typography
            fontSize={13}
            fontWeight={600}
            className='book-title_card'
            component="span"
            sx={{ cursor: "pointer" }}
          >
            {book.bookName}
          </Typography>
        </Link>
        <Box display="flex">
          <Typography justifyContent={"center"} color="#C92127" fontWeight={600} fontSize={16}>
            {book.title}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography color="#C92127" fontWeight={600} fontSize={16}>
            {formater.format(book.price)}
          </Typography>

        </Box>
      </CardContent>
    </Card>
  )
}

export default Book