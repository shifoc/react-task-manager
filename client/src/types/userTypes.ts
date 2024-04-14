export interface User {
    email: string;
    password?: string;
    token?: string;
}

export interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
