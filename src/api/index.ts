import type { IApiControllers, IAuthController } from "./controllers/types";
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from "axios";
import { useAppStore } from "@/stores/app";

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
};

type ApiRequestConfig = AxiosRequestConfig & {
    guid?: string;
};

class RequestQueue {
    private queue: Map<string, ApiRequestConfig> = new Map();
    private loaderTimer: ReturnType<typeof setTimeout> | null = null;
    private appStore = useAppStore();

    add(config: ApiRequestConfig) {
        if (config.guid) {
            this.queue.set(config.guid, config);
            this.updateLoaderState();
        }
    }

    remove(guid: string) {
        if (this.queue.delete(guid)) {
            this.updateLoaderState();
        }
    }

    get size() {
        return this.queue.size;
    }

    private updateLoaderState() {
        // Отменяем предыдущий таймер, если он есть
        if (this.loaderTimer) {
            clearTimeout(this.loaderTimer);
            this.loaderTimer = null;
        }

        if (this.size > 0) {
            // Если есть активные запросы - включаем лоадер
            this.appStore.loader = true;
        } else {
            // Если запросов нет - ставим таймер на выключение
            this.loaderTimer = setTimeout(() => {
                this.appStore.loader = false;
                this.loaderTimer = null;
            }, 1000);
        }
    }
}

function createAxiosInstance(): AxiosInstance {
    return axios.create({
        baseURL: '/api/',
        responseType: "json",
        headers: DEFAULT_HEADERS,
    });
}

class ApiService implements IApiControllers {
    public readonly instance: AxiosInstance;
    public readonly requestQueue = new RequestQueue();

    public auth?: IAuthController;

    constructor() {
        this.instance = createAxiosInstance();
        this.setupInterceptors();
        this.registerControllers();
    }

    private setupInterceptors() {
        // Интерцептор запросов
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const guid = crypto.randomUUID();
                (config as ApiRequestConfig).guid = guid;
                this.requestQueue.add(config as ApiRequestConfig);
                return config;
            }
        );

        // Интерцептор ответов
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                const guid = (response.config as ApiRequestConfig).guid;
                if (guid) this.requestQueue.remove(guid);

                return response;
            },
            (error) => {
                const guid = (error.config as ApiRequestConfig)?.guid;
                if (guid) this.requestQueue.remove(guid);

                return Promise.reject(error);
            }
        );
    }

    private registerControllers() {
        const controllerModules = import.meta.glob('./controllers/*.controller.ts', {
            eager: true
        });

        for (const path in controllerModules) {
            const module = controllerModules[path] as { default: (api: ApiService) => void };
            if (typeof module.default === 'function') module.default(this);
        }
    }
}

const apiService = new ApiService();
export default apiService;
export type { ApiService };
