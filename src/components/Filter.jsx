import React from 'react'
import { useEffect, useState } from 'react'
const Filter = ({filter, setFilter }) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label>Filter Your Transactions</label>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    
                    >
                    <option value="">--All Transactions--</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="healthy">Health Care</option>
                        <option value="suscriptions">Subscription</option>
                        <option value="others">Other</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filter
