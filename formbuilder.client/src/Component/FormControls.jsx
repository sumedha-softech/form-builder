
const FormControls = ({ controls }) => {

    return (
        <>
            <div className="col-2">
                <h5>Toolbox</h5>
                {Object.keys(controls).map((type) => (
                    <div
                        key={type}
                        className="border p-2 mb-2 text-center bg-light rounded"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("controlType", type)}
                        style={{ cursor: "grab" }}
                    >
                        {controls[type].label}
                    </div>
                ))}
            </div>
        </>
    )
}
export default FormControls;