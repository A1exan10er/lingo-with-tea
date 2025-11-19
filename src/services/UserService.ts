import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    addDoc,
    query,
    getDocs,
    orderBy,
    deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { User, Language } from '../models';

export class UserService {
    private static instance: UserService;

    private constructor() { }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getUser(userId: string): Promise<User | null> {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                return User.fromJSON(userDoc.data());
            }
            return null;
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    }

    async createUser(user: User): Promise<void> {
        try {
            await setDoc(doc(db, 'users', user.getId()), user.toJSON());
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async updateUser(user: User): Promise<void> {
        try {
            await updateDoc(doc(db, 'users', user.getId()), user.toJSON() as any);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async addWordToBook(userId: string, word: any, language: Language): Promise<void> {
        try {
            // Store words in a subcollection 'wordbook' for the user
            await addDoc(collection(db, 'users', userId, 'wordbook'), {
                ...word,
                language: language.code,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error adding word to book:', error);
            throw error;
        }
    }

    async getWordBook(userId: string): Promise<any[]> {
        try {
            const q = query(collection(db, 'users', userId, 'wordbook'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting word book:', error);
            throw error;
        }
    }

    async addHistory(userId: string, historyItem: any): Promise<void> {
        try {
            await addDoc(collection(db, 'users', userId, 'history'), {
                ...historyItem,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error adding history:', error);
            throw error;
        }
    }

    async getHistory(userId: string): Promise<any[]> {
        try {
            const q = query(collection(db, 'users', userId, 'history'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting history:', error);
            throw error;
        }
    }

    async deleteWordFromWordBook(userId: string, wordId: string): Promise<void> {
        try {
            await deleteDoc(doc(db, 'users', userId, 'wordbook', wordId));
        } catch (error) {
            console.error('Error deleting word from word book:', error);
            throw error;
        }
    }

    async deleteHistoryItem(userId: string, historyId: string): Promise<void> {
        try {
            await deleteDoc(doc(db, 'users', userId, 'history', historyId));
        } catch (error) {
            console.error('Error deleting history item:', error);
            throw error;
        }
    }
}
