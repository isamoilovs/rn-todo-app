import react from "react";
import { StyleSheet, View, Pressable, ImageBackground, Text } from "react-native";

export default AddToDoBtn = ({onClick}) => {
    return(
        <Pressable 
            style={styles.addBtn}
            onPress={onClick}>
            <ImageBackground
                style={styles.imageAdd}
                source={require('../../assets/add.png')}
            />
        </Pressable>
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