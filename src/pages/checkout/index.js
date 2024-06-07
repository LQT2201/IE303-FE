import {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import formater from 'src/utils/formatCurrency';
import DefaultLayout from 'src/layouts/DefaultLayout'
import {
  Input,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  CardMedia,
  Button
} from '@mui/material'
import Swal from 'sweetalert2';

const getToken = () => {
  return localStorage.getItem('token')
}
const BASE_URL = 'http://127.0.0.1:8080/api'
export default function Checkout() {
  const router = useRouter()
  const handleClick = async() => {
    const resp = await fetch(`${BASE_URL}/order/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: address
    })
    if(resp.status == 200) {
      Swal.fire("Đặt hàng thành công", "", "success");
      router.push('/')
    }
  }
  const [token, setToken] = useState('')
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState('')
  
  const updateCart = async (newCart) => {
    await fetch(`${BASE_URL}/user/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCart)
    })
  }
  useEffect(() => {
    if(typeof window !== 'undefined'){
      const tok = getToken()
      setToken(tok)
      const fetchUser = async () => {
        try {
          const cart = await fetch(`${BASE_URL}/user/cart`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tok}`
            }
          }).then(res => res.json())
          setCart(cart)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
    }
  }, [])
  return (
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Box sx={{ borderBottom: '1px solid #ced4da' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Thông tin giao hàng</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Grid item md={3}>
            <Typography> Địa chỉ: </Typography>
          </Grid>
          <Grid item md={9}>
            <Input 
              type='text' 
              placeholder='Địa chỉ' 
              fullWidth 
              onChange={(e) => setAddress(e.target.value)}
            >
            </Input>
          </Grid>
        </Box>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Box sx={{ borderBottom: '1px solid #ced4da' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Kiểm tra lại đơn hàng</Typography>
        </Box>
        <Box>
        {cart.map((item, i) => {
            return (
              <Box key={i} marginTop={3} marginRight={4} bgcolor="white" borderRadius={1}>
                <Box display="flex" padding={4}>
                  <Box flexBasis="16%">
                    <Box
                      overflow="hidden"
                      width="120px"
                      height="120px"
                      component="img"
                      src={item.image}
                    />
                  </Box >
                  <Box display="flex" flexBasis="68%">
                    <Box display="flex" flexBasis="60%" flexDirection="column" justifyContent="space-between">
                      <Typography fontSize={14}>
                        {item.title}
                      </Typography>
                      <Typography fontWeight={700}>
                        {formater.format(item.price)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box flexBasis="28%" display="flex" alignItems="center" justifyContent="space-between">
                    <input id={`item-${item.itemId}`} type='number' defaultValue={item.quantity} name='quantity'
                      onChange={async (e) => {
                        const id = e.target.id.split('-')[1]
                        const newCart = cart.map(v => {
                          if (v.itemId != id)
                            return v
                          return {
                            ...v,
                            quantity: e.target.value
                          }
                        })
                        await updateCart(newCart)
                        setCart(newCart)
                      }} />
                    <button id={item.itemId} type='submit' onClick={async (e) => {
                      const newCart = cart.filter(v => v.itemId != e.target.id)
                      await updateCart(newCart)
                      setCart(newCart)
                    }}>Loại bỏ</button>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'row-reverse',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Button
          sx={{
            color: '#fff',
            background: '#C92127',
            width: 220,
            height: 44,
            transition: 'background-color 0.3s ease',
            ':hover': {
              cursor: 'pointer',
              background: '#f55207'
            }
          }}
          onClick={handleClick}
        >
          Xác nhận đặt hàng
        </Button>
      </Grid>
    </Container>
  )
}
Checkout.getLayout = page => <DefaultLayout> {page} </DefaultLayout>
