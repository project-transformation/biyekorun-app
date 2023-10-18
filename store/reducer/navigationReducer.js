let init ={
    
   

}

const navigationReducer = (state=init, action)=>{
switch (action.type) {
    case "SET_NAVIGATION":
   return action.payload
    
    default:
        return state;
}
}

export default navigationReducer