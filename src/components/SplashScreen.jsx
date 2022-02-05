import react, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Animated } from "react-native";
import ToDoApp from "../screens/ToDoApp";

export default SplashScreen = ({component}) => {

    const edges = useSafeAreaInsets();
    const startAnimation = useRef(new Animated.Value(0)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;
    const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

    useEffect(() => {
        setTimeout(()=> {
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        toValue: 0.5,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        toValue: {
                            x: Dimensions.get('window').width / 2 - 200,
                            y: Dimensions.get('window').height / 2 - 40
                        },
                        useNativeDriver: true
                    }
                )
            ])
            .start();

        }, 500)
    }, [])

    return(
       <View style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0}}
        >
           <Animated.View style={{
               flex: 1,
                backgroundColor: '#ffcf00',
                zIndex: 1,
                transform: [
                    {translateY: startAnimation}
                ],
       }}>
           <Animated.View 
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
               <Animated.Text style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    transform: [
                       {translateX: moveTitle.x},
                       {translateY: moveTitle.y},
                       {scale: scaleTitle}
                    ]
                }}>
                    ToDoAPP
                </Animated.Text>
           </Animated.View>
       </Animated.View>
       <Animated.View style={{
               position: "absolute",
               top: 0,
               bottom: 0,
               left: 0,
               right: 0,
               zIndex: 0
           }}>
               {component}
           </Animated.View>
       </View>
    );
};
