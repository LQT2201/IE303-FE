import { Button, Card, CardContent, CardHeader, Grid,Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';
import TableAuthors from './TableAuthors';
import AddBoxIcon from '@mui/icons-material/AddBox';


const Author = () => {
  const [authors, setAuthors] = React.useState([])
  React.useEffect(() => {
    const fetchAuthor = async() => {
      const authors = await fetch('http://127.0.0.1:8080/api/author').then(resp => resp.json())
      
      setAuthors(authors)
    }
    fetchAuthor().catch(error => console.log(error))
  }, [])

  console.log(authors)
  
  return (
    <Grid container>
        <Grid item xs={12}> 
            <Card>
              <CardContent>
                <Link href='/admin/authors/add'> 
                  <Button>
                    <AddBoxIcon/>
                    Thêm tác giả
                  </Button>
                </Link>
              </CardContent>
            <TableAuthors rows={authors} />
            </Card>
        </Grid>
    </Grid>
  )
}

export default Author