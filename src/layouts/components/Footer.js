import React from 'react'
import { Grid, Box, Typography, CardMedia, Link, Container } from '@mui/material'

const Footer = () => {
  return (
    <Box marginTop={10} sx={{borderTop:5, borderColor:"C92127"}} >
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          padding: 5,
          paddingX: 0,
        }}
      >
        <Grid item md={3}>
          <Box>
            <Typography
              sx={{
                color: '#2a435d',
                textTransform: 'uppercase',
                fontWeight: '700',
                fontSize: 20,
                lineHeight: '1.75rem'
              }}
            >
              Chăm sóc khách hàng
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: 'inherit',
                fontWeight: '500',
                fontSize: 17,
                marginTop: 1
              }}
            >
              Điện thoại liên hệ: 0948346245
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: 'inherit',
                fontWeight: '500',
                fontSize: 17,
                marginTop: 1
              }}
            >
              Email: 21522461@gm.uit.edu.vn
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: 'inherit',
                fontWeight: '500',
                fontSize: 17,
                marginTop: 1
              }}
            >
              Giờ làm việc: 7.30 AM - 9.30PM
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: '#2a435d',
                textTransform: 'uppercase',
                fontWeight: '700',
                fontSize: 20,
                lineHeight: '1.75rem',
                marginTop: 1,
                marginBottom: 2
              }}
            >
              Liên hệ chúng tôi
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Grid item md={3}>
              <CardMedia
                sx={{ height: 60, width: 60 }}
                component='img'
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/450px-Facebook_icon_2013.svg.png?20161223201621'
                }
              ></CardMedia>
            </Grid>
            <Grid item md={3}>
              <CardMedia
                sx={{ height: 60, width: 60 }}
                component='img'
                src={
                  'https://thumbs.dreamstime.com/b/tiktok-social-media-app-icon-tiktok-social-media-app-icon-square-shape-vector-illustration-269930887.jpg'
                }
              ></CardMedia>
            </Grid>
            <Grid item md={3}>
              <CardMedia
                sx={{ height: 60, width: 60 }}
                component='img'
                src={'https://static-00.iconduck.com/assets.00/youtube-icon-2048x2048-wiwalbpx.png'}
              ></CardMedia>
            </Grid>
            <Grid item md={3}>
              <CardMedia
                sx={{ height: 60, width: 60 }}
                component='img'
                src={'https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png'}
              ></CardMedia>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Typography
            sx={{
              color: '#2a435d',
              textTransform: 'uppercase',
              fontWeight: '700',
              fontSize: 20,
              lineHeight: '1.75rem',
              marginBottom: 2
            }}
          >
            Chấp nhận thanh toán
          </Typography>
          <Box display={'flex'}>
            <Grid item md={4}>
              <CardMedia
                sx={{ height: 60, width: 60 }}
                component='img'
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGds0dVYCpsArM9iAbJ8GNMQIHWR_M7vECi27mUxg1cQ&s'
                }
              ></CardMedia>
            </Grid>
            <Grid item md={4}>
              <CardMedia
                sx={{ height: 60, width: 60 }}
                component='img'
                src={'https://rgb.vn/wp-content/uploads/2014/05/rgb_vn_new_branding_paypal_2014_logo_detail.png'}
              ></CardMedia>
            </Grid>
            <Grid item md={4}>
              <CardMedia
                sx={{ height: 60, width: 60 }}
                component='img'
                src={
                  'https://ttvietlam.hagiang.gov.vn/o/image/image_gallery?uuid=99480637-6b82-491f-9827-cadc3b64b165&groupId=248401&t=1587177118868'
                }
              ></CardMedia>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: '#2a435d',
              textTransform: 'uppercase',
              fontWeight: '700',
              fontSize: 20,
              lineHeight: '1.75rem',
              marginBottom: 2
            }}
          >
            Sách UIT - Hệ thống website bán sách
          </Typography>
          <Box display={'flex'}>
            <Grid item md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                sx={{
                  color: 'inherit',
                  ':hover': {
                    color: '#C92127',
                    cursor: 'pointer',
                    fontWeight: 700
                  }
                }}
              >
                Điều khoản chung
              </Link>
              <Link
                sx={{
                  color: 'inherit',
                  ':hover': {
                    color: '#C92127',
                    cursor: 'pointer',
                    fontWeight: 700
                  }
                }}
              >
                Chính sách bảo mật
              </Link>
              <Link
                sx={{
                  color: 'inherit',
                  ':hover': {
                    color: '#C92127',
                    cursor: 'pointer',
                    fontWeight: 700
                  }
                }}
              >
                Giới thiệu
              </Link>
            </Grid>
            <Grid item md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                sx={{
                  color: 'inherit',
                  ':hover': {
                    color: '#C92127',
                    cursor: 'pointer',
                    fontWeight: 700
                  }
                }}
              >
                Tuyển dụng
              </Link>
              <Link
                sx={{
                  color: 'inherit',
                  ':hover': {
                    color: '#C92127',
                    cursor: 'pointer',
                    fontWeight: 700
                  }
                }}
              >
                Địa chỉ
              </Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box bgcolor={'#C92127'} justifyContent={'center'} textAlign={'center'} height={50} alignContent={'center'}>
        <Typography sx={{ color: '#ffffff' }}>Copyright © 2024 | Bản quyền thuộc về Sách UIT</Typography>
      </Box>
    </Box>
  )
}

export default Footer
