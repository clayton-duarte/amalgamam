import events from './events-enum';

function formatMessage({ event, payload }, myself) {
  let data = { event };
  switch (event) {
    case events.chat_message:
      if (myself === payload.user) {
        data.event = events.myself;
        data.text = `you > ${payload.msg}`;
      } else {
        data.user = payload.user;
        data.text = `${payload.user} > ${payload.msg}`;
      }
      break;
    case events.handshake:
      data.user = payload.user;
      data.text = `${payload.user} connected`;
      break;
    case events.goodbye:
      data.user = payload.user;
      data.text = `${payload.user} disconnected`;
      break;
    case events.connect_error:
      data.text = 'looking for the server...';
      break;
  }
  return data;
}

export default function updateMessages({ messages, user }, action) {
  let newMessages = messages;
  newMessages.push(formatMessage(action, user));
  window.scrollTo(0,document.body.scrollHeight);
  return newMessages;
}
