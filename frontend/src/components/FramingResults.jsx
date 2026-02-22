import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import '../index.css'

export default function FramingResults({ stats, onReset }) {
  
  const data = stats ? [
    {
      name: 'Positive Frame (Saved)',
      Safe: stats.positive_frame.safe_choices,
      Risky: stats.positive_frame.risky_choices
    },
    {
      name: 'Negative Frame (Die)',
      Safe: stats.negative_frame.safe_choices,
      Risky: stats.negative_frame.risky_choices
    }
  ] : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
      <div className="glass-panel" style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-main)' }}>
          Community <span style={{ color: 'var(--accent-primary)' }}>Results</span>
        </h2>
        
        <p style={{ fontSize: '1.05rem', marginBottom: '40px', opacity: '0.8', lineHeight: '1.6' }}>
          The Framing Effect shows that people tend to avoid risk when a positive frame is presented (saving lives), but seek risk when a negative frame is presented (preventing deaths). Here is how the community voted:
        </p>
        
        {/* The Recharts Container */}
        <div style={{ height: '400px', width: '100%', marginBottom: '40px' }}>
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

              <Legend wrapperStyle={{ paddingTop: '20px', opacity: 0.9, fontFamily: 'var(--font-body)' }} />
              
              {/* The Grouped Bars */}
              <Bar dataKey="Safe" fill="var(--text-main)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              <Bar dataKey="Risky" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button onClick={onReset} className="btn-secondary">
          ← Return to Hub
        </button>
        
      </div>
    </div>
  )
}