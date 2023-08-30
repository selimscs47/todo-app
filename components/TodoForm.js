import { Button, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoForm() {

const {showAlert}=useContext(TodoContext);

  const [todo, setTodo] = useState({
      baslik: "",
    aciklama: "",
  });

  const handleClick =async (e) => {
    e.preventDefault();
    // console.log(todo);

    if (todo.baslik === "" || todo.aciklama === "") {
      showAlert("error","Lütfen tüm alanları doldurunuz");
      return;
    }

    const ref=collection(db,"todos");
    const docRef=await addDoc(ref,{...todo,tarih:serverTimestamp()});

    console.log(docRef.id);

    // Form gönderildikten sonra inputları temizle
    setTodo({
      aciklama: "",
      baslik: "",
    });
    // alert("Todo başarıyla eklendi");
    showAlert("success","Todo başarıyla eklendi");
  };


  return (
    <form onSubmit={handleClick}>
      <Typography sx={{ mt: 3, fontWeight: "bold" }} variant="h5" color="darkgrey">
        Yeni ToDo Ekle
      </Typography>
      <TextField value={todo.baslik} fullWidth label="Başlık" margin="normal"  onChange={(e) => setTodo({ ...todo, baslik: e.target.value })} />
      <TextField value={todo.aciklama} fullWidth label="Açıklama" margin="normal"  onChange={(e) => setTodo({ ...todo, aciklama: e.target.value })} />
      <Button type="submit" sx={{ mt: 3 }} variant="outlined" color="success">
        Todo Ekle
      </Button>
    </form>
  );
}
