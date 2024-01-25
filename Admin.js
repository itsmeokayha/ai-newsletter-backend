import React, { useState } from 'react';

const Admin = () => {
    const [newArticle, setNewArticle] = useState({
        title: '',
        summary: '',
        body: '',
        imageUrl: '', // Add more fields as needed
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });

            if (response.ok) {
                // Handle successful submission (e.g., clear form, show a success message)
                setNewArticle({ title: '', summary: '', body: '', imageUrl: '' });
                // Additional success handling...
            } else {
                // Handle server errors
            }
        } catch (error) {
            console.error('Error submitting article:', error);
            // Error handling...
        }
    };

    return (
        <div className="admin-panel">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="Article Title"
                />
                <textarea
                    value={newArticle.summary}
                    onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                    placeholder="Article Summary"
                ></textarea>
                <textarea
                    value={newArticle.body}
                    onChange={(e) => setNewArticle({ ...newArticle, body: e.target.value })}
                    placeholder="Article Body"
                ></textarea>
                <input
                    type="text"
                    value={newArticle.imageUrl}
                    onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
                    placeholder="Image URL"
                />
                <button type="submit">Add Article</button>
            </form>
        </div>
    );
};

export default Admin;
