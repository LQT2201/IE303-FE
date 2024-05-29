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

const TableOrders = ({rows}) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell align='center'>Khách hàng</TableCell>
            <TableCell align='center'>Ngày tạo</TableCell>
            <TableCell align='center'>Trạng thái</TableCell>
            <TableCell align='center'>Tổng tiền</TableCell>
            <TableCell align='center'>Địa chỉ</TableCell>
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
                {row.id}
              </TableCell>
              <TableCell align='center'>{row.username}</TableCell>
              <TableCell align='center'>{row.orderAt}</TableCell>
              <TableCell align='center'>
                {row.orderStatus}</TableCell>
              <TableCell align='center'>{row.totalPrice}</TableCell>
              <TableCell align='center'>{row.shippingAddress}</TableCell>
              <TableCell align='center'> 
                <Link href={`/admin/orders/update/${row.id}`}>
                    <IconButton color='red'>
                        <BuildIcon sx={{color:"blue"}}/>
                    </IconButton>
                </Link>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableOrders
