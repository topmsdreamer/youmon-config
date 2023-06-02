import * as _ from 'lodash';
import { getEnvironment } from '../environment';

export const getObjectValue = (key: string, data: any, defaultValue: any) => {
    if (data !== undefined) {
        let obj = data;
        const keys = key.split('.');
        if(keys.length === 1)
        {

            return obj.hasOwnProperty(key) && obj[key] !== '' ? obj[key] : defaultValue
        }
        else {
            const exists = _.every(keys, (key) => {
                if (obj.hasOwnProperty(key)) {

                    obj = Array.isArray(obj[key]) ? [...obj[key]] : { ...obj[key] }
                    return true;
                }
                return false;
            })
            return exists ? obj : defaultValue
        }
    }

    return defaultValue
}

export const getImageSource = (props:any) => {
    const { apiClient, image,service } = props;
    const { _tenant, _token } = apiClient;
    const environment = getEnvironment()
    return {uri: `https://${environment.apiUrl}/api/${service}/${image}`,
    headers: {
      'x-authorization': _token,
      'x-tenant': _tenant
    }}
  }

export const getSeverityColor = (severity: string) => {
    const colors: any = {
      default: '#373535',
      info: '#373535',
      warning: '#ff9800',
      severe: '#e51c23',
      critical: '#8B0000'
    }
  
    return colors.hasOwnProperty(severity) ? colors[severity] : colors.default;
  }

  export const getDeviceStatusColor = (severity: string) => {
    const colors: any = {
      success: '#4BBF73',
      warning: '#ff9800',
      danger: '#e51c23',
      missing: '#121212'
    }
    
    return colors.hasOwnProperty(severity) ? colors[severity] : colors.success;
  }  
