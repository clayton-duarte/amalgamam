import React, { useEffect } from "react";

import createSocket from "../helpers/create-socket";
import { useStateValue } from "../state";
import Message from "./Message";
import Form from "./Form";

const Chat = () => {
  const [{ input, messages, user, secret }, dispatch] = useStateValue();

  useEffect(() => {
    function updateMessages(safe, data, event) {
      const { user, msg, secret: messageSecret } = safe.decrypt(data);
      if (messageSecret === secret) {
        dispatch({ type: "update_messages", payload: { user, msg }, event });
      }
    }

    createSocket({ user, secret, dispatch, updateMessages });
  }, []);

  if (!messages.length) return <p>connecting...</p>;
  return (
    <>
      {messages &&
        messages.map((message, index) => (
          <Message key={`chat-item-${index}`} {...message} />
        ))}
      <Form store="input" value={input} />
    </>
  );
};

export default Chat;
