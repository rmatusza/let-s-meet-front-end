export const eventReducer = (state = [], action) => {
  console.log(action.date)
  switch (action.type){
    case 'CHANGE_EVENTS':
      return [...action.events]
    case 'CHANGE_DATE':
      return [...action.date]
    default:
      return state
  }
};
