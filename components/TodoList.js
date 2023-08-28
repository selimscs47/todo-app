import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Todo from "./Todo";


export default function TodoList() {
  const[todos, setTodos] = useState([]);

  useEffect(() => {
    const ref = collection(db, "todos");
    const q = query(ref, orderBy("tarih", "desc"));

    const unsub= onSnapshot(q, (snap) => {
      setTodos(snap.docs.map(doc=>(
        {...doc.data(), id: doc.id,tarih: doc.data().tarih?.toDate().getTime()
        }

      )))
      });
      return unsub;

    }, []);
   
  return(
   <div>
    {todos.map(todo=>
    <Todo key={todo.id} todo={todo}/>
    )}
  </div>
  )
}
