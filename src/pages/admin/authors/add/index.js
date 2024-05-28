import { forwardRef, useState, useEffect } from 'react'
import {
  Grid, Radio, Select, Button, MenuItem, TextField, FormLabel,
  InputLabel, RadioGroup, CardContent, FormControl, OutlinedInput,
  FormControlLabel, Typography, Box
} from '@mui/material'
import { styled } from '@mui/material/styles'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

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
const AddAuthor = () => {
  const [images, setImages] = useState([])
  const [authors, setAuthors] = useState([])
  
  useEffect(async () => {
    const fetchGenres = fetch(`${BASE_URL}/genre`).then(resp => resp.json())
    const fetchAuthors = fetch(`${BASE_URL}/author`).then(resp => resp.json())
    const [genres, authors] = await Promise.all([fetchGenres, fetchAuthors]);
    setAuthors(authors)
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
      const resp = await fetch(`${BASE_URL}/author`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      })
      alert('Thêm tác giả thành công')
    } catch (error) {
      alert('Thêm thất bại')
    }
  }
  return (
    <CardContent>
      <form id='author-form' encType='multipart/form-data'>
        <Grid container spacing={7}>
         
          <Grid item xs={12} sm={4}>
            <FormLabel>Tên tác giả</FormLabel>
            <StyledTextField name='name' />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormLabel>Thông tin tác giả</FormLabel>
            <StyledTextField name='information' />
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
                  name='image'
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
                const form = document.getElementById('author-form')
                const formData = new FormData(form)
                postData(formData)
              }}
            >
              Thêm sách
            </Button>
            <Button type='reset' variant='outlined' color='secondary'
              onClick={(e) => { document.getElementById('author-form').reset() }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default AddAuthor
