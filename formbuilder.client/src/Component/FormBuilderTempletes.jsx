

const FormBuilderTempletes = () => {
    return (
        <div className="col-2 border-end">
            <h5>Form Builder</h5>
            <div className="d-flex flex-column gap-2 mt-5" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="border p-2">Template {i + 1}</div>
                ))}
            </div>
        </div>
    )
}
export default FormBuilderTempletes;