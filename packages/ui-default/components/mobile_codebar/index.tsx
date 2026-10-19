import $ from 'jquery';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface KeyDef {
  label: string;
  insert: string;
  cursorOffset?: number; // Offset from end of insert string
  className?: string;
}

const KEYS: KeyDef[] = [
  { label: 'Tab', insert: '    ', className: 'primary-btn' },
  { label: '{ }', insert: '{\n    \n}', cursorOffset: -2 },
  { label: '( )', insert: '()', cursorOffset: -1 },
  { label: '[ ]', insert: '[]', cursorOffset: -1 },
  { label: '" "', insert: '""', cursorOffset: -1 },
  { label: "' '", insert: "''", cursorOffset: -1 },
  { label: ';', insert: ';' },
  { label: '=', insert: ' = ' },
  { label: '<', insert: '<' },
  { label: '>', insert: '>' },
  { label: '<=', insert: ' <= ' },
  { label: '>=', insert: ' >= ' },
  { label: '==', insert: ' == ' },
  { label: '!=', insert: ' != ' },
  { label: '+', insert: '+' },
  { label: '-', insert: '-' },
  { label: '*', insert: '*' },
  { label: '/', insert: '/' },
  { label: '%', insert: '%' },
  { label: '&', insert: '&' },
  { label: '|', insert: '|' },
  { label: '!', insert: '!' },
  { label: 'cin >>', insert: 'cin >> ', className: 'purple-btn' },
  { label: 'cout <<', insert: 'cout << ', className: 'purple-btn' },
  { label: 'endl', insert: 'endl;' },
  { label: 'Console.', insert: 'Console.', className: 'purple-btn' },
];

function insertTextAtCursor(target: HTMLTextAreaElement, text: string, cursorOffset: number = 0) {
  const start = target.selectionStart || 0;
  const end = target.selectionEnd || 0;
  const val = target.value;

  target.value = val.substring(0, start) + text + val.substring(end);
  const newPos = start + text.length + cursorOffset;
  target.selectionStart = newPos;
  target.selectionEnd = newPos;
  target.focus();

  // Trigger input event for frameworks/editors listening to changes
  target.dispatchEvent(new Event('input', { bubbles: true }));
  target.dispatchEvent(new Event('change', { bubbles: true }));
}

export const MobileCodeBar: React.FC = () => {
  const handleKeyClick = (key: KeyDef, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Check standard textarea [name="code"]
    const textarea = document.querySelector('textarea[name="code"]') as HTMLTextAreaElement;
    if (textarea) {
      insertTextAtCursor(textarea, key.insert, key.cursorOffset || 0);
      return;
    }

    // 2. Check Monaco Editor global instance if available
    const monaco = (window as any).monaco;
    if (monaco && (window as any).editorInstance) {
      const editor = (window as any).editorInstance;
      const selection = editor.getSelection();
      const op = { range: selection, text: key.insert, forceMoveMarkers: true };
      editor.executeEdits('mobile-codebar', [op]);
      if (key.cursorOffset) {
        const pos = editor.getPosition();
        editor.setPosition({ lineNumber: pos.lineNumber, column: pos.column + key.cursorOffset });
      }
      editor.focus();
    }
  };

  const handleSubmitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const submitBtn = document.querySelector('form input[type="submit"], form button[type="submit"]') as HTMLInputElement;
    if (submitBtn) {
      submitBtn.click();
    }
  };

  return (
    <div className="mobile-codebar-container">
      <div className="mobile-codebar-scroll">
        <button
          type="button"
          className="mobile-code-btn action-submit-btn"
          onClick={handleSubmitClick}
        >
          🚀 Nộp Bài
        </button>
        {KEYS.map((k, idx) => (
          <button
            key={idx}
            type="button"
            className={`mobile-code-btn ${k.className || ''}`}
            onClick={(e) => handleKeyClick(k, e)}
          >
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export function mountMobileCodeBar(containerSelector: string = 'body') {
  if (typeof window === 'undefined') return;
  // Only inject if not already present
  if (document.getElementById('mobile-codebar-root')) return;

  const targetContainer = document.querySelector(containerSelector);
  if (!targetContainer) return;

  const mountPoint = document.createElement('div');
  mountPoint.id = 'mobile-codebar-root';
  targetContainer.appendChild(mountPoint);

  const root = ReactDOM.createRoot(mountPoint);
  root.render(<MobileCodeBar />);
}

export default MobileCodeBar;
