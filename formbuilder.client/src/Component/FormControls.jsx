
const FormControls = ({ controls }) => {

    return (
        <>
            <div className="col-12 col-md-3 col-lg-2">
                <div className="text-center mb-3 fw-bold fs-5">
                    Toolbox
                </div>
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