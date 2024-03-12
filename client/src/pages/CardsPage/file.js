import { initializeApp } from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAsPS-92Jj2WO1MaY2kFbs_au4OUc_8xwo",
    authDomain: "stackoverflow-clone-6f731.firebaseapp.com",
    projectId: "stackoverflow-clone-6f731",
    storageBucket: "stackoverflow-clone-6f731.appspot.com",
    messagingSenderId: "647857228555",
    appId: "1:647857228555:web:5a6b9e5188fa513224f00e",
    measurementId: "G-9QZQNM1F5Q",
  };

const app = initializeApp(firebaseConfig);
export default app;