import { createStore } from "redux";
import taskReducer from "./reducer";



const saveState = (state:any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e)
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const persistedState = loadState();

const store = createStore(
    taskReducer,
    persistedState
);


store.subscribe(() => {
    saveState(store.getState());
});

export default store;