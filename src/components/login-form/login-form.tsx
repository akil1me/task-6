import { Form, Input, Button } from "antd";

export type Value = {
  username: string;
};
type LoginFormProps = {
  onFinish: (val: Value) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onFinish }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-auto max-w-md">
        <h1 className="text-center text-2xl mb-7">Welcome to chat</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-blue-500 w-full"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
