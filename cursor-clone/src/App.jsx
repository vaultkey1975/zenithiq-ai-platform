import { useState, useEffect } from 'react'
import CodeEditor from './components/CodeEditor'
import ChatPanel from './components/ChatPanel'
import Header from './components/Header'
import ApiKeyModal from './components/ApiKeyModal'


function App() {
  const [code, setCode] = useState(`// Welcome to Cursor Clone!
// This is your AI-powered code assistant

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`)

  const [apiKey, setApiKey] = useState('')
  const [showApiModal, setShowApiModal] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI coding assistant. I can help you understand, write, and improve your code. What would you like to work on today?'
    }
  ])

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai-api-key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    } else {
      setShowApiModal(true)
    }
  }, [])

  const handleApiKeySubmit = (key) => {
    setApiKey(key)
    localStorage.setItem('openai-api-key', key)
    setShowApiModal(false)
  }

  const handleSendMessage = async (message) => {
    if (!apiKey) {
      setShowApiModal(true)
      return
    }

    const newMessage = { role: 'user', content: message }
    const updatedMessages = [...chatMessages, newMessage]
    setChatMessages(updatedMessages)

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI coding assistant. The user is working on code in an editor. Here's their current code:

\`\`\`
${code}
\`\`\`

Please provide helpful, concise responses about their code or coding questions. Focus on being practical and actionable.`
            },
            ...updatedMessages
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      }

      setChatMessages([...updatedMessages, assistantMessage])
    } catch (error) {
      console.error('Error calling OpenAI API:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your API key and try again.'
      }
      setChatMessages([...updatedMessages, errorMessage])
    }
  }

  return (
    <div className="h-screen bg-editor-bg text-text-primary flex flex-col">
      <Header onShowApiModal={() => setShowApiModal(true)} hasApiKey={!!apiKey} />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 border-r border-border-color">
          <CodeEditor code={code} onChange={setCode} />
        </div>
        
        <div className="w-96 bg-panel-bg">
          <ChatPanel 
            messages={chatMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>

      {showApiModal && (
        <ApiKeyModal
          onSubmit={handleApiKeySubmit}
          onClose={() => setShowApiModal(false)}
        />
      )}
    </div>
  )
}

export default App
