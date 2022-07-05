import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../res/colors';
import {ms} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavbarSearch = ({
  title,
  type,
  onBack,
  onChage,
  onSearch,
  search = true,
}) => {
  const [typeContent, setTypeContent] = useState(type);
  let content;
  switch (typeContent) {
    case 'search':
      content = (
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Buku"
          autoFocus={true}
          onChangeText={text => onChage(text)}
        />
      );
      break;

    default:
      content = <Text style={styles.title}>{title}</Text>;
      break;
  }

  return (
    <View style={styles.navbarSearch}>
      <TouchableOpacity onPress={onBack}>
        <AntDesign name="arrowleft" color={colors.textDark} size={ms(20)} />
      </TouchableOpacity>
      {content}
      <TouchableOpacity
        onPress={() => {
          if (typeContent === 'search') {
          } else {
            setTypeContent('search');
          }
        }}>
        {search ? (
          <Ionicons name="search" color={colors.textDark} size={ms(20)} />
        ) : (
          <View style={{width: ms(20)}}></View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NavbarSearch;

const styles = StyleSheet.create({
  navbarSearch: {
    flexDirection: 'row',
    borderBottomColor: colors.textLight,
    borderBottomWidth: 1,
    padding: ms(12),
    alignItems: 'center',
    margin: 0,
    backgroundColor: colors.primaryWhite,
  },
  searchInput: {
    paddingHorizontal: ms(18),
    flex: 1,
    padding: 0,
    color: colors.textDark,
    fontFamily: 'Poppins-Regular',
    fontSize: ms(12),
  },
  title: {
    flex: 1,
    color: colors.textDark,
    fontFamily: 'Poppins-Regular',
    fontSize: ms(13),
    paddingHorizontal: ms(18),
  },
});
