import axios from "axios";
import { AggrTypes } from "../common/values.js";

const ApiConfig = {
    HOST: process.env.REACT_APP_API_HOST,
    PORT: process.env.REACT_APP_API_PORT,
};

export class AppApi {
    /**
     * 
     * @param {string} sensorId 
     * @param {Date} baseDate 
     * @param {AggrTypes} aggrType 
     * @param {number} interval 
     */
    static async getMeasurementsByAggregation(sensorId, baseDate, aggrType, interval){
        try {
            let response = await axios.get(`${ApiConfig.HOST}:${ApiConfig.PORT}/sensors/${sensorId}/measurements?base_date=${baseDate.toISOString()}&aggr_type=${aggrType}&interval=${interval}`);
            if(response.status != 200){
                return [];
            }
            return response.data;
        } catch (error) {
            return [];
        }
    }

    /**
     * 
     * @param {string} sensorId 
     */
    static async getLastMeasurementAggregation(sensorId){
        try {
            let response = await axios.get(`${ApiConfig.HOST}:${ApiConfig.PORT}/sensors/${sensorId}/measurements/last`, {
                mode: 'cors',
                headers: {
                  'Access-Control-Allow-Origin':'*'
                }
            });
            if(response.status != 200){
                return null;
            }
            return response.data;
        } catch (error) {
            return null;
        }
    }
}