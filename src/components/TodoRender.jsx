import { useDispatch } from "react-redux";
import scss from "./TodoRender.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

const TodoRender = () => {
	const todos = useSelector((state) => state);
	const dispatch = useDispatch();
	const [editId, setEditId] = useState(null);
	const [editedName, setEditedName] = useState("");
	const [editedImg, setEditedImg] = useState("");
	const [editedPrice, setEditedPrice] = useState("");

	const deleteTodo = (id) => {
		dispatch({
			type: "DELETE_TODO",
			payload: { id },
		});
	};

	const editTodo = (todo) => {
		setEditedName(todo.name);
		setEditedImg(todo.img);
		setEditedPrice(todo.price);
		setEditId(todo.id);
	};

	const saveTodo = () => {
		dispatch({
			type: "EDIT_TODO",
			payload: {
				id: editId,
				updates: {
					completed: false,
					name: editedName,
					img: editedImg,
					price: editedPrice,
				},
			},
		});
		setEditId(null);
		setEditedName("");
		setEditedImg("");
		setEditedPrice("");
	};

	const toggleCompleted = (id) => {
		dispatch({
			type: "COMPLETED_TODO",
			payload: {
				id,
			},
		});
	};

	return (
		<div className={scss.card}>
			{todos.map((item, index) => (
				<div className={scss.box} key={index}>
					{editId === item.id ? (
						<div className={scss.editedInputs}>
							<input
								type="text"
								value={editedName}
								onChange={(e) => setEditedName(e.target.value)}
							/>
							<input
								type="url"
								value={editedImg}
								onChange={(e) => setEditedImg(e.target.value)}
							/>
							<input
								type="text"
								value={editedPrice}
								onChange={(e) => setEditedPrice(e.target.value)}
							/>
							<button
								className={scss.saveButton}
								onClick={() => saveTodo(item.id)}>
								save
							</button>
							<button
								className={scss.cancelButton}
								onClick={() => setEditId(null)}>
								cancel
							</button>
						</div>
					) : (
						<div>
							<h1
								style={
									item.completed
										? { textDecoration: "line-through", color: "red" }
										: {}
								}>
								name: {item.name}
							</h1>
							<img src={item.img} alt="img" />
							<h3
								style={
									item.completed
										? { textDecoration: "line-through", color: "red" }
										: {}
								}>
								price: {item.price}
							</h3>
							<div className={scss.boxButton}>
								<button
									className={scss.deleteButton}
									onClick={() => deleteTodo(item.id)}>
									delete
								</button>
								<button
									className={scss.editeButton}
									onClick={() => editTodo(item)}>
									edit
								</button>
								<button
									className={scss.completedButton}
									onClick={() => toggleCompleted(item.id)}>
									{!item.completed ? "Completed" : "UnCompleted"}
								</button>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoRender;
