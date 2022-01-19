import React from 'react'
import Expenses from './Expenses'
const List = ({data, setEditData, deleteData, filter, filterData}) => {
    return (
        <div className="listado-gastos contenedor">
            {
                filter ? (
                    <>
                        <h2>{filterData.length ? 'Recent Transactions' : 'You have no expenses'}</h2>
                        {filterData.map(item => (
                            <Expenses 
                                key={item.id}
                                item={item}
                                setEditData={setEditData}
                                deleteData={deleteData}
                            />
                        ))}
                    </>
                ): (
                    <>
                        <h2>{data.length ? 'Recent Transactions' : 'You have no expenses'}</h2>
                        {data.map(item => (
                        <Expenses 
                            key={item.id}
                            item={item}
                            setEditData={setEditData}
                            deleteData={deleteData}
                        />
                ))}
                </>
                ) 
            }
        </div>
    )
}

export default List
