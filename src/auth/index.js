import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { getApp } from "./firebase_init.js";

export class AuthService {
    static #app = getApp();
    /**
     * @returns {Promise<{}>}
     * @param {string} email
     * @param {string} password 
     */
    static async signIn(email, password){
        const auth = getAuth(this.#app);
        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            return credentials;
        } catch (error) {
            return null;
        }
    };
}