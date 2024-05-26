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

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Typography, Box} from '@mui/material'

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

const UpdateGenre = () => {
  // ** State
  const [date, setDate] = useState(null)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  
  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
            <Grid item xs={4} sx={{ marginTop: 4.8 }}>
                <TextField
                fullWidth
                multiline
                label='Tên thể loại'
                minRows={1}
                placeholder='Tên thể loại'
             />
          </Grid>
          

          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled color='error' component='label' variant='outlined' htmlFor='account-settings-upload-image'>
                  Chọn ảnh
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Chỉ cho phép PNG hoặc JPEG. Kích thước tối đa 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
       
          
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Thêm
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default UpdateGenre
