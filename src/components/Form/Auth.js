import React from 'react'

Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    return (
        <>
        <div className="auth">
            <input type="text" className="authInput" id="email" name="email" />
            <input type="password" className="authInput" id="password" name="password" />
            <input type="password" className="authInput" id="confirm" name="confirm" />
        </div>
        <div className="btn-container"><button className="btn">Pick Your Interests!</button></div>
        </>
    )
}

export default Auth