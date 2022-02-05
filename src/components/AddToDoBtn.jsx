import react, { useEffect, useRef } from "react";
import { StyleSheet, Pressable, ImageBackground, Animated } from "react-native";

export default AddToDoBtn = ({isVisible, onClick}) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const startMoving = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const startFading = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if(!isVisible) {
            hideBtn();
            return;
        }
        setTimeout(() => showBtn(), 300)
    }, [isVisible])

    const hideBtn = () => {
        Animated.parallel([
            Animated.timing(startMoving,
                {
                    toValue: {
                        x: 0,
                        y: 10
                    },
                    useNativeDriver: true,
                    duration: 300
                }),
            Animated.timing(startFading,
                {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 300
                })
        ]).start();
    }

    const showBtn = () => {
        Animated.parallel([
            Animated.timing(startMoving,
                {
                    toValue: {
                        x: 0,
                        y: -10
                    },
                    useNativeDriver: true,
                    duration: 300
                }),
            Animated.timing(startFading,
                {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 300
                })
        ]).start();
    }



    return(
        <AnimatedPressable 
            style={[
                styles.addBtn,
                {
                    translateX: startMoving.x,
                    translateY: startMoving.y,
                    opacity: startFading
                }
            ]}
            onPress={onClick}
            disabled={!isVisible}
        >
            <ImageBackground
                style={styles.imageAdd}
                source={require('../../assets/add.png')}
            />
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    addBtn : {
        backgroundColor: '#ffcf00',
        width: 64,
        height: 64,
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 32,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        fontSize: 25,
        justifyContent: 'center'
    },
    imageAdd: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})