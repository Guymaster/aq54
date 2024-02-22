import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "../common/configs";

export const getApp = () => {
    return initializeApp(FirebaseConfig);
};