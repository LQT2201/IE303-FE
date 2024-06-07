import { forwardRef, useState, useEffect } from 'react'
import {
  Grid, Radio, Select, Button, MenuItem, TextField, FormLabel,
  InputLabel, RadioGroup, CardContent, FormControl, OutlinedInput,
  FormControlLabel, Typography, Box
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 0),
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 0),
}))

const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '16px'
}))

const BASE_URL = 'http://127.0.0.1:8080/api'
const AddBook = () => {
  const router = useRouter();
  const [images, setImages] = useState([])
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])
  useEffect(async () => {
    const fetchGenres = fetch(`${BASE_URL}/genre`).then(resp => resp.json())
    const fetchAuthors = fetch(`${BASE_URL}/author`).then(resp => resp.json())
    const [genres, authors] = await Promise.all([fetchGenres, fetchAuthors]);
    setAuthors(authors)
    setGenres(genres)
  }, [])
  const fileOnChange = async file => {
    const { files } = file.target
    const readFile = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(file)
      })
    }
    if (files && files.length !== 0) {
      const imgs = []
      for (const file of files) {
        const result = await readFile(file)
        imgs.push(result)
      }
      setImages(imgs)
    }
  }
  const postData = async (form) => {
    const token = localStorage.getItem('token');
    try {
      const resp = await fetch(`${BASE_URL}/book`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      })
      Swal.fire("Thêm thành công", "", "success");
      router.push('/admin/books')
    } catch (error) {
      Swal.fire("Thất bại", "", "error");
    }
  }
  return (
    <CardContent>
      <form id='book-form' encType='multipart/form-data'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} >
            <FormLabel>Tên sách</FormLabel>
            <StyledTextField name='title'  />
          </Grid>
          <Grid item xs={12} sm={6} >
            <FormLabel>Tác giả</FormLabel>
            <FormControl fullWidth>
              <StyledSelect id="authors" name="author" defaultValue="">
                {authors && authors.map(author => (
                  <MenuItem key={author.id} value={author.name}>{author.name}</MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Thể loại</FormLabel>
            <FormControl fullWidth>
              <StyledSelect id="genres" name="genre" defaultValue="">
                {genres && genres.map(genre => (
                  <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Mô tả sách</FormLabel>
            <StyledTextField name='description' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Số lượng trong kho</FormLabel>
            <StyledTextField type='number' name='stock' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Số trang</FormLabel>  
            <StyledTextField type='number' name='pages' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Giá sách</FormLabel>
            <StyledTextField type='number' name='price' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Nhà xuât bản</FormLabel>
            <StyledTextField name='publisher' />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormLabel>Ngày xuất bản</FormLabel>
            <StyledInput type='date' name='publishDate' defaultValue={new Date().toISOString().slice(0, 10)} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            {images.map((img, index) => (
              <ImgStyled key={index} src={img} />
            ))}
            <Box>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Thêm ảnh
                <input
                  hidden
                  type='file'
                  onChange={fileOnChange}
                  accept='image/png, image/jpeg'
                  id='account-settings-upload-image'
                  name='images'
                  multiple
                />
              </ButtonStyled>
              <Typography variant='body2' sx={{ marginTop: 5 }}>
                Chỉ cho phép PNG hoặc JPEG. Kích thước tối đa 800K.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}
              onClick={() => {
                const form = document.getElementById('book-form')
                const formData = new FormData(form)
                postData(formData)
              }}
            >
              Thêm sách
            </Button>
            <Button type='reset' variant='outlined' color='secondary'
              onClick={(e) => { document.getElementById('book-form').reset() }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default AddBook
