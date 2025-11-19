import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import { auth } from './firebase';

export class AuthService {
    private static instance: AuthService;

    private constructor() { }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async signUp(email: string, password: string): Promise<FirebaseUser> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error: any) {
            console.error('Error signing up:', error);
            if (error.code === 'auth/configuration-not-found') {
                console.error('This error often means the "Email/Password" sign-in provider is not enabled in the Firebase Console.');
            }
            throw error;
        }
    }

    async login(email: string, password: string): Promise<FirebaseUser> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void {
        return onAuthStateChanged(auth, callback);
    }
}
