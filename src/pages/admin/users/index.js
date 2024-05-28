import { Card, CardContent, CardHeader, Grid,Typography, Button } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link'
import TableUsers from './TableUsers'
import AddBoxIcon from '@mui/icons-material/AddBox';


const Order = () => {
  const [users, setUser] = React.useState([])
  React.useEffect(() => {
    const f = async() => {
      const users = await fetch('http://127.0.0.1:8080/api/user/all').then(r => r.json())
      setUser(users)
    }
    f().catch(err => console.log(err))
  }, [])

  return (
    <Grid container>
        
        <Grid item xs={12}> 
            <Card>
              <CardContent> 
                
              </CardContent>
              <TableUsers rows={users} />
            </Card>
        </Grid>
    </Grid> 
  )
}

export default Order