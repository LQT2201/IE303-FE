import { Container, Grid, Box, Typography, Divider } from '@mui/material'
import {useState, useEffect} from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DefaultLayout from 'src/layouts/DefaultLayout'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Book from 'src/components/Book'
import {useRouter} from 'next/router'
const BASE_URL ='http://127.0.0.1:8080/api'
const SORT = {
  PRICE_ASC: '{"sort": "ASC", "by": "price"}',
  PRICE_DESC: '{"sort": "DESC", "by": "price"}',
  DATE_ASC: '{"sort": "ASC", "by": "publishDate"}',
  DATE_DESC: '{"sort": "DESC", "by": "publishDate"}',
  TITLE_ASC: '{"sort": "ASC", "by": "title"}',
  TITLE_DESC: '{"sort": "DESC", "by": "title"}'
}
const SearchPage = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  useEffect(() => {
    let {title, genre, sort, by} = router.query
    let query = '?'
    if(title) query = `${query}&title=${title}`
    if(genre) {
      if(typeof genre === 'string') 
        genre = [genre]
      query = `${query}&genre=${genre.join('&genre=')}`
      setSelectedGenres(genre)
    }
    if(sort) query = `${query}&sort=${sort}` 
    if(by) query = `${query}&by=${by}`
    console.log(`${BASE_URL}/book${query}`)
    const fetchData = async () => {
      const fetchGenres = fetch(`${BASE_URL}/genre`).then(res => res.json())
      const fetchBooks = fetch(`${BASE_URL}/book${query}`).then(res => res.json())
      try {
        const [books, genres] = await Promise.all([fetchBooks, fetchGenres])
        setBooks(books)
        setGenres(genres)
      } catch (error) {
        console.log(error)
      }
    } 
    fetchData()
  }, [router.isReady, router.query])
  const handleChange = event => {
    setValue((prev) => {
      router.replace({
        query: {
          ...router.query,
          ...JSON.parse(event.target.value)
        }
      })
      return event.target.value
    })
  }
  return (
    <Box bgcolor='#F0F0F0'>
      <Container maxWidth='lg' sx={{ bgcolor: 'transparent' }}>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Box marginRight={2} marginTop={2.5} bgcolor='white'>
              <Box padding={3}>
                <Typography fontSize={23} fontWeight={700} color='#C92127'>
                  Lọc theo
                </Typography>
                <Divider />
              </Box>
              <Box padding={3} marginTop={3}>
                <Typography fontSize={16} fontWeight={700}>
                  Danh mục
                </Typography>
                <FormGroup sx={{ marginLeft: '5px' }}>
                  {genres.map((genre) => (
                    <FormControlLabel 
                      key={genre.id} 
                      control={<Checkbox />} 
                      label={genre.name}
                      name={genre.name}
                      checked={selectedGenres.includes(genre.name)}
                      onChange={(e) => {
                        if(e.target.checked) {
                          setSelectedGenres((prev) => {
                            const newGenres = [...prev, e.target.name]
                            router.replace({
                              query: {
                                ...router.query,
                                genre: newGenres
                              }
                            })
                            return newGenres
                          })
                        }
                        else {
                          setSelectedGenres((prev) => {
                            const newGenres = prev.filter((val) => val != e.target.name)
                            router.replace({
                              query: {
                                ...router.query,
                                genre: newGenres
                              }
                            })
                            return newGenres
                          })
                        }
                        
                      }}/>
                  ))}
                  
                </FormGroup>
              </Box>
            </Box>
          </Grid>
          <Grid md={9} marginTop={4} sx={{ bgcolor: 'white' }}>
            <Box display='flex' justifyContent='space-between' padding={5}>
              <Typography>
                Kết quả tìm kiếm
              </Typography>
              <Box display='flex'>
                <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                  <InputLabel id='select-small-label'>Sắp xếp theo</InputLabel>
                  <Select
                    labelId='select-small-label'
                    id='select-small'
                    value={value}
                    label='Sắp xếp theo'
                    onChange={handleChange}
                  >
                    <MenuItem value={SORT.PRICE_ASC}>Giá tăng dần</MenuItem>
                    <MenuItem value={SORT.PRICE_DESC}>Giá giảm dần</MenuItem>
                    <MenuItem value={SORT.DATE_DESC}>Mới nhất</MenuItem>
                    <MenuItem value={SORT.DATE_ASC}>Cũ nhất</MenuItem>
                    <MenuItem value={SORT.TITLE_ASC}>Tên A-Z</MenuItem>
                    <MenuItem value={SORT.TITLE_DESC}>Tên Z-A</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Grid container>
              {books && books.map((book) =>(
              <Grid item md={3} marginBottom={2}>
                <Book book={book}/>
              </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}


SearchPage.getLayout = page => <DefaultLayout> {page} </DefaultLayout>

export default SearchPage
