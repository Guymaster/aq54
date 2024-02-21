import { useState } from "react";
import "./MapPage.css";
import MeasurementItem from "./components/MeasurementItem";
import { AggrTypes, SENSORS } from "../../common/values";
import { minutesToHHhMMmn } from "../../common/parse";

function MapPage() {
    const defaultDateTime = () => {
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return now.toISOString().slice(0, 16);
    };

    const [selectedSensor, setSelectedSensor] = useState(SENSORS[0]);
    const [baseDate, setBaseDate] = useState(defaultDateTime());
    const [aggrType, setAggrType] = useState(AggrTypes.DAILY);
    const [interval, setInterval] = useState(5);
    const [measurements, setMeasurements] = useState([
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

    const handleIncrementDate = (e) => {
        let d = new Date(baseDate);
        if(aggrType == AggrTypes.HOURLY){
            d.setHours(d.getHours()+1);
        }
        else{
            d.setDate(d.getDate()+1);
        }
        setBaseDate(d.toISOString().slice(0, 16));
    };
    const handleDecrementDate = (e) => {
        let d = new Date(baseDate);
        if(aggrType == AggrTypes.HOURLY){
            d.setHours(d.getHours()-1);
        }
        else{
            d.setDate(d.getDate()-1);
        }
        setBaseDate(d.toISOString().slice(0, 16));
    };
    const handleToggleAggrType = (e) => {
        if(aggrType == AggrTypes.DAILY){
            setAggrType(AggrTypes.HOURLY);
        } else{
            setAggrType(AggrTypes.DAILY);
            let d = new Date(baseDate);
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            setBaseDate(d.toISOString().slice(0, 16));
        }
        if(interval > 60){
            setInterval(0);
        }
    };

    return (
    <main className="MapPage">
        <div className="sideBox">
            <div className="sensorName">
                { selectedSensor.id }
            </div>
            <div className="resultsBox">
                {measurements.length > 0 &&
                    measurements.map((m, i) => (
                        <MeasurementItem data={m} index={i+1} />
                    ))
                }
            </div>
            <form className="timeForm">
                <div className="selectTimeBox">
                    <div onClick={handleDecrementDate}>-</div>
                    <input type="datetime-local" defaultValue={baseDate} onChange={(e) => setBaseDate(e.target.value)} value={baseDate} />
                    <div onClick={handleIncrementDate}>+</div>
                </div>
                <div className="timeInterval" onClick={handleToggleAggrType}>{ aggrType == AggrTypes.HOURLY? "HORAIRE" : "JOURNALIER" }</div>
                <div className="intervalBox">
                    <input type="number" max={aggrType == AggrTypes.DAILY? 240 : 60} min={5} step={5} value={interval} onChange={(e) => {setInterval(e.target.value)}} />
                    <div>Intervalle: { minutesToHHhMMmn(interval) }</div>
                </div>
            </form>
        </div>
        <div className="mapBox">
            MAP WILL BE HERE
        </div>
    </main>
    );
}

export default MapPage;
