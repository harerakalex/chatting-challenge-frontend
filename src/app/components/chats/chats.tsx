import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import './chats.scss';
import { ChatTemplate } from '../';
import { IMessageState, ILogin, IUser, IMessage } from '../../redux/interfaces';
import { AppState } from '../../redux';
import { getUserMessages } from './chatsActions';
import { getRequest } from '../../redux/api';
import { toast } from 'react-toastify';

const Chats = () => {
  const [chats, setChats] = useState<IMessage[]>([]);
  const [activeChat, setActiveChat] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [receiverId, setReceiverId] = useState<number>();
  const [availableUser, setAvailableUser] = useState<IUser[]>([]);
  const { messages }: IMessageState = useSelector(
    (state: AppState) => state.messages,
  );
  const { user }: ILogin = useSelector((state: AppState) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserMessages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages) {
      // const groupChats = _.chain(messages)
      //   .groupBy('receiverName')
      //   .map((value, key) => ({ receiverName: key, messages: value }))
      //   .value();
      setChats(messages);
      console.log(messages);
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      try {
        const send = await getRequest('/users');
        const { data } = send;
        const removeCurrentUser = _.reject(data, { id: user.id });
        setAvailableUser(removeCurrentUser);
      } catch (error) {
        const message = (await error.response)
          ? error.response.data.message
          : 'Something wrong';
        toast.error(message, { position: toast.POSITION.TOP_CENTER });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActiveMenu = (selectChat: IUser) => {
    setActiveChat(selectChat.username);
    formatChat(selectChat);
  };

  const formatChat = (selectedUser: IUser) => {
    console.log('selected', selectedUser);
    const sentChat = _.filter(chats, {
      receiverid: selectedUser.id,
      senderid: user.id,
    });
    // const chatMsg = _.map(currentChat, 'messages')[0];
    // const receiverName = currentChat[0].receiverName;
    // const receiverId = sentChat[0].receiverid;
    setReceiverId(selectedUser.id);
    const formatSentChat = sentChat.map((item) => {
      return {
        author: {
          username: 'You',
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
      senderid: selectedUser.id,
    });

    const formatReceivedChat = receivedMsg.map((item) => {
      return {
        author: {
          username: selectedUser.username,
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

    setData(sortedArray);
  };

  return (
    <section className="chats-page-container">
      <div className="chats-page-container__left">
        <div className="chats-page-container__chat-heading">
          <h1>Chats {availableUser.length}</h1>
        </div>
        <div>
          {availableUser.length !== 0 ? (
            availableUser.map((chat, index) => (
              <div
                key={index}
                className={
                  activeChat === chat.username
                    ? 'chats-page-container__chat-active'
                    : 'chats-page-container__chat'
                }
                onClick={() => updateActiveMenu(chat)}>
                <p>{chat.username}</p>
              </div>
            ))
          ) : (
            <div className="chats-page-container__chat">
              <p>No chat yet</p>
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
              user={availableUser}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Chats;
