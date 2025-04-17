import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../themes/palette';

interface ICustomAlert {
    isAlert: boolean;
    setIsAlert: any;
    onPress?: () => void;
    message: string;
    error: boolean;
}

const CustomAlert = ({ isAlert, setIsAlert, message, error, onPress }: ICustomAlert) => {

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isAlert}
                onRequestClose={() => {
                    setIsAlert(!isAlert);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>2nd SIM</Text>
                        <Text style={styles.modalText}>{message || 'Alert Message can be seen here.'}</Text>
                        {!error ?
                            <View style={styles.block}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={onPress}>
                                    <Text style={styles.textStyle}>YES</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setIsAlert(!isAlert)}>
                                    <Text style={styles.textStyle}>NO</Text>
                                </TouchableOpacity>
                            </View> : <TouchableOpacity
                                style={styles.button}
                                onPress={() => setIsAlert(!isAlert)}>
                                <Text style={styles.textStyle}>OKAY</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000a0',
    },
    modalView: {
        width: '80%',
        backgroundColor: COLORS.WHITE,
        borderRadius: moderateVerticalScale(8),
        paddingVertical: verticalScale(20),
        paddingHorizontal: scale(12),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        paddingVertical: verticalScale(12),
        marginHorizontal: scale(8),
        alignSelf: 'flex-end',
    },
    textStyle: {
        color: COLORS.BLACK,
        fontSize: moderateVerticalScale(20, 1.5),
        fontFamily: 'BlinkerSemiBold',
    },
    modalTitle: {
        marginBottom: verticalScale(16),
        fontSize: moderateVerticalScale(22, 1.5),
        fontFamily: 'BlinkerBold',
        color: COLORS.BLACK,
    },
    modalText: {
        marginBottom: verticalScale(16),
        fontSize: moderateVerticalScale(18, 1.5),
        fontFamily: 'BlinkerRegular',
        color: COLORS.BLACK,
    },
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

export default CustomAlert;
