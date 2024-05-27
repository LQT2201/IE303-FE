import { Container, Grid, Box, Typography, Divider } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField'
import DefaultLayout from 'src/layouts/DefaultLayout'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const SearchPage = () => {
  const [value, setValue] = React.useState('')
  const [price1, setPrice1] = React.useState(0)
  const [price2, setPrice2] = React.useState(10000000000)
  const [checked, setChecked] = React.useState(true)
  const [checked1, setChecked1] = React.useState(true)

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleCheck = event => {
    setChecked(event.target.checked)
  }

  const handleCheck1 = e => {
    setChecked1(e.target.checked)
  }
  return (
    <Box bgcolor='#F0F0F0'>
      <Container maxWidth='lg' sx={{ bgcolor: 'transparent' }}>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Box marginRight={2} marginTop={2.5} bgcolor='white'>
              <Box padding={3}>
                <Typography fontSize={23} fontWeight={700} color='#C92127'>
                  Lọc theo
                </Typography>
                <Divider />
              </Box>

              <Box padding={3}>
                <Typography fontSize={16} fontWeight={700}>
                  Giá
                </Typography>
                <FormGroup sx={{ marginLeft: '5px' }}>
                  <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheck} />}
                    label='0đ - 150,000đ'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checked1} onChange={handleCheck1} />}
                    label='150,000đ - 300,000đ'
                  />
                </FormGroup>
                <Divider />
                <Typography fontSize={13} fontWeight={400}>
                  Hoặc chọn mức giá phù hợp
                </Typography>
                <Box justifyContent='space-between' marginTop={2}>
                  <TextField
                    sx={{ width: '100px', height: '10px' }}
                    id='outlined-controlled'
                    value={price1}
                    onChange={event => {
                      setPrice1(event.target.value)
                    }}
                  />
                  <span> - </span>
                  <TextField
                    sx={{ width: '100px', height: '0px' }}
                    id='outlined-controlled'
                    value={price2}
                    onChange={event => {
                      setPrice2(event.target.value)
                    }}
                  />
                </Box>
              </Box>

              <Box padding={3} marginTop={3}>
                <Typography fontSize={16} fontWeight={700}>
                  Danh mục
                </Typography>
                <FormGroup sx={{ marginLeft: '5px' }}>
                  <FormControlLabel control={<Checkbox />} label='Danh muc 1' />
                  <FormControlLabel control={<Checkbox />} label='Danh muc 2' />
                </FormGroup>
              </Box>
            </Box>
          </Grid>
          <Grid md={9} marginTop={4} sx={{ bgcolor: 'white' }}>
            <Box display='flex' justifyContent='space-between' padding={5}>
              <Typography>
                Kết quả tìm kiếm: <strong> sach hay</strong>
              </Typography>
              <Box display='flex'>
                <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                  <InputLabel id='select-small-label'>Sắp xếp theo</InputLabel>
                  <Select
                    labelId='select-small-label'
                    id='select-small'
                    value={value}
                    label='Sắp xếp theo'
                    onChange={handleChange}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Giá tăng dần</MenuItem>
                    <MenuItem value={20}>Giá giảm dần</MenuItem>
                    <MenuItem value={30}>Mới nhất</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Grid container>
              {/* <Grid item md={3} marginBottom={2}>
                <Book />
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const sort_by = [
  { label: 'Giá tăng dần', value: 2009 },
  { label: 'Giá giảm dần', value: 1975 }
]

SearchPage.getLayout = page => <DefaultLayout> {page} </DefaultLayout>

export default SearchPage
