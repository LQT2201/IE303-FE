import React from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import {
  Input,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  CardMedia,
  Button
} from '@mui/material'

export default function Checkout() {
  const books = [
    {
      id: 2,
      bookName: 'Tuổi Thơ Dữ Dội - Tập 1 (Tái Bản 2019)',
      salePrice: 15000,
      oldPrice: 20000,
      rating: 4,
      quantity: 1,
      total: 15000,
      image: 'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'
    },
    {
      id: 1,
      bookName: 'Tuổi Thơ Dữ Dội - Tập 2 (Tái Bản 2020)',
      salePrice: 16000,
      oldPrice: 20000,
      rating: 5,
      quantity: 2,
      total: 32000,
      image: 'https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg'
    }
  ]
  return (
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Box sx={{ borderBottom: '1px solid #ced4da' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Thông tin giao hàng</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Họ và tên người nhận: </Typography>
          </Grid>
          <Grid item md={9} alignItems={'center'}>
            <Input type='text' placeholder='Họ và tên người nhận' fullWidth></Input>
          </Grid>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Email: </Typography>
          </Grid>
          <Grid item md={9}>
            <Input type='email' placeholder='Email' fullWidth></Input>
          </Grid>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Số điện thoại: </Typography>
          </Grid>
          <Grid item md={9}>
            <Input type='number' placeholder='Số điện thoại' fullWidth></Input>
          </Grid>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Tỉnh/Thành phố: </Typography>
          </Grid>
          <Grid item md={9}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small' fullWidth>
              <InputLabel id='demo-simple-select-label'>Tỉnh/TP</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                <MenuItem>Ten</MenuItem>
                <MenuItem>Twenty</MenuItem>
                <MenuItem>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Quận/Huyện: </Typography>
          </Grid>
          <Grid item md={9}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small' fullWidth>
              <InputLabel id='demo-simple-select-label'>Quận/Huyện</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                <MenuItem>Ten</MenuItem>
                <MenuItem>Twenty</MenuItem>
                <MenuItem>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Phường/Xã: </Typography>
          </Grid>
          <Grid item md={9}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small' fullWidth>
              <InputLabel id='demo-simple-select-label'>Phường/Xã</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                <MenuItem>Ten</MenuItem>
                <MenuItem>Twenty</MenuItem>
                <MenuItem>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Địa chỉ: </Typography>
          </Grid>
          <Grid item md={9}>
            <Input type='text' placeholder='Địa chỉ' fullWidth></Input>
          </Grid>
        </Box>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Box sx={{ borderBottom: '1px solid #ced4da' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Kiểm tra lại đơn hàng</Typography>
        </Box>
        <Box>
          {books.map(book => (
            <Box display={'flex'}>
              <Grid item md={2}>
                <CardMedia component='img' src={book.image} />
              </Grid>
              <Grid item md={5}>
                <Typography lineHeight={2.5} fontSize={16}>
                  {book.bookName}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography lineHeight={2.5} fontSize={16}>
                  {book.salePrice}
                </Typography>
                <Typography lineHeight={2.5} color='#888888' fontSize={16} sx={{ textDecoration: 'line-through' }}>
                  {book.oldPrice}
                </Typography>
              </Grid>
              <Grid item md={1}>
                <Typography lineHeight={2.5} fontSize={16}>
                  {book.quantity}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography lineHeight={2.5} color='#C92127' fontSize={16} fontWeight={700}>
                  {book.total}
                </Typography>
              </Grid>
            </Box>
          ))}
        </Box>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'row-reverse',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
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
          Xác nhận đặt hàng
        </Button>
      </Grid>
    </Container>
  )
}
Checkout.getLayout = page => <DefaultLayout> {page} </DefaultLayout>
