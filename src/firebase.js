import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCm0oetNPXd_sKlLGFPhe27ldH65SKU4u8",
  authDomain: "netflix-clone-dhruv-a8d33.firebaseapp.com",
  projectId: "netflix-clone-dhruv-a8d33",
  storageBucket: "netflix-clone-dhruv-a8d33.firebasestorage.app",
  messagingSenderId: "825632665418",
  appId: "1:825632665418:web:9b4a3f1a6c867fa2b51bb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name , email , password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email
    })
    } catch (error) {
        console.log(error);
        //the code split changes /auth.invalid.credential to invalid credential 
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}
const login = async(email,password)=>{
    try {
         await signInWithEmailAndPassword(auth, email, password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

        
    }
}
const logout =()=>{
    signOut(auth);
}
export { auth, db ,login,signup,logout};
