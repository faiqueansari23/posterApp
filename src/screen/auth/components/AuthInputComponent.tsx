/* eslint-disable react-native/no-inline-styles */
import React, { useState, ReactNode } from 'react';
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, ViewStyle } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../themes/palette';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AuthInputComponentProps extends TextInputProps {
    icon?: ReactNode;    // Accept a full icon component as a prop
    style?: ViewStyle;   // Custom style for the container
    secureEntry?: boolean;   // Boolean to toggle password visibility
    value: string;       // Value for the TextInput
    placeholder: string; // Placeholder text
    onChangeText: (text: string) => void; // Callback for text change
}

const AuthInputComponent: React.FC<AuthInputComponentProps> = ({
    icon,
    style,
    secureEntry = false,
    value,
    placeholder,
    onChangeText,
    ...props
}) => {
    const [isSecure, setIsSecure] = useState(secureEntry);

    return (
        <View style={[styles.container, style]}>
            <TextInput
                style={[styles.input, style, { borderRightWidth: icon ? 1 : 0 }]}
                secureTextEntry={isSecure}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                placeholderTextColor={COLORS.DARK}
                {...props}
            />
            {secureEntry ? (
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                    <MaterialCommunityIcons
                        name={isSecure ? 'eye-off' : 'eye'}
                        size={25}
                        color={COLORS.DARK}
                    />
                </TouchableOpacity>
            ) : (
                icon
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(50),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(30),
        borderColor: '#D4D4D4',
        backgroundColor: '#F2F2F2',
        marginBottom: verticalScale(20),
    },
    input: {
        flex: 1,
        height: '75%',
        fontSize: moderateScale(14),
        marginVertical: verticalScale(10),
        color: COLORS.DARK,
        verticalAlign: 'middle',
        padding: 0,
        marginRight: scale(12),
        borderRightWidth: moderateScale(1),
        borderRightColor: '#D4D4D4',
    },
});

export default AuthInputComponent;
