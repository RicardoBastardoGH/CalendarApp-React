import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    // const { modalOpen } = useSelector(state => state.ui)
    const dispatch = useDispatch();

    const handleClickFab= () => {
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickFab }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
