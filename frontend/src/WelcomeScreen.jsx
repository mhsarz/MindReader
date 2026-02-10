// src/WelcomeScreen.jsx

// 1. We accept 'onStart' as a prop (a tool passed from the parent)
export default function WelcomeScreen({ onStart }) {
    
    return (
        <div className="welcome-container">
            <h1>The Anchoring Effect</h1>
            <p>Welcome to the experiment.</p>
            
            <button onClick={onStart}>Start The Experiment</button>
            
        </div>
    )
}