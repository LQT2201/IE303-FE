// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import CardContent from '@mui/material/CardContent'
// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import DefaultLayout from 'src/layouts/DefaultLayout'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import router from 'next/router';
import Link from 'next/link'
import { Container, Typography } from '@mui/material'

const BASE_URL = 'http://127.0.0.1:8080/api'
const Profile = () => {
  // ** State
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    console.log(`Bearer ${token}`)
    const resp = await fetch(`${BASE_URL}/auth/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: password
      })
    })
    if (resp.status == 200) alert('Đổi mật khẩu thành công')
    else alert('Đổi mật khẩu thất bại')
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tok = localStorage.getItem('token')
      if(tok == null)
        router.push('/pages/login')
      setToken(tok)
      const fetchUser = async () => {
        try {
          const user = await fetch(`${BASE_URL}/user/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tok}`
            }
          }).then(res => res.json())
          setUser(user)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
    }
  }, [])
  if (isLoading)
    return <p>Đang tải</p>
  return (
    <Container sx={{marginTop:5}}>
      <Grid container marginTop={30}>
      <Grid item xs={12} sm={4} bgcolor="white">
        <Link href='/profile'>
          <Box sx={{cursor:"pointer"}} padding={5}>
            <Typography >
            Tài khoản
            </Typography>
          </Box>
        </Link>
        <Link href='/profile/order'>
          <Box sx={{cursor:"pointer"}} padding={5}>
            Đơn hàng
          </Box>
        </Link>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardContent>
            <form>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={6}>
                  <TextField disabled fullWidth label='Username' defaultValue={user.username} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Password' type="password" defaultValue='' onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleClick}>
                    Lưu
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary'>
                    Đặt lại
                  </Button>
                  <Button variant='contained' sx={{ marginLeft: 4 }} onClick={() => {
                    localStorage.removeItem('token')
                    router.push('/')
                  }}>
                    Đăng xuất
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Container>
  )
}
Profile.getLayout = page => <DefaultLayout> {page} </DefaultLayout>
export default Profile
