import { useState,useEffect } from 'react';

import {
  Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Table, Row, Col
} from 'reactstrap';



const SalesNote = ({ elements,sumOfTotal,addFolio}) => {

  
  const {products,folio, total,setProducts} = elements
  




  const [product,setProduct] = useState('')
  const [price,setPrice] = useState('')
  const [amount,setAmount] = useState('')

 



  const handleAddProduct = ()=>{
    console.log('ENTRAMOS')

    if(product && price && amount ){
      console.log('[PRODUCT]:',product)
      console.log('[PRICE]:',price)
      console.log('[AMOUNT]:',amount)
      console.log('[TOTAL]:',total)
      const totalPrice = parseFloat(price) * parseFloat(amount)
      setProducts([...products,{
        product,price,amount,total:totalPrice
      }])
      sumOfTotal(totalPrice)

      setProduct('')
      setPrice('')
      setAmount('')
    }
   
  }


  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Nota de Venta</CardTitle>
        <Form >
          <Row>
            <Col md={3}>
              <FormGroup>
                  <Label>Folio de nota</Label>
                  <Input type='text' onChange={(e)=> addFolio(e.target.value)}/>
              </FormGroup>

            </Col>
           
          </Row>
         
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label>PRODUCTO</Label>
                <Input type='text' onChange={(e)=>setProduct(e.target.value)} value={product}/>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>PRECIO POR PIEZA</Label>
                <Input type='number' onChange={(e)=>setPrice(e.target.value)} value={price}/>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>CANTIDAD</Label>
                <Input type='number' onChange={(e)=>setAmount(e.target.value)} value={amount}/>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Button type='button' onClick={handleAddProduct}>AGREGAR</Button>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table>
                <thead>
                  <tr>
                    <th>PRODUCTO</th>
                    <th>PRECIO</th>
                    <th>CANTIDAD</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                {products?.map((item,index)=>(
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>${item.price}</td>
                    <td>{item.amount}</td>
                    <td>${item.total}</td>
                  </tr>
                ))}
                
                </tbody>
              </Table>

            </Col>
          </Row>
          <Row className='border text-center bg-slate-400 rounded-sm '>
            <Col md={3}>
              
            </Col>
            <Col md={3}>
              
            </Col>
            <Col md={3} className='text-blue-950'>
            TOTAL
            </Col>
            <Col md={3} className='text-blue-950'>
             $ {total}
            </Col>
          </Row>
          
        </Form>
      </CardBody>
    </Card>
  );
};

export default SalesNote;

