import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { startCkecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth)

    // Verificando si el token es valido para revalidarlo
    useEffect(() => {
        dispatch( startCkecking() )
    }, [dispatch] )

    // pantalla de espere mientras se autentica al hacer refresh
    if (checking ) {
        return (<h5>Espere...</h5>)
    }

    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute 
                            exact 
                            path="/login" 
                            component={ LoginScreen }
                            isAuthenticated={ !!uid } />
                        <PrivateRoute 
                            exact 
                            path="/" 
                            component={ CalendarScreen }
                            isAuthenticated={ !!uid } />
                    </Switch>
                </div>
            </Router>

        </div>
    )
}
