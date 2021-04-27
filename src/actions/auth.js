import Swal from "sweetalert2";
import { nonTokenFetch, tokenFetch } from "../helpers/fetch"
import { types } from "../types/types";



export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {

        const resp = await nonTokenFetch( 'auth/login',{email,password}, 'POST' )
        const body = await resp.json( resp );

        if ( body.ok ){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
            
        }
        else{
            Swal.fire('Error',body.msg, 'error');
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
} )

export const startRegister =  ( email, password, name ) => {
    return async (dispatch) => {

        const resp = await nonTokenFetch( 'auth/register', { name,email,password}, 'POST' )
        const body = await resp.json( resp );

        if ( body.ok ){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
            
        }
        else{
            Swal.fire('Error',body.msg, 'error');
        }


    }
}

export const startCkecking = () => {
    return async (dispatch) => {
 
        const resp = await tokenFetch( 'auth/renew' ); // por defecto es un GET
        const body = await resp.json( resp );

        if ( body.ok ){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
            
        }
        else{
            dispatch(  checkingFinish() )
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinished })

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear(); 
        
        dispatch( logout());
    }
}


const logout = () => ({ type: types.authLogout })