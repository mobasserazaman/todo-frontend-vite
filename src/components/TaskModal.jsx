import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTimes } from "react-icons/fa";

export default function TaskModal({ task, isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (isOpen && task) {
            setTitle(task.title);
            setCompleted(task.completed);
        }
        if (isOpen && !task) {
            setTitle("");
            setCompleted(false);
        }
    }, [isOpen, task]);

    const handleSubmit = () => {
        onSubmit({ title, completed });
        setTitle("");
        setCompleted(false);
        onClose();
    };

    if (!isOpen) return null; // Hide modal if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{task ? "Edit" : "Create"}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="flex my-4">
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-5/6 p-2 border rounded mr-4"
                    />
                    <input
                        type="checkbox"
                        name="completed"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        className="w-7 p-2 border rounded"
                    />
                </div>
                <button
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
