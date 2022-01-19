import React from 'react';
import { useState, useEffect } from 'react';
//react progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({budget, data, setData, setBudget, setIsValid}) => {
    //cambios que sucedan en el data
    const [available, setAvailable] = useState(0);
    const [balance, setBalance] = useState(0);

    //porcentaje de progress bar
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        //solo recogemos el valor de del imput que nos interesa en este caso en el componente expenses/quantity
        const totalBalance = data.reduce( (total, expenses) => expenses.quantity + total, 0);

        //haciendo la operacion total del lo disponible
        const totalAvailable = budget - totalBalance;
        setBalance(totalBalance);
        setAvailable(totalAvailable);

        //calculo porcentaje gastado
        const newPercentage = (((budget - totalAvailable) / budget)* 100).toFixed(2);
        setTimeout(() =>{
            setPercentage(newPercentage)
        },1500)
        
    }, [data]);

    const setAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    //reset all budget and data btn 
    const resetBtn = () => {
        const result = confirm('Are you sure you want to reset?');
        if(result){
            setData([]);
            setBudget(0);
            setIsValid(false);
        }
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage > 100 ? 'red' : 'rgba(0,0,0)',
                        trailColor: 'rgba(0,0,0, 0.2)',
                        textColor: percentage > 100 ? 'red' : 'black'
                    })}
                    text={`${percentage}% Spent`}
                ></CircularProgressbar>
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={resetBtn}

                >
                    Reset App
                </button>
                <p>
                    <span>Budget:</span>  {setAmount(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : '' }`}>
                    <span>Available:</span>  {setAmount(available)}
                </p>
                <p>
                    <span>Balance:</span>  {setAmount(balance)}
                </p>
            </div>
        </div>


    )
}

export default BudgetControl
