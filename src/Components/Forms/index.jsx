import { Card,CardHeader,CardBody,Button, Form, FormGroup,Label,Input,Row,Col, CardFooter } from "reactstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"

import Cotizador from './../Cotizador'

const server = 'http://localhost:3000/'

const useFormsFunction = ({id,endpoint,form,location,other})=>{

    const navigator = useNavigate()
    const [isNew,setIsNew] = useState(false)
    const [formData,setFormData] = useState({
       
    })
    const [formError,setFormError] = useState({})

    useEffect(()=>{

        const getResApi = async()=>{
            const resApi = await fetch(`${server}api/v1/${endpoint}/${id}`)
            const res = await resApi.json()

            if(res.success){
                setFormData(res.data)
            }

        }


        if(id === 'new'){
            setIsNew(true)
            setFormData(form)
        }else{
            getResApi()

        }
    },[])
    useEffect(()=>{

        console.log('DATA:',formData)
        console.log('ERROR',formError)

    },[formData])

    const handleChange = (e)=>{
        e.preventDefault()

        const { name, value } = e.target
        console.log(name)
        if(isNew){
            setFormData({
                ...formData,
                ['status']:'Activo',
                [name]:value
            })
            setFormError(
                {
                    ...formError,
                    ['status']:'',
                    [name]:''
                }
            )            
        }
        setFormData({
            ...formData,
            [name]:value
        })
        setFormError(
            {
                ...formError,
                [name]:''
            }
        )
    }
    
    const handleSubmit = ()=>{


        const formulario = new FormData();
        let empty={}
       
        
        for(let input in formData){
            if(!formData[input]){
                empty[input]='empty'
            }else{
                formulario.append(input,formData[input])               
            }
            //Si esta lleno lo metemos a un elemento FormData.append
        }
        
        if(Object.keys(empty).length > 0){
            setFormError(empty)
            Swal.fire('Todos los campos deben ser llenados','','warning')
            return
        }
        //Agregamos los datos de los productos
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
          if(other && Object.keys(other).length > 0){
            appendFormData(other);

          }
          


        if(isNew){
           
            Swal.fire({
                position: "center",
                icon: "question",
                title: "ALTA EN BASE DE DATOS",
                html:`¿Revisate que la información sea correcta?`,
                showConfirmButton: true,
                showCancelButton:true,
                confirmButtonText:'Si, claro',
                cancelButtonText:'No, espera'
            }).then(async(result)=>{
                if(result.isConfirmed){
                    const resApi = await fetch(`${server}api/v1/${endpoint}`,
                        {
                            method:'POST',
                            body:formulario
                        })
                    const res = await resApi.json()
                    if(res.success){
                        Swal.fire(
                            {
                              position: "center",
                              icon: "success",
                              title: "Se creo correctamente",
                              html:`${res.message}`,
                              showConfirmButton: true,
                              // timer: 1500
                            }
                            ).then(result=>{
                                if(result.isConfirmed){
                                    navigator(location)
                                }
                            })
                    }else{
                        Swal.fire(`${res.message}`,'','error')
                    }
                }
            })
           
        }else{
            formulario.append('data',JSON.stringify(formData))
            formulario.append('document',endpoint)
            Swal.fire({
                position: "center",
                icon: "question",
                title: "ALTA EN BASE DE DATOS",
                html:`¿Revisate que la información sea correcta?`,
                showConfirmButton: true,
                showCancelButton:true,
                confirmButtonText:'Si, claro',
                cancelButtonText:'No, espera'
            }).then(async(result)=>{
                if(result.isConfirmed){
                    const resApi = await fetch(`${server}api/v1/${endpoint}/${id}`,
                        {
                            method:'PATCH',
                            body:formulario
                        })
                    const res = await resApi.json()
                    if(res.success){
                        Swal.fire(
                            {
                              position: "center",
                              icon: "success",
                              title: "Se creo correctamente",
                              html:`${res.message}`,
                              showConfirmButton: true,
                              // timer: 1500
                            }
                            ).then(result=>{
                                if(result.isConfirmed){
                                    navigator(location)
                                }
                            })
                    }
                }
            })
        }
    }

    return {isNew,formError,handleChange,handleSubmit,formData}
}

export function FormUsers(){
    
    const { id } = useParams()
    const location = '/gestion'

    const {isNew,formError,handleChange,handleSubmit,formData} = useFormsFunction({
        id,
        endpoint:'users',
        form:{
            nombre:'',
            tipo_usuario:'',
            pass:'',
            usuario:'',
            status:'Activo'
        },
        location
    })
 

    return (
        <Card className='m-2 rounded-xl shadow mt-4 mb-2'>
            <CardHeader>
                <h3>{isNew ? 'Nuevo Usuario':'Editar Usuario'}</h3>
            </CardHeader>
            <CardBody>
                <Form className="text-yellow-500" > 
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nombre" >Nombre</Label>
                                <Input type="text" name="nombre" id="nombre" placeholder="" onChange={handleChange} className={`${formError.nombre === 'empty' ? 'border-red-600' : ''} `} value={formData.nombre}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="usuario" >Usuario</Label>
                                <Input type="text" name="usuario" id="usuario"  onChange={handleChange} className={`${formError.usuario === 'empty' ? 'border-red-600' : ''}`} value={formData.usuario}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="pass" >Contraseña</Label>
                                <Input type="password" name="pass" id="pass" placeholder="" onChange={handleChange} className={`${formError.pass === 'empty' ? 'border-red-600' : ''}`} value={formData.pass}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="tipo_usuario" >Tipo de Usuario</Label>
                                <Input type="select" name="tipo_usuario" id="tipo_usuario"  onChange={handleChange} className={`${formError.tipo_usuario === 'empty' ? 'border-red-600' : ''}`} value={formData.tipo_usuario}>
                                <option value='' style={{color:'red'}}>Escoge un tipo de usuario</option>
                                <option value='admin'>Administrador</option>
                                <option value='user1'>Ver y editar</option>
                                <option value='user2'>Solo lectura</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    {!isNew && (
                        <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="status" >Estatus</Label>
                                <Input type="select" name="status" id="status" onChange={handleChange} className={`${formError.status ? 'border-red-600' : ''}`} value={formData.status}>
                                    <option value={'Activo'}>ACTIVO</option>
                                    <option value={'Baja'}>BAJA</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    )}
                    
                </Form>
            </CardBody>
            <CardFooter>
                <Button onClick={handleSubmit}>Guardar</Button>
            </CardFooter>


        </Card>
    )
}

export function FormProducts(){
    
    const { id } = useParams()
    const location = '/productos'

    const {isNew,formError,handleChange,handleSubmit,formData} = useFormsFunction({
        id,
        endpoint:'products',
        form:{
            nombre:'',
            clave:'',
            descripcion:'',
            precio:'',
            status:'Activo'
        },
        location
    })
 


    return (
        <Card className='m-2 rounded-xl shadow mt-4 mb-2'>
            <CardHeader>
                <h3>{isNew ? 'Nuevo Producto':'Editar Producto'}</h3>
            </CardHeader>
            <CardBody>
                <Form className="text-yellow-500" > 
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nombre" >Nombre</Label>
                                <Input type="text" name="nombre" id="nombre" placeholder="" onChange={handleChange} className={`${formError.nombre === 'empty' ? 'border-red-600' : ''} `} value={formData.nombre}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="clave" >Clave</Label>
                                <Input type="text" name="clave" id="clave"  onChange={handleChange} className={`${formError.clave === 'empty' ? 'border-red-600' : ''}`} value={formData.clave}/>
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="descripcion" >Descripción</Label>
                                <Input type="phone" name="descripcion" id="descripcion" placeholder="" onChange={handleChange} className={`${formError.descripcion === 'empty' ? 'border-red-600' : ''}`} value={formData.descripcion}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="precio" >Precio</Label>
                                <Input type="number" name="precio" id="precio"  onChange={handleChange} className={`${formError.precio === 'empty' ? 'border-red-600' : ''}`} value={formData.precio}>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    {!isNew && (
                        <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="status" >Estatus</Label>
                                <Input type="select" name="status" id="status" onChange={handleChange} className={`${formError.status ? 'border-red-600' : ''}`} value={formData.status}>
                                    <option value={'Activo'}>ACTIVO</option>
                                    <option value={'Baja'}>BAJA</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    )}
                    
                </Form>
            </CardBody>
            <CardFooter>
                <Button onClick={handleSubmit}>Guardar</Button>
            </CardFooter>


        </Card>
    )
}

export function FormCustomers(){
    
    const { id } = useParams()
    const location = '/clientes'

    const {isNew,formError,handleChange,handleSubmit,formData} = useFormsFunction({
        id,
        endpoint:'customers',
        form:{
            nombre:'',
            direccion:'',
            correo:'',
            telefono:'',
            status:'Activo'
        },
        location
    })
 

    return (
        <Card className='m-2 rounded-xl shadow mt-4 mb-2'>
            <CardHeader>
                <h3>{isNew ? 'Nuevo Cliente':'Editar Cliente'}</h3>
            </CardHeader>
            <CardBody>
                <Form className="text-yellow-500" > 
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nombre" >Nombre</Label>
                                <Input type="text" name="nombre" id="nombre" placeholder="" onChange={handleChange} className={`${formError.nombre === 'empty' ? 'border-red-600' : ''} `} value={formData.nombre}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="correo" >Correo</Label>
                                <Input type="email" name="correo" id="correo"  onChange={handleChange} className={`${formError.correo === 'empty' ? 'border-red-600' : ''}`} value={formData.correo}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="telefono" >Telefono</Label>
                                <Input type="phone" name="telefono" id="telefono" placeholder="" onChange={handleChange} className={`${formError.telefono === 'empty' ? 'border-red-600' : ''}`} value={formData.telefono}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="direccion" >Direccion</Label>
                                <Input type="text" name="direccion" id="direccion"  onChange={handleChange} className={`${formError.direccion === 'empty' ? 'border-red-600' : ''}`} value={formData.direccion}>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    {!isNew && (
                        <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="status" >Estatus</Label>
                                <Input type="select" name="status" id="status" onChange={handleChange} className={`${formError.status ? 'border-red-600' : ''}`} value={formData.status}>
                                    <option value={'Activo'}>ACTIVO</option>
                                    <option value={'Baja'}>BAJA</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    )}
                    
                </Form>
            </CardBody>
            <CardFooter>
                <Button onClick={handleSubmit}>Guardar</Button>
            </CardFooter>


        </Card>
    )
}

export function FormSale(){
    //Variables de estado para la nota
    const [products, setProducts] = useState([]);
    const [folio, setFolio] = useState('');
    const [total, setTotal] = useState(0);

    const sumOfTotal = (sum)=>{
        setTotal(prev => parseFloat(prev) + parseFloat(sum))
    }
    const addFolio = (folio)=>{
        setFolio(folio)
    }
    

    const { id } = useParams()
    const location = '/ventas'
    const {isNew,formError,handleChange,handleSubmit,formData} = useFormsFunction({
        id,
        endpoint:'sales',
        form:{
            cliente:'',
            fecha:'',        
            status:'Activo'
        },
        location,
        other:{
            products,
            folio,
            total
        }
    })
    const [error,setError]=useState(null)


    const [clientes,setClientes]=useState([])
    const [productos,setProductos]=useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const resClientes = await axios.get(`${server}api/v1/customers/`)
                const resProducts = await axios.get(`${server}api/v1/products/`)

                setClientes(resClientes.data.data)
                setProductos(resProducts.data.data)

            } catch (error) {
                setError(error)
            }
        }

        fetchData();
    },[])




 

    return (
        <Card className='m-2 rounded-xl shadow mt-4 mb-2'>
            <CardHeader>
                <h3>{isNew ? 'Nueva venta':'Editar Venta'}</h3>
            </CardHeader>
            <CardBody>
                <Form className="text-yellow-500" > 
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="cliente" >Cliente</Label>
                                <Input type="select" name="cliente" id="cliente" placeholder="" onChange={handleChange} className={`${formError.cliente === 'empty' ? 'border-red-600' : ''} `} value={formData.cliente} >
                                    <option value=''>---Selecciona cliente---</option>
                                    
                                    {clientes?.map(cliente =>(
                                        <option value={cliente.id} key={cliente.id}>{cliente.nombre}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for='fecha'>Fecha de nota</Label>
                                <Input type='date' name="fecha" onChange={handleChange} className={`${formError.fecha === 'empty' ? 'border-red-600' : ''} `} value={formData.fecha}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Cotizador 
                    elements={{ 
                        products,
                        folio,
                        total,setProducts}}
                    sumOfTotal={sumOfTotal}
                    addFolio={addFolio}

                        
                    />
                   
                    </Row>
                    {!isNew && (
                        <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="status" >Estatus</Label>
                                <Input type="select" name="status" id="status" onChange={handleChange} className={`${formError.status ? 'border-red-600' : ''}`} value={formData.status}>
                                    <option value={'Activo'}>ACTIVO</option>
                                    <option value={'Baja'}>BAJA</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    )}
                    
                </Form>
            </CardBody>
            <CardFooter>
                <Button onClick={handleSubmit}>Guardar</Button>
            </CardFooter>


        </Card>
    )
}