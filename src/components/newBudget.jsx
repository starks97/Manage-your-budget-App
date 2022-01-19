import React from 'react'
import { useState } from 'react';
import Message from'./Message'

const NewBudget = ({budget, setBudget, setIsValid}) => {

    const [message, setMessage] = useState('');
    
    const handdleBudget = (e) => {
        e.preventDefault();
        if(!budget || budget < 0){
            setMessage('Invalid Budget');
            return;
        } 
        //reset error message
        setMessage('');
        //set validacion para cambiar de pantalla
        setIsValid(true);
    };
    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form 
                onSubmit={handdleBudget}
                className="formulario">
                
                <div className="campo">
                    <label>Define your Budget</label>

                    <input 
                        className="nuevo-presupuesto"
                        type="Number"
                        placeholder="Add your budget"
                        value={budget}
                        onChange={item => setBudget(Number(item.target.value))}
                    />
                    <input
                        type="submit"
                        value="add"
                    />
                    {message && <Message tipo="error">{message}</Message> } 
                    
                </div>
            </form>
        </div>
    )
}
export default NewBudget
