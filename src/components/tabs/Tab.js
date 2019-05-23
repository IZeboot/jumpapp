//  Created by Artem Bogoslavskiy on 7/5/18.

import React from 'react';
import { View } from 'react-native'; 
import { FlatList } from '../SearchBar/SearchBarAnimation';
import styles from './styles';

export default class Tab extends React.PureComponent {
   constructor(props) {
    super(props);

    this.state = {
      dataSource: Array(20).fill().map((_, index) => ({id: index}))
    };
  }

  render() {
    return (
      <FlatList
        style={styles.wrapper}
        data={this.state.dataSource}
        renderItem={this._renderRow}
        keyExtractor={(item) => item.id.toString()}
        tabRoute={this.props.route.key}
        renderItem={({item}) => (
          <View style={styles.item} />
        )}
      />
    );
  }
}