
import { FaClipboardList,FaRegUser,FaShopify,FaMoneyBillAlt,FaChartLine,FaMoneyBill  } from 'react-icons/fa'
import Gestion from './Views/Gestion'
import { FormUsers,FormCustomers,FormProducts,FormSale } from './Components/Forms'
import Clientes from './Views/Clientes'
import Productos from './Views/Productos'
import Ventas from './Views/Ventas'
import Nota from './Views/Nota'
import SeguimientoClientes from './Views/SeguimientoClientes'
// import Cobranza from './Views/Cobranza'
// import Reportes from './Views/Reportes'




const routes=[
    // {
    //     path: "/gestion",
    //     name: "Gestion",
    //     icon: <FaClipboardList />,
    //     component: <Gestion />,
    //     type:'menu'
    // },
    {
        path: "/productos",
        name: "Productos",
        icon: <FaRegUser  />,
        component: <Productos />,
        type:'menu'
    },
    {
        path: "/clientes",
        name: "Clientes",
        icon: <FaRegUser  />,
        component: <Clientes />,
        type:'menu'
    },
    {
        path: "/ventas",
        name: "Ventas",
        icon: <FaShopify />,
        component: <Ventas />,
        type:'menu'
    },
    {
        path: "/seguimiento",
        name: "Seguimiento clientes",
        icon: <FaMoneyBill  />,
        component: <SeguimientoClientes />,
        type:'menu'
    },
    // {
    //     path: "/cobranza",
    //     name: "Seguimiento a cobros",
    //     icon: <FaMoneyBillAlt />,
    //     component: <Gestion />,
    //     type:'menu'
    // },
    // {
    //     path: "/reportes",
    //     name: "Reportes",
    //     icon: <FaChartLine  />,
    //     component: <Gestion />,
    //     type:'menu'
    // },
    {
        path: "/forms/usuarios/:id",
        name: "Reportes",
        icon: <FaChartLine  />,
        component: <FormUsers />,
        type:'forms'
    },
    {
        path: "/forms/productos/:id",
        name: "Reportes",
        icon: <FaChartLine  />,
        component: <FormProducts />,
        type:'forms'
    },
    {
        path: "/forms/clientes/:id",
        name: "Reportes",
        icon: <FaChartLine  />,
        component: <FormCustomers />,
        type:'forms'
    },
    {
        path: "/forms/ventas/:id",
        name: "Reportes",
        icon: <FaChartLine  />,
        component: <FormSale />,
        type:'forms'
    }, 
    {
        path: "/view/ventas/:id",
        name: "Reportes",
        icon: <FaChartLine  />,
        component: <Nota />,
        type:'forms'
    },



]


export { routes }