//  Created by Artem Bogoslavskiy on 7/5/18.

import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';

export default class SearchBar extends Component {
  blurInputs() {
    this.inputSearch.blur();
    this.inputLocation.blur();
    this.props.changeInputFocus(false);
  }

  render() {
    const { animation, changeInputFocus, renderTabBar } = this.props;

    const transformWrapper = animation.getTransformWrapper();
    const transformSearchBar = animation.getTransformSearchBar();
    const opacitySearchBar = animation.getOpacitySearchBar();
    const opacityLocationInput = animation.getOpacityLocationInput();
    const arrowMinimizeStyle = animation.getArrowMinimizeStyle();
   
    return (
      <Animated.View style={[styles.wrapper, transformWrapper]}>
        <Animated.View style={opacitySearchBar}>
          <View style={styles.searchContainer}>
            <Animated.View style={[transformSearchBar, styles.searchBar]}>
              <View style={styles.searchInput}>
                <MaterialIcons
                  name='search' 
                  size={22} 
                  style={styles.searchIcon} 
                  color='#bbb'
                />
                <TextInput 
                  style={styles.inputText}
                  placeholder={'I\'m looking for...'}
                  placeholderTextColor={'#999'}
                  underlineColorAndroid={'#fff'}
                  autoCorrect={false}
                  onFocus={() => {
                    animation.expandBar();
                    this.props.changeInputFocus('search');
                  }}
                  ref={(inputSearch) => {
                    this.inputSearch = inputSearch;
                  }}
                />
               
              </View>
            </Animated.View>
            <Animated.View style={styles.buttonCamera}>
              <TouchableOpacity onPress={() => {
                animation.minimizeBar();
                // this.blurInputs();
                this.props.scannerCodeBar();
              }}>
                <MaterialIcons
                  name='barcode' 
                  size={36} 
                  style={styles.arrowMinimizeIcon} 
                  color='black'
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
        {renderTabBar()}
      </Animated.View>
    );
  }
}