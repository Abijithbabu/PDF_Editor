const initialState = {
  user: null,
  data: [],
  selectedPDF: null
}

export function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'login':
      return {
        user:payload,
        data:[]
      };
      case 'dispatch_data':
        return {
          ...state,
          selectedPDF:payload
        };   
    case 'logout':
      return {
        user:null,
        data:[] 
      };
    default:
      return state;
  }
}