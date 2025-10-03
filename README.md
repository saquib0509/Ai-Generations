# 🤖 AI Chatbot - Text & Image Generation

A beautiful, modern AI chatbot application with text and image generation capabilities powered by OpenAI's GPT-3.5 Turbo and DALL-E 3.

## ✨ Features

- 💬 **Text Generation**: Chat with GPT-3.5 Turbo for intelligent conversations
- 🎨 **Image Generation**: Create stunning images with DALL-E 3
- 🎯 **Mode Toggle**: Easily switch between text and image generation
- 🌈 **Beautiful UI**: Modern, responsive design with glassmorphism effects
- ⚡ **Real-time**: Instant responses with loading indicators
- 📱 **Responsive**: Works perfectly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API Key

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for both the server and client.

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

### Running the Application

**Development Mode** (runs both server and client):
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend client on `http://localhost:5173`

**Run Server Only**:
```bash
npm run server
```

**Run Client Only** (from client directory):
```bash
cd client
npm run dev
```

## 🎯 Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Choose your mode:
   - **Text Mode**: Chat with the AI assistant
   - **Image Mode**: Generate images from text descriptions
3. Type your message or image prompt
4. Press Enter or click Send
5. Enjoy the AI-generated responses!

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenAI API** - AI capabilities
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
ai-chatbot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                # Backend Express server
│   └── index.js           # Server entry point
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔑 API Endpoints

### Text Generation
```
POST /api/chat
Body: { messages: Array<{role: string, content: string}> }
```

### Image Generation
```
POST /api/generate-image
Body: { prompt: string }
```

### Health Check
```
GET /api/health
```

## 🎨 Features in Detail

### Text Generation
- Maintains conversation history
- Context-aware responses
- Streaming-like experience with loading states

### Image Generation
- High-quality 1024x1024 images
- DALL-E 3 powered
- Shows revised prompts
- Direct image display in chat

## 🔒 Security Notes

- Never commit your `.env` file
- Keep your OpenAI API key secure
- The `.env` file is already in `.gitignore`
- Monitor your API usage on OpenAI dashboard

## 💡 Tips

- For text generation, you can have natural conversations
- For image generation, be descriptive and specific
- The app maintains conversation context in text mode
- Each image generation is independent

## 🐛 Troubleshooting

**Port already in use:**
- Change the PORT in `.env` file
- Update the proxy in `client/vite.config.js` accordingly

**API Key errors:**
- Verify your OpenAI API key is correct
- Check if you have sufficient credits
- Ensure the key has proper permissions

**Module not found:**
- Run `npm run install-all` again
- Delete `node_modules` and reinstall

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork, modify, and use this project as you wish!

---

**Enjoy creating with AI! 🚀✨**
