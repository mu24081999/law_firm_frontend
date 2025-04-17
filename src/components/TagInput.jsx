import { useState } from 'react';

function TagInput({ tags, onAddTag, onRemoveTag }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAddTag(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md flex items-center text-sm"
        >
          {tag}
          <button
            onClick={() => onRemoveTag(tag)}
            className="ml-1 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tag..."
        className="outline-none flex-1 min-w-[120px]"
      />
    </div>
  );
}

export default TagInput;