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

const UpdateBook = () => {
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
            <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
                <TextField
                fullWidth
                multiline
                label='Tên sách'
                minRows={1}
                placeholder='Tên sách'
             />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <TextField fullWidth label='Tác giả' placeholder='Tác giả' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type='number' label='Giá sách' placeholder='Giá gốc' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type='number' label='Giá Sale' placeholder='Giá giảm' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Thể loại</InputLabel>
              <Select
                multiple
                defaultValue={['English']}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Languages' id='select-multiple-language' />}
              >
                <MenuItem value='English'>Sách cấm</MenuItem>
                <MenuItem value='French'>@ten</MenuItem>
                <MenuItem value='Spanish'>Sách người lớn</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Trong kho' placeholder='Số lượng sản phẩm' />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
                <TextField
                fullWidth
                multiline
                label='Mô tả'
                minRows={3}
                placeholder='Mô tả sách'
             />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Thêm ảnh
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
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

export default UpdateBook
