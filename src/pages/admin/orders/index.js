import { Card, CardContent, CardHeader, Grid,Typography, Button } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link'
import TableOrders from './TableOrders'
import AddBoxIcon from '@mui/icons-material/AddBox';


const Order = () => {
  const [orders, setOrders] = React.useState([])
  React.useEffect(() => {
    const f = async() => {
      if(typeof window !== 'undefined'){
        const tok = localStorage.getItem('token')
        const orders = await fetch('http://127.0.0.1:8080/api/order/all').then(r => r.json())
        setOrders(orders)
      }
    }
    f().catch(err => console.log(err))
  }, [])

  return (
    <Grid container>
        
        <Grid item xs={12}> 
            <Card>
              <CardContent> 
                
              </CardContent>
              <TableOrders rows={orders} />
            </Card>
        </Grid>
    </Grid> 
  )
}

export default Order