import { Container, Grid } from '@mui/material'
import React from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import page from 'src/pages/test2'

const ProductDetail = (params) => {
    console.log(params)
  return (
    <Container maxWidth="lg">
        <Grid container>
            <Grid item md={5}>
                <Box>
                    
                </Box>
            </Grid>
            <Grid item md={7}>

            </Grid>
        </Grid>
    </Container>
  )
}

ProductDetail.getLayout = page => <DefaultLayout> {page} </DefaultLayout>

export default ProductDetail