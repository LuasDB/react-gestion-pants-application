import {useEffect, useState } from 'react'
import { Card,CardHeader,Button,Label, CardTitle, CardBody, Table, CardText,Row,Col} from "reactstrap";
import Pago from "../../Components/Pago";
import Swal from 'sweetalert2';
import {server} from './../../db/server'
import { useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';


export default function Nota(){
    const { id } = useParams()
    const navigator = useNavigate()
    const [loading,setLoading] = useState(true)
    const [error,setError]=useState(null)
    const [isFetched, setIsFetched] = useState(false);
    const [cliente,setCliente] = useState({})
    const [fecha,setFecha] = useState('')
    const [folio,setFolio] = useState('')
    const [products,setProducts] = useState([])
    const [totalVenta,setTotalVenta] = useState(null)

    const formulario = new FormData()

    //

    const [pays,setPays] = useState([])
    const [adeudo,setAdeudo] = useState(null)
    
    const addPayList = (fecha,monto)=>{
        setPays(prev =>[...prev,{
            fecha:fecha,
            monto:monto
        }])
        setAdeudo(prev => Math.max(0, parseFloat(prev) - parseFloat(monto)));
    }

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setLoading(true)
                const response = await axios.get(`${server}api/v1/sales/${id}`)
                if(response.data.success){
                    setPays(response.data.data.pays)
                    setCliente(response.data.data.clienteData)
                    setFecha(response.data.data.fecha)
                    setFolio(response.data.data.folio)
                    if(!response.data.data.adeudo){
                        setAdeudo(response.data.data.total)
                    }else{
                        setAdeudo(response.data.data.adeudo)
                    }
                    
                    setTotalVenta(response.data.data.total)
                    
                    setProducts(response.data.data.products)
                }

            } catch (error) {
                setError(error)
            }finally{
                setLoading(false)
            }
            
            
        }
        if (!isFetched) {
            fetchData();
        }
    },[isFetched])

    useEffect(() => {
        if (adeudo === 0) {            
            Swal.fire('¡FELICIDADES ESTA NOTA HA SIDO PAGADA!', '', 'success');
        }
    }, [adeudo]);

    function appendFormData(data, parentKey = '') {
        if (data && typeof data === 'object' && !Array.isArray(data) && !(data instanceof Date)) {
          Object.keys(data).forEach(key => {
            appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
          });
        } else if (Array.isArray(data)) {
          data.forEach((item, index) => {
            appendFormData(item, `${parentKey}[${index}]`);
          });
        } else {
            formulario.append(parentKey, data);
        }
      }

    const handleSaveChanges = ()=>{
        Swal.fire({title: "¿Deseas guardar los cambios?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si guarda todo",
        denyButtonText: `No, espera`
        }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
           
            formulario.append('adeudo',adeudo)
            //Agregamos los datos de los productos
            pays.forEach((pay,index)=>{
                formulario.append(`pays[${index}][fecha]`,pay.fecha)
                formulario.append(`pays[${index}][monto]`,pay.monto)
            })
           
        

            const response = await axios.patch(`${server}api/v1/sales/${id}`,formulario,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            if(response.data.success){
                Swal.fire("Se guardaron tus cambios", ``, "success")
                .then(()=>{
                    navigator('/ventas')
                });
                
            }else{
                Swal.fire("No se guardaron los cambios vuelve a intentarlo mas tarde", ``, "errror");

            }
        } 
        });
    }
    



    return (
        <Card className='m-2 rounded-xl shadow mt-4 mb-2 p-8' >
            <CardTitle>NOTA DE VENTA </CardTitle>
            <CardTitle className="flex font-bold">FOLIO: {folio} </CardTitle>
            <CardHeader className="flex flex-row justify-between">
                <div>{cliente.nombre}</div>
                <div>{fecha}</div>
            </CardHeader>
            <CardBody>
                <Table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products?.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.product}</td>
                            <td>{item.amount}</td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                        
                    </tbody>
                </Table>
                <Row className='border text-center bg-blue-400 rounded-lg '>
                    <Col md={3}>
                    
                    </Col>
                    <Col md={3}>
                    
                    </Col>
                    <Col md={3} className='text-blue-950'>
                    TOTAL DE LA VENTA
                    </Col>
                    <Col md={3} className='text-blue-950'>
                    $ {totalVenta}
                    </Col>
                </Row>
                <Row>
                    <Pago 
                        pays={pays}
                        addPayList={addPayList}
                        totalSale={totalVenta}
                        adeudo={adeudo}
                    />
                </Row>
                <Row className='mt-4'>
                    <Col md={4}>
                        <Button  
                        className='bg-blue-500 hover:bg-blue-700'
                        onClick={handleSaveChanges}>Guardar cambios</Button>
                    </Col>
                </Row>
          

            </CardBody>
        </Card>
    )
}