const equip = {glasses: null, head: null, mask: null, neck: null, body: null, armor: null, ring: null, pants: null, phone: null, watch: null, shoes: null, bag: null, melee: null, primary: null, second: null}

export default (state = equip, action) => {
  switch (action.type) {

  case "EQUIP_ITEM":
    return { ...state, [action.data.slot]: action.data}

  case "UNEQUIP_ITEM":
    return {...state, [action.data.slot]: null}

  default:
    return state
  }
}
