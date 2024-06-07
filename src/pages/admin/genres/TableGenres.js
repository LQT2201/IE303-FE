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
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const BASE_URL = 'http://127.0.0.1:8080/api';

const TableGenres = ({rows, onDelete}) => {

  const router = useRouter();

  const handleDelete = async (id) => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`${BASE_URL}/genre/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.ok) {
          Swal.fire("Đã xóa!", "", "success");
          router.reload()
        } else {
          
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        
      }
    
  };

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
                <Link href={`/admin/genres/update/${row.id}`}>
                    <IconButton color='red'>
                    <BuildIcon sx={{color:"blue"}}/>
                    </IconButton>
                </Link>
                <IconButton onClick={() => handleDelete(row.id)}>
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
