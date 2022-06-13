import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './itemMenu.module.css'

function ItemMenu({place, equip, pos, item, menu}) {
    console.log(item)
    const dispatch = useDispatch()
    const [isDivide, setIsDivide] = useState(false)
    const [count, setCount] = useState(item.count)

    const handleEquip = (item) => {
        menu.setShowMenu(null)
        dispatch({type: "EQUIP_ITEM", data: item})
        dispatch({type: "REMOVE_ITEM", id: place})
    }

    const handleUnequip = (item) => {
        menu.setShowMenu(null)
        dispatch({type: "UNEQUIP_ITEM", data: item})
        dispatch({type: "SET_ITEM_FREE", data: item})
    }

    const handleDivide = (item) => {
        if (!isDivide) {
            setCount(Math.ceil(count / 2))
            setIsDivide(true)
            return
        }
        if (item.count === 1) return
        if (count >= item.count || count <= 0) return
        menu.setShowMenu(null)
        let newItem = JSON.parse(JSON.stringify(item))
        newItem.count = Math.ceil(count)
        item.count = item.count - newItem.count;
        if (item.place === "pockets") {
            dispatch({type: "SET_ITEM_FREE", data: newItem})
            return
        }
        dispatch({type: "GROUND_SET_ITEM_FREE", data: newItem})
    }

    const handleTakeItem = (item) => {
        menu.setShowMenu(null)
        dispatch({type: "GROUND_REMOVE_ITEM", id: item.id})
        dispatch({type: "SET_ITEM_FREE", data: item})
        
    }

    const handleDropItem = (item) => {
        menu.setShowMenu(null)
        dispatch({type: "GROUND_SET_ITEM_FREE", data: item})
        if (equip) {
            dispatch({type: "UNEQUIP_ITEM", data: {slot: item.slot}})
        } else {
            dispatch({type: "REMOVE_ITEM", id: item.id})
        }
    }

    const handleIncrement = (item) => {
        if (count + 1 >= item.count) {
            return
        }
        setCount(count + 1)
    }

    const handleDecrement = (item) => {
        if (count - 1 < 1) {
            return
        }
        setCount(count - 1)
    }

    return ( 
        <div onClick={(e) => e.stopPropagation()} style={{top: pos?.y - 20 + 'px', left: pos?.x + 18 + 'px'}} className={styles.itemMenu}>
            <div className={styles.header}>
                <h5 className={styles.title}>{item.title}</h5>
                <p className={styles.weight}>Вес: {item.weight} кг</p>
            </div>
            {equip ? 
            <button onClick={() => handleUnequip(item)} className={styles.control}>Снять</button>    
            :
                item.place === "pockets" ? item.stackable ? <></> : <button onClick={() => handleEquip(item)} className={styles.control}>Надеть</button> : <button onClick={() => handleTakeItem(item)} className={styles.control}>Взять</button>
                // ^ Если предмет в кармане то проверяем (если предмет стакается, то кнопки нет, если нет - кнопка надеть), иначе кнопка Взять
            }
            {isDivide 
            ? 
            <div className={styles.divide}>
                <button className={styles.controlButton} onClick={() => handleIncrement(item)}>+</button>
                <input type="number" name="" id="" onChange={(e) => setCount(e.target.value)} value={count} className={styles.inputCount} />
                <button className={styles.controlButton} onClick={() => handleDecrement(item)}>-</button>
            </div>
            : <></>
            }
            <button onClick={() => handleDivide(item)} className={styles.control}>Разделить</button>
            {item.place === "pockets" ? <button onClick={() => handleDropItem(item)} className={styles.control}>Выбросить</button> : <></>}
        </div>
    );
}

export default ItemMenu;