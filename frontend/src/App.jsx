import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import AnchoringExperiment from './pages/AnchoringExperiment';
import FramingExperiment from './pages/FramingExperiment';
import ResearcherDashboard from './pages/ResearcherDashboard'

// Placeholders for your future pages
const CognitiveLibrary = () => <div style={{padding: '50px', color: 'white'}}>Cognitive Library Coming Soon!</div>;

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hub />} />
          
          <Route path="/anchoring" element={<AnchoringExperiment />} />
          <Route path="/framing" element={<FramingExperiment />} />
          <Route path="/library" element={<CognitiveLibrary />} />
          <Route path="/researcher" element={<ResearcherDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}