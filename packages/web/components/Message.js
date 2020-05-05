import React from "react";

import events from "../helpers/events-enum";
import colors from "../helpers/colors-enum";

function setColor(event) {
  switch (event) {
    case events.myself:
      return colors.gray;
    case events.connect_error:
    case events.goodbye:
      return colors.red;
    case events.handshake:
      return colors.green;
    default:
      return colors.white;
  }
}

const Message = ({ event, text, user }) => (
  <>
    <p>{text}</p>
    <style jsx>{`
      p {
        color: ${setColor(event)};
        margin: 0;
      }
    `}</style>
  </>
);

export default Message;
