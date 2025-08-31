import { defineStore } from "pinia";
import api from "@/api";

interface authStoreState {
    isLoggedIn: boolean;
    model: {
        login: string;
        password: string;
    }
};

export const useAuthStore = defineStore('auth', {
    state: (): authStoreState => {
        return {
            isLoggedIn: false,
            model: {
                login: '',
                password: ''
            }
        }
    },
    getters: {},
    actions: {
        async callLogin() {
            try {
                this.isLoggedIn = true;
                await api.auth?.login(this.model);
            } catch (error) {
                throw error;
            }
        },
        async callLogout() {
          try {
              this.isLoggedIn = false;
              await api.auth?.logout();
          } catch (error) {
              throw error;
          }
        }
    },
})
