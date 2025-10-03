import { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Send, Image as ImageIcon, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import thinkingAnimation from './animations/thinking.json';
import welcomeAnimation from './animations/welcome.json';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('text'); // 'text' or 'image'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      type: mode,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (mode === 'text') {
        // Text generation
        const conversationHistory = messages
          .filter((msg) => msg.type === 'text')
          .map((msg) => ({
            role: msg.role,
            content: msg.content,
          }));

        const response = await axios.post('/api/chat', {
          messages: [...conversationHistory, { role: 'user', content: input }],
        });

        const assistantMessage = {
          role: 'assistant',
          content: response.data.message,
          type: 'text',
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Image generation
        const response = await axios.post('/api/generate-image', {
          prompt: input,
        });

        const assistantMessage = {
          role: 'assistant',
          content: response.data.imageUrl,
          type: 'image',
          revisedPrompt: response.data.revisedPrompt,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.response?.data?.details || error.message || 'Failed to generate response'}`,
        type: 'error',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 md:p-6">
      {/* Header */}
      <header className="glass-effect rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-2xl shadow-lg animate-pulse-slow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                AI Chatbot
              </h1>
              <p className="text-sm text-slate-600">Text & Image Generation</p>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex gap-2 bg-white/60 p-1.5 rounded-xl shadow-inner">
            <button
              onClick={() => setMode('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition ${
                mode === 'text'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Text</span>
            </button>
            <button
              onClick={() => setMode('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition ${
                mode === 'image'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Image</span>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 glass-effect rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto">
                  <Lottie animationData={welcomeAnimation} loop={true} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-700 mb-2">
                    Welcome to AI Chatbot
                  </h2>
                  <p className="text-slate-600">
                    {mode === 'text'
                      ? 'Start a conversation or ask me anything!'
                      : 'Describe an image you want to generate!'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-fade-in-up ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-xl h-fit shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className={`message-bubble ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : message.type === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-white shadow-md'
                  }`}
                >
                  {message.type === 'image' && message.role === 'assistant' ? (
                    <div className="space-y-2">
                      <img
                        src={message.content}
                        alt="Generated"
                        className="rounded-xl max-w-full h-auto shadow-lg"
                      />
                      {message.revisedPrompt && (
                        <p className="text-xs text-slate-500 italic">
                          {message.revisedPrompt}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-2 rounded-xl h-fit shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fade-in-up">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-xl h-fit shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="message-bubble bg-white shadow-md">
                <div className="flex items-center gap-1">
                  <div className="w-10 h-10">
                    <Lottie animationData={thinkingAnimation} loop={true} />
                  </div>
                  <span className="text-slate-600 text-sm">
                    {mode === 'text' ? 'AI is thinking...' : 'Generating image...'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                mode === 'text'
                  ? 'Type your message...'
                  : 'Describe the image you want to generate...'
              }
              className="w-full px-4 py-3 rounded-2xl resize-none focus:outline-none bg-transparent responsive-placeholder"
              rows="1"
              style={{
                minHeight: '52px',
                maxHeight: '200px',
              }}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="btn-primary h-[52px] px-6 flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-slate-600">
        <p>
          Powered by Pollinations AI
        </p>
      </footer>
    </div>
  );
}

export default App;
