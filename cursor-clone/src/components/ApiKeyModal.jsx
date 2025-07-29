import { useState } from 'react'

const ApiKeyModal = ({ onSubmit, onClose }) => {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (apiKey.trim()) {
      onSubmit(apiKey.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-panel-bg border border-border-color rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">OpenAI API Key</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4 text-sm text-text-secondary">
          <p className="mb-2">
            To use the AI assistant, you need to provide your OpenAI API key. 
            Your key is stored locally and never sent to our servers.
          </p>
          <p className="mb-2">
            Don't have an API key? 
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline ml-1"
            >
              Get one here
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-text-primary mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-editor-bg text-text-primary border border-border-color rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                {showKey ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Save Key
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-editor-bg rounded-md">
          <div className="text-xs text-text-secondary">
            <div className="font-medium mb-1">🔒 Privacy & Security</div>
            <ul className="space-y-1">
              <li>• Your API key is stored locally in your browser</li>
              <li>• Keys are sent directly to OpenAI, not our servers</li>
              <li>• You can remove your key anytime from browser storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyModal