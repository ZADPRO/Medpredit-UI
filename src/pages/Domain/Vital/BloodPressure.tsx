import bg from "../../../assets/BloodPressure/BloodPressure.png"

const BloodPressure = () => {
    return (
        <div style={{
            maxHeight: "75vh",
            overflowY: "auto",
            paddingBottom: "1rem",
        }}
        >
            <div>
                <img src={bg} alt="bg" style={{ width: "100%", }} />
            </div>
        </div>
    )
}
    
export default BloodPressure