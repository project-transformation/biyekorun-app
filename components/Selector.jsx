import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar, Text, TouchableRipple } from 'react-native-paper';
import Colors from '../constants/Colors';

const Selector = ({ options, multiple, onSelect, value, search, max }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(options);
  }, [options]);

  const isSelected = (optionValue) => {
    if (multiple) {
      return value.includes(optionValue);
    } else {
      return value === optionValue;
    }
  };

  const toggleSelection = (optionValue) => {
    if (multiple) {
      const selectedCount = value.length;

      // Check if the maximum limit (max) has been reached.
      if (selectedCount < max || value.includes(optionValue)) {
        // Toggle the selection of the option.
        const updatedValues = value.includes(optionValue)
          ? value.filter((val) => val !== optionValue)
          : [...value, optionValue];
        onSelect(updatedValues);
      }
    } else {
      onSelect(optionValue);
    }
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      let filtered = options?.filter((x) =>
        x.label?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setRecords(filtered);
    } else {
      setRecords(options);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      {search && (
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ marginVertical: 10, width: '100%' }}
          inputStyle={{ paddingVertical: 2 }}
        />
      )}

      <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>
        {records?.map((option, i) => (
          <TouchableRipple
            onPress={() => toggleSelection(option?.value)}
            key={i}
          >
            <View
              style={{
                borderColor: isSelected(option?.value)
                  ? Colors.secondary
                  : '#ddd',
                borderWidth: 2,
                paddingHorizontal: 7,
                paddingVertical: 5,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  color: isSelected(option?.value)
                    ? Colors.secondary
                    : Colors.textMedium,
                }}
                variant="labelLarge"
              >
                {option?.label}
              </Text>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({});
