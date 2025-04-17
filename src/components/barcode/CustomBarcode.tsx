//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

// create a component
const CustomBarcode = () => {

    const onBarcodeRead = (e: any) => {
        console.log('Barcode scanned: ', e.data);
    };


    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.subContainer}
                onBarCodeRead={onBarcodeRead}
                captureAudio={false} // To disable audio recording
            >
                <BarcodeMask width={300} height={300} />
            </RNCamera>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainer: {
        flex: 1,
    },
});

//make this component available to the app
export default CustomBarcode;
