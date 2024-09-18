import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SidebarProvider } from './context/SidebarContext.jsx'
import { GenreProvider } from './context/GenreContext.jsx'

createRoot(document.getElementById('root')).render(
    <GenreProvider>
        <SidebarProvider>
            <App />
        </SidebarProvider>
    </GenreProvider>
)
