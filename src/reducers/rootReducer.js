import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./UiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
    // TODO: AuthReducer
})