import { useEffect} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Row, Col, Container } from "reactstrap"



import NavBar from './../../Components/NavBar'
import Sidebar from './../../Components/Sidebar'
import { routes } from './../../routes'



export default function AdminLayout() {

   
  useEffect(() => {
  
  }, []);



    const getRoutes = (routes) => {
        return routes.map((route, index) => {
            console.log(route.path)
            return (
            <Route path={route.path} element={route.component} key={index} exact />
        )})
    }

    return (
        <>
            <Container className='w-full'>
                <NavBar />
            </Container>
            <Container>
                <Row>
                    <Col md={3} >
                        <Sidebar routes={routes} />
                    </Col>
                    <Col md={9} className="">
                    <Routes>
                    {getRoutes(routes)}


                    </Routes>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
