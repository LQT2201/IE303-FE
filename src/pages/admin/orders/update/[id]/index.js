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
import formater from 'src/utils/formatCurrency'

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
            <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
                <TextField
                fullWidth
                disabled
                label='Mã đơn hàng'
                minRows={1}
                value={"#1234"}
             />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
            <TextField disabled fullWidth label='Ngày tạo' value={"22-01-22"}/>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
            <TextField disabled fullWidth label='Khách hàng' value={"Nguyễn Văn A"}/>
          </Grid>
        
          <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
            <TextField disabled fullWidth label='Tổng tiền' value={formater.format(189)} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Trạng thái đơn hàng</InputLabel>
              <Select
                multiple
                defaultValue={['notUpdate']}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Languages' id='select-multiple-language' />}
              >
                <MenuItem value='notUpdate'>Chưa cập nhật</MenuItem>
                <MenuItem value='French'>Đang giao</MenuItem>
                <MenuItem value='Spanish'>Đã giao</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          
         
          
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Cập nhật
            </Button>

          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default UpdateBook
