import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forms from './Component/Forms';
import './App.css';
import FormBuilder from './Component/FormBuilder';
import FormBuilder_new from "./Component/FormBuilder_new";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Forms />} />
                <Route path="/builder/form/:id?/:isTemplate?" element={<FormBuilder />} />
                <Route path="/builder/form-new" element={<FormBuilder_new />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;