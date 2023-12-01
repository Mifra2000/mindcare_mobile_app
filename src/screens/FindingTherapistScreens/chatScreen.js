// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { io } from 'socket.io-client';
// import useStore from '../zustand/store';

// const ChatScreen = () => {
//   const { responseData } = useStore();
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState('');
//   const userRole = 'Client';
//   const userId = responseData._id;
//   const socket = io.connect('http://192.168.0.101:8080/');

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('Connected');
//       socket.emit('addNewUser', {
//         userId,
//         role: userRole,
//       });
//     });

//     socket.on('getOnlineUsers', (onlineUsers) => {
//       setOnlineUsers(onlineUsers);
//     });

//     socket.on('messageReceived', (message) => {
//       const formattedMessage =
//         message.senderRole === userRole
//           ? `You: ${message.text}`
//           : `${message.senderId}: ${message.text}`;
//       setChatMessages((prevMessages) => [...prevMessages, formattedMessage]);
//     });
//   }, [userRole, userId]);

//   const sendMessage = () => {
//     const text = messageInput.trim();
//     if (text !== '') {
//       socket.emit('sendMessage', {
//         recipientId: '64ee0739b9408730979ab904',
//         text,
//       });
//       setMessageInput('');
//     }
//   };

//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   return (
//     <View style={styles.container}>
//       <View style={styles.onlineUsersContainer}>
//         <FlatList
//           data={onlineUsers}
//           horizontal
//           keyExtractor={(user) => user.userId}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.avatarContainer}>
//               <Text style={styles.avatarText}>{item.userId.charAt(0)}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//       <FlatList
//         data={chatMessages}
//         keyExtractor={(message, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageContainer,
//               { alignSelf: item.sender === 'You' ? 'flex-end' : 'flex-start' },
//             ]}
//           >
//             <Text style={styles.senderText}>{item.sender}</Text>
//             <View style={styles.messageTextContainer}>
//               <Text style={styles.messageText}>{item.text}</Text>
//             </View>
//           </View>
//         )}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           value={messageInput}
//           onChangeText={(text) => setMessageInput(text)}
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   onlineUsersContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   avatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: {
//     fontSize: 18,
//     color: 'white',
//   },
//   messageContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   senderText: {
//     fontSize: 20,
//     color: '#888',
//     marginBottom: 2,
//   },
//   messageTextContainer: {
//     backgroundColor: '#e0e0e0',
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     marginRight: 10,
//   },
// });

// export default function App() {
//   return (
//     <ChatScreen />
//   );
// }
import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import useStore from '../zustand/store'; // Import your Zustand store
import { io } from 'socket.io-client';
import axios from 'axios';

const ChatApp = () => {
  const [appointments, setAppointments] = useState();
  useEffect(() => {
    async function gettingAppointment() {
      try {
        const response = await axios.get(
          `/appointments-client/${responseData._id}`
        );        
        setAppointments(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    gettingAppointment();
  }, []);

  const { responseData } = useStore();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const userRole = 'Client';
  const userId = responseData._id;
  const socket = io.connect('http://192.168.0.101:8080/');

  useEffect(() => {
    socket.on('connect', () => {
//      console.log('Connected');
      socket.emit('addNewUser', {
        userId,
        role: userRole,
      });
    });

    socket.on('getOnlineUsers', (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    socket.on('messageReceived', (message) => {
      // Handle received messages
    });
  }, [userRole, userId]);

  const sendMessage = (recipientId, text) => {
    if (text) {
      socket.emit('sendMessage', {
        senderId:responseData._id,
        recipientId,
        text,
      });
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const renderUserItem = ({ item }) => {
    const isOnline = onlineUsers.some((onlineUser) => onlineUser.id === item.id);  
    return (
      <TouchableOpacity onPress={() => handleUserSelect(item.userId)}>
        <View style={styles.userItem}>
          <Text style={styles.userItemName}>
            {item.userId} {isOnline ? ' (Online)' : ''}
          </Text>
          {isOnline && <View style={styles.onlineDot} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>      
      {!selectedUser ? (
        <FlatList
          data={onlineUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.userId}
        />
      ) : (
        <ChatScreen userId={selectedUser} sendMessage={sendMessage} />
      )}
    </View>
  );
};

const ChatScreen = ({ userId, sendMessage }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSend = () => {
    if (messageText) {
      const currentTime = getCurrentTime();
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        sender: 'You',
        time: currentTime,
      };

      setMessages([...messages, newMessage]);
      sendMessage(userId, messageText); // Send the message to the selected user
      setMessageText('');
    }
  };

  return (
    <View style={styles.chatScreen}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              { alignSelf: item.sender === 'You' ? 'flex-end' : 'flex-start' },
            ]}
          >
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  onlineUsersContainer:{flexDirection:'column'},
  userItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  chatScreen: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChatApp;
