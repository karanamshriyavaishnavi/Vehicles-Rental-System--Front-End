import React, { useState, useEffect } from 'react';
import AxiosApi from '../AxiosApi';

// Define the message structure
interface Message {
  sender: string;
  receiver: string;
  text: string;
  timestamp: string; // Added timestamp to each message
}

const ChatApp: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // List of users
  const [messages, setMessages] = useState<Message[]>([]); // List of messages
  const [input, setInput] = useState<string>(''); // Input field state
  const [activeUser, setActiveUser] = useState<string>(''); // Active user for chat
  console.log(activeUser,"customer");
  
  const [typing, setTyping] = useState<boolean>(false); // Typing indicator state

  // const Customer = localStorage.getItem('customer');
  // // const CustomerId = Customer ? JSON.parse(Customer)._id : null;

  const owner = localStorage.getItem('owner');
  const ownerid = owner ? JSON.parse(owner)._id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await AxiosApi.get('/api/admin/users');
        setUsers(resp.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!activeUser) return; // Prevent unnecessary API calls
    const fetchMessages = async () => {
      if (activeUser) {
        try {
          const response = await AxiosApi.get(`/api/chats/getmessages/${activeUser}/${ownerid}`);
          setMessages(response.data.messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    fetchMessages();
  }, [activeUser, ownerid]);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        sender: ownerid || '',
        receiver: activeUser,
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages([...messages, newMessage]);
      setInput('');
      setTyping(false);

      try {
        const response = await AxiosApi.post(`/api/chats/sendmessage/${ownerid}/${activeUser}`, {
          text: input,
        });
        if (response.data.message === 'Message sent successfully') {
          console.log('Message sent successfully!');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setTyping(e.target.value.trim() !== '');
  };

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    if (typing) {
      typingTimeout = setTimeout(() => setTyping(false), 2000);
    }
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typing]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="bg-white p-4 w-full md:w-1/4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Customers</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => setActiveUser(user._id)}
              className={`cursor-pointer p-2 rounded-md ${activeUser === user._id ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
            >
              {user.fullName}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === ownerid ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg max-w-xs ${message.sender === ownerid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  <p className="text-sm">
                    <strong>{message.sender === ownerid ? 'You' : users.find(u => u._id === message.sender)?.fullName || 'Unknown'}:</strong> {message.text}
                  </p>
                  <p className="text-xs text-gray-500">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {typing && activeUser && (
            <div className="text-sm text-gray-500">Your typing...</div>
          )}
        </div>

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

export default ChatApp;
