import { Box } from '@mui/material'
import React from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import Banner from 'src/layouts/components/Banner'
import FlashSale from 'src/layouts/components/FlashSale'
import Category from 'src/components/Category'
import LatestBook from 'src/components/LatestBook'


const HomePage = () => {
  const books = [
    {
      id:2,
      bookName:"Tuổi Thơ Dữ Dội - Tập 1 (Tái Bản 2019)",
      salePrice: 15000,
      oldPrice: 20000, 
      rating:4,
      soldQty: 100,
      image: "https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg"
    },
    {
      id:1,
      bookName:"Tuổi Thơ Dữ Dội - Tập 2 (Tái Bản 2020)",
      salePrice: 16000,
      oldPrice: 20000, 
      rating:5,
      soldQty: 100,
      image: "https://cdn0.fahasa.com/media/catalog/product/t/b/tbnhs6_1.jpg"
    }
  ]
  
  return (
    <Box>
      <Banner/>
      <Category/>
      <LatestBook books={books}/>
    </Box>
  )
}

HomePage.getLayout  = page => <DefaultLayout>{page}</DefaultLayout>

export default HomePage