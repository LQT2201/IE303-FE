// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'

import { Typography, Box } from '@mui/material'

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
const BASE_URL = 'http://127.0.0.1:8080/api'
const UpdateBook = () => {
  const router = useRouter()
  const [book, setBook] = useState(null)
  const [images, setImages] = useState([])
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])
  useEffect(() => {
    const fetchData = async() => {
      const fetchBook = fetch(`${BASE_URL}/book/${router.query.id}`).then(resp => resp.json())
      const fetchGenres = fetch(`${BASE_URL}/genre`).then(resp => resp.json())
      const fetchAuthors = fetch(`${BASE_URL}/author`).then(resp => resp.json())
      const [book, genres, authors] = await Promise.all([fetchBook, fetchGenres, fetchAuthors]);
      setAuthors(authors)
      setGenres(genres)
      setBook(book)
    }
    if(router.query.id)
      fetchData().catch(err => console.log(err))
  }, [router.query.id])
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
      const resp = await fetch(`${BASE_URL}/book?id=${book.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      })
      alert('Sửa thành công')
    } catch (error) {
      alert('Sửa thất bại')
    }
  }
  if(book == null) {
    return (<>Đang tải</>)
  }
  return (
    <CardContent>
      <form id='book-form' encType='multipart/form-data'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <input type='text' name='title' label='Tên sách' placeholder='Tên sách' defaultValue={book.title}/>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <p>Tác giả</p>
            <select id="authors" name="author" defaultValue={book.author}>
              {authors &&
                authors.map(author => {
                  return (
                    <option key={author.id} value={`${author.name}`}>{author.name}</option>
                  )
                })
              }
            </select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <p>Thể loại</p>
            <select id="genres" name="genre" value={book.genre}>
              {genres &&
                genres.map(genre => {
                  return (
                    <option key={genre.id} defaultValue={`${genre.name}`}>{genre.name}</option>
                  )
                })
              }
            </select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <p>Mô tả sách</p>
            <input type='text' name='description' placeholder='Mô tả sách' defaultValue={book.description}/>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <p>Số lượng kho</p>
            <input type='number' name='stock' placeholder='Số lượng kho' defaultValue={book.stock}/>
          </Grid>
          <Grid item xs={12} sm={3}>
            <p>Số trang sách</p>
            <input type='number' name='pages' placeholder='Số trang sách' defaultValue={book.pages}/>
          </Grid>
          <Grid item xs={12} sm={3}>
            <p>Giá sách</p>
            <input type='number' name='price' placeholder='Giá sách' defaultValue={book.price}/>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <p>Nhà xuất bản</p>
            <input type='text' name='publisher' placeholder='Nhà xuất bản' defaultValue={book.publisher} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <p>Ngày xuất bản</p>
            <input type='date' name='publishDate' defaultValue={(new Date(book.publishDate).toISOString().slice(0,10))} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            {images.map((img, index) => {
              return (
                <ImgStyled key={index} src={img} />
              )
            })}

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
              Thêm
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

export default UpdateBook
