import React from "react";
import { FontAwesome5 ,MaterialCommunityIcons} from "@expo/vector-icons";
import { Image } from "react-native";

export const assetSettings = {
    detailDataFields: [
        { name: 'length', label: 'Length' },
        { name: 'width', label: 'Width' },
        { name: 'weight', label: 'Weight' },
        { name: 'fuelCapacity', label: 'Fuel Capacity' },
        { name: 'waterCapacity', label: 'Water Capacity' },
        { name: 'designCategory', label: 'Design Category' },
        { name: 'beds', label: 'Number of Beds' },
        { name: 'speed', label: 'Speed' },],
    bomDataFields: [
        { name: 'model', label: 'Model' },
        { name: 'type', label: 'Type' },
        { name: 'serialNo', label: 'Serial Number' },
        { name: 'articleNo', label: 'Article Number' }
    ],
    statusDataFields: [
        { field: 'Service Battery Voltage', name: 'Service Battery Voltage', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'battery-full'} size={24} color="black" /> },
        { field: 'Start Battery Voltage', name: 'Start Battery Voltage', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'battery-full'} size={24} color="black" /> },
        { field: 'Upper Cabin Temperature', name: 'Upper Cabin Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" /> },
        { field: 'Lower Cabin Temperature', name: 'Lower Cabin Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" /> },
        { field: 'Cooler Temperature', name: 'Cooler Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" /> },
        { field: 'Installation Compartment Temperature', name: 'Installation Comp. Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" /> },
        { field: 'Keelson Temperature', name: 'Keelson Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" /> },
        { field: 'Outdoor Temperature', name: 'Outdoor Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" /> },
    ],
    statusEngineFields: [
        { field: 'Fluid level 0', name: 'Tank Level', icon: <MaterialCommunityIcons name="gas-station" style={{ marginRight: 5 }} size={24} color="black" />, order: 0, fromRecordning: true },
        { field: 'Fuel Rate 0', name: 'Fuel Rate', icon: <FontAwesome5 name="chart-line" style={{ marginRight: 5 }} size={24} color="black" />, order: 1 },
        { field: 'Total Engine Hours 0', name: 'Total Engine Hours', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'clock'} size={24} color="black" />, order: 2, fromRecordning: true },
        { field: 'Engine Temperature 0', name: 'Engine Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" />, order: 3 },
        { field: 'Engine Oil Temperature 0', name: 'Engine Oil Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" />, order: 4 },
        { field: 'Transmission Oil Temperature 0', name: 'Transmission Oil Temperature', icon: <FontAwesome5 style={{ marginRight: 5 }} name={'thermometer-quarter'} size={24} color="black" />, order: 5 },
        { field: 'Battery Current', name: 'Battery Current', icon: <MaterialCommunityIcons style={{ marginRight: 5 }}  name="current-ac" size={24} color="black" />, order: 7 },
    ],
    statusCharts: [
        { field: 'Service Battery Voltage', name: 'Service Battery Voltage', min: 0, max: 16, order: 1, unit: 'V' },
        { field: 'Upper Cabin Temperature', name: 'Upper Cabin Temperature', min: -10, max: 40, order: 2, unit: 'C' },
        { field: 'Lower Cabin Temperature', name: 'Lower Cabin Temperature', min: -10, max: 40, order: 3, unit: 'C' },
        { field: 'Cooler Temperature', name: 'Cooler Temperature', min: -10, max: 40, order: 4, unit: 'C' },
        { field: 'Lower Cabin Humidity', name: 'Lower Cabin Humidity', min: 0, max: 100, order: 5, unit: '%' },
        { field: 'Installation Compartment Temperature', name: 'Installation Compartment Temperature', min: -10, max: 40, order: 6, unit: 'C' },
        { field: 'Keelson Temperature', name: 'Keelson Temperature', min: -10, max: 40, order: 7, unit: 'C' },
        { field: 'Outdoor Temperature', name: 'Outdoor Temperature', min: -20, max: 40, order: 8, unit: 'C' },
        { field: 'Start Battery Voltage', name: 'Start Battery Voltage', min: 0, max: 16, order: 9, unit: 'V' },
    ],
    engineCharts: [
        { field: 'Engine Speed 0', name: 'Engine Speed', order: 1, min: 0, unit: 'Rpm' },
        { field: 'Engine Tilt Trim 0', name: 'Engine Tilt Trim', order: 2, min: 0, max: 100, unit: '%' },
        { field: 'Engine Temperature 0', name: 'Engine Temperature', order: 3, min: 0, unit: 'C' },
        { field: 'Engine Oil Temperature 0', name: 'Engine Oil Temperature', order: 4, min: 0, unit: 'C' },
        { field: 'Engine Oil Pressure 0', name: 'Engine Oil Pressure', order: 5, min: 0, unit: 'kPa' },
        { field: 'Transmission Oil Temperature 0', name: 'Transmission Oil Temperature', order: 6, min: 0, unit: 'C' },
        { field: 'Transmission Oil Pressure 0', name: 'Transmission Oil Pressure', order: 7, min: 0, unit: 'kPa' },
        { field: 'Fluid level 0', name: 'Tank Level', order: 8, min: 0, max: 100, unit: '%' },
        { field: 'Port Trim Tab', name: 'Port Trim Tab', order: 8, min: 0, max: 100, unit: '%' },
        { field: 'Starboard Trim Tab', name: 'Starboard Trim Tab', order: 8, min: 0, max: 100, unit: '%' },
        { field: 'Battery Voltage 0', name: 'Battery Volatge', order: 9, min: 0, unit: 'C' },
        { field: 'Battery Current 0', name: 'Battery Current', order: 10, min: 0, unit: 'A' },
    ],
    serviceRequestOptions: [
        { label: 'Engine', value: 'engine' },
        { label: 'Hull', value: 'hull' },
        { label: 'Cabin', value: 'cabin' },
        { label: 'Electronics', value: 'electronics' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Interior', value: 'interior' },
        { label: 'Other', value: 'other' },
    ]
}

export const deviceSettings = {
    statusCharts: [
        { field: 'System RSSI', name: 'System RSSI', min: -100, max: 0, order: 1, unit: 'dBm' },
        { field: 'System Temperature', name: 'System Temperature', order: 2, min: -10, max: 40, unit: 'C' },
        { field: 'System Voltage', name: 'System Voltage', min: -1, max: 16, order: 3, unit: 'V' },
        { field: 'Cabin SensorHub Battery Voltage', name: 'Cabin SensorHub Battery Voltage', min: -1, max: 16, order: 4, unit: 'V' },
        { field: 'Cabin SensorHub Internal Temperature', name: 'Cabin SensorHub Internal Temperature', min: -10, max: 40, order: 5, unit: 'C' },
        { field: 'Cabin SensorHub Tx Power', name: 'Cabin SensorHub Tx Power', min: -1, max: 10, order: 6, unit: 'dbm' },
        { field: 'Outer SensorHub Battery Voltage', name: 'Outer SensorHub Battery Voltage', min: -1, max: 16, order: 7, unit: 'V' },
        { field: 'Outer SensorHub Internal Temperature', name: 'Outer SensorHub Internal Temperature', min: -10, max: 40, order: 8, unit: 'C' },
        { field: 'Outer SensorHub Tx Power', name: 'Outer SensorHub Tx Power', min: -1, max: 10, order: 9, unit: 'dbm' }
    ]
}
