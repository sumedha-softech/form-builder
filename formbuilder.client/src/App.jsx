import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forms from './Component/Forms';
import './App.css';
import FormBuilder from './Component/FormBuilder';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Forms />} />
                <Route path="/builder/form/:id?/:isTemplate?" element={<FormBuilder />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;