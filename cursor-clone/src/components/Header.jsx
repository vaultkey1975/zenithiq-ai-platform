const Header = ({ onShowApiModal, hasApiKey }) => {
  return (
    <div className="h-12 bg-panel-bg border-b border-border-color flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">C</span>
          </div>
          <h1 className="text-lg font-semibold text-text-primary">Cursor Clone</h1>
        </div>
        <div className="text-xs text-text-secondary bg-editor-bg px-2 py-1 rounded">
          AI-Powered Code Assistant
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-text-secondary">
            {hasApiKey ? 'API Connected' : 'API Not Connected'}
          </span>
        </div>
        
        <button
          onClick={onShowApiModal}
          className="btn-secondary text-xs"
        >
          {hasApiKey ? 'Update API Key' : 'Set API Key'}
        </button>
      </div>
    </div>
  )
}

export default Header