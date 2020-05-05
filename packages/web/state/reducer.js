import updateMessages from "../helpers/update-messages";
import events from "../helpers/events-enum";

const reducer = (state, action) => {
  switch (action.type) {
    case "create_socket":
      return { ...state, socket: action.payload };
    case "create_safe":
      return { ...state, safe: action.payload };
    case "update_messages":
      return { ...state, messages: updateMessages(state, action) };
    case "set_user":
      return { ...state, user: action.payload };
    case "set_secret":
      return { ...state, secret: action.payload };
    case "set_input":
      const safeMessage = state.safe.encrypt({
        secret: state.secret,
        msg: action.payload,
        user: state.user,
      });
      state.socket.emit(events.chat_message, safeMessage);
    default:
      return state;
  }
};

export default reducer;
