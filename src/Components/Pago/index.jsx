import { useEffect, useState } from 'react';
import { ImGift } from 'react-icons/im';
import {
    Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table, Row, Col
  } from 'reactstrap';
import Swal from 'sweetalert2';

export default function Pago({pays,addPayList,totalSale,adeudo}){

   

    const [newPay, setNewPay] = useState(false)
    const [fechaPago,setFechaPago] = useState('')
    const [montoPago,setMontoPago] = useState('')

    

   





    const handleNewPay = ()=>{
        setNewPay(true)
    }
    const handleAddPay = ()=>{
        if(fechaPago && montoPago){
            if(parseFloat(adeudo) < parseFloat(montoPago) ){
                Swal.fire('El monto ingresado es mayor al adeudo, por favor verifica y vuelve a intentarlo',`El adeudo actual es de $ ${adeudo}`,'error')
            return 
            }

            addPayList(fechaPago,montoPago)
            setFechaPago('')
            setMontoPago('')
            setNewPay(false)

        }else{
            Swal.fire('Todos los campos deben ser llenados','','warning')
        }

    }


    return (
        <Card className='mt-4 p-6'>
            {!newPay &&(<Row>
                <Col md={4}>
                    <Button type='button' className='bg-green-600 hover:bg-green-800' onClick={handleNewPay}>Nuevo Pago</Button>
                </Col>
            </Row>)}
            

          <CardBody>          
            {newPay &&
            (<Form >
              <Row>
                <Col md={3}>
                  <FormGroup>
                      <Label for='fecha_pago'>Fecha del pago</Label>
                      <Input 
                      type='date' 
                      name='fechaPago'
                      onChange={(e)=>setFechaPago(e.target.value)}
                       />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                      <Label for='montoPago'>Monto del pago</Label>
                      <Input 
                      type='number' 
                      name='monto_pago'
                      onChange={(e)=>setMontoPago(e.target.value)} 

                      />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  
                     <Button 
                     type='button' 
                     className='bg-blue-400 hover:bg-blue-700'
                     onClick={handleAddPay}>Agregar Pago</Button>
                  
                </Col>        
              </Row>
            </Form>)}
            <Row>
                <Col md={12}>
                    <CardTitle>REGISTRO DE PAGOS</CardTitle>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fecha de Pago</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pays?.map((item, index)=>(
                                <tr key={index}>
                                    <td>{item.fecha}</td>
                                    <td>$ {item.monto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Col>
            </Row>
            <Row className='border text-center rounded-lg bg-red-300'>
                    <Col md={3}>
                    
                    </Col>
                    <Col md={3}>
                    
                    </Col>
                    <Col md={3} className='text-blue-950'>
                    ADEUDO
                    </Col>
                    <Col md={3} className='text-blue-950'>
                    $ {adeudo}
                    </Col>
            </Row>
          </CardBody>
        </Card>
      );
}

