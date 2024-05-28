import { Container, Grid, Box, Button, Typography, Rating, CardMedia } from '@mui/material'
import Icon from '@mdi/react'
import { mdiCartOutline } from '@mdi/js'
import 'react-multi-carousel/lib/styles.css'
import React from 'react'
import Book from 'src/components/Book'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { useRouter } from 'next/router'

const BASE_URL = 'http://127.0.0.1:8080/api'
const Author = params => {
  const router = useRouter()
  const [author, setAuthor] = React.useState(null)
  const [books, setBooks] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  React.useEffect(() => {
    const fetching = async () => {
      if (router.query.id) {
        try {
          const author = await fetch(`${BASE_URL}/author/${router.query.id}`).then(resp => resp.json())
          const fetchBooks = await fetch(`${BASE_URL}/book?author=${author.name}`).then(resp => resp.json())
          setAuthor(author)
          setBooks(fetchBooks)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setError(true)
        }
      }
    }
    fetching()
  }, [router.query.id])

  if (error)
    return (
      <p>Không tìm thấy tác giả</p>
    )
  if (isLoading)
    return (
      <p>Đang tải</p>
    )
  return (
    <Container maxWidth='lg'>
      <Grid container sx={{ backgroundColor: '#ffffff' }}>
        <Grid item md={5}>
          <Box>
            {author.name}
          </Box>
          <Box>
            {author.information}
          </Box>
          <Box>
            <CardMedia
              component='img'
              src={author.image}
            />
          </Box>
        </Grid>
      </Grid>
      {books.map((book) => (<Book key={book.id} book={book} />))}
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

Author.getLayout = page => <DefaultLayout> {page} </DefaultLayout>

export default Author
