import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTasks, deleteTask, updateTask, createTask } from '../apis/tasksApi';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await getTasks();
    return response.data;
})

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await createTask(task);
    return response.data;
})

export const modifyTask = createAsyncThunk('tasks/modifyTask', async ({ id, newTask }) => {
    const response = await updateTask(id, newTask);
    return response.data;
})

export const removeTask = createAsyncThunk('tasks/removeTask', async (id) => {
    const response = await deleteTask(id);
    return response.data;
})


const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(modifyTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(modifyTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) state.tasks[index] = action.payload;
            })
            .addCase(modifyTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task =>
                    task._id !== action.payload
                );
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }

})

export default tasksSlice.reducer;