import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {
    
    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch( startLogout() );

    }

    return (
        <nav className="navbar navbar-dark bg-dark">
           <div className="container-fluid">
                <span className="navbar-brand">
                    {name}
                </span>

                <button 
                    className="btn btn-outline-danger"
                    onClick={ handleLogout }    
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>
            </div>
        </nav>
    )
}
