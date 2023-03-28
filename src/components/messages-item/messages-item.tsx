import { Avatar, List, Modal } from "antd";
import { useState } from "react";
import { DataType } from "../../store";

type MessagesItemProps = {
  message: DataType;
  user: string | null;
};

export const MessagesItem: React.FC<MessagesItemProps> = ({
  message,
  user,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <List.Item
        className="hover:opacity-75 transition-opacity cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              className={`${
                user === message.sender ? "bg-orange-500" : "bg-purple-800"
              } align-middle mr-3`}
              size="large"
              gap={4}
            >
              {message.sender.slice(0, 1).toLocaleUpperCase()}
            </Avatar>
          }
          title={<p className="font-bold">{message.sender}</p>}
          description={<p>{message.title}</p>}
        />
        <time dateTime={message.postat}> {message.postat.slice(11, 16)}</time>
      </List.Item>

      <Modal
        title={message.title}
        open={isModalOpen}
        footer={[]}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="relative">
          <p>{message.body}</p>

          <time
            className="text-gray-400 text-xs absolute -bottom-4 right-0"
            dateTime={message.postat}
          >
            {message.postat.slice(0, 10)} at
            <span> {message.postat.slice(11, 16)}</span>
          </time>
        </div>
      </Modal>
    </>
  );
};
