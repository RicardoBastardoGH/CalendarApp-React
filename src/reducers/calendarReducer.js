import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title:'Cumpleanos del Jefe',
//     start: moment().toDate(),
//     end: moment().add( 2,'hour').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id:'123',
//         name: 'Ricardo',
//     }
// }

const initialState= {
    events: [],
    activeEvent: null
}

export const calendarReducer = ( state= initialState, action) => {

    switch (action.type) {
        case(types.eventSetActive):
            return {
                ...state,
                activeEvent: action.payload
            } 

        case types.eventAddNew:
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
 
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( e => (
                    (e.id === action.payload.id)
                    ? action.payload
                    : e
                ))
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( e => (
                    (e.id !== state.activeEvent.id)  )),
                activeEvent: null
            }
 
        case types.eventsLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            }

        case types.eventLogoutCleaning:
            return{
                ...initialState
            }

        default:
            return state;
    }
}