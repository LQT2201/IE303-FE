import { Container, Grid, Stack, Box, Typography, Divider, LinearProgress, Button  } from '@mui/material'
import React from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import DiscountIcon from '@mui/icons-material/Discount';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import formater from 'src/utils/formatCurrency';
import NumberInput from 'src/components/NumberInput'

const CartPage = () => {


  return (
    <Container sx={{marginTop:"80px"}}>
      <Grid container>
        <Grid item md={8}>
          <Box marginRight={4} bgcolor="white" borderRadius={1}>
            <Box display="flex" marginLeft={4}>
              <FormControlLabel sx={{flexBasis:"60%"}} control={<Checkbox defaultChecked />} label={`Chọn tất cả (1 sản phẩm) ${2}`} />
              <Box display="flex" alignItems="center" justifyContent="center" flexBasis="20%">
                <Typography>
                  Số lượng
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" flexBasis="20%">
                <Typography>
                  Thành tiền
                </Typography>
              </Box>
            </Box>
            
          </Box>
          <Box marginTop={3} marginRight={4} bgcolor="white" borderRadius={1}>
              <Box display="flex" padding={4}>
                <Checkbox sx={{flexBasis:'8%'}} />
                <Box flexBasis="16%">
                  <Box
                    overflow="hidden"
                    width="120px"
                    height="120px"
                    component="img"
                    src='https://cdn0.fahasa.com/media/catalog/product//i/m/image_181022.jpg'
                  />
                </Box >
                <Box display="flex"  flexBasis="68%">
                  <Box display="flex" flexBasis="60%" flexDirection="column" justifyContent="space-between">
                    <Typography fontSize={14}>
                      Cùng Bé Lớn Khôn - Rất Nhiều + Rất Nhiều = Bao Nhiêu
                    </Typography>

                    <Box display="flex" alignItems="center" marginBottom={3}>
                      <Typography fontWeight={700}>
                        {formater.format(16500)}
                      </Typography>
                      <Typography 
                        sx={{
                          textDecoration: "line-through", 
                          color: "#7A7E7F", 
                          fontWeight: 550, 
                          fontSize: 13, 
                          marginLeft: 1 
                        }}
                      >
                        {formater.format(20000)}
                      </Typography>
                     </Box>
                    </Box>
                  <Box flexBasis="40%" display="flex" justifyContent="space-between">
                      <NumberInput />
                  </Box>
                </Box>
                <Box flexBasis="8%" display="flex" alignItems="center" justifyContent="space-between">
                  <DeleteForeverOutlinedIcon/>
                </Box>
              </Box>

          </Box>
        </Grid>
        <Grid item md={4} borderRadius="10px" >
              <Stack id="sale" sx={{background:"white"}} borderRadius="10px" padding={4}>
                <Box flexDirection="row" display="flex" marginY={3}>
                    <DiscountIcon color="primary"/>
                    <Typography marginLeft={1} color="primary">
                      Khuyến mãi
                    </Typography>
                </Box>
                <Divider/>
                  <Box>
                    <Box marginY={2}>
                      <Typography fontWeight={550}>
                        MÃ GIẢM 50K - ĐƠN HÀNG TỪ 500K
                      </Typography>
                      <Typography fontSize={14} fontWeight={300} color="#7A7E7F">
                        Áp dụng cho tất cả sản phẩm
                      </Typography>
                    </Box>
                    <Box marginBottom={2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '70%', marginRight: 1 }}>
                        <LinearProgress variant="determinate" value={50} fontSize={10}/>
                      </Box>
                      <Box sx={{ minWidth: 35}} >
                        <Button className="btn-apply"
                        >
                          Áp dụng
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                <Divider/>
                  <Box>
                    <Box marginY={2}>
                      <Typography fontWeight={550}>
                        MÃ GIẢM 100K - ĐƠN HÀNG TỪ 1 TRIỆU
                      </Typography>
                      <Typography fontSize={14} fontWeight={300} color="#7A7E7F">
                        Áp dụng cho tất cả sản phẩm
                      </Typography>
                    </Box>
                    <Box marginBottom={2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '70%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={50} fontSize={10}/>
                      </Box>
                      <Box sx={{ minWidth: 35}} >
                        <Button className="btn-apply"
                         
                         >
                          Áp dụng
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                <Divider/>
              </Stack>
              <Box marginTop={2} id="order_summary" sx={{background:"white"}} borderRadius="10px" padding={4}>
                <Typography 
                  component="h4"
                >
                  Thành tiền
                </Typography>
                <hr />
                <p>
                  Số lượng:{" "}
                  <span className="order-summary-values">
                   
                    (Sản phẩm)
                  </span>
                </p>
                <Typography component="span" fontWeight={700}>
                    Tổng số tiền: {" "}
                    <Typography component="span">
                      đ
                    </Typography>
                </Typography>
            

                <Divider/>
                <Box textAlign="center" width="100%" margin="0 auto" display="flex">
                  <Button sx={{margin:"0 auto", bgcolor:"#CC0000", color:"white", width:"100%", fontSize:"20px", fontWeight:700}}>
                    Thanh Toán
                  </Button>
                </Box>
                
              </Box>
            </Grid>
      </Grid>
    </Container>
  )
}

CartPage.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default CartPage