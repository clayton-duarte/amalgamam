import React from "react";

import { useStateValue } from "../state";
import Form from "../components/Form";
import Chat from "../components/Chat";

const Home = () => {
  const [{ user, secret, socket }, dispatch] = useStateValue();

  if (!user) return <Form label="insert your username" store="user" />;
  if (!secret) return <Form label="insert a secret room name" store="secret" />;
  return <Chat />;
};

export default Home;
