import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DataType, RootState, User, messagesActions } from "../../store";
import { socket } from "../../utils/socket";
import { useDispatch, useSelector } from "react-redux";

type Val = {
  recipient: string;
  title: string;
  body: string;
};

export const SendMessage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [sending, setSending] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { messages } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();

  const onFinish = useCallback(({ recipient, title, body }: Val) => {
    const message = {
      sender: user,
      recipient,
      title,
      body,
    };
    setSending(true);
    socket.emit("post", message);
    setSending(false);
    setIsModalOpen(false);

    messageApi.success("Message delivered");

    socket.on("error", (err) => {
      console.log(err);
      messageApi.error("error");
    });
  }, []);

  useEffect(() => {
    socket.on("receive_post", (msj: DataType) => {
      if (msj) {
        if (msj.recipient === user) {
          dispatch(messagesActions.setAddMessage(msj));
          notification.open({
            message: msj.sender,
            description: msj.title,
            placement: "bottomRight",
          });
        }
      }

      console.log(msj);
    });
  }, [socket, user, dispatch]);

  return (
    <>
      {contextHolder}
      <Button
        loading={sending}
        className="h-auto mb-4"
        onClick={() => setIsModalOpen(true)}
        icon={<SendOutlined className="align-middle" />}
      >
        Send Message
      </Button>
      <Modal
        title="Send message"
        open={isModalOpen}
        footer={[
          <Button
            loading={sending}
            key={1}
            htmlType="submit"
            form="nest-messages"
          >
            Send
          </Button>,
        ]}
        onCancel={() => setIsModalOpen(false)}
        centered
      >
        <Form className="max-w-2xl" id="nest-messages" onFinish={onFinish}>
          <Form.Item
            name="recipient"
            label={<span className="mr-2">To</span>}
            rules={[
              {
                required: true,
                message: "To is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"title"}
            label="Title"
            labelAlign="right"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"body"}
            label="Text"
            rules={[{ required: true, message: "Text is required" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
