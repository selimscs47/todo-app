import { Button, TextField, Typography } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoForm() {
  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const inputRef = useRef();

  useEffect(() => {
    const tiklanmaKontrol = (e) => {
      if (!inputRef.current.contains(e.target)) {
        console.log("inputlara tıklandı");
        setTodo({ baslik: "", aciklama: "" });
      } else {
        console.log("inputlar harici tıklandı");
      }
    };
    document.addEventListener("mousedown", tiklanmaKontrol);
    return () => {
      document.removeEventListener("mousedown", tiklanmaKontrol);
    };
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(todo);

    if (todo.baslik === "" || todo.aciklama === "") {
      showAlert("error", "Lütfen tüm alanları doldurunuz");
      return;
    }

    if (todo?.hasOwnProperty("id")) {
      //güncelleme

      const ref = doc(db, "todos", todo.id);
      const newTodo = { baslik: todo.baslik, aciklama: todo.aciklama, sonGuncellemeTarih: serverTimestamp() };

      updateDoc(ref, newTodo);
      setTodo({ baslik: "", aciklama: "" });
      showAlert("success", "Todo başarıyla güncellendi");
    } else {
      //ekleme
      const ref = collection(db, "todos");
      const docRef = await addDoc(ref, { ...todo, tarih: serverTimestamp() });

      console.log(docRef.id);

      // Form gönderildikten sonra inputları temizle
      setTodo({
        aciklama: "",
        baslik: "",
      });
      // alert("Todo başarıyla eklendi");
      showAlert("success", "Todo başarıyla eklendi");
    }
  };

  return (
    <div ref={inputRef}>
      <form onSubmit={handleClick}>
        <Typography sx={{ mt: 3, fontWeight: "bold" }} variant="h5" color="darkgrey">
          Yeni ToDo Ekle
        </Typography>
        <TextField
          value={todo.baslik}
          fullWidth
          label="Başlık"
          margin="normal"
          onChange={(e) => setTodo({ ...todo, baslik: e.target.value })}
        />
        <TextField
          value={todo.aciklama}
          fullWidth
          label="Açıklama"
          margin="normal"
          onChange={(e) => setTodo({ ...todo, aciklama: e.target.value })}
        />
        {todo?.hasOwnProperty("id") ? (
          <Button type="submit" sx={{ mt: 3 }} variant="outlined" color="warning">
            TODO GÜNCELLE
          </Button>
        ) : (
          <Button type="submit" sx={{ mt: 3 }} variant="outlined" color="success">
            TODO EKLE
          </Button>
        )}
      </form>
    </div>
  );
}
[];
