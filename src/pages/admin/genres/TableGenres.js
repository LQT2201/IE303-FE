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
import { IconButton, Link } from '@mui/material'
import formater from 'src/utils/formatCurrency'


const TableGenres = ({rows}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tên thể loại sách</TableCell>
            <TableCell align='center'>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
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
              <TableCell align='center'> 
                <Link href={`/admin/genres/update/${row.name}`}>
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

export default TableGenres
