import { Empty, List } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header, MessagesItem, SendMessage } from "../../components";
import { RootState, messagesActions } from "../../store";
import { socket } from "../../utils/socket";

export const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { messages } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      socket.emit("userget", user);
      socket.on("receive_userget", (users) => {
        dispatch(messagesActions.setMessages(users));
        setLoading(false);
      });

      socket.on("error", (err) => {
        console.log(err);
      });
    };
    fetchData();
  }, [user, socket, dispatch]);

  return (
    <>
      <Header />

      <Container className="mt-9">
        <SendMessage />
        <div>
          <List loading={loading} itemLayout="horizontal">
            {messages.length !== 0 ? (
              messages.map((message) => (
                <MessagesItem key={message.id} message={message} user={user} />
              ))
            ) : (
              <Empty description={"No messages 😥"} />
            )}
          </List>
        </div>
      </Container>
    </>
  );
};
