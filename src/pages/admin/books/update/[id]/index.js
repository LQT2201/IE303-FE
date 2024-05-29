import { forwardRef, useState, useEffect } from 'react'
import {
  Grid, Button, MenuItem, TextField, CardContent, FormControl, Select,
  Typography, Box, FormLabel
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

const UpdateBook = () => {
  const router = useRouter()
  const [book, setBook] = useState(null)
  const [images, setImages] = useState([])
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, genresData, authorsData] = await Promise.all([
          fetch(`${BASE_URL}/book/${router.query.id}`).then(resp => resp.json()),
          fetch(`${BASE_URL}/genre`).then(resp => resp.json()),
          fetch(`${BASE_URL}/author`).then(resp => resp.json())
        ])
        setAuthors(authorsData)
        setGenres(genresData)
        setBook(bookData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    if (router.query.id) fetchData()
  }, [router.query.id])

  const fileOnChange = async file => {
    const { files } = file.target
    if (files && files.length !== 0) {
      const readFile = file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      }
      const imgs = await Promise.all(Array.from(files).map(file => readFile(file)))
      setImages(imgs)
    }
  }

  const postData = async form => {
    const token = localStorage.getItem('token');
    try {
      const resp = await fetch(`${BASE_URL}/book/${book.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      })
      if (resp.ok) {
        Swal.fire("Sửa thành công", "", "success");
        router.push('/admin/books')
      } else {
        Swal.fire("Sửa thất bại", "", "error");
      }
    } catch (error) {
      alert('Sửa thất bại')
    }
  }

  if (!book) {
    return <>Đang tải</>
  }

  return (
    <CardContent>
      <form id='book-form' encType='multipart/form-data'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
           <FormLabel>Tên sách</FormLabel>
            
            <StyledTextField name='title'  defaultValue={book.title} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormControl fullWidth>
              <FormLabel>Tác giả</FormLabel>
              <StyledSelect id="authors" name="author" defaultValue={book.author}>
                {authors.map(author => (
                  <MenuItem key={author.id} value={author.name}>{author.name}</MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <FormLabel>Thể loại</FormLabel>
              <StyledSelect id="genres" name="genre" defaultValue={book.genre}>
                {genres.map(genre => (
                  <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
              <FormLabel>Mô tả sách</FormLabel>

            <StyledTextField name='description'  defaultValue={book.description} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <FormLabel>Số lượng kho</FormLabel>

            <StyledTextField type='number' name='stock'  defaultValue={book.stock} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Số trang sách</FormLabel>

            <StyledTextField type='number' name='pages'  defaultValue={book.pages} />
          </Grid>
          <Grid item xs={12} sm={3}>
          <FormLabel>Giá sách</FormLabel>

            <StyledTextField type='number' name='price' defaultValue={book.price} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <StyledTextField name='publisher' label='Nhà xuất bản' placeholder='Nhà xuất bản' defaultValue={book.publisher} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormLabel>Ngày xuất bản</FormLabel>
            <StyledInput type='date' name='publishDate' defaultValue={new Date(book.publishDate).toISOString().slice(0, 10)} />
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
              Sửa
            </Button>
            <Button type='reset' variant='outlined' color='secondary'
              onClick={() => { document.getElementById('book-form').reset() }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default UpdateBook
