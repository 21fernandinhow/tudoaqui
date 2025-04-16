import { getAuth } from "firebase/auth";
import {
    addDoc,
    collection,
    onSnapshot,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app, db } from "../firebase";

export const getCheckoutUrl = async (
    uid: string,
    priceId: string
): Promise<string> => {
    
    if (!uid) throw new Error("User is not authenticated");

    const checkoutSessionRef = collection(
        db,
        "customers",
        uid,
        "checkout_sessions"
    );

    const docRef = await addDoc(checkoutSessionRef, {
        price: priceId,
        success_url: window.location.origin + "/premium",
        cancel_url: window.location.origin + "/premium",
    });

    return new Promise<string>((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data() as {
                error?: { message: string };
                url?: string;
            };
            if (error) {
                unsubscribe();
                reject(new Error(`An error occurred: ${error.message}`));
            }
            if (url) {
                unsubscribe();
                resolve(url);
            }
        });
    });
};

export const getPortalUrl = async (): Promise<string> => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    let dataWithUrl: any;
    try {
        const functions = getFunctions(app, "us-central1");
        const functionRef = httpsCallable(
            functions,
            "ext-firestore-stripe-payments-createPortalLink"
        );
        const { data } = await functionRef({
            customerId: user?.uid,
            returnUrl: window.location.origin,
        });

        // Add a type to the data
        dataWithUrl = data as { url: string };
    } catch (error) {
        console.error(error);
    }

    return new Promise<string>((resolve, reject) => {
        if (dataWithUrl.url) {
            resolve(dataWithUrl.url);
        } else {
            reject(new Error("No url returned"));
        }
    });
};