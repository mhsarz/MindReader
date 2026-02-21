export default function FramingQuestion({ variant, onNext }) {
    const isPositive = variant === "positive_framing";
    return (
        <div className="scene-container" style={{ maxWidth: '600px' }}>
            <h2>Outbreak Scenario</h2>
            
            <p style={{ marginBottom: '20px', textAlign: 'left', lineHeight: '1.6' }}>
                Imagine that the country is preparing for the outbreak of an unusual disease, which is expected to kill 600 people. Two alternative programs to combat the disease have been proposed. Assume that the exact scientific estimates of the consequences of the programs are as follows:
            </p>

            {/* The Framing Box */}
            <div style={{ 
                backgroundColor: '#1a1a1a', border: '1px solid #333', 
                padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'left' 
            }}>
                {isPositive ? (
                    <>
                        <p><strong>Program A:</strong> 200 people will be saved.</p>
                        <p><strong>Program B:</strong> There is a 1/3 probability that 600 people will be saved, and a 2/3 probability that no people will be saved.</p>
                    </>
                ) : (
                    <>
                        <p><strong>Program A:</strong> 400 people will die.</p>
                        <p><strong>Program B:</strong> There is a 1/3 probability that nobody will die, and a 2/3 probability that 600 people will die.</p>
                    </>
                )}
            </div>
            
            <h3>Which program do you choose?</h3>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                {/* The Arrow Functions! */}
                <button onClick={() => onNext("safe_choice")}>Program A</button>
                <button onClick={() => onNext("risky_choice")}>Program B</button>
            </div>
        </div>
    );
}