import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface TypographyProps {
    style?: TextStyle; // Allow passing custom styles like color, textAlign, etc.
    children: React.ReactNode; // Content inside the Text component
    onPress?: () => void;
}

const H1: React.FC<TypographyProps> = ({ style, children }) => {
    return <Text style={[styles.h1, style]}>{children}</Text>;
};

const HeaderLable: React.FC<TypographyProps> = ({ style, children }) => {
    return <Text style={[styles.headerLable, style]}>{children}</Text>;
};

const Span: React.FC<TypographyProps> = ({ style, children, onPress }) => {
    return <Text onPress={onPress} style={[styles.span, style]}>{children}</Text>;
};

const H2: React.FC<TypographyProps> = ({ style, children }) => {
    return <Text style={[styles.h2, style]}>{children}</Text>;
};

const P: React.FC<TypographyProps> = ({ style, children }) => {
    return <Text style={[styles.p, style]}>{children}</Text>;
};

const Label: React.FC<TypographyProps> = ({ style, children }) => {
    return <Text style={[styles.label, style]}>{children}</Text>;
};

// Define your base styles for each component
const styles = StyleSheet.create({
    h1: {
        fontSize: moderateScale(30, 1.5),
        fontFamily: 'LatoBlack', // 900
    },
    headerLable: {
        fontSize: moderateScale(32, 1.5),
        fontFamily: 'LatoBold', // 700
    },
    span: {
        fontSize: moderateScale(14, 1.5),
        fontFamily: 'LatoRegular', // 400
    },
    h2: {
        fontSize: moderateScale(24, 1.5),
        fontFamily: 'LatoRegular', // 400
    },
    p: {
        fontSize: 14,
        fontFamily: 'Arial',
    },
    label: {
        fontSize: moderateScale(20, 1.5),
        fontFamily: 'LatoRegular', // 400
    },
});

// Exporting components individually
export { H1, HeaderLable, Span, H2, P, Label };
