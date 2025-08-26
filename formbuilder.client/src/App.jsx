import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forms from "./Component/Forms";
import "./App.css";
import FormBuilder from "./Component/FormBuilder";
import FormBuilder_new from "./Component/FormBuilder_new";
import DndFormBuilder from "./Component/DndForm/DndFormBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/builder/form/:id?/:isTemplate?" element={<FormBuilder />} />
        <Route path="/builder/form-new" element={<FormBuilder_new />} />
        <Route path="/builder/dnd-form" element={<DndFormBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
