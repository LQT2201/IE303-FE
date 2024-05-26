import { Button, Card, CardContent, CardHeader, Grid,Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';
import TableBooks from './TableBooks';
import AddBoxIcon from '@mui/icons-material/AddBox';


const Book = () => {

  const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein }
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ]

  return (
    <Grid container>
        
        <Grid item xs={12}> 
            <Card>
              <CardContent>
                <Link href='/admin/books/add'> 
                  <Button>
                    <AddBoxIcon/>
                    Thêm sách mới
                  </Button>
                </Link>
              </CardContent>
            <TableBooks rows={rows} />
            </Card>
        </Grid>
    </Grid>
  )
}

export default Book