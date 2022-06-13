import './App.css';
import QuickSlots from './components/quick_slots/QuickSlots';
import Satiety from './components/satiety/satiety';
import Title from './components/UI/Title/Title';
import { useState } from 'react';
import Item from './components/item/item';
import { useDispatch, useSelector } from 'react-redux';
import Weight from './components/UI/weight/weight'

function App() {
  console.log('render')
  const [items, ground] = useSelector(state => [state.items, state.ground])
  const [update, setUpdate] = useState(false)
  let inventoryWeight = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i]) {
      inventoryWeight = inventoryWeight + (items[i].weight * items[i].count)
    }
  }

  const [showMenu, setShowMenu] = useState(null)
  const [pos, setPos] = useState(null)
  const equip = useSelector(state => state.equip)
  const bag = [0, 1, 2, 3, 4]
  const dispatch = useDispatch()

  const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.classList.add("ceil__hover")
    e.dataTransfer.dropEffect = 'move'
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault()
    e.target.classList.remove("ceil__hover")
  }

  const onDropHandler = (e) => {
    let item = JSON.parse(e.dataTransfer.getData("text"))
    e.target.classList.remove("ceil__hover")
    if (equip[item.slot]) {
      dispatch({type: "UNEQUIP_ITEM", data: item})
      dispatch({type: "SET_ITEM", data: {id: e.target.dataset.id, item: {...item, id: e.target.dataset.id}}})
      setUpdate(!update)
      return
    }
    dispatch({type: "REMOVE_ITEM", id: item.id})
    dispatch({type: "SET_ITEM", data: {id: e.target.dataset.id, item: {...item, id: e.target.dataset.id}}})
    setUpdate(!update)
  }

  return (
    <div className="App" onClick={() => setShowMenu(null)}>
      <div className='backgroundGradient'></div>
      <div className='title'>
        <Title>Инвентарь</Title>
        <p className='subtitle'>Для взаимодействия с ивентарем используйте<br/>клавиши мышки  ЛКМ и ПКМ</p>
      </div>
      <div className='inventory'>
        <div className="leftColumn">
          <QuickSlots style={{alignSelf: 'flex-end'}}/>
          <Satiety/>
        </div>
        <div className="player_inventory">
            <div className="headers">
                <Title style={{marginBottom: '13px'}}>КАРМАНЫ</Title>
                <Weight currentWeight={inventoryWeight} totalWeight="50"/>
            </div>
            <div className="pockets">
            {items.map((item, index) => item
            ?
              <div key={"pockets" + index} data-id={index} className="ceil">
                <Item place={index} item={item} pos={{pos, setPos}} menu={{showMenu, setShowMenu}}/>
              </div>
            : 
              <div key={"pockets" + index} data-id={index} onDrop={(e) => onDropHandler(e)} onDragLeave={(e) => dragLeaveHandler(e)} onDragOver={(e) => dragOverHandler(e)} className='ceil'></div>)
            }
            </div>
            {equip.bag ? 
            <div className="headers">
                <Title>СУМКА</Title>
                <Weight currentWeight={"3,45"} totalWeight="50"/>
            </div>
            :<></> }
            {equip.bag ? 
            <div className="backpack">
              {bag.map(item => <div key={"bag" + item} className="ceil"></div>)}
            </div>
            : <></>}
        </div>
        <div className="equip">
          <Title justify="end" style={{marginTop: '14px', marginRight: '6px'}}>Надето</Title>
          <div className="equipped">
            <div className="cloth">
              <div className="cloth__items">
                <div className="ceil glasses">
                  {equip.glasses ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.glasses} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil head">
                    {equip.head ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.head} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>       
                <div className="ceil neck">
                  {equip.neck ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.neck} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil body">
                {equip.body ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.body} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil ring">
                  {equip.ring ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.ring} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil pants">
                {equip.pants ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.pants} menu={{showMenu, setShowMenu}}/> : <></>}</div> 
                <div className="ceil clock">
                  {equip.clock ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.clock} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil shoes">
                {equip.shoes ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.shoes} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
              </div>
              <div className="equipment__items">
                <div className="ceil mask">
                  {equip.mask ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.mask} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil armor">
                  {equip.armor ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.armor} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil phone">
                  {equip.phone ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.phone} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
                <div className="ceil bag">
                  {equip.bag ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.bag} menu={{showMenu, setShowMenu}}/> : <></>}
                </div>
              </div>
            </div>
            <div className="weapon">
              <div className="melee">
                <div className="weapon__item"></div>
              </div>
              <div className="range">
                <div data-type={equip.primary ? "active" : ""} className="range__slot">
                  <div className="weapon__item">
                    {equip.primary ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.primary} menu={{showMenu, setShowMenu}}/> : <></>}
                  </div>
                </div>
                <div data-type={equip.secondary ? "active" : ""} className="range__slot">
                  <div className="weapon__item">
                  {equip.secondary ? <Item equip={true} active={true} pos={{pos, setPos}} item={equip.secondary} menu={{showMenu, setShowMenu}}/> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ground">
          <Title style={{marginLeft: '22px', marginTop: '14px'}}>Окружение</Title>
          <div className="ground__items">
            {ground.map((item, index) => item ?
              <div key={"ground" + index} data-id={index} className='ceil'>
                <Item place={index} item={item} pos={{pos, setPos}} menu={{showMenu, setShowMenu}}/>
              </div>
            : <div key={"ground" + index} data-id={index} className='ceil'></div>)}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
