import { useState } from "react";
import "./MeasurementItem.css";

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
 *      created_at: new Date(),
 *      updated_at: new Date()
 * }
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
                    23
                </div>
                <div className="msmntInfo">
                    <div className="msmntLocation">
                        23² - 53²
                    </div>
                    <div className="msmntDate">
                        25/02/2002 - 15H30
                    </div>
                </div>
            </div>
            <div className="msmntBody">
                <table>
                    <tr>
                        <th>CO</th>
                        <td>AA</td>
                    </tr>
                    <tr>
                        <th>CO</th>
                        <td>AA</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default MeasurementItem;
