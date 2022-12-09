import React, { useState } from 'react';
import "./PopUp.css"

const PopUp = ({ todo, dispatch }) => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal((prev) => {
            return prev = !prev
        })

    };

    //Disable scrolling while pop up is active
    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal");
    }

    const deleteTodoHandler = async (e) => {
        e.stopPropagation();

        const res = await fetch(`http://localhost:5000/todos/${todo.id}`, {
            method: 'DELETE'
        });

        const data = await res.json();
        dispatch({ type: 'deleteToDo', payload: { id: todo.id } })
        return data;
    }



    return (
        <>
            <button type='button' onClick={toggleModal} className='deleteButton'>
                <img src='/deleteIcon.svg' alt='deleteIcon'/>
            </button>
            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='modal-content'>
                        <p> Are you sure you want to delete? </p>
                        <div className='confirmation-buttons-block'>
                            <button type='button' onClick={deleteTodoHandler}>Yes</button>
                            <button type='button' onClick={toggleModal}>No</button>
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default PopUp;