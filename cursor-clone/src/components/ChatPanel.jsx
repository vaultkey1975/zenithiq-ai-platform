import { useState, useRef, useEffect } from 'react'

const ChatPanel = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      setIsLoading(true)
      const message = inputValue.trim()
      setInputValue('')
      
      try {
        await onSendMessage(message)
      } catch (error) {
        console.error('Error sending message:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputValue])

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="h-12 bg-panel-bg border-b border-border-color flex items-center px-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-text-primary">AI Assistant</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.role}`}
          >
            <div className="text-sm">
              {message.role === 'user' ? (
                <div className="font-medium mb-1">You</div>
              ) : (
                <div className="font-medium mb-1 text-accent">🤖 Assistant</div>
              )}
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="chat-message assistant">
            <div className="text-sm">
              <div className="font-medium mb-1 text-accent">🤖 Assistant</div>
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">Thinking...</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-border-color p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your code, request changes, or get help..."
              className="w-full bg-editor-bg text-text-primary border border-border-color rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              rows="1"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-text-secondary">
              Press Enter to send, Shift+Enter for new line
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatPanel