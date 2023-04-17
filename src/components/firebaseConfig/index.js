import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyB760QB6RzAQ8k6O5P2GbzMhxdjN0jJ8GA",
        authDomain: "fir-react-a204a.firebaseapp.com",
        databaseURL: "https://fir-react-a204a-default-rtdb.firebaseio.com",
        projectId: "fir-react-a204a",
        storageBucket: "fir-react-a204a.appspot.com",
        messagingSenderId: "613984408392",
        appId: "1:613984408392:web:6bed78c96820ef2b4cd97d"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      return getDatabase(app);
}

export default StartFirebase;