import kepka from "../assets/items/100px-Vintage_Baseball_Hat_(White) 3.png"
import MK2 from "../assets/items/MK2.png"
import body from "../assets/items/Icon_equipment_Jacket_Suit_Coat_(Gray) 1.png"
import shoes from '../assets/items/100px-Icon_equipment_Feet_PU_01 1.png'
import pants from '../assets/items/100px-Icon_equipment_Legs_Porket_Pants_(Black) 1.png'
import Cola from "../assets/items/Coca Cola Can 1.png"
import Item from "../components/item/item"
import Mask from "../assets/items/100px-Twitch_Prime_June_Balaclava 1.png"
const items = [
    // {
    //     "id": 0,
    //     "title": "Кепка с козырьком",
    //     "slot": "head",
    //     "img": kepka,
    //     "stackable": false,
    //     "count": 1,
    //     "weight": 0.25
    // },
    null,
    {
        "id": 1,
        "title": "Балаклава",
        "slot": "mask",
        "img": Mask,
        "stackable": false,
        "count": 1,
        "weight": 0.5,
        "place": "pockets",
    },
    {
        "id": 2,
        "title": "Штурмовая винтовка",
        "slot": "primary",
        "img": MK2,
        "stackable": false,
        "count": 1,
        "weight": 7,
        "ammo": 35,
        "ammo_type": "7.62",
        "place": "pockets",
    },
    {
        "id": 3,
        "title": "Штаны",
        "slot": "pants",
        "img": pants,
        "stackable": false,
        "count": 1,
        "weight": 0.5,
        "place": "pockets",
    },
    {
        "id": 4,
        "title": "Ботинки",
        "slot": "shoes",
        "img": shoes,
        "stackable": false,
        "count": 1,
        "weight": 0.5,
        "place": "pockets",
    },
    {
        "id": 5,
        "title": "Пиджак",
        "slot": "body",
        "img": body,
        "stackable": false,
        "count": 1,
        "weight": 0.5,
        "place": "pockets",
    },
    null,
    null,
    null,
    null,
    null,
    {
        "id": 11,
        "title": "Coca-Cola",
        "slot": "none",
        "img": Cola,
        "stackable": true,
        "count": 30,
        "weight": 0.5,
        "place": "pockets",
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
]

export default (state = items, action) => {
    switch (action.type) {

        case "SET_ITEM_FREE":
            for(let i = 0; i<state.length; i++) {
                if (state[i] === null) {
                    state[i] = action.data;
                    state[i].id = i;
                    break
                }
            }
            return state
    
        case "CHANGE_ITEM":
            state[action.data.place] = action.data.item;
            return state

        case "REMOVE_ITEM":
            state[action.id] = null
            return state
        
        case "SET_ITEM":
            state[action.data.id] = action.data.item
            return state

  default:
    return state
  }
}
