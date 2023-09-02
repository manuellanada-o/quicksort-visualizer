import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const LIST_LENGTH = 50
const MAX_NUMBER = 50
const randomNumberList = Array.from({ length: LIST_LENGTH }, () => Math.floor(Math.random() * MAX_NUMBER));

export interface SorterState {
    value: number[];
    status: 'idle' | 'loading' | 'failed';
}

const swap = (items: number[], leftIndex: number, rightIndex: number) => {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;

    // setTimeout(() => {
    //     const temp = items[leftIndex];
    //     items[leftIndex] = items[rightIndex];
    //     items[rightIndex] = temp;
    // }, 1000); 
}

const partition = (items: number[], left: number, right: number) => {
    const pivot = items[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

const quickSort = async (items: number[], left: number = 0, right: number = items.length - 1) => {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

const initialState: SorterState = {
    value: randomNumberList,
    status: 'idle',
};

export const sorterSlice = createSlice({
    name: 'sorter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        sort: (state) => {
            quickSort(state.value)
        }
    }
});

export const { sort } = sorterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectList = (state: RootState) => state.sorter.value;

export default sorterSlice.reducer;
