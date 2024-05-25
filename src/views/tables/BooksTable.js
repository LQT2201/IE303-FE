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


const BooksTable = ({headTables}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {headTables.map(head => (
              <TableCell align='center' key={head}> {head}</TableCell>
            ))}
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
              <TableCell align='center' component='th' scope='row'>
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
                <IconButton color='red'>
                  <BuildIcon sx={{color:"blue"}}/>
                </IconButton>
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

export default BooksTable
