import React, { useState, useEffect } from 'react';
import AxiosApi from '../AxiosApi';
import { useParams } from 'react-router-dom';

export interface Message {
  sender: string;
  receiver: string;
  text: string;
  timestamp: string;
}

const CustomerChat: React.FC = () => {
  const customerId = localStorage.getItem('customer');
  const Cid = JSON.parse(customerId || '{}');
  const { id: ownerId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);

  const activeUser = Cid._id; // activeUser is the customer

  // Fetch messages (sent and received)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosApi.get(`/api/chats/getmessages/${activeUser}/${ownerId}`);
        console.log('Fetched messages:', response.data.messages);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();
  }, [activeUser, ownerId]); // Add ownerId to dependency array

  // Send a new message
  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        sender: activeUser,
        receiver: ownerId,
        text: input,
        timestamp: new Date().toISOString(), // Ensure proper timestamp format
      };

      try {
        const response = await AxiosApi.post(`/api/chats/sendmessage/${activeUser}/${ownerId}`, { text: newMessage.text });

        // Update state with the new message
        setMessages((prevMessages) => [...prevMessages, response.data.newMessage]);
        setInput('');
        setTyping(false);
      } catch (error) {
        console.error('Error sending message', error);
      }
    }
  };

  // Handle typing input
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setTyping(e.target.value.trim() !== '');
  };

  // Typing indicator timeout
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    if (typing) {
      typingTimeout = setTimeout(() => setTyping(false), 2000);
    }
    return () => clearTimeout(typingTimeout);
  }, [typing]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="flex flex-col flex-grow">
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => {
              let alignment, bgColor, senderLabel;
              if (message.sender === activeUser) {
                alignment = 'justify-end';
                bgColor = 'bg-blue-500 text-white';
                senderLabel = 'You';
              } else if (message.sender === ownerId) {
                alignment = 'justify-start';
                bgColor = 'bg-gray-300 text-black';
                senderLabel = 'Owner';
              } else {
                return null;
              }
              return (
                <div key={index} className={`flex ${alignment}`}>
                  <div className={`p-3 rounded-lg max-w-xs ${bgColor}`}>
                    <p className="text-sm">
                      <strong>{senderLabel}:</strong> {message.text}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {typing && activeUser && <div className="text-sm text-gray-500">{Cid.fullName} is typing...</div>}
        </div>

        {/* Message input field */}
        <div className="p-4 border-t border-gray-300 bg-white flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-md" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerChat;
