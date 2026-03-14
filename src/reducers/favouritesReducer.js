export const initialState = JSON.parse(localStorage.getItem("favourites")) || [];

export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      const exists = state.find((p) => p.id === action.payload.id);
      let updated;
      if (exists) {
        updated = state.filter((p) => p.id !== action.payload.id);
      } else {
        updated = [...state, action.payload];
      }
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;

    default:
      return state;
  }
}