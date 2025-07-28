import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MyContext } from './Utils/MyContext.jsx'

createRoot(document.getElementById('root')).render(
    <MyContext>
    <App />
    </MyContext>,
)
