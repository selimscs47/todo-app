import Head from "next/head";
import {Container} from "@mui/material";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
  <Container maxWidth="md">

      <Head>
        <title>SCS Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoList/> 
      
  </Container>
    
  );
}
