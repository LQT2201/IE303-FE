import { Container, Grid, Box, Typography, Divider, Button, Link } from '@mui/material'
import router from 'next/router';
import { useEffect, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import formater from 'src/utils/formatCurrency';

const getToken = () => {
  return localStorage.getItem('token')
}
const BASE_URL = 'http://127.0.0.1:8080/api'
const CartPage = () => {
  const [token, setToken] = useState('')
  const [cart, setCart] = useState([])

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
    if(typeof window !== 'undefined') {
      const tok = getToken()
      setToken(tok)
      if(tok == null)
        router.push('/pages/login')
      const fetchUser = async () => {
        try {
          const cart = await fetch(`${BASE_URL}/user/cart`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tok}`
            }
          }).then(res => res.json())
          setCart(cart)
          console.log(cart)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
    }
      
    
  }, [])
  return (
    <Container sx={{ marginTop: "80px" }}>
      <Grid container>
        <Grid item md={8}>
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

        </Grid>
        <Grid item md={4} >
          <Box marginTop={2} id="order_summary" sx={{ background: "white" }} borderRadius="10px" padding={4}>
            <p>
              Số lượng:{" "}
              <span className="order-summary-values">
                {cart.reduce((acc, curr) => acc + curr.quantity, 0)} sản phẩm
              </span>
            </p>
            <Typography component="span" fontWeight={700}>
              Tổng số tiền:{" "} {formater.format(cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0))}
            </Typography>
          </Box>
          <Link href='/checkout'>
            <Box textAlign="center" width="100%" margin="0 auto">
              <Button sx={{ margin: "0 auto", bgcolor: "#CC0000", color: "white", width: "100%", fontSize: "20px", fontWeight: 700 }}
              >
                Thanh Toán
              </Button>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

CartPage.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default CartPage