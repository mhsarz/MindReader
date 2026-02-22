import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import '../index.css'

export default function AnchoringResults({ showStats, stats, onFetchStats, onReset }) {
  
  // Format the raw Python data into the exact format Recharts needs
  const data = stats ? [
    { name: 'Low Anchor (50m)', average: Math.round(stats.low_anchor) },
    { name: 'High Anchor (500m)', average: Math.round(stats.high_anchor) }
  ] : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
      <div className="glass-panel" style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}>
        
        {!showStats ? (
          <>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', color: 'var(--text-main)' }}>
              Experiment <span style={{ color: 'var(--accent-primary)' }}>Complete</span>
            </h2>
            
            <p style={{ fontSize: '1.1rem', marginBottom: '40px', opacity: '0.8', lineHeight: '1.6' }}>
              Thank you for participating! The Anchoring Effect suggests that people rely too heavily on the first piece of information offered (the "anchor") when making decisions.
              <br /><br />
              Would you like to see how the two different anchors mathematically affected the community's average guesses?
            </p>
            
            <button onClick={onFetchStats} className="btn-primary" style={{ width: '100%', marginBottom: '15px' }}>
              View Community Results
            </button>
            
            <button onClick={onReset} className="btn-secondary">
              ← Return to Hub
            </button>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-main)' }}>
              Community <span style={{ color: 'var(--accent-primary)' }}>Results</span>
            </h2>
            
            <p style={{ fontSize: '1rem', marginBottom: '40px', opacity: '0.8' }}>
              Average height estimations based on the initial anchor presented to the user.
            </p>
            
            <div style={{ height: '350px', width: '100%', marginBottom: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 236, 209, 0.1)" vertical={false} />
                  
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--text-main)" 
                    tick={{ fill: 'var(--text-main)', opacity: 0.9, fontSize: 14, fontFamily: 'var(--font-body)' }} 
                    axisLine={{ stroke: 'rgba(255, 236, 209, 0.2)' }}
                    tickLine={false}
                  />
                  
                  <YAxis 
                    stroke="var(--text-main)" 
                    tick={{ fill: 'var(--text-main)', opacity: 0.6, fontFamily: 'var(--font-body)' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  
                  <Tooltip 
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-main)', 
                      border: '1px solid var(--accent-primary)', 
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)'
                    }}
                    itemStyle={{ color: '#888888' }} 
                    labelStyle={{ color: 'var(--text-main)', fontWeight: 'bold', marginBottom: '5px' }}
                  />
                  
                  {/* The Bars (Cream for Low, Orange for High) */}
                  <Bar dataKey="average" radius={[6, 6, 0, 0]} maxBarSize={80}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--text-main)' : 'var(--accent-primary)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <button onClick={onReset} className="btn-primary" style={{ width: '100%' }}>
              Play Again
            </button>
            <button onClick={() => window.location.href = '/'} className="btn-secondary">
              ← Return to Hub
            </button>
          </>
        )}
        
      </div>
    </div>
  )
}