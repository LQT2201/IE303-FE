import { forwardRef, useState, useEffect } from 'react'
import {
  Grid, Button, MenuItem, TextField, CardContent, FormControl, Select,
  Typography, Box, FormLabel
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'

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

const UpdateAuthor = () => {
  const [images, setImages] = useState([])
  const [author, setAuthor] = useState({ name: '', information: '' })
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsData = await fetch(`${BASE_URL}/author/${router.query.id}`).then(resp => resp.json())
        setAuthor(authorsData)
        // console.log(authorsData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [])

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
      const resp = await fetch(`${BASE_URL}/author/${author.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      })

      console.log(router.query.id)
      if (resp.ok) {
        alert('Sửa thành công')
      } else {
        alert('Sửa thất bại  1')
      }
    } catch (error) {
      alert('Sửa thất bại 2')
    }
  }

  return (
    <CardContent>
      <form id='author-form' encType='multipart/form-data'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
           <FormLabel>Tên tác giả</FormLabel>
            <StyledTextField name='name' id="name" value={author.name} onChange={(e) => setAuthor({ ...author, name: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormControl fullWidth>
              <FormLabel>Thông tin</FormLabel>
              <StyledTextField name='information' id='information' value={author.information} onChange={(e) => setAuthor({ ...author, information: e.target.value })} />
            </FormControl>
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
                const form = document.getElementById('author-form')
                const formData = new FormData(form)
                postData(formData)
              }}
            >
              Sửa
            </Button>
            <Button type='reset' variant='outlined' color='secondary'
              onClick={() => { document.getElementById('author-form').reset() }}>
              Reset 
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default UpdateAuthor
