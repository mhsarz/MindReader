import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function FramingResults({ stats, onReset }) {
  
  // 1. Transform the backend data into Recharts format!
  // We use optional chaining (?.) just in case the database is empty
  const chartData = [
    {
      name: 'Positive Frame',
      Safe: stats?.positive_frame?.safe_choices || 0,
      Risky: stats?.positive_frame?.risky_choices || 0
    },
    {
      name: 'Negative Frame',
      Safe: stats?.negative_frame?.safe_choices || 0,
      Risky: stats?.negative_frame?.risky_choices || 0
    }
  ];

  return (
    <div className="scene-container" style={{ maxWidth: '600px' }}>
      <h2>Community Results</h2>
      <p style={{ marginBottom: '30px', color: '#ccc' }}>
        Did the negative framing make people take more risks?
      </p>

      {/* 2. The Upgraded Grouped Bar Chart */}
      <div style={{ width: '100%', height: 350, marginBottom: '30px' }}>
        <ResponsiveContainer>
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Gives the numbers room to breathe!
            barSize={40} // Stops the bars from becoming massive blocks
          >
            {/* Adds subtle background lines for a professional look */}
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              stroke="#888" 
              tickMargin={15} 
            />
            
            <YAxis 
              stroke="#888" 
              allowDecimals={false}
            />
            
            {/* Smooths out the hover effect and darkens the tooltip */}
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} // Super smooth, subtle hover highlight
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
            />
            
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            {/* Radius rounds the top corners [top-left, top-right, bottom-right, bottom-left] */}
            <Bar dataKey="Safe" fill="#4ade80" name="Program A (Safe)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Risky" fill="#f87171" name="Program B (Risky)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button onClick={onReset}>← Return to Hub</button>
    </div>
  )
}