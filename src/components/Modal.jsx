import React from 'react'
import Closebtn from '../img/cerrar.svg'
import { useState, useEffect } from 'react';
import Message from './Message';

const Modal = ({ setModal, 
    modalAnimation, 
    setModalAnimation, 
    saveData, 
    editData,
    setEditData, }) => {
    //formulario del pop-up 
    const [nameS, setNameS] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState('');

    //mensaje de error de validacion del form pop-up 
    const [message, setMessage] = useState('');

    //funcion id para catch el id del elemento a editar
    const [id, setId] = useState('');

    //para mantener la fecha 
    const [date, setDate] = useState('');

    //evento para el boton de cerrar el pop-up y resetear los valores de booleanos
    const hideBtn = () => {
        setModalAnimation(false);
        setEditData({});
        setTimeout(() => {
            setModal(false);
        }, 400)
    };
    //validando el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nameS, quantity, category].includes('')) {
            setMessage('All the fields must to be fill')
            //reset the error message
            setTimeout(() => {
                setMessage('')
            }, 3000);
            return
        }
        //guardar el data de cada imput
        saveData({nameS, quantity, category, id, date})
    };
      //funcion de cuando haces swipe edit la informacion del elemento se abra en el pop-up
      useEffect(() => {
        if(Object.keys(editData).length > 0){
            setNameS(editData.nameS);
            setQuantity(editData.quantity);
            setCategory(editData.category);
            setId(editData.id);
            setDate(editData.date);
          }
    },[editData])
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={Closebtn}
                    alt="cerrar modal"
                    onClick={hideBtn}
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`formulario ${modalAnimation ? "animar" : "cerrar"}`}>
                <legend>{editData.nameS ? 'Edit Expense' : 'New Expense'}</legend>
                {message && <Message tipo="error">{message}</Message>}
                <div className="campo">
                    <label htmlFor="name">Expense</label>
                    <input
                        id="name"
                        type="text"
                        value={nameS}
                        placeholder="Add your spend"
                        onChange={e => setNameS(e.target.value)}

                    />
                </div>
                <div className="campo">
                    <label htmlFor="number">Quantity</label>
                    <input
                        id="quantity"
                        type="Number"
                        value={quantity}
                        placeholder="Add the quantity"
                        onChange={e => setQuantity(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="name">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">--Select--</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="healthy">Health Care</option>
                        <option value="suscriptions">Subscription</option>
                        <option value="others">Other</option>
                    </select>
                </div>
                <input
                    type="Submit"
                    defaultValue={editData.nameS ? 'Save Changes' : 'Add Expense'}
                />

            </form>


        </div>
    )
}

export default Modal
