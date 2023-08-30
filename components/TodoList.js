import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { Typography } from "@mui/material";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const ref = collection(db, "todos");
    const q = query(ref, orderBy("tarih", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      setTodos(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id, tarih: doc.data().tarih?.toDate().getTime() })));
    });
    return unsub;
  }, []);

  return (
    <div>
      {todos.length === 0 ? (
        <Typography variant="h5" sx={{ mt: 5, fontWeight: "bold" }}>
          Henüz Todo Eklenmedi...
        </Typography>
      ) : (
        <Typography variant="h4" sx={{ mt: 5, fontWeight: "bold", color:"#60915D"  }}>
          Todo Listesi
        </Typography>
      )}

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
