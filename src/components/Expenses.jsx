
//adding our date
import { getDate } from '../helpers/index'
//adding efecto swipe 
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
//Importing img and icons
import savingIcon from '../img/icono_ahorro.svg'
import homeIcon from '../img/icono_casa.svg'
import foodIcon from '../img/icono_comida.svg'
import expensesIcon from '../img/icono_gastos.svg'
import enterIcon from '../img/icono_ocio.svg'
import healthyIcon from '../img/icono_salud.svg'
import suscriptionIcon from '../img/icono_suscripciones.svg'

//creando biblioteca de imagenes que iran en las categorias
const icons = {
    savings: savingIcon,
    food: foodIcon,
    home: homeIcon,
    entertainment: enterIcon,
    healthy: healthyIcon,
    suscriptions: suscriptionIcon,
    others: expensesIcon
};
const Expenses = ({ item, setEditData, deleteData }) => {
    const { category, nameS, quantity, id, date } = item
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditData(item)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
            onClick={() => deleteData(id)}
            destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={icons[category]}
                            alt="Saving Icon"
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{nameS}</p>
                            {/*Adding our date here */}
                            <p className="fecha-gasto">
                                Posted:  {''}
                                <span>{getDate(date)}</span>
                            </p>

                        </div>
                    </div>
                    <p className="cantidad-gasto">${quantity}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expenses
