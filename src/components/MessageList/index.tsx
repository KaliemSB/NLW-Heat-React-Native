import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { styles } from './styles';
import { Message, MessageProps } from '../Message';
import { api } from '../../services/api';
import { io } from 'socket.io-client';
import { MESSAGES_EXAMPLE } from '../../utils/messages';

let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE;

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

export const MessageList = () => {
  const [ currentMessages, setCurrentMessages ] = useState<MessageProps[]>();

  useEffect(() => {
    const fetchMessage = async () => {
      const messageResponse = await api.get<MessageProps[]>('/messages/last3');
      setCurrentMessages(messageResponse.data)
    }

    fetchMessage();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState: any) => [messagesQueue[0], prevState[0], prevState[1]])
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [])

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages?.map((message) => <Message key={message.id} data={message}/>)}
    </ScrollView>
  );
}