import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SidebarProvider } from './context/SidebarContext.jsx'

createRoot(document.getElementById('root')).render(
    <SidebarProvider>
        <App />
    </SidebarProvider>
)
