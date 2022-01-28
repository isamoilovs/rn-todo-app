import react from "react";
import { View, StyleSheet, TextInput, ImageBackground } from "react-native";

export default SearchBar = ({onPressIn, onEndEditing}) => {
    return(
        <View style={styles.container}>
            <TextInput
                onPressIn={onPressIn}
                onEndEditing={onEndEditing}
                placeholder="Search tasks..."
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#d0d0d0',
        borderRadius: 20,
        margin: 20,
        width: '80%'
    },
    
    input: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        fontSize: 17
    }
})