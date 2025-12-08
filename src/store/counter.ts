import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {    // <-- can take 2 parameters
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        }
    },
    getters: {
        countResult: (state) => state.count % 2 === 0 ? "Even" : "Odd"      // here any name can be used in place of countResult
    }
});      