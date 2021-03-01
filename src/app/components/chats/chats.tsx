import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import './chats.scss';
import { ChatTemplate } from '../';
import { IMessageState, IChats, ILogin } from '../../redux/interfaces';
import { AppState } from '../../redux';
import { getUserMessages } from './chatsActions';

const Chats = () => {
  const [chats, setChats] = useState<IChats[]>([]);
  const [activeChat, setActiveChat] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [receiverId, setReceiverId] = useState<number>();
  const { messages }: IMessageState = useSelector(
    (state: AppState) => state.messages,
  );
  const { user }: ILogin = useSelector((state: AppState) => state.login);
  // const { newMessage }: ISendMessage = useSelector(
  //   (state: AppState) => state.sentMessage,
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserMessages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages) {
      const groupChats = _.chain(messages)
        .groupBy('receiverName')
        .map((value, key) => ({ receiverName: key, messages: value }))
        .value();
      setChats(groupChats);
      console.log(groupChats);
    }
  }, [messages]);

  // check for created msg
  // useEffect(() => {
  //   if (newMessage) {
  //     const { message, created_at } = newMessage;
  //     console.log('message', newMessage);
  //     const addMsg = data.concat({
  //       author: {
  //         username: user.username,
  //         id: user.id,
  //         avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
  //       },
  //       text: message,
  //       type: 'text',
  //       timestamp: Date.parse(created_at as string),
  //     });
  //     setData(addMsg);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newMessage]);

  const updateActiveMenu = (menu: string) => {
    setActiveChat(menu);
    formatChat(menu);
  };

  const formatChat = (selectedName: string) => {
    const currentChat = _.filter(chats, { receiverName: selectedName });
    const chatMsg = _.map(currentChat, 'messages')[0];
    const receiverName = currentChat[0].receiverName;
    const receiverId = chatMsg[0].receiverid;
    setReceiverId(receiverId);
    const formatSentChat = chatMsg.map((item) => {
      return {
        author: {
          username: user.username,
          id: user.id,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: item.message,
        type: 'text',
        timestamp: Date.parse(item.created_at as string),
      };
    });

    const receivedMsg = _.filter(messages, {
      receiverid: user.id,
      senderid: receiverId,
    });

    const formatReceivedChat = receivedMsg.map((item) => {
      return {
        author: {
          username: receiverName,
          id: item.senderid,
          avatarUrl: null,
        },
        text: item.message,
        type: 'text',
        timestamp: Date.parse(item.created_at as string),
      };
    });

    const sortedArray = _.sortBy(
      [...formatReceivedChat, ...formatSentChat],
      ['timestamp'],
      ['desc'],
    );

    console.log('last msg', sortedArray);
    setData(sortedArray);
  };

  return (
    <section className="chats-page-container">
      <div className="chats-page-container__left">
        <div className="chats-page-container__chat-heading">
          <h1>Chats {chats.length}</h1>
        </div>
        <div>
          {chats.length !== 0 ? (
            chats.map((chat, index) => (
              <div
                key={index}
                className={
                  activeChat === chat.receiverName
                    ? 'chats-page-container__chat-active'
                    : 'chats-page-container__chat'
                }
                onClick={() => updateActiveMenu(chat.receiverName as string)}>
                <p>{chat.receiverName}</p>
              </div>
            ))
          ) : (
            <div>
              <p>no chat yet</p>
            </div>
          )}
        </div>
      </div>
      <div className="chats-page-container__right">
        {activeChat ? (
          <div>
            <ChatTemplate
              data={data}
              currentUser={user}
              receiverId={receiverId}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Chats;
