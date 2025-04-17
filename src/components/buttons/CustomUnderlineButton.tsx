import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ViewStyle,
    GestureResponderEvent,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../themes/palette';

interface CustomUnderlineButtonProps {
    label: string; // The text to display on the button
    textColor?: string; // Optional text color
    fontSize?: number; // Optional font size
    onPress?: (event: GestureResponderEvent) => void; // Optional press handler
    style?: ViewStyle; // Optional additional styles for the button container
}

const CustomUnderlineButton: React.FC<CustomUnderlineButtonProps> = ({
    label,
    textColor = COLORS.DARK,
    fontSize = moderateScale(15, 0.5),
    onPress,
    style,
}) => {
    const [textWidth, setTextWidth] = useState<number>(0);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.buttonContainer, style]}
        >
            <Text
                style={[styles.buttonText, { color: textColor, fontSize }]}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setTextWidth(width);
                }}
            >
                {label}
            </Text>
            <View style={[styles.underline, { width: textWidth, borderBottomColor: textColor }]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'BlinkerRegular',
    },
    underline: {
        borderBottomWidth: 1,
    },
});

export default CustomUnderlineButton;
