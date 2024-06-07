import React from 'react';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BuildIcon from '@mui/icons-material/Build';
import { IconButton } from '@mui/material';
import formater from 'src/utils/formatCurrency';
import { Link } from '@mui/material';
import Swal from 'sweetalert2';

const BASE_URL = 'http://127.0.0.1:8080/api';

const TableBooks = ({ rows, onDelete }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    

      try {
        const response = await fetch(`${BASE_URL}/book/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.ok) {
          Swal.fire("Đã xóa!", "", "success");
          router.reload()

        } else {
          Swal.fire("Lỗi!", "", "error");
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        Swal.fire("Lỗi xay ra trong quá trình xóa!", "", "error");
      }
    
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tên sách</TableCell>
            <TableCell align='center'>Giá</TableCell>
            <TableCell align='center'>Thể loại</TableCell>
            <TableCell align='center'>Tác giả</TableCell>
            <TableCell align='center'>Trong kho</TableCell>
            <TableCell align='center'>Đã bán</TableCell>
            <TableCell align='center'>Thao tác</TableCell>
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
                {row.title}
              </TableCell>
              <TableCell align='center'>{formater.format(row.price)}</TableCell>
              <TableCell align='center'>{row.genre}</TableCell>
              <TableCell align='center'>{row.author}</TableCell>
              <TableCell align='center'>{row.stock}</TableCell>
              <TableCell align='center'>{row.soldQty}</TableCell>
              <TableCell align='center'>
                <Link href={`/admin/books/update/${row.id}`}>
                  <IconButton color='primary'>
                    <BuildIcon sx={{ color: "blue" }} />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handleDelete(row.id)}>
                  <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBooks;
