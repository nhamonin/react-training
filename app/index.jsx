import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import Nav from './components/Nav';
import Popular from './components/Popular';
import Battle from './components/Battle';
import Results from './components/Results';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'dark',
    };
  }

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    return (
      <Router>
        <div className={this.state.theme}>
          <div className="container">
            <Nav theme={this.state.theme} toggleTheme={this.toggleTheme} />
            <Routes>
              <Route path="/" element={<Popular />} />
              <Route path="/battle" element={<Battle />} />
              <Route path="/battle/results" element={<Results />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
