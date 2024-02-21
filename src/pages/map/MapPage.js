import { useState } from "react";
import "./MapPage.css";
import MeasurementItem from "./components/MeasurementItem";

function MapPage() {
    const [mesurements, setMeasurements] = useState([
        {
            id: "1",
            sensor_id: "2",
            latitude: 2,
            longitude: 2,
            co: 3,
            co2: 5,
            no2: 6,
            o3: 7,
            pm10: 8,
            pm25: 9,
            rh: 10,
            extT: 11,
            intT: 12,
            voc: 14,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: "2",
            sensor_id: "2",
            latitude: 2,
            longitude: 2,
            co: 3,
            co2: 5,
            no2: 6,
            o3: 7,
            pm10: 8,
            pm25: 9,
            rh: 10,
            extT: 11,
            intT: 12,
            voc: 14,
            created_at: new Date(),
            updated_at: new Date()
        }
    ]);

    return (
    <main className="MapPage">
        <div className="sideBox">
            <div className="sensorName">
                SMARTT189
            </div>
            <div className="resultsBox">
                {mesurements.length > 0 &&
                    mesurements.map((m, i) => (
                        <MeasurementItem data={m} index={i+1} />
                    ))
                }
            </div>
            <form className="timeForm">
                <div className="selectTimeBox">
                    <div>-</div>
                    <input type="datetime-local" />
                    <div>+</div>
                </div>
                <div className="timeInterval">HOURLY</div>
            </form>
        </div>
        <div className="mapBox">
            MAP WILL BE HERE
        </div>
    </main>
    );
}

export default MapPage;
