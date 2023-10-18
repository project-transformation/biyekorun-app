import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const DateFiled = ({ onChangeDate, errorText }) => {
    const refs = Array.from({ length: 8 }).map(() => useRef(null));
    const placeholders = ['M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y'];

    const [values, setValues] = useState(Array(8).fill(''));
    const [activeField, setActiveField] = useState(-1);

    useEffect(() => {
        // Focus the first field on component mount
        refs[0].current.focus();
    }, []);

    const handleChange = (text, index) => {
        const updatedValues = [...values];
        updatedValues[index] = text;

        setValues(updatedValues);

        if (text && refs[index + 1]) {
            refs[index + 1].current.focus();
        }

        if (onChangeDate) {
            const date = `${updatedValues.slice(0, 2).join('')}/${updatedValues.slice(2, 4).join('')}/${updatedValues.slice(4).join('')}`;
            onChangeDate(date);
        }
    };

    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === 'Backspace') {
            const updatedValues = [...values];
            updatedValues[index] = '';
            setValues(updatedValues);

            if (index > 0) {
                refs[index - 1].current.focus();
            }
        }
    };

    return (
        <>
            <View style={styles.container}>
                {values.map((value, index) => (
                    <React.Fragment key={index}>
                        <TextInput
                            ref={refs[index]}
                            style={[
                                styles.input,
                                { borderBottomColor: activeField === index ? 'black' : '#e4e4e4' }
                            ]}
                            maxLength={1}
                            keyboardType="number-pad"
                            value={value}
                            placeholder={placeholders[index]}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(event) => handleKeyPress(event, index)}
                            onFocus={() => setActiveField(index)}
                            onBlur={() => setActiveField(-1)}
                            caretHidden={true}
                            returnKeyType="next"
                            placeholderTextColor="#e4e4e4"
                        />
                        {(index === 1 || index === 3) && <Text>/</Text>}
                    </React.Fragment>
                ))}


            </View>
            {
                errorText && <Text style={{ color: "red" }}>{errorText}</Text>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderBottomWidth: 1,
        width: 25,
        marginRight: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold"
    },
});

export default DateFiled;
