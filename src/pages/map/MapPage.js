import { useEffect, useState } from "react";
import "./MapPage.css";
import MeasurementItem from "./components/MeasurementItem";
import { AggrTypes, SENSORS } from "../../common/values";
import { minutesToHHhMMmn } from "../../common/parse";
import { AppApi } from "../../api";

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
    const [isSideBoxVisibleOnMobile, setIsSideBoxVisibleOnMobile] = useState(false);
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
        },
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
    const handleToggleSideBoxVisibilityOnMobile = (e) => {
        setIsSideBoxVisibleOnMobile(!isSideBoxVisibleOnMobile);
    };
    const fetchDefaultData = async () => {
        let lastAggr = await AppApi.getLastMeasurementAggregation(selectedSensor.id);
        if(!lastAggr){
            return;
        }
        setAggrType(AggrTypes.DAILY);
        let d = new Date(lastAggr.base_date);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        setBaseDate(d.toISOString().slice(0, 16));
        setInterval(lastAggr.interval);
        setMeasurements(lastAggr.results.map(m => {
            m.created_at = new Date(m.created_at);
            m.updated_at = new Date(m.updated_at);
            return m;
        }));
    };
    const fetchData = async () => {
        let aggr = await AppApi.getMeasurementsByAggregation(selectedSensor.id, new Date(baseDate), aggrType, interval);
        setMeasurements(aggr.map(m => {
            m.created_at = new Date(m.created_at);
            m.updated_at = new Date(m.updated_at);
            return m;
        }));
    };

    useEffect(() => {
        fetchDefaultData();
    }, []);
    useEffect(() => {
        fetchData();
    }, [interval, aggrType, baseDate, selectedSensor]);

    return (
    <main className="MapPage">
        <div className={isSideBoxVisibleOnMobile? "sideBox visibleOnMobile" : "sideBox"}>
            <div className="closeBTN" onClick={handleToggleSideBoxVisibilityOnMobile}>X</div>
            <div className="sensorName">
                { selectedSensor.id }
            </div>
            <div className="resultsBox">
                {measurements.length > 0 &&
                    measurements.map((m, i) => (
                        <MeasurementItem data={m} index={i+1} key={m.id} />
                    ))
                }
            </div>
            <form className="timeForm">
                <div className="selectTimeBox">
                    <div onClick={handleDecrementDate}>-</div>
                    <input type="datetime-local" onChange={(e) => setBaseDate(e.target.value)} value={baseDate} />
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
