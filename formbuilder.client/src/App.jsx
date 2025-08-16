import './App.css';
import FormBuilder from './Component/FormBuilder';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forms from './Component/Forms';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Forms />} />
                    <Route path="/formbuilder/:id?/:isTemplate?" element={<FormBuilder />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;