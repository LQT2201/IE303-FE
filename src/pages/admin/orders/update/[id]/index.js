import { forwardRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Grid, TextField, Select, MenuItem, Button, FormControl, InputLabel, OutlinedInput, CardContent, styled, Box, Typography
} from '@mui/material';
import formater from 'src/utils/formatCurrency';
import Swal from 'sweetalert2';

const BASE_URL = 'http://127.0.0.1:8080/api';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}));

const UpdateOrder = () => {
  const [order, setOrder] = useState(null);  
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${BASE_URL}/order/${router.query.id}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        const data = await response.json();
        setOrder(data);
        setStatus(data.orderStatus);
        
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (router.query.id) {
      fetchOrder();
    }
  }, [router.query.id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/order/${router.query.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update order status');
      Swal.fire("Đã cập nhật", "", "success");
        
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          {/* <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              disabled
              label='Mã đơn hàng'
              value={order.id || ''}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
            <TextField disabled fullWidth label='Ngày tạo' value={order.creationDate || ''} />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
            <TextField disabled fullWidth label='Khách hàng' value={order.customerName || ''} />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 4.8 }}>
            <TextField disabled fullWidth label='Tổng tiền' value={formater.format(order.totalAmount || 0)} />
          </Grid> */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id='order-status-select-label'>Trạng thái đơn hàng</InputLabel>
              <Select
                labelId='order-status-select-label'
                id='order-status-select'
                value={status}
                onChange={handleStatusChange}
                input={<OutlinedInput label='Trạng thái đơn hàng' />}
              >
                <MenuItem value='Chưa cập nhật'>Chưa cập nhật</MenuItem>
                <MenuItem value='Đang giao'>Đang giao</MenuItem>
                <MenuItem value='Đã giao'>Đã giao</MenuItem>
                <MenuItem value='Đã hủy'>Đã hủy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleUpdate}>
              Cập nhật
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
}

export default UpdateOrder;
