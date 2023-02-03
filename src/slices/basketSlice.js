import { createSlice } from "@reduxjs/toolkit";

// Initial state of basketSlice
const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  // pass initial state as an argument
  initialState,
  reducers: {
    // actions (dispatching an action)
    addToBasket: (state, action) => {
      // payload actually contains product that was passed in while dispatching action
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // Find index of item and remove from basket
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        // The item exists in basket
        newBasket.splice(index, 1);
      } else {
        // show warning if item does not exist
        console.warn(
          `Cannot remove product (id: ${action.payload.id}) as it not in basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

// Price selector- Use reducer function to calculate the total price of items in basket
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);
export default basketSlice.reducer;
