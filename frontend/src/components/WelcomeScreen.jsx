export default function WelcomeScreen({ onStart, title, description }) {
    return (
        <div className="scene-container">
            <h2>{title}</h2>
            <p style={{ marginBottom: '30px', color: '#ccc' }}>{description}</p>
            <button onClick={onStart}>Begin Experiment</button>
        </div>
    )
}