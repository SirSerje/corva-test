const reducer = (state={counter:0}, action) => {
  console.log('reducer: ', action.type)
  switch (action.type) {
    case 'DATA':
      console.log(action.payload)
      return state
    
    default:
      return state
  }
}
export default reducer