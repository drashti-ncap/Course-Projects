import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            return ({
                ...prev,
                [name]: value
        })
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        alert("Form submitted!");
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>

                <h1>User Form User</h1>

                {/* Name */}
                <div className="field">
                    <label htmlFor="name">Name</label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email */}
                <div className="field">
                    <label htmlFor="email">Email</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="field">
                    <label>Gender</label>

                    <div className="options">

                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                            />
                            Male
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                            />
                            Female
                        </label>

                    </div>
                </div>

                {/* Message */}
                <div className="field">
                    <label htmlFor="message">
                        Message
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write something..."
                    />
                </div>

                <button type="submit">
                    Submit
                </button>

            </form>
        </div>
    );
};

export default Form;