// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BuildIcon from '@mui/icons-material/Build';
import { Box, IconButton } from '@mui/material'
import formater from 'src/utils/formatCurrency'
import { Link } from '@mui/material'

const TableAuthors = ({rows}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tên tác giả</TableCell>
            <TableCell align='center'>Giá</TableCell>
            <TableCell align='center'>Thông tin</TableCell>
            <TableCell align='center'>Ảnh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.information}</TableCell>
              <TableCell align='center'>
                <Box sx={{width:"50px", height:"50px"}} component="img" src={row.image}>

                </Box>
              </TableCell>
              <TableCell align='center'> 
                <Link href={`/admin/authors/update/${row.id}`}>
                    <IconButton color='red'>
                        <BuildIcon sx={{color:"blue"}}/>
                    </IconButton>
                </Link>
                <IconButton>
                  <DeleteForeverIcon sx={{color:"red"}}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableAuthors
