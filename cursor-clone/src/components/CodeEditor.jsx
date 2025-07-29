import { useEffect, useRef } from 'react'
import { EditorView, keymap, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { bracketMatching } from '@codemirror/language'
import { autocompletion, closeBrackets } from '@codemirror/autocomplete'
import { searchKeymap } from '@codemirror/search'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'

const CodeEditor = ({ code, onChange }) => {
  const editorRef = useRef(null)
  const viewRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const extensions = [
        lineNumbers(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        keymap.of(searchKeymap),
        javascript(),
        python(),
        html(),
        css(),
        oneDark,
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '14px',
          },
          '.cm-content': {
            padding: '16px',
            minHeight: '100%',
          },
          '.cm-editor': {
            height: '100%',
          },
          '.cm-scroller': {
            height: '100%',
          }
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newCode = update.state.doc.toString()
            onChange(newCode)
          }
        })
      ]

      const state = EditorState.create({
        doc: code,
        extensions
      })

      viewRef.current = new EditorView({
        state,
        parent: editorRef.current
      })
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (viewRef.current && code !== viewRef.current.state.doc.toString()) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: code
        }
      })
      viewRef.current.dispatch(transaction)
    }
  }, [code])

  return (
    <div className="h-full bg-editor-bg">
      <div className="h-8 bg-panel-bg border-b border-border-color flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-sm text-text-secondary">main.js</div>
      </div>
      <div ref={editorRef} className="h-[calc(100%-2rem)]" />
    </div>
  )
}

export default CodeEditor