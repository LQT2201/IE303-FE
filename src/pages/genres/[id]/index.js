import { Container, Grid, Box, Button, Typography, Rating, CardMedia } from '@mui/material'
import Icon from '@mdi/react'
import { mdiCartOutline } from '@mdi/js'
import 'react-multi-carousel/lib/styles.css'
import React from 'react'
import Book from 'src/components/Book'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { useRouter } from 'next/router'

const BASE_URL = 'http://127.0.0.1:8080/api'
const Genre = params => {
  const router = useRouter()
  const [genre, setGenre] = React.useState(null)
  const [books, setBooks] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  React.useEffect(() => {
    const fetching = async() => {
      if(router.query.id) {
        try{
          const genre = await fetch(`${BASE_URL}/genre/${router.query.id}`).then(resp => resp.json())
          const fetchBooks = await fetch(`${BASE_URL}/book?genre=${genre.name}`).then(resp => resp.json())
          setGenre(genre)
          setBooks(fetchBooks)
          setIsLoading(false)
        } catch (error) {
          setError(true)
        }
      }
    }
    fetching()
  },[router.query.id])
  
  if(error) 
    return (
    <p>Không tìm thấy thể loại sách</p>
    )
  if(isLoading) 
    return (
      <p>Đang tải</p>
    )
  return (
    <Container maxWidth='lg'>
      <Grid container sx={{ backgroundColor: '#ffffff' }}>
        <Grid item md={5}>
          <Box>
            <h2>
              {genre.name}
            </h2>
            <p>
              {genre.description}
            </p>
          </Box>
        </Grid>
      </Grid>
      {books.map((book) => (<Book key={book.id} book={book}/>))}
    </Container>
  )
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

Genre.getLayout = page => <DefaultLayout> {page} </DefaultLayout>

export default Genre
