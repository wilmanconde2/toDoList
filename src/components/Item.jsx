import React, { useState, useEffect } from 'react';

const Item = ({ task, onDelete }) => {
    const [content, setContent] = useState(task.content); // Mantener contenido de la tarea

    useEffect(() => {
        const textarea = document.querySelector(`.textarea-${task.id}`);

        if (textarea) {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';  // Resetear altura para el nuevo contenido
                textarea.style.height = `${textarea.scrollHeight}px`;  // Ajustar altura según el contenido
            });
        }

        // Cleanup al desmontar el componente
        return () => {
            if (textarea) {
                textarea.removeEventListener('input', () => { });
            }
        };
    }, [task.id]);

    const handleChange = (e) => {
        setContent(e.target.value); // Actualizar el contenido de la tarea
    };

    return (
        <>
            <div id="container" >
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

                    {/* Botón eliminación */}
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
