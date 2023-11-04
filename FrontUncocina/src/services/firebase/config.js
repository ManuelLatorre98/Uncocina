import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import 'react-native-get-random-values';
import {v4} from 'uuid'
const firebaseConfig = {
  apiKey: "AIzaSyBW-rAL5Yz8TwusiUmQfgSxCPTuYJcoKQk",
  authDomain: "uncocina.firebaseapp.com",
  projectId: "uncocina",
  storageBucket: "uncocina.appspot.com",
  messagingSenderId: "775607691186",
  appId: "1:775607691186:web:3d909e42c6b59be52aa6ab",
  measurementId: "G-07EZF58LZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file){
  const storageRef = ref(storage, `recipes/${v4()}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}


