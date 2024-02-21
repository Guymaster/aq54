import { useState } from "react";
import "./MeasurementItem.css";
import formatcoords from "formatcoords";
import { intTo2Chars } from "../../../common/parse";

/**
 * 
 * @param {{
 *  data: {
 *      id: number,
 *      sensor_id: string,
 *      latitude: number,
 *      longitude: number,
 *      co: number,
 *      co2: number,
 *      no2: number,
 *      o3: number,
 *      pm10: number,
 *      pm25: number,
 *      rh: number,
 *      extT: number,
 *      intT: number,
 *      voc: number,
 *      created_at: Date,
 *      updated_at: Date
 * },
 * index: number
 * }} props 
 * @returns 
 */
function MeasurementItem(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = (e) => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={isExpanded? "msmntItem expanded": "msmntItem"} onClick={toggleIsExpanded}>
            <div className="msmntHeader">
                <div className="msmntNumber">
                    { props.index }
                </div>
                <div className="msmntInfo">
                    <div className="msmntLocation">
                        {
                            formatcoords(props.data.latitude, props.data.longitude).format()
                        }
                    </div>
                    <div className="msmntDate">
                        {
                            `${intTo2Chars(props.data.created_at.getDate())}/${intTo2Chars(props.data.created_at.getMonth()+1)}/${props.data.created_at.getFullYear()} - ${intTo2Chars(props.data.created_at.getHours())}H${intTo2Chars(props.data.created_at.getMinutes())}`
                        }
                    </div>
                </div>
            </div>
            <div className="msmntBody">
                <table>
                    <tbody>
                        <tr>
                            <th>CO</th>
                            <td>
                                {props.data.co? `${props.data.co} µg/m³` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>CO<sub>2</sub> </th>
                            <td>
                                {props.data.co2? `${props.data.co2} µg/m³` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>NO<sub>2</sub> </th>
                            <td>
                                {props.data.no2? `${props.data.no2} µg/m³` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>O<sub>3</sub> </th>
                            <td>
                                {props.data.o3? `${props.data.o3} µg/m³` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>PM10</th>
                            <td>
                                {props.data.pm10? `${props.data.pm10} µg/m³` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>PM2.5</th>
                            <td>
                                {props.data.pm25? `${props.data.pm25} µg/m³` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>RH</th>
                            <td>
                                {props.data.rh? `${props.data.rh} %` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>Temp. externe</th>
                            <td>
                                {props.data.extT? `${props.data.extT} °C` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>Temp. interne</th>
                            <td>
                                {props.data.intT? `${props.data.intT} °C` : ""}
                            </td>
                        </tr>
                        <tr>
                            <th>VOC</th>
                            <td>
                                {props.data.voc? `${props.data.voc} mg/m³` : ""}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MeasurementItem;
