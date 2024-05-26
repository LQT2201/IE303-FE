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
import { IconButton } from '@mui/material'
import formater from 'src/utils/formatCurrency'
import { Link } from '@mui/material'

const TableBooks = ({rows}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tên sách</TableCell>
            <TableCell align='center'>Giá</TableCell>
            <TableCell align='center'>Giá sale</TableCell>
            <TableCell align='center'>Thể loại</TableCell>

            <TableCell align='center'>Tác giả</TableCell>
            <TableCell align='center'>Trong kho</TableCell>
            <TableCell align='center'>Đã bán</TableCell>
            <TableCell align='center'>Đánh giá</TableCell>
            <TableCell align='center'>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center'>{formater.format(row.calories)}</TableCell>
              <TableCell align='center'>{formater.format(row.calories)}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>{row.protein}</TableCell>
              <TableCell align='center'>{row.calories}</TableCell>
              <TableCell align='center'>{row.fat}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'> 
                <Link href={`/admin/books/update/${1}`}>
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

export default TableBooks
