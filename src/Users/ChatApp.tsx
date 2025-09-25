// import React, { useState, useEffect } from 'react';
// import { FiCheckCircle, FiXCircle, FiSend } from 'react-icons/fi';
// import { BsChatSquareText } from 'react-icons/bs';
// import axios from 'axios';
// import AxiosApi from '../AxiosApi';

// // Define TypeScript types for user and messages
// interface User {
//   id: number;
//   name: string;
//   active: boolean;
// }

// interface Message {
//   id: number;
//   user: string;
//   message: string;
// }

// const ChatApp: React.FC = () => {
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>('');
//   const [isUserListOpen, setIsUserListOpen] = useState<boolean>(false);

//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   // const users: User[] = [
//   //   { id: 1, name: 'John Doe', active: true },
//   //   { id: 2, name: 'Jane Smith', active: false },
//   //   { id: 3, name: 'Alice Johnson', active: true },
//   //   { id: 4, name: 'Bob Williams', active: false },
//   // ];

//   // Handle selecting a user
//   const handleSelectUser = (user: User): void => {
//     setSelectedUser(user);
//     fetchMessages(user.id); // Fetch messages for the selected user
//     if (isUserListOpen) setIsUserListOpen(false); // Close user list on mobile
//   };

//   // Fetch messages from the backend

//   const loca = localStorage.getItem("customer");
//   const OwnerId = JSON.parse(loca);
//   console.log(loca);
  
//   const fetchMessages = async () => {
//     try {
//       setErrorMessage(null); // Reset any previous error messages
//       const response = await AxiosApi.get(`/api/owner/replymessage/${customerId}/${ownerId}`);
//       const { data } = response;

//       // Assuming messages are retrieved correctly
//       setMessages(data.data.messages);
//     } catch (error) {
//       setErrorMessage('An error occurred while fetching the messages.');
//       console.error(error);
//     }
//   };

//   // Handle sending a message
//   const handleSendMessage = (): void => {
//     if (newMessage.trim() !== '') {
//       setMessages([...messages, { id: messages.length + 1, user: 'You', message: newMessage }]);
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* User List (hidden on mobile) */}
//       <div className={`sm:block ${isUserListOpen ? 'block' : 'hidden sm:block'} bg-gray-100 w-full sm:w-1/3 md:w-1/4 p-4`}>
//         <h2 className="text-xl font-semibold mb-4">Users</h2>
//         <ul>
//           {users.map((user: User) => (
//             <li
//               key={user.id}
//               className={`flex items-center justify-between p-2 mb-2 cursor-pointer rounded-lg ${
//                 selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
//               }`}
//               onClick={() => handleSelectUser(user)}
//             >
//               <span>{user.name}</span>
//               {user.active ? (
//                 <FiCheckCircle className="text-green-500" />
//               ) : (
//                 <FiXCircle className="text-red-500" />
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Area */}
//       <div className="flex flex-col w-full sm:w-2/3 md:w-3/4 p-4 bg-white">
//         {selectedUser ? (
//           <>
//             {/* Chat Header */}
//             <div className="flex items-center justify-between border-b pb-2 mb-4">
//               <h2 className="text-xl font-semibold">{selectedUser?.name}</h2>
//               <span className="text-sm">
//                 {selectedUser.active ? 'Online' : 'Offline'}
//               </span>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
//             )}

//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto mb-4">
//               {messages.length === 0 ? (
//                 <div className="text-gray-500">No messages yet</div>
//               ) : (
//                 messages.map((msg: Message, index: number) => (
//                   <div
//                     key={index}
//                     className={`mb-2 flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div
//                       className={`p-2 rounded-lg ${
//                         msg.user === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                       }`}
//                     >
//                       <span>{msg.message}</span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Message Input */}
//             <div className="flex items-center border-t pt-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 px-4 py-2 border rounded-lg"
//                 placeholder="Type a message..."
//               />
//               <button
//                 className="ml-2 p-2 text-white bg-blue-500 rounded-lg"
//                 onClick={handleSendMessage}
//               >
//                 <FiSend />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full">
//             <BsChatSquareText className="text-6xl text-gray-400" />
//             <h2 className="text-2xl text-gray-500 mt-4">Select a user to start chatting</h2>
//           </div>
//         )}
//       </div>

//       {/* Mobile user list toggle */}
//       <button
//         className="fixed bottom-4 right-4 sm:hidden bg-blue-500 text-white p-4 rounded-full"
//         onClick={() => setIsUserListOpen(!isUserListOpen)}
//       >
//         Users
//       </button>
//     </div>
//   );
// };

// export default ChatApp;
