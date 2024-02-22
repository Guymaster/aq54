import { useEffect, useState, useRef } from "react";
import "./MapPage.css";
import MeasurementItem from "./components/MeasurementItem";
import { AggrTypes, SENSORS } from "../../common/values";
import { minutesToHHhMMmn } from "../../common/parse";
import { AppApi } from "../../api";
import Map, {Marker} from 'react-map-gl';
import "./map.css";
import { AuthService } from "../../auth";
import { useNavigate } from "react-router-dom";

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
    const [zoom, setZoom] = useState(14);
    const [user, setUser] = useState(null);

    const [selectedSensor, setSelectedSensor] = useState(SENSORS[0]);
    const [baseDate, setBaseDate] = useState(defaultDateTime());
    const [aggrType, setAggrType] = useState(AggrTypes.DAILY);
    const [interval, setInterval] = useState(5);
    const [isSideBoxVisibleOnMobile, setIsSideBoxVisibleOnMobile] = useState(false);
    const [measurements, setMeasurements] = useState([]);

    const navigate = useNavigate();

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
        if(!user){
            return;
        }
        let lastAggr = await AppApi.getLastMeasurementAggregation(selectedSensor.id, (await user.getIdToken()));
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
        if(!user){
            return;
        }
        let aggr = await AppApi.getMeasurementsByAggregation(selectedSensor.id, new Date(baseDate), aggrType, interval, (await user.getIdToken()));
        setMeasurements(aggr.map(m => {
            m.created_at = new Date(m.created_at);
            m.updated_at = new Date(m.updated_at);
            return m;
        }));
    };

    useEffect(() => {
        AuthService.onAuthStateChanged(async (_user) => {
            if(_user){
                setUser(_user);
                fetchDefaultData();
            }
            else{
                navigate("/login");
            }
        })
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
                {measurements.length == 0 &&
                    "Il n'y pas de mesure enregistrée pour cette date."
                }
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
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | <div className="lougoutBTN" onClick={(e) => {AuthService.signOut()}} >Déconnexion</div>
        </div>
        <div className="mapBox map-container" ref={mapContainer}>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 15
                }}
                onMove={evt => {
                    setLat(evt.viewState.latitude);
                    setLng(evt.viewState.longitude);
                    setZoom(evt.viewState.zoom);
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {
                    SENSORS.map(sensor => (
                        <Marker longitude={sensor.longitude} latitude={sensor.latitude} rotation={-30} key={"marker"+sensor.id} onClick={(e) => {
                            setSelectedSensor(sensor);
                        }} >
                            <div className="tooltip">
                                <img src="/marker.png" height={70} style={{cursor: "pointer"}} />
                                <span className="tooltiptext">{ sensor.id }</span>
                            </div>
                        </Marker>
                    ))
                }
            </Map>
        </div>
    </main>
    );
}

export default MapPage;
