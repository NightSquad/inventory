import styles from './item.module.css'
import ItemMenu from '../itemMenu/itemMenu';

function Item(props) {
    const handleClick = (e, item) => {
        e.stopPropagation()
        props.pos.setPos({x: e.clientX, y: e.clientY})
        props.menu.setShowMenu(item)
      }

      const dragStartHandler = (e, item) => {
        e.dataTransfer.setData("text", JSON.stringify(item))
        setTimeout(() => {
          e.target.style.opacity = 0
        }, 0);
      }

      const dragEndHandler = (e) => {
        e.target.style.opacity = 1
      }

    return ( 
        <div
        onDragStart={(e) => dragStartHandler(e, props.item)}
        onDragEnd={(e) => dragEndHandler(e)}
        draggable={true}
        data-active={props.active}
        onClick={(e) => handleClick(e, props.item)}
        className={styles.item}>
            {(props.item.slot === "primary" || props.item.slot === "secondary") && props.active ? <p className={styles.title}>{props.item.title}</p> : <></>}
            <img src={props.item.img} alt="" />
            {props.item.stackable ? <p className={styles.count}>{props.item.count}</p> : <></>}
            {(props.item.slot === "primary" || props.item.slot === "secondary") && props.active ? <p className={styles.ammo}>{props.item.ammo}</p> : <></>}  
            {props.menu.showMenu?.id  === props.item.id && props.menu.showMenu?.place === props.item.place ? <ItemMenu place={props.place} equip={props.equip} item={props.item} pos={props.pos.pos} menu={props.menu}/> : <></>}
      </div> 
    );
}

export default Item;
