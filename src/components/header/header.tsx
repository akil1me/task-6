import { Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, userActions } from "../../store";
import { Container } from "../container";

export const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <header className="sticky top-0 z-10 py-5 bg-slate-800">
      <Container className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="/">
            <Avatar
              className="bg-orange-500 align-middle mr-3"
              size="large"
              gap={4}
            >
              {user?.slice(0, 1)}
            </Avatar>
          </a>
          <p className="text-white">{user}</p>
        </div>
        <Button
          className="text-white"
          type="dashed"
          onClick={() => dispatch(userActions.setUser(null))}
        >
          Log out
        </Button>
      </Container>
    </header>
  );
};
