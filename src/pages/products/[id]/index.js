import { Container, Grid, Box, Button, Typography, Rating, CardMedia } from '@mui/material';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import Card from '@mui/material/Card';
import Swal from 'sweetalert2';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect } from 'react';
import Book from 'src/components/Book';
import DefaultLayout from 'src/layouts/DefaultLayout';
import formater from 'src/utils/formatCurrency';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const BASE_URL = 'http://127.0.0.1:8080/api';

const getToken = () => {
  return localStorage.getItem('token');
};

const ProductDetail = (params) => {
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const updateCart = (token, newCart) => {
    return fetch(`${BASE_URL}/user/cart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCart),
    });
  };

  const getCart = (token) => {
    return fetch(`${BASE_URL}/user/cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  };

  const upsert = (cart) => {
    const itemIndex = cart.findIndex((item) => item.itemId === book.id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({ itemId: book.id, quantity: 1 });
    }
  };

  const buyNow = async () => {
    const token = getToken();
    if (!token) {
      router.push('/pages/login');
      return;
    }
    try {
      const cart = await getCart(token);
      upsert(cart);
      await updateCart(token, cart);
      router.push('/checkout');
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    const token = getToken();
    if (!token) {
      router.push('/pages/login');
      return;
    }
    try {
      const cart = await getCart(token);
      upsert(cart);
      await updateCart(token, cart);
      Swal.fire('Thêm vào giỏ hàng', '', 'success');
    } catch (error) {
      console.log(error);
    }
  };
  const [author, setAuthor] = useState(null)
  useEffect(() => {
    const fetchBookData = async () => {
      if (!router.query.id) return;

      try {
        const bookResponse = await fetch(`${BASE_URL}/book/${router.query.id}`);
        const bookData = await bookResponse.json();
        setBook(bookData);
        const relatedBooksResponse = await fetch(`${BASE_URL}/book?genre=${bookData.genre}`);
        const relatedBooksData = await relatedBooksResponse.json();
        setRelatedBooks(relatedBooksData);
        const authors = await fetch(`${BASE_URL}/author`).then(res => res.json())
        console.log(authors)
        for(const author of authors) {
          if(author && (author.name == bookData.author)) {
            setAuthor(author)
            break
          }
        }
        const recommendationsResponse = await fetch(
          `${BASE_URL}/recommend?numberOfRecommendations=3`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
          }
        );
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData);

        // console.log(recommendations)

        setIsLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };

    fetchBookData();
  }, [router.query.id]);

  if (error) {
    return <p>Không tìm thấy sản phẩm</p>;
  }

  if (isLoading) {
    return <p>Đang tải</p>;
  }

  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: '10px' }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/search">
          Sản phẩm
        </Link>
        <Typography color="text.primary">{book.title}</Typography>
      </Breadcrumbs>
      <Grid container sx={{ backgroundColor: '#ffffff' }}>
        <Grid item md={5} padding={5}>
          <Box>
            <Box sx={{ width: '400px', height: '400px' }} marginBottom={5}>
              <img width={400} height={400} src={book.images[0]} />
            </Box>
            <Box>
              <Carousel responsive={responsive}>
                {book.images.map((img) => (
                  <img key={img} height="150" src={img} />
                ))}
              </Carousel>
            </Box>
          </Box>
        </Grid>
        <Grid item md={7}>
          <Box>
            <Typography lineHeight={2.5} color="#C92127" fontSize={27} fontWeight={700}>
              {book.title}
            </Typography>
          </Box>
          <Box>
            <Grid item md={6}>
              <Link href={`/author/${author ? author.id : ''}`}>
                <p>Tác giả {`${book.author}`}</p>
              </Link>
            </Grid>
            <Grid item md={6}>
              <p>Nhà xuất bản: {book.publisher}</p>
            </Grid>
          </Box>
          <Box>Thông tin: {book.description}</Box>
          <Box display="flex">
            <Typography color="#C92127" fontWeight={600} fontSize={24}>
              {formater.format(book.price)}
            </Typography>
            <Typography
              sx={{ textDecoration: 'line-through' }}
              component="span"
              color="#888888"
              fontSize={20}
              fontWeight={400}
              marginLeft={10}
              alignItems={'center'}
              textAlign={'center'}
              display={'flex'}
            ></Typography>
            <Box sx={{ display: 'flex' }} fontWeight={600} marginLeft={3}>
              Số lượng: {book.stock}
            </Box>
          </Box>
          <Box display={'flex'} sx={{ marginTop: 5, marginBottom: 5 }}>
            <Grid item md={6}>
              <Button
                sx={{
                  color: '#C92127',
                  background: '#fff',
                  border: '2px solid #C92127',
                  width: 220,
                  height: 44,
                }}
                onClick={addToCart}
              >
                <Icon path={mdiCartOutline} size={1} />
                Thêm vào giỏ hàng
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                sx={{
                  color: '#fff',
                  background: '#C92127',
                  width: 220,
                  height: 44,
                  transition: 'background-color 0.3s ease',
                  ':hover': {
                    cursor: 'pointer',
                    background: '#f55207',
                  },
                }}
                onClick={buyNow}
              >
                Mua ngay
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ backgroundColor: '#ffffff', marginTop: 10 }}>
        <Typography fontSize={20} fontWeight={600} padding={5}>
          Sản phẩm liên quan
        </Typography>
        <Grid container marginTop={5}>
          {relatedBooks.map((relatedBook) => (
            <Grid item md={2.4} key={relatedBook.id}>
              <Book book={relatedBook} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container sx={{ backgroundColor: '#ffffff', marginTop: 10 }}>
        <Typography fontSize={20} fontWeight={600} padding={5}>
          Gợi ý sản phẩm
        </Typography>
        <Grid container marginTop={5}>
          {recommendations.map((recommendedBook) => (
            <Grid item md={2.4} key={recommendedBook.id}>
              <Book book={recommendedBook} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

ProductDetail.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ProductDetail;
