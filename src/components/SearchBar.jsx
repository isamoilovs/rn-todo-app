import react, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, Animated } from "react-native";

export default SearchBar = ({onFocus, onBlur}) => {
    const inputRef = useRef(null)
    const [isInputFocused, setInputFocused] = useState(false);
    // const [isKbdAutoShown, setKbdAutoShown] = useState(false);

    useEffect(() => {
        isInputFocused ? inputRef.current.focus() : inputRef.current.blur();
    }, [isInputFocused])

    const handleInputFocus = () => {
        setTimeout(() => {
            setInputFocused(true);
        }, 500);
        onFocus();
    }

    const handleInputBlur = () => {
        setInputFocused(false);
        onBlur();
    }

    return(
        <Animated.View style={styles.container}>
            <TextInput
                ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Search tasks..."
                style={styles.input}
            />
        </Animated.View>
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
        fontSize: 17,
        width: '100%'
    }
})