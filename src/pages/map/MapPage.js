import { useEffect, useState, useRef } from "react";
import "./MapPage.css";
import MeasurementItem from "./components/MeasurementItem";
import { AggrTypes, SENSORS } from "../../common/values";
import { minutesToHHhMMmn } from "../../common/parse";
import { AppApi } from "../../api";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

function MapPage() {
    const defaultDateTime = () => {
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return now.toISOString().slice(0, 16);
    };
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(SENSORS[0].longitude);
    const [lat, setLat] = useState(SENSORS[0].latitude);
    const [zoom, setZoom] = useState(12);

    const [selectedSensor, setSelectedSensor] = useState(SENSORS[0]);
    const [baseDate, setBaseDate] = useState(defaultDateTime());
    const [aggrType, setAggrType] = useState(AggrTypes.DAILY);
    const [interval, setInterval] = useState(5);
    const [isSideBoxVisibleOnMobile, setIsSideBoxVisibleOnMobile] = useState(false);
    const [measurements, setMeasurements] = useState([]);

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
        if (map.current) return; // initialize map only once
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
          });
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
        <div className="mapSidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Déconnexion
        </div>
        <div className="mapBox map-container" ref={mapContainer}>
            
        </div>
    </main>
    );
}

export default MapPage;
