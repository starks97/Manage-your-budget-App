import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import { setId } from './helpers/index'
import List from './components/List'
import Filter from './components/Filter'

import NewSpend from './img/nuevo-gasto.svg'
import { object } from 'prop-types'

function App() {
  const [budget, setBudget] = useState(
    //cargando los datos del local storage
    Number(localStorage.getItem('budget')) ?? 0
  );

  //validando el usestate de true a false para corrobar que estamos dando click
  const [isValid, setIsValid] = useState(false);

  //set nueva ventana para registrar los nuevos gastos (pop-up)
  const [modal, setModal] = useState(false);

  //animando la pantalla pop-up de formulario (animando-modal)
  const [modalAnimation, setModalAnimation] = useState(false);

  //guardando los datos del imput del pop-up
  const [data, setData] = useState(
    localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []
  );

  //funcion cuando haces swipe de editar un gasto del pop-up
  const [editData, setEditData] = useState({});

  //funcion para filtrar las transacciones hechas
  const [filter, setFilter] = useState('');
  const [filterData, setFilterData] = useState([]);

  //funcionalidad cuando ya has hecho swipe que abre el pop-up otra vez
  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      //hemos copiado la funcion de newSpendbtn para q al abrir me abra con los datos a editar
      setModal(true);
      //montandop las transiciones
      setTimeout(() => {
        setModalAnimation(true);
      }, 650)
    }
  }, [editData])

  //boton para registrar neuvo gasto 
  const newSpendbtn = () => {
    setModal(true);
    
    //montando las transiciones
    setTimeout(() => {
      setModalAnimation(true);
    }, 650)
  };
  //guardar los datos del imput del pop-up
  const saveData = (expense) => {
    if (expense.id) {
      //son los gastos con el id ya actualizados
      const updateData = data.map(dataState => dataState.id === expense.id ? expense : dataState);
      setData(updateData);
    } else {
      expense.id = setId();
      //adding the date for our description
      expense.date = Date.now()
      setData([...data, expense]);
    }
    //cerrando y reset el imput del pop-up
    setModalAnimation(false);
    setTimeout(() => {
      //resetear el nuevo gasto despues de haberlo editado del pop-up
      setEditData({});
      setModal(false);
    }, 400)
  };

  //funcionalidad swipe/delete
  const deleteData = id => {
    const dataUpdate = data.filter(element => element.id !== id);
    setData(dataUpdate);
  };
  //guardar los datos de budget en el local storage
  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  },[budget]);
  useEffect(() => {
    const budgetStorage = Number(localStorage.getItem('budget')) ?? 0;
    if(budgetStorage > 0 ){
      setIsValid(true);
    }    
  }, [])
  //guardar los datos del pop-up en local storage
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data) ?? [])
  },[data]);

  //cambios que suceden en filter 
  useEffect(() => {
    if(filter){
      const filterData = data.filter(element => element.category === filter);
      setFilterData(filterData);
    }
    
  },[filter])

  return (
    <div className={modal ? 'fijar' : 'null'}>
      <Header
        data={data}
        setData={setData}
        budget={budget}
        setBudget={setBudget}
        isValid={isValid}
        setIsValid={setIsValid}
      />
      {/*boton nuevo gasto*/}
      {isValid ? (
        <>
          <main>
            <Filter
              filter={filter}
              setFilter={setFilter}
            />
            <List
              data={data}
              setEditData={setEditData}
              deleteData={deleteData}
              filterData={filterData}
              filter={filter}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={NewSpend}
              alt="icono nuevo gasto"
              onClick={newSpendbtn}
            />

          </div>
        </>
      ) : null}
      {/* validando nuevo gasto*/}
      {modal &&
        <Modal
          setModal={setModal}
          modalAnimation={modalAnimation}
          setModalAnimation={setModalAnimation}
          saveData={saveData}
          editData={editData}
          setEditData={setEditData}
        />}
    </div>
  )
}
export default App
