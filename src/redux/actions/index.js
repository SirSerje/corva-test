let actions = {
  increase: function(title) {
    return {
      type: 'INCREASE',
      title: title,
    }
  },
  decrease: function(id) {
    console.log('____ DECREASE ACTION');
    return {
      type: 'DECREASE',
      id: id
    }
  },
}
export default actions