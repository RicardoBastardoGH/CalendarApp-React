import { types } from "../types/types"
import { tokenFetch } from '../helpers/fetch'
import { formatingEvents } from "../helpers/formatingEvent";
import Swal from "sweetalert2";

export const eventStartAddNew = ( event ) => {
    return async (dispatch, getState) => {

        const newEvent = event.formValues;
        const { uid, name } = getState().auth;
        // console.log(event.formValues);

        try {

            const resp = await tokenFetch('events', newEvent, 'POST');
            const body = await resp.json();
    
            if ( body.ok ){
                newEvent.id = body.event.id
                newEvent.user = {
                    _id: uid,
                    name: name
                }
                console.log( newEvent );
                dispatch( eventAddNew( newEvent ) );
            }

        } catch (error) {
            console.log(error);

        }
        
    }
}

 const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdated = (event) => {
    return async (dispatch, getState) => {

        try {
            

            const resp = await tokenFetch(`events/${event.id}`,event,'PUT');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated(event))
            }
            else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDeleted = ( ) => {
    return async (dispatch, getState) => {

        try {
            
            const { id } = getState().calendar.activeEvent;

            const resp = await tokenFetch(`events/${id}`, {} ,'DELETE');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted())
            }
            else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }


    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});



export const eventStartLoading = () => {
    return async (dispatch) => {

        try {
            
            const resp = await tokenFetch('events');
            const body = await resp.json();

            // convertir de string a date las fechas start y end
            const events = formatingEvents( body.events );
            

            dispatch( eventsLoaded( events ));

        } catch (error) {
            console.log(error)
        }

    }
}

const eventsLoaded = ( events ) => ({
    type: types.eventsLoaded,
    payload: events
})