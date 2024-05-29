// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import {  useRouter } from 'next/router'
import Swal from 'sweetalert2'


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
const BASE_URL = 'http://127.0.0.1:8080/api/genre'
const UpdateGenre = () => {
  const router = useRouter()
  const [genre, setGenre] = useState({})
  useEffect(() => {
    const f = async () => {
      const genre = await fetch(`${BASE_URL}/${router.query.id}`).then(r => r.json())
      setGenre(genre)
    }
    if (router.query.id)
      f().catch(err => console.log(err))
  }, [router.query.id])
  const handleChange = (e) => {
    setGenre((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleClick = async() => {
    const token = localStorage.getItem('token')
    await fetch(`${BASE_URL}?id=${genre.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: genre.name,
        description: genre.description
      })
    })

    Swal.fire("Sửa thành công", "", "success");
    router.push('/admin/genres')
  }
  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={4} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
             
              minRows={1}
              defaultValue={genre.name}
              name='name'
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={4} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              
              minRows={1}
              name='description'
              defaultValue={genre.description}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleClick}>
              Thêm
            </Button>
            <Button type='reset' variant='outlined' color='secondary' >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default UpdateGenre
