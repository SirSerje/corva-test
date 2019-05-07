
const reducer = (state={counter:0}, action) => {
  console.warn(state,action);
  let counter = state.counter
  switch (action.type) {
    case 'INCREASE':
      counter++
      return {counter: counter}
    case 'DECREASE':
      counter --;
      return {counter: counter}
    default:
      return state
  }
}
export default reducer