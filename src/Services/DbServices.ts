import { db } from "@/Firebase/firebase.config";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";


export class dbServices {
    private DB
    constructor() {
        this.DB = db;
    }
    async addDocment(collectionName: string, uid: string, data: object) {
        try {
            const id = uid;
            const docRef = doc(this.DB, collectionName, id)
            const respnse = await setDoc(docRef, data)
          //  console.log("data is successfully add")
            return respnse
        } catch (error) {
            console.log("can't add the docment", error)
            return false;
        }
    }
    async getDocment(collectionName: string, userId: string) {
        try {
            const docRef = doc(this.DB, collectionName, userId);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) return null
            console.log("data is successfully received")
            return docSnap.data()
        } catch (error) {
            console.log("can't getdocs ", error)
            return null
        }
    }
    async updateDocment(collectionName: string, userId: string, data: object) {
        try {
            const docRef = doc(this.DB, collectionName, userId);
            await updateDoc(docRef, data);
            console.log("data is successfully updated")
            return true;
        } catch (error) {
            console.log("error data't be updated")
        }
    }
    async deletDocment(collectionName : string , userId : string ,){
        try {
            await deleteDoc(doc(this.DB , collectionName , userId))
        } catch (error) {
            console.log("can't delet the docment")
        }
    }
}


const DbServices = new dbServices();

export default DbServices;