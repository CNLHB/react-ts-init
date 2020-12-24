import React, { ReactNode } from 'react'
import {get,post} from '@/config/axios'
interface PersonProps{
    children: ReactNode
}
export default function PersonWork(props:PersonProps){
    console.log(props);
    
    return <div >
        <button onClick={()=>{{post("/api/login",{"userName":"aiwa",password:"123456"})}}}>get</button>
            PersonWork
            {props.children}
        </div>
}