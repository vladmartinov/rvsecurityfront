import { defineStore } from "pinia";

interface currentUserStoreState {
    currentUser: any;
};

export const useCurrentUserStore = defineStore('currentUser', {
    state: (): currentUserStoreState => {
        return {
            currentUser: null
        }
    },
    getters: {},
    actions: {},
})
