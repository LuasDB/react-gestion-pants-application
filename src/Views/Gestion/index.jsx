import { useEffect, useState } from 'react'
import {Tabla} from '../../Components/Tabla'

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
                        data:[item.nombre,item.usuario,item.status],
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

export default function Gestion(){
    const { data,error,loading } = useFetchDataTables({
        collection:'users',
        server
    })

    
   
    
    return (
    <>
        <div className='flex flex-col basis-4 scroll-y' > 

            <Tabla 
                className='w-100'
                path={'/forms/usuarios/'} 
                encabezados={['Nombre','Usuario','Estatus']}
                data={data}
                title={'Usuarios'}
                collection={'users'}
            />
            
          
        </div>
    </>
        
    )

}