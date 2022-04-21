const initialState = {
  address: null,
  chainId: null,
  library: null,
};

const addressReducer = (
  state = initialState,
  action: {
    payload: any;
    type: any;
  }
) => {
  switch (action.type) {
    case "ADD_ADDRESS": {
      return (state = action?.payload);
    }

    default:
      return state;
  }
};

export default addressReducer;
