import { db, firebase } from './firebase';
import { Product } from '../models/product';
import { User } from '../models/user';

export class FirestoreService {

    /* ------------------------------- NOTE PRODUCTS ------------------------------ */
    /* ------------------------------- NOTE PRODUCTS ------------------------------ */

    static getProducts = async function (/* email: string */) {
        const query = await db.collection('products').limit(300).get();

        let products: Product[] = [];

        query.docs.forEach((doc) => {
            const product = Product.fromFirestore(doc);
            if (product) {
                products.push(product);
            }
        });
        console.log('products', products);

        return products;
    };

    static addProduct = async function (data: any) {
        await db.collection('products').add(data);
    };

    static getProduct = async function (id: string): Promise<Product | null> {
        const query = await db.collection('products').doc(id).get();
        return Product.fromFirestore(query);
    };

    static updateProduct = async function (id: string, data: any) {
        await db.collection('products').doc(id).set(data, { merge: true });
    };

    /* ------------------------------- NOTE USERS ------------------------------- */
    /* ------------------------------- NOTE USERS ------------------------------- */

    static getUsers = async function () {
        const query = await db.collection('users').limit(300).get();

        let users: User[] = [];

        query.docs.forEach((doc) => {
            const user = User.fromFirestore(doc);
            if (user) {
                users.push(user);
            }
        });
        console.log('users', users);

        return users;
    };

    static addUser = async function (data: any) {
        await db.collection('users').add(data);
    };

    static deleteUser = async function (id: string) {
        await db.collection('users').doc(id).delete();
    };

    static updateUser = async function (id: string, data: any) {
        await db.collection('users').doc(id).set(data, { merge: true });
    };

    /* ---------------------------- DELETE COLLECTION --------------------------- */
    /* ---------------------------- DELETE COLLECTION --------------------------- */

    static deleteReport = function (id: string) {
        db.collection('v2reports').doc(id).delete();
    };
}
