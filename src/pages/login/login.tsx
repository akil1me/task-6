import { useDispatch } from "react-redux";
import { Container, LoginForm, Value } from "../../components";
import { userActions } from "../../store";
import { socket } from "../../utils/socket";

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const onFinish = (val: Value) => {
    const recipient = val.username;

    socket.emit("userget", recipient);
    dispatch(userActions.setUser(recipient));

    socket.on("error", (error) => {
      console.log(error);
      dispatch(userActions.setUser(null));
      localStorage.clear();
    });
  };

  return (
    <Container>
      <LoginForm onFinish={onFinish}></LoginForm>
    </Container>
  );
};
