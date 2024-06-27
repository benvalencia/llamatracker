import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from "@expo/vector-icons/Ionicons";
import {Fonts} from "@/constants/Colors";

const emojisWithIcons = [
  {title: 'Epic Games', icon: 'desktop-outline', value: ''},
  {title: 'Playstation', icon: 'logo-playstation', value: 'psn'},
  {title: 'Xbox', icon: 'logo-xbox', value: 'xbl'},
];

const Selector = ({onSelect}: any) => {
  return (
    <SelectDropdown
      data={emojisWithIcons}
      defaultValueByIndex={0}
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <View style={styles.dropdownButtonContentStyle}>
              {selectedItem && (
                <Ionicons name={selectedItem.icon} style={styles.dropdownButtonIconStyle}/>
              )}

              {/*<Text style={styles.dropdownButtonTxtStyle}>*/}
              {/*  { selectedItem ? '' : 'Select your mood' } */}
              {/*</Text>*/}

              <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle}/>
            </View>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
            <Ionicons name={item.icon} style={styles.dropdownItemIconStyle}/>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default Selector;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 130,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  dropdownButtonContentStyle: {
    width: 75,
    height: 50,
    backgroundColor: '#fbefff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: Fonts.size.m,
    fontWeight: Fonts.weight.bold,
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: Fonts.size.l,
  },
  dropdownButtonIconStyle: {
    fontSize: Fonts.size.l,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#fbefff',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: 130,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: Fonts.size.s,
    fontWeight: Fonts.weight.normal,
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: Fonts.size.l,
    marginRight: 8,
  },
})
