//  Created by Artem Bogoslavskiy on 7/5/18.

import React from 'react';
import { StyleSheet, Dimensions, Animated, View, Platform, StatusBar, Keyboard } from 'react-native'; 
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SearchBarProvider } from '../SearchBar/SearchBarAnimation';

import SearchBar from '../SearchBar';
import Tab from '../tabs/Tab';

import SearchBarSuggestion from '../SearchBar/SearchBarSuggestion';
import SearchBarLocationSuggestion from '../SearchBar/SearchBarLocationSuggestion';
import {StackActions, NavigationActions} from 'react-navigation';

const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class SeachScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      currentTab: 'tab1',
      routes: [
        { key: 'tab1', title: 'Tab 1' },
        { key: 'tab2', title: 'Tab 2' }
      ],
    }; 
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    // alert('Keyboard Shown');
  }

  _keyboardDidHide = () =>{
      this.setState({suggestionFocus:false})
  }


  _handleIndexChange = index => {
    this.setState({
      currentTab: this.state.routes[index].key,
      index
    });
  }
  _getLabelText = ({ route }) => route.title;
  _renderHeader = (animation, canJumpToTab) => props => {
    return(
      <SearchBar 
        animation={animation}
        changeInputFocus={suggestionFocus => 
          this.setState({suggestionFocus})
        }
        scannerCodeBar = {this._scannerCodeBar}
        renderTabBar={() => (
          <TabBar
            onTabPress={({route}) => {
              if(route.key != this.state.currentTab && canJumpToTab) {
                animation.onTabPress(route);
              }
            }}
            getLabelText={this._getLabelText}
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
            {...props}
          />
        )}
      />
    );
  };

  _renderScene = SceneMap({
    tab1: Tab,
    tab2: Tab
  });

  _renderSuggestion(animation) {
    let focus = this.state.suggestionFocus;
    if(focus) {
      let styleAnimation = animation.getStyleSuggestion();
      let Suggestion = (focus == 'location') ? 
                        SearchBarLocationSuggestion :
                        SearchBarSuggestion;

      return (
        <Animated.View style={[{width:'100%'}, styles.suggestionWrap, styleAnimation]}>
          <Suggestion />
        </Animated.View>
      );
    }
  }

  _scannerCodeBar = () =>{
    const push = StackActions.push({
      routeName:"CameraScreen",
    });
    this.props.navigation.dispatch(push);
  }
  render() {
    return (
      <SearchBarProvider currentTab={this.state.currentTab}>
        {(animation, { canJumpToTab }) => 
          <View style={{flex:1}}>
            {Platform.OS === 'android' && 
               <StatusBar
                translucent={true}
                backgroundColor="transparent"
              />
            }
            <TabView
              style={styles.container}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderTabBar={this._renderHeader(animation, canJumpToTab)}
              onIndexChange={this._handleIndexChange}
              // initialLayout={initialLayout}
              swipeEnabled={false} // TODO ...
              canJumpToTab={() => canJumpToTab}
              useNativeDriver
            />

            {this._renderSuggestion(animation)}
          </View>
        }
      </SearchBarProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edeef0',
  },
  tabbar: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  indicator: {
    backgroundColor: '#45688e'
  },
  label: {
    color: '#45688e',
    margin: 0,
    marginTop: 6,
    marginBottom: 6,
    fontWeight: '400'
  },
  suggestionWrap: {
    position: 'absolute',
    backgroundColor: '#fff',  
    zIndex: 3
  }
});