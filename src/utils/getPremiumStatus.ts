import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase";

export const getPremiumStatus = async ( userId: string) => {

    if (!userId) throw new Error("User not logged in");

    const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
    const q = query(
        subscriptionsRef,
        where("status", "in", ["trialing", "active"])
    );

    return new Promise<boolean>((resolve, reject) => {
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                // In this implementation we only expect one active or trialing subscription to exist.
                if (snapshot.docs.length === 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
                unsubscribe();
            },
            reject
        );
    });
};