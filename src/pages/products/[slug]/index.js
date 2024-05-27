import { Container, Grid, Box, Button, Typography, Rating, CardMedia } from '@mui/material'
import Icon from '@mdi/react'
import { mdiCartOutline } from '@mdi/js'
import NumberInput from 'src/components/NumberInput'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import React from 'react'
import Book from 'src/components/Book'
import DefaultLayout from 'src/layouts/DefaultLayout'
import formater from 'src/utils/formatCurrency'
import { useRouter } from 'next/router'
import Link from 'next/link';
const BASE_URL = 'http://127.0.0.1:8080/api/book'
const ProductDetail = params => {
  const router = useRouter()
  const [book, setBook] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [relatedBooks, setRelatedBooks] = React.useState(null)
  React.useEffect(() => {
    const fetchBook = async() => {
      if(router.query.slug) {
        try {
          let resp = await fetch(`${BASE_URL}/${router.query.slug}`)
          const book = await resp.json()
          setBook(book)
          setIsLoading(false)
          resp = await fetch(`${BASE_URL}?genre=${book.genre}&size=5`)
          const relatedBooks = await resp.json();
          setRelatedBooks(relatedBooks.content)
        } catch (error) {
          setError(true)
        }
      }
    }
    fetchBook()
  },[router.query.slug])
  if(error) 
    return (
    <p>Không tìm thấy sản phẩm</p>
    )
  if(isLoading) 
    return (
      <p>Đang tải</p>
    )
  return (
    <Container maxWidth='lg'>
      <Grid container sx={{ backgroundColor: '#ffffff' }}>
        <Grid item md={5}>
          <Box>
            <Box>
              <CardMedia 
                component='img' 
                src={book.images[0]} 
              />
            </Box>
            <Box>
              <Carousel responsive={responsive}>
                {book.images.map((img) => {
                  return (<CardMedia
                    sx={{ height: 100 }}
                    component='img'
                    src={img}
                  />)
                })}
              </Carousel>
            </Box>
          </Box>
          <Box display={'flex'} sx={{ marginTop: 5, marginBottom: 5 }}>
            <Grid item md={6}>
              <Button
                sx={{ color: '#C92127', background: '#fff', border: '2px solid #C92127', width: 220, height: 44 }}
              >
                <Icon path={mdiCartOutline} size={1} />
                Thêm vào giỏ hàng
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                sx={{
                  color: '#fff',
                  background: '#C92127',
                  width: 220,
                  height: 44,
                  transition: 'background-color 0.3s ease',
                  ':hover': {
                    cursor: 'pointer',
                    background: '#f55207'
                  }
                }}
              >
                Mua ngay
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={7}>
          <Box>
            <Typography lineHeight={2.5} color='#C92127' fontSize={27} fontWeight={700}>
              {book.title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={6}>
              <Link href={`/author/${book.author}`}>
                <p>Tác giả {`${book.author}`}</p>
              </Link>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={6}>
              Nhà xuất bản: {book.publisher}
            </Grid>
          </Box>
          <Box>
          <Grid item md={6}>
              Thông tin: {book.description}
            </Grid>
          </Box>

          <Box display='flex'>
            <Typography color='#C92127' fontWeight={600} fontSize={24}>
              {formater.format(book.price)}
            </Typography>
            <Typography
              sx={{ textDecoration: 'line-through' }}
              component='span'
              color='#888888'
              fontSize={20}
              fontWeight={400}
              marginLeft={10}
              alignItems={'center'}
              textAlign={'center'}
              display={'flex'}
            >
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={2} display={'flex'} alignItems={'center'} textAlign={'center'}>
              <Box fontWeight={600} marginLeft={3}>
                Số lượng: {book.stock}
              </Box>
            </Grid>
            <Grid item md={3}>
              <NumberInput />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ backgroundColor: '#ffffff', marginTop: 10 }}>
        <Typography fontSize={20} fontWeight={600} padding={5}>
          Sản phẩm liên quan
        </Typography>

        <Grid container marginTop={5}>
          {relatedBooks && relatedBooks.map(book => (
            <Grid item md={2.4} key={book.id}>
              <Book book={book} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

ProductDetail.getLayout = page => <DefaultLayout> {page} </DefaultLayout>

export default ProductDetail
