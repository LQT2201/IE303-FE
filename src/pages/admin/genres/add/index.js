// ** React Imports
import { forwardRef, useState } from 'react'

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

import Swal from 'sweetalert2'
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

const AddGenre = () => {
  const router = useRouter()
  const [genre, setGenre] = useState({
    name: '',
    description: '',
  })
  const onChange = (e) => {
    setGenre(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const postData = async() => {
    const token = localStorage.getItem('token')
    try {
      const resp = await fetch('http://127.0.0.1:8080/api/genre', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
      })
      Swal.fire("Thêm thành công", "", "success");
      router.push('/admin/genres')
    } catch (error) {
      alert(error)
    }
    
  }
  return (
    <CardContent>
      <form id='genre-form'>
        <Grid container spacing={7}>
          <Grid item xs={4} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Tên thể loại'
              minRows={1}
              placeholder='Tên thể loại'
              name='name'
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={4} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Mô tả'
              minRows={1}
              placeholder='Mô tả'
              name='description'
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => postData()}>
              Thêm
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default AddGenre
