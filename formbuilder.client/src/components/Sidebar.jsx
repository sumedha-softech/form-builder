import PropertySidebar from "./PropertySidebar";
import FieldSidebar from "./FieldSidebar";

const Sidebar=({ onUpdateField, onUpdateSection })=>{
  return (
    <div className="sidebar">
      {/* field-sidebar */}
      <FieldSidebar />

      {/* property-sidebar */}
      <PropertySidebar 
        onUpdateField={onUpdateField} 
        onUpdateSection={onUpdateSection} 
      />
    </div>
  );
};

export default Sidebar;