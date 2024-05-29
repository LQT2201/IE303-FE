// ** React Imports
import { useState, useEffect } from 'react'
import router from 'next/router';
import Link from 'next/link'
// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
// ** Icons Imports
import Grid from '@mui/material/Grid'
import DefaultLayout from 'src/layouts/DefaultLayout'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import formater from 'src/utils/formatCurrency'
import { Card, Container, Typography } from '@mui/material';

const BASE_URL = 'http://127.0.0.1:8080/api'
const ProfileOrder = () => {
  // ** State
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])
  let token = null
  useEffect(() => {
    if (typeof window !== 'undefined')
      token = localStorage.getItem('token')
    if (token == null)
      router.push('/pages/login')
    const fetchOrders = async () => {
      try {
        const orders = await fetch(`${BASE_URL}/user/order`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json())
        setOrders(orders)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  }, [])
  if (isLoading)
    return <p>Đang tải</p>
  return (
    <Container>
      <Grid container marginTop={30}>
      <Grid item xs={12} sm={3} bgcolor="white" borderRight={"red"}>
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
      <Grid item sm={1}></Grid>
      <Grid item xs={12} sm={8}>
      <TableContainer >
      <Card>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell align='center'>Ngày đặt</TableCell>
            <TableCell align='center'>Trạng thái</TableCell>
            <TableCell align='center'>Tổng tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow
              key={order.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {order.id}
              </TableCell>
              <TableCell align='center'>{new Date(order.orderAt).toISOString().slice(0,10)}</TableCell>
              <TableCell align='center'>{order.orderStatus}</TableCell>
              <TableCell align='center'>{formater.format(order.totalPrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Card>
    </TableContainer>
      </Grid>
    </Grid>
    </Container>
  )
}
ProfileOrder.getLayout = page => <DefaultLayout> {page} </DefaultLayout>
export default ProfileOrder
