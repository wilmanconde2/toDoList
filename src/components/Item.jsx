import React, { useState, useEffect } from 'react';

const Item = ({ task, onDelete, onContentChange }) => {
    const [content, setContent] = useState(task.content);

    useEffect(() => {
        const textarea = document.querySelector(`.textarea-${task.id}`);

        if (textarea) {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            });
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('input', () => { });
            }
        };
    }, [task.id]);

    const handleChange = (e) => {
        setContent(e.target.value);
        onContentChange(task.id, e.target.value); 
    };

    return (
        <>
            <div id="container-items" >
                <div className="input-group">
                    <input
                        className="check"
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                    />
                    <textarea
                        className={`form-control text textarea-${task.id}`}
                        value={content}
                        onChange={handleChange}
                        rows="1"
                        placeholder="Escribe aquí..."
                        aria-label="Textarea with checkbox"
                    ></textarea>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(task.id)}
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    );
};

export default Item;
