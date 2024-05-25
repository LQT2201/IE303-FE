import { Card, CardHeader, Grid,Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link'
import TableBasic from 'src/views/tables/TableBasic'


const Genre = () => {
  const headTables = ["Tên thể loại", "Ảnh", "Thao tác"]
  const createData = (name, calories) => {
    return { name, calories }
  }
  const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ]

  return (
    <Grid container>
        
        <Grid item xs={12}> 
            <Card>
            <CardHeader title='Thể loại' titleTypographyProps={{ variant: 'h6', color:""}} />
            <TableBasic headTables={headTables} rows={rows} />
            </Card>
        </Grid>
    </Grid>
  )
}

export default Genre