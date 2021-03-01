import React, { useEffect, useState } from 'react';
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { sendMessage } from '../chats/chatsActions';
import { AppState } from '../../redux';
import { ISendMessage } from '../../redux/interfaces';

const { REACT_APP_BACKEND_URL } = process.env;

function ChatTemplate({ data, currentUser, receiverId }: any) {
  const [attr, setAttr] = useState<any>({
    showChatbox: true,
    showIcon: true,
    messages: [],
  });
  const { newMessage }: ISendMessage = useSelector(
    (state: AppState) => state.sentMessage,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(REACT_APP_BACKEND_URL as string);
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('newMessage', ({ message }: any) => {
      if (message.receiverid === currentUser.id) {
        console.log(`MESSAGE: ${message.message}`);
        setAttr({
          ...attr,
          messages: attr.messages.concat({
            author: {
              username: currentUser.username,
              id: currentUser.id,
              avatarUrl:
                'https://image.flaticon.com/icons/svg/2446/2446032.svg',
            },
            text: message.message,
            type: 'text',
            timestamp: +new Date(),
          }),
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  useEffect(() => {
    setAttr({
      showChatbox: true,
      showIcon: true,
      messages: data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClickIcon = () => {
    // toggle showChatbox and showIcon
    setAttr({
      ...attr,
      showChatbox: !attr.showChatbox,
      showIcon: !attr.showIcon,
    });
  };

  const handleOnSendMessage = (message: string) => {
    setAttr({
      ...attr,
      messages: attr.messages.concat({
        author: {
          username: currentUser.username,
          id: currentUser.id,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: message,
        type: 'text',
        timestamp: +new Date(),
      }),
    });

    dispatch(sendMessage(receiverId, message));
  };

  return (
    <ChatFrame
      chatbox={
        <ChatBox
          onSendMessage={handleOnSendMessage}
          userId={currentUser.id}
          messages={attr.messages}
          width={'100%'}
          showTypingIndicator={true}
          // activeAuthor={{ username: 'user2', id: 2, avatarUrl: null }}
        />
      }
      //   icon={<RobotIcon className="Icon" />}
      clickIcon={handleClickIcon}
      showChatbox={attr.showChatbox}
      showIcon={attr.showIcon}
      iconStyle={{ background: 'red', fill: 'white' }}>
      <div className="Greeting" style={{ width: '300px' }}>
        👋 Hey, I’m a ChatBot! Want to see what I can do?
      </div>
    </ChatFrame>
  );
}

export default ChatTemplate;
