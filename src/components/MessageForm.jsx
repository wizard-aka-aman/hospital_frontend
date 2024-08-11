import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';

function MessageForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/v1/message/send",
                { firstName, lastName, email, phone, message },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((res) => {
                    toast.success(res.data.message);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");

                })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='container form-component message-form'>
            <h2>Send us a Message</h2>
            <form onSubmit={handleMessage}>
                <input type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                ></input>

                <input type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                ></input>
                <input type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input type='text'
                    placeholder='Phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                ></input>

                <textarea rows={7}
                    placeholder='Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type='submit' style={{ cursor: "pointer" }}>
                        Send
                    </button>
                </div>
            </form>


        </div>
    )
}

export default MessageForm