import React from 'react'
import NewBudget from './newBudget'
import BudgetControl from './BudgetControl'

const Header = ({
    budget,
    setBudget,
    isValid,
    setIsValid,
    //aqui vamos hacer los calculos, cogemos los datos del pop-up  y lo meteremos en en los datos principales para que vayan cambiando segun metamos mas datos
    data,
    setData,
}) => {
    return (
        <div className="Header">
            <h1>Manage your Budget</h1>
            {isValid ? (
                <BudgetControl 
                    budget={budget}
                    data={data}
                    setData={setData}
                    setBudget={setBudget}
                    setIsValid={setIsValid}
                />) 
                : (<NewBudget 
                    budget={budget}
                    setBudget={setBudget}
                    setIsValid={setIsValid}
                />)
            }  
        </div>
    )
}

export default Header
