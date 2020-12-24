import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Account from './account/account';
import { Switch } from 'react-router-dom';
interface PersonProps{
    children: ReactNode
}
export default function PersonCenter(props:PersonProps){

    
    return <>
            {props.children}
        </>
}