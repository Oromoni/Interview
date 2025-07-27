import { cert, getApps, initializeApp as initializeAdminApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initFirebaseAdmin = () => {
    if (!getApps().length) {
        initializeAdminApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
    };
};

export default initFirebaseAdmin;

// Optional: Initialize immediately and export
export const { auth, db } = initFirebaseAdmin();
