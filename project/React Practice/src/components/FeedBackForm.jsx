import React, { useState } from 'react';

const FeedBackForm = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const [submitFeedback, setSubmitFeedback] =
        useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !message) {
            alert('Please fill all details');
            return;
        }

        // Save submitted data
        setSubmitFeedback({
            name,
            message
        });

        // Clear form
        setName('');
        setMessage('');
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f4f4f4'
            }}
        >
            <div>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: '400px',
                        padding: '30px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}
                >
                    <h1>Feedback Form</h1>

                    <label htmlFor="name">
                        Name:
                    </label>

                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <label htmlFor="message">
                        Message:
                    </label>

                    <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                    />

                    <button type="submit">
                        Submit
                    </button>
                </form>

                {/* Show feedback */}
                {submitFeedback && (
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '20px',
                            background: '#fff',
                            borderRadius: '12px'
                        }}
                    >
                        <h2>
                            Submitted Feedback
                        </h2>

                        <p>
                            <strong>Name:</strong>{' '}
                            {submitFeedback.name}
                        </p>

                        <p>
                            <strong>Message:</strong>{' '}
                            {submitFeedback.message}
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FeedBackForm;