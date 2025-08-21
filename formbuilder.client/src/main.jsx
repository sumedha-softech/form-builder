import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MyContext } from './Utils/MyContext.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <MyContext>
        <App />
    </MyContext>,
)
