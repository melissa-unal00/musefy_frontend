import { Socket } from "net";
import React, { useContext, useEffect, useState } from "react";
import { Button, Input } from "../..";
import { UserContext } from "../../../context/UserContext";
import "./Chat.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsFillChatFill,
} from "react-icons/bs";
import io from "socket.io-client";
const socket = io(`${process.env.REACT_APP_BACKEND}`);

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const [displayChat, setDisplayChat] = useState(false);
  const userContextData = useContext(UserContext);

  const sendMessage = () => {
    let hour = new Date(Date.now()).getHours().toString();
    let minutes = new Date(Date.now()).getMinutes().toString();
    if (parseInt(hour) < 10) {
      hour = "0" + hour.toString();
    }
    if (parseInt(minutes) < 10) {
      minutes = "0" + minutes.toString();
    }
    if (currentMessage !== "") {
      const messageData = {
        author: userContextData.username,
        message: currentMessage,
        time: hour + ":" + minutes,
      };
      socket.emit("send_message", messageData);
      setMessageList((prevList: any) => [...prevList, messageData]);
      setCurrentMessage("");
    }
  };

  const handleDisplayChat = () => {
    setDisplayChat(!displayChat);
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageList((prevList: any) => [...prevList, data]);
    });
  }, [socket]);

  return (
    <div>
      {displayChat ? (
        <div className="chat">
          <div className="chat__title">
            Live chat <BsFillChatFill style={{ paddingLeft: "0.2rem" }} />
            <Button className="chat__title-button" onClick={handleDisplayChat}>
              <BsFillArrowDownCircleFill />
            </Button>
          </div>
          <ScrollToBottom className="chat__container">
            {messageList.map((value: any) => {
              return (
                <div
                  className={
                    value.author === userContextData.username
                      ? "chat__message-me"
                      : "chat__message-other"
                  }
                >
                  <p
                    className={
                      value.author === userContextData.username
                        ? "chat__message-text-me"
                        : "chat__message-text-other"
                    }
                  >
                    {value.message}
                  </p>
                  <span>
                    <b className="chat__message-author">{value.author}</b>
                  </span>
                  <span className="chat__message-time">{value.time}</span>
                </div>
              );
            })}
          </ScrollToBottom>

          <div style={{ display: "flex" }} className="chat__input-button">
            <Input
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              className="chat__input"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button className="chat__button" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      ) : (
        <div className="chat-hidden">
          <div className="chat__title">
            Live chat <BsFillChatFill style={{ paddingLeft: "0.2rem" }} />
            <Button className="chat__title-button" onClick={handleDisplayChat}>
              <BsFillArrowUpCircleFill />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
