import { combineReducers, createStore } from "redux";
import items from "./items"
import equip from "./equip"
import ground from "./ground"


let rootReducer = combineReducers({items, equip, ground})

export const store = createStore(rootReducer)