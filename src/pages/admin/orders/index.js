import { Card, CardContent, CardHeader, Grid,Typography, Button } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link'
import TableOrders from './TableOrders'
import AddBoxIcon from '@mui/icons-material/AddBox';


const Order = () => {
  const createData = (name, calories) => {
    return { name, calories }
  }
  const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  ]

  return (
    <Grid container>
        
        <Grid item xs={12}> 
            <Card>
              <CardContent> 
                
              </CardContent>
              <TableOrders rows={rows} />
            </Card>
        </Grid>
    </Grid> 
  )
}

export default Order