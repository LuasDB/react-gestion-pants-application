import { Button, Card, CardBody, CardFooter, CardHeader, Label, Table } from "reactstrap";
import { FaPlusCircle, FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";


export function Tabla(props) {
    
    const { path,data,encabezados,title,collection } = props

   

    const handleDeleteElement = (id)=>{
        alert(`Se elimina:${id}`)

    }

    return (
        <>
            <Card className='m-2 rounded-xl shadow mt-4 mb-2' >
                <CardHeader className='flex justify-between border-0'>
                    <Button className='flex place-items-center	w-30 justify-around' tag={Link} to={`${path}new`}>
                        <FaPlusCircle />
                        <p>Nuevo</p>
                    </Button>
                    <Label className='text-yellow-500 font-bold'>{title}</Label>
                </CardHeader>
                <CardBody >

                    <table className=" table-responsive w-100" >
                        <thead >
                            <tr>
                            {encabezados?.map((encabezado,index)=>(
                                <th key={`${index}-e`}>{encabezado}</th>
                            ))}                              
                            </tr>
                        </thead>
                        <tbody className=''>
                            {data?.map((item) => (
                                <tr key={item.id} className="border-b-2 border-stone-200" >
                                    {item.data?.map((data2, index) => (
                                        <td key={index}>{data2}</td>
                                    ))}
                                    <td className="space-x-3">
                                        <Button className="bg-cyan-950" size="sm" tag={Link} to={`${path}${item.id}`} >
                                            <FaEdit />
                                        </Button>
                                        <Button className='bg-red-400' size="sm" onClick={()=>handleDeleteElement(item.id)}>
                                            <FaRegTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                   
                </CardBody>
                
            </Card>
        </>
    );
}

export function TablaVentas(props) {
    
    const { path,data,encabezados,title,collection } = props

   

    const handleDeleteElement = (id)=>{
        alert(`Se elimina:${id}`)

    }

    return (
        <>
            <Card className='m-2 rounded-xl shadow mt-4 mb-2' >
                <CardHeader className='flex justify-between border-0'>
                    <Button className='flex place-items-center	w-30 justify-around' tag={Link} to={`/forms/ventas/new`}>
                        <FaPlusCircle />
                        <p>Nuevo</p>
                    </Button>
                    <Label className='text-yellow-500 font-bold'>{title}</Label>
                </CardHeader>
                <CardBody >

                    <table className=" table-responsive w-100" >
                        <thead >
                            <tr>
                            {encabezados?.map((encabezado,index)=>(
                                <th key={`${index}-e`}>{encabezado}</th>
                            ))}                              
                            </tr>
                        </thead>
                        <tbody className=''>
                            {data?.map((item) => (
                                <tr key={item.id} className="border-b-2 border-stone-200" >
                                    {item.data?.map((data2, index) => (
                                        <td key={index}>{data2}</td>
                                    ))}
                                    <td className="space-x-3">
                                        <Button className="bg-cyan-950" size="sm" tag={Link} to={`${path}${item.id}`} >
                                            <FaEdit />
                                        </Button>
                                        <Button className='bg-red-400' size="sm" onClick={()=>handleDeleteElement(item.id)}>
                                            <FaRegTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                   
                </CardBody>
                
            </Card>
        </>
    );
}


