import { useState } from "react";
import { useDispatch } from "react-redux";
import TodoRender from "./TodoRender";
import scss from "./TodoList.module.scss";

const TodoList = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [img, setImg] = useState("");
	const [price, serPrice] = useState("");

	const addTodo = () => {
		if (name === "" || img === "" || price === "") {
			alert("Введите все поля");
		} else {
			dispatch({
				type: "ADD_TODO",
				payload: {
					id: Math.random(),
					name: name,
					img: img,
					price: price,
					completed: false,
				},
			});
			setName("");
			setImg("");
			serPrice("");
		}
	};

	const deleteAll = () => {
		dispatch({
			type: "DELETE_ALL",
		});
	};
	// console.log(todos);
	return (
		<div className={scss.inputs}>
			<h1>Todo List</h1>
			<input
				type="text"
				value={name}
				placeholder="name"
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="url"
				value={img}
				placeholder="img"
				onChange={(e) => setImg(e.target.value)}
			/>
			<input
				type="text"
				value={price}
				placeholder="price"
				onChange={(e) => serPrice(e.target.value)}
			/>
			<button className={scss.addButton} onClick={addTodo}>
				add
			</button>
			<button className={scss.deleteAllButton} onClick={deleteAll}>
				deleteAll
			</button>
			<TodoRender />
		</div>
	);
};

export default TodoList;
