import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {    // <-- can take 2 parameters
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || {id: 1, name: 'Prottoy'}
    }),
    actions: {
        setLocal() {
            localStorage.setItem('user', JSON.stringify(this.user));
        }
    },
    
});      