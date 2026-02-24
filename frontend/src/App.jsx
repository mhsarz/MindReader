import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import AnchoringExperiment from './pages/AnchoringExperiment';
import FramingExperiment from './pages/FramingExperiment';
import ResearcherDashboard from './pages/ResearcherDashboard'
import CognitiveLibrary from './pages/CognitiveLibrary';
import ArticlePage from './components/ArticlePage';

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
          <Route path="/cognitive-library" element={<CognitiveLibrary />} />
          <Route path="/library" element={<CognitiveLibrary />} />
          <Route path="/library/:id" element={<ArticlePage />} />
          <Route path="*" element={
            <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
              <h1>404: Page Not Found</h1>
              <p>This experiment does not exist.</p>
              <a href="/" style={{ color: '#FF7D00' }}>Return to Hub</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}