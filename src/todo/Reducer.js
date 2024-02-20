const initialState = [];

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TODO":
			return [...state, action.payload];
		case "DELETE_TODO":
			return state.filter((todo) => todo.id !== action.payload.id);
		case "DELETE_ALL":
			return [];
		case "EDIT_TODO":
			return state.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, ...action.payload.updates };
				}
				return todo;
			});
		case "COMPLETED_TODO":
			return state.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});

		default:
			return state;
	}
};

export default Reducer;
