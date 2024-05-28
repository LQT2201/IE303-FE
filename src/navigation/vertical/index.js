// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { Book, NaturePeople } from 'mdi-material-ui'
import { Category } from '@mui/icons-material'

const navigation = () => {
  return [
    {
      title: 'Bảng điều khiển',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title:"Sách",
      icon:Book,
      path:"/admin/books"
    },
    {
      title:"Thể loại",
      icon:Category,
      path:"/admin/genres"
    },
    {
      title:"Tác giả",
      icon: NaturePeople,
      path:"/admin/authors"
    },
    {
      title:"Đơn hàng",
      icon:Book,
      path:"/admin/orders"
    },
    {
      title:"Tài khoản",
      icon:Book,
      path:"/admin/users"
    },
    
  ]
}

export default navigation
