import io from "socket.io-client";

import events from "./events-enum";
import Safe from "./Safe";

const isDev = process.env.NODE_ENV === "development";
const endPoint = isDev
  ? "http://localhost:8000/"
  : "https://amalg-server.now.sh/";

export default async function createSocket({
  user,
  secret,
  dispatch,
  updateMessages,
}) {
  const safe = new Safe(secret);
  dispatch({ type: "create_safe", payload: safe });

  const socket = await io(
    `${endPoint}?token=${safe.encrypt({ user, secret })}`
  );
  dispatch({ type: "create_socket", payload: socket });

  socket.on(events.connect_error, (error) => {
    updateMessages(safe, error, events.connect_error);
  });

  socket.on(events.chat_message, (data) => {
    updateMessages(safe, data, events.chat_message);
  });

  socket.on(events.handshake, (data) => {
    updateMessages(safe, data, events.handshake);
  });

  socket.on(events.goodbye, (data) => {
    updateMessages(safe, data, events.goodbye);
  });
}
