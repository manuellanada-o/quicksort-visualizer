import { useState } from 'react';

export function Sorter() {
    const LIST_LENGTH = 100
    const MAX_NUMBER = 100
    const list = Array.from({ length: LIST_LENGTH }, () => Math.floor(Math.random() * MAX_NUMBER));

    const [numberList, setNumberList] = useState(list.join(','));

    const swap = (items: number[], leftIndex: number, rightIndex: number) => {
        console.log(`items = ${items}`)
        const temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
        setNumberList(items.join(','))
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
        setTimeout(() => {
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
        }, 100);
    }

    return (
        <div>
            <div>
                <button
                    style={{padding: '10px 40px', backgroundColor:'white'}}
                    aria-label="sort list"
                    onClick={() => quickSort(numberList.split(',').map(x => +x))}
                >
                    QuickSort
                </button>
                <input
                  placeholder='place numbers separated by ,'
                  style={{padding: '10px 40px', backgroundColor:'white'}}
                  onChange={(event) => {
                    console.log(event.target.value)
                    if (event.target.value.split(',').every(x => !isNaN(x as any))) {
                        setNumberList(event.target.value)
                    } else {
                        setNumberList('')
                    }
                  }}
                >

                </input>
            </div>
            <br style={{marginBottom:'-10px'}}/>
            <div style={{ display: 'flex' }}>
                {numberList.split(',').map(x => (<div style={{ display: 'block', width: 4, height: 2 * +x, backgroundColor: 'black' }} />))}
            </div>
        </div>
    );
}
