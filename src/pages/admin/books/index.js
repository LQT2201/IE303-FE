import { Button, Card, CardContent, CardHeader, Grid,Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';
import TableBooks from './TableBooks';
import AddBoxIcon from '@mui/icons-material/AddBox';


const Book = () => {
  const [books, setBooks] = React.useState([])
  React.useEffect(() => {
    const fetchBook = async() => {
      const books = await fetch('http://127.0.0.1:8080/api/book').then(resp => resp.json())
      setBooks(books)
    }
    fetchBook().catch(error => console.log(error))
  }, [books])
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
            <TableBooks rows={books} />
            </Card>
        </Grid>
    </Grid>
  )
}

export default Book