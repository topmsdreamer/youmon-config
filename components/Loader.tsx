import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {

    return <View style={styles.loading}><ActivityIndicator size="small" color="#192a46"></ActivityIndicator></View>
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        backgroundColor: '#fff',
        opacity: .8,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    }
});

export default Loader;