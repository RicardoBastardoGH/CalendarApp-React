import React from 'react'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
           <div className="container-fluid">
                <span className="navbar-brand">
                    Liliana
                </span>

                <button className="btn btn-outline-danger">
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>
            </div>
        </nav>
    )
}
