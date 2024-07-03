import { useEffect, useState } from 'react'
import { TablaVentas } from '../../Components/Tabla'

const server = 'http://localhost:3000/'


import axios from 'axios';

const useFetchDataTables = ({collection,server})=>{
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError]=useState(null)
    const [isFetched, setIsFetched] = useState(false);


    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setLoading(true)
                const response = await axios.get(`${server}api/v1/${collection}`)
    
                if(response.data.success){
                    const data = response.data.data
                    const orderArray = data.map(item=>({
                        id:item.id,
                        data:[item.folio,item.clienteData.nombre,`$ ${item.total}`,`$ ${parseFloat(item.total) - parseFloat(item.adeudo)}`,`$ ${item.adeudo}`],
                        content:item
                    }))
                    setData(orderArray)
                    setIsFetched(true);
            
                    console.log('TABLA',orderArray)
                }
                }catch (error) {
                setError(error) 
                }finally{
                setLoading(false)
                }
        }
        
        if (!isFetched) {
            fetchData();
        }
        
    },[isFetched])

    return {
        data,error,loading
    }
}

export default function Ventas(){
    const { data,error,loading } = useFetchDataTables({
        collection:'sales',
        server
    }) 
    
    return (
    <>
        <div className='flex flex-col basis-4 scroll-y' > 
            <TablaVentas
                className='w-100'
                path={'/view/ventas/'} 
                encabezados={['Folio','Cliente','Total','Pagado','Adeudo']}
                data={data}
                title={'Ventas'}
                collection={'sales'}
            />
        </div>
    </>
        
    )

}