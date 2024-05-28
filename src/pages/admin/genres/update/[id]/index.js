// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
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
import { router, useRouter } from 'next/router'
// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Typography, Box } from '@mui/material'


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
