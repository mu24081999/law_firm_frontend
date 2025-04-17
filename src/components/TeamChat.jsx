import { useState, useRef, useEffect } from 'react';

function TeamChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      message: "Hey team, how's the new case coming along?",
      timestamp: new Date('2024-03-15T10:00:00').toISOString(),
      avatar: 'https://ui-avatars.com/api/?name=John+Doe'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: Date.now(),
      sender: 'You',
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      avatar: 'https://ui-avatars.com/api/?name=You'
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Team Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <img
              src={msg.avatar}
              alt={msg.sender}
              className="w-8 h-8 rounded-full"
            />
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === 'You'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{msg.sender}</span>
                <span className="text-xs opacity-75">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="mt-1">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default TeamChat;