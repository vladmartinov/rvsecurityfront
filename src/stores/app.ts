import { defineStore } from "pinia";

interface appStoreState {
    loader: boolean;
};

export const useAppStore = defineStore('app', {
    state: (): appStoreState => {
        return {
            loader: false
        }
    },
    getters: {},
    actions: {},
})
