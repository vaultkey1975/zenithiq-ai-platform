# 🚀 Cursor Clone Demo Guide

Welcome to Cursor Clone! This guide will help you get started quickly.

## Quick Demo Steps

### 1. Start the Application
```bash
npm run dev
```
The app will open at `http://localhost:5173`

### 2. Set Up Your API Key
- Click "Set API Key" in the header
- Enter your OpenAI API key (starts with `sk-`)
- Click "Save Key"

### 3. Try These Demo Interactions

#### Code Explanation
1. Look at the default Fibonacci function in the editor
2. In the chat, ask: **"What does this fibonacci function do?"**
3. The AI will explain how the recursive function works

#### Code Optimization
1. Ask: **"Can you optimize this code for better performance?"**
2. The AI will suggest improvements like memoization

#### Code Generation
1. Clear the editor and ask: **"Write a function to sort an array of objects by a property"**
2. The AI will generate the code for you

#### Debugging Help
1. Introduce a bug in the code (like removing a return statement)
2. Ask: **"Why isn't this function working correctly?"**
3. The AI will identify the issue

### 4. Explore Features

- **Live Sync**: The AI always sees your current code
- **Syntax Highlighting**: Try different languages (JS, Python, HTML, CSS)
- **Dark Theme**: Optimized for comfortable coding
- **Persistent Chat**: Your conversation continues as you code

### 5. Sample Questions to Try

- "Explain this code line by line"
- "Add error handling to this function"
- "Convert this to use async/await"
- "What are potential security issues here?"
- "How can I make this more readable?"
- "Write unit tests for this function"

## Demo Code Snippets

Try pasting these into the editor:

### JavaScript Array Methods
```javascript
const users = [
  { name: 'Alice', age: 30, role: 'admin' },
  { name: 'Bob', age: 25, role: 'user' },
  { name: 'Charlie', age: 35, role: 'moderator' }
];

// Ask AI: "How can I filter and transform this data?"
```

### Python Data Processing
```python
import json

def process_data(data):
    # Ask AI: "Complete this function to process JSON data"
    pass

# Ask AI: "What's the best way to handle errors here?"
```

### React Component
```jsx
function UserCard({ user }) {
  // Ask AI: "Add state management and event handlers"
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

## Tips for Best Results

1. **Be Specific**: Ask detailed questions about what you want
2. **Provide Context**: The AI can see your code, so reference specific lines
3. **Iterate**: Ask follow-up questions to refine the solutions
4. **Experiment**: Try different programming languages and frameworks

## Need Help?

- Check the console for any errors
- Ensure your API key is valid and has credits
- Try refreshing the page if something seems stuck

Happy coding with AI! 🎉