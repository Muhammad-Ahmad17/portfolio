import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPalette } from './theme/palettes'

initPalette();

createRoot(document.getElementById("root")!).render(<App />);
