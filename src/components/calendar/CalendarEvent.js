import React from 'react'

export const CalendarEvent = ( event ) => {

    const { title, event: e } = event;

    return (
        <div>
            <strong>{ title }</strong>
            <span>- { e.user.name } </span>
        </div>
    )
}
