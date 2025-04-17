import React, { useEffect, useState } from 'react';
import { Image, ImageProps, StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../themes/palette';
import { moderateScale } from 'react-native-size-matters';

interface AvatarProps extends ImageProps {
    onChange?: (image: ImageOrVideo) => void;
}

export const Avatar2 = (props: AvatarProps) => {
    // const{source}=props;
    const [uri, setUri] = React.useState<string | undefined>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function onOpen() {
        setIsOpen(true);
    }

    function onClose() {
        setIsOpen(false);
    }

    const chooseImage = () => {
        ImagePicker.openPicker({
            compressImageQuality: 0.4,
            height: 400,
            width: 400,
            cropping: true,
        })
            .then(image => {
                setUri(image.path);
                props.onChange?.(image);
            })
            .finally(onClose);

    };


    const openCamera = () => {
        ImagePicker.openCamera({
            compressImageQuality: 0.5,
            height: 300,
            width: 300,
            cropping: true,
        })
            .then(image => {
                setUri(image.path);
                props.onChange?.(image);

            })
            .finally(onClose);

    };

    useEffect(() => {
        if (typeof props.source === 'object' && 'uri' in props.source) {
            setUri(props.source.uri); // For remote image
        } else {
            setUri(''); // Reset if it's a local image or undefined
        }
    }, [props.source]);

    // useEffect(() => {
    //     setUri(props?.source?.uri);
    // }, [props?.source]);

    return (
        <View>
            <TouchableOpacity onPress={onOpen}>
                {/* <Image
                    style={styles.avatar}
                    {...props}
                    source={uri ? { uri } : props.source}
                /> */}
                <View style={styles.imgView}>
                    {props.source ? <Image source={uri ? { uri } : props.source} style={styles.img} /> :
                        <Image source={uri ? { uri } : require('../../assets/images/pic.png')} style={styles.img} />}
                </View>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isOpen}
                onRequestClose={onClose}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.bottomSheet}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity
                                style={styles.dashedLine}
                                onPress={onClose}
                            />
                        </View>
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.button} onPress={chooseImage}>
                                <FontAwesome name="picture-o" size={40} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={openCamera}>
                                <FontAwesome name="camera" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );


};

const styles = StyleSheet.create({
    avatar: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(60),
        resizeMode: 'contain',
    },
    imgView: { width: moderateScale(45), height: moderateScale(45), borderRadius: moderateScale(45), overflow: 'hidden' },
    img: { width: '100%', height: '100%', resizeMode: 'contain' },
    block: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: 5,
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.DARK,
    },
    dashedLine: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 10,
    },
});
