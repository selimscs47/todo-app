import { ListItem, ListItemText, IconButton } from "@mui/material";
import moment from "moment";
import "moment/locale/tr";
import { Delete, MoreVert } from "@mui/icons-material";
import {doc,deleteDoc} from "firebase/firestore";
import {db} from "../firebase";
import { TodoContext } from "../contexts/TodoContext";
import { useContext } from "react";

export default function Todo({ todo }) {

  const { id, baslik, aciklama, tarih } = todo;

  const {showAlert}=useContext(TodoContext);

  const handleDelete=async (id,e)=>{
    e.preventDefault()

const ref=doc(db,"todos",id);
await deleteDoc(ref);

showAlert("success","Todo başarıyla silindi");

  }

  return (
    <ListItem sx={{ mt: 3, boxShadow: 3 }} style={{ backgroundColor: "#FAFAFA" }}>
      <ListItemText primary={baslik} secondary={moment(tarih).format("LLL")} />
      <IconButton onClick={(e)=>handleDelete(id,e)}>
        <Delete
          sx={{
            "&:hover": {
              color: "red",
            },
          }}
        />
      </IconButton>
      <IconButton>
        <MoreVert />
      </IconButton>
    </ListItem>
  );
}
