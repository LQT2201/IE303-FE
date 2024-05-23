import { Box, Container, Grid, Stack } from '@mui/material';
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner2 = () => {

   const banners = [
        "https://cdn0.fahasa.com/media/magentothem/banner7/MCBookT524_bannerSlide_840x320.jpg", 
        "https://cdn0.fahasa.com/media/magentothem/banner7/SieeuSale_Week2_T524_Banner_Slide_840x320.jpg",
    ]
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    
      const images = [
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/SieeuSale_Week2_T524_Banner_SmallBanner_310x210.jpg",
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/NgoaiVan_SmallBannerT5_310x210_4_1.jpg",
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/VPPSiT424_Small_310x210PNG.jpg",
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/TanVietT524_BannerSmallBanner_310x210.jpg",
      ]

  return (
    <Container maxWidth="lg">
        <Grid container mt={10} height={320}>
            <Grid item md={8}>
                <Carousel
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {banners.map((banner) => (
                        <Box key={banner} height="100%" width="100%" overflow="hidden" style={{ borderRadius: '8px', padding: ' 10px 10px 10px 0px', margin: '5px 5px 5px 0px' }}>
                            <img src={banner} alt="Banner" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                        </Box>
                    ))}
                </Carousel>
            </Grid>
            <Grid item md={4}>
                <Box display="flex" flexDirection="column">
                    <Box  overflow="hidden" style={{ borderRadius: '8px', padding: '5px', margin: '5px 0 0 5px' }}>
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/KoTienMat_T424_Sub_392x156.jpg" alt="Image 1" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </Box>
                    <Box  overflow="hidden" style={{ borderRadius: '8px', padding: '5px', marginLeft: '5px' }}>
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/392x156_zalopay_t5.jpg" alt="Image 2" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>

        <Grid container spacing={3} marginTop={5}>
        {images.map((img) => (
            <Grid item key={img} md={3}>
            <Box
                component="img"
                src={img}
                alt="Grid Image"
                sx={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
            />
            </Grid>
        ))}
        </Grid>
    </Container>
  );
}

export default Banner2;
