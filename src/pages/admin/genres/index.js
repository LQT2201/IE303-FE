import { Card, CardContent, CardHeader, Grid,Typography, Button } from '@mui/material'
import {useEffect, useState} from 'react'
import Link from '@mui/material/Link'
import TableGenres from './TableGenres'
import AddBoxIcon from '@mui/icons-material/AddBox';
import {router} from 'next/router'

const Genre = () => {
  const [genres, setGenres] = useState([])
  useEffect(() => {
    const f = async() => {
      const genres = await fetch('http://127.0.0.1:8080/api/genre').then(r => r.json())
      setGenres(genres)
    }
    f().catch(err => console.log(err))
  }, [])
  return (
    <Grid container>
        
        <Grid item xs={12}> 
            <Card>
              <CardContent> 
                <Link href='/admin/genres/add'> 
                  <Button>
                    <AddBoxIcon/>
                    Thêm thể loại mới
                  </Button>
                </Link>
              </CardContent>
              <TableGenres rows={genres} />
            </Card>
        </Grid>
    </Grid> 
  )
}

export default Genre