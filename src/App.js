import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import 'antd/dist/antd.min.css';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
