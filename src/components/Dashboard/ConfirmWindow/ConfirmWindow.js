import React from 'react'
import './ConfirmWindow.scss'


const ConfirmWindow = (props) => {
    const {userid, category, toggleFn, removeFn} = props
    const word = category.substr(4)
    const title = word.charAt(0).toUpperCase() + word.slice(1)

    return (
        <div className="modal">
        <div class="confirmation-box">
             Remove {title}?        
            <div class="confirm">
                <button class="btn"  onClick={() =>toggleFn()}>Cancel</button>
                <button class="btn"onClick={() =>{removeFn(userid, category); toggleFn();}}>Confirm</button>
            </div>
        </div>
    </div>
    )

}

export default ConfirmWindow;