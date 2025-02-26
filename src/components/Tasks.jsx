
import React, { useEffect, useState } from 'react'
import { fetchTasks, addTask, removeTask, modifyTask } from '../slices/tasksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import TaskModal from '../components/TaskModal';
import { FaEdit, FaTrash, FaPlus, FaCheck } from 'react-icons/fa';
import { MdOutlinePendingActions } from "react-icons/md";
import { SlLogout } from "react-icons/sl";


export default function Tasks({ user }) {

    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector(state => state.tasks);
    const [createTaskModalIsOpen, setCreateTaskModalIsOpen] = useState(false);
    const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]) //?why put dispatch in dependenct array

    const handleCreate = (newTask) => {
        dispatch(addTask(newTask));
        setCreateTaskModalIsOpen(false);
    }
    const handleUpdate = (newTask) => {
        dispatch(modifyTask({ id: currentTask._id, newTask }));
        setEditTaskModalIsOpen(false);
        setCurrentTask(null);
    }
    const handleDelete = (id) => {
        dispatch(removeTask(id));
    }
    const openCreateTaskModal = () => {
        setCreateTaskModalIsOpen(true);
    }
    const closeCreateTaskModal = () => {
        setCreateTaskModalIsOpen(false);
    }
    const openEditTaskModal = (task) => {
        setEditTaskModalIsOpen(true);
        setCurrentTask(task);
    }
    const closeEditTaskModal = () => {
        setEditTaskModalIsOpen(false);
    }
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6">
            <div className='flex justify-end'>
                <button
                    onClick={handleLogout}
                    className="text-gray-800 px-3 py-1 flex items-center gap-2 my-4"
                >
                    <SlLogout /> Logout
                </button>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">Tasks</h2>
            <button
                className="text-gray-800 px-3 py-1 flex items-center gap-2 my-4"
                onClick={openCreateTaskModal}
            >
                <FaPlus /> Add Task
            </button>

            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                        <div>
                            <h3>{task.title}</h3>
                        </div>
                        <div className="flex gap-3">
                            {task.completed ? <div className="text-green-500">
                                <FaCheck />
                            </div> : <div className="text-orange-500"><MdOutlinePendingActions />
                            </div>}

                            <button className="text-yellow-500 hover:text-yellow-600" onClick={() => openEditTaskModal(task)}>
                                <FaEdit />
                            </button>
                            <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(task._id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <TaskModal task={currentTask} onSubmit={handleUpdate} isOpen={editTaskModalIsOpen} onClose={() => setEditTaskModalIsOpen(false)} />
            <TaskModal onSubmit={handleCreate} isOpen={createTaskModalIsOpen} onClose={() => setCreateTaskModalIsOpen(false)} />
        </div>

    )
}
