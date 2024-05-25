import { Container, Grid, Box, Button, Typography, Rating, CardMedia } from '@mui/material'
import Icon from '@mdi/react'
import { mdiCartOutline } from '@mdi/js'
import NumberInput from 'src/components/NumberInput'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import React from 'react'
import Book from 'src/components/Book'
import DefaultLayout from 'src/layouts/DefaultLayout'
import page from 'src/pages/test2'
import formater from 'src/utils/formatCurrency'

const ProductDetail = params => {
  const books = [
    {
      id: 2,
      bookName: 'Tuổi Thơ Dữ Dội - Tập 1 (Tái Bản 2019)',
      salePrice: 15000,
      oldPrice: 20000,
      rating: 4,
      soldQty: 100,
      image: 'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'
    },
    {
      id: 1,
      bookName: 'Tuổi Thơ Dữ Dội - Tập 2 (Tái Bản 2020)',
      salePrice: 16000,
      oldPrice: 20000,
      rating: 5,
      soldQty: 100,
      image: 'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'
    }
  ]
  console.log(params)
  return (
    <Container maxWidth='lg'>
      <Box>đường dẫn tới product!!!</Box>
      <Grid container spacing={2} sx={{ backgroundColor: '#ffffff' }}>
        <Grid item md={5}>
          <Box>
            <Box>
              <CardMedia component='img' src={'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'} />
            </Box>
            <Box>
              <Carousel responsive={responsive}>
                <CardMedia
                  sx={{ height: 100 }}
                  component='img'
                  src={'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'}
                />
                <CardMedia
                  sx={{ height: 100 }}
                  component='img'
                  src={'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'}
                />
                <CardMedia
                  sx={{ height: 100 }}
                  component='img'
                  src={'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'}
                />
                <CardMedia
                  sx={{ height: 100 }}
                  component='img'
                  src={'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'}
                />
                <CardMedia
                  sx={{ height: 100 }}
                  component='img'
                  src={'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'}
                />
                <CardMedia
                  sx={{ height: 100 }}
                  component='img'
                  src={'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'}
                />
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
              Tiêu đề
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={6}>
              Nhà cung cấp:
            </Grid>
            <Grid item md={6}>
              Tác giả:
            </Grid>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={6}>
              Nhà xuất bản:
            </Grid>
            <Grid item md={6}>
              Hình thức bìa:
            </Grid>
          </Box>
          <Box>
            <Rating></Rating>
          </Box>

          <Box display='flex'>
            <Typography color='#C92127' fontWeight={600} fontSize={24}>
              {formater.format(2000)}
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
              {formater.format(1000)}
            </Typography>
            <Box className='sale-percent' component='span' alignItems={'center'} textAlign={'center'} display={'flex'}>
              10%
            </Box>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Grid item md={3}>
              Thời gian giao hàng
            </Grid>
            <Grid item md={9}>
              <Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>Giao hàng đến</Box>
                  <Box fontWeight={600} marginLeft={3}>
                    Place
                  </Box>
                  <Box
                    sx={{
                      color: '#2489F4',
                      transition: 'background-color 0.3s ease',
                      ':hover': {
                        cursor: 'pointer'
                      }
                    }}
                  >
                    Thay đổi
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>Thời gian dự kiến</Box>
                  <Box fontWeight={600} marginLeft={3}>
                    Time
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={2} display={'flex'} alignItems={'center'} textAlign={'center'}>
              <Box fontWeight={600} marginLeft={3}>
                Số lượng:
              </Box>
            </Grid>
            <Grid item md={3}>
              <NumberInput />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ backgroundColor: '#ffffff', marginTop: 10 }}>
        <Typography fontSize={20} fontWeight={600} padding={5}>
          Sản phẩm liên quan
        </Typography>

        <Grid container marginTop={5}>
          {books.map(book => (
            <Grid item md={2.4} key={book.id} spacing={1}>
              <Book book={book} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ backgroundColor: '#ffffff', marginTop: 10 }}>
        <Typography fontSize={20} fontWeight={600} padding={5}>
          Sản phẩm giới thiệu
        </Typography>

        <Grid container marginTop={5}>
          {books.map(book => (
            <Grid item md={2.4} key={book.id} spacing={1}>
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
