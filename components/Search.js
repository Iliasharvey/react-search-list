/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, RefreshControl, Text, View, TextInput,ScrollView, TouchableHighlight, TouchableOpacity, Button, Image } from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements'
import SelectMultiple from './select-multiple'
import SlidingUpPanel from 'rn-sliding-up-panel';
import AlphabetListView from 'react-native-alphabetlistview'
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';


class SectionItem extends Component {
  render() {
    return (
      <Text style={{color:'#007aff'}}>{this.props.title}</Text>
    );
  }
}


class SectionHeader extends Component {
  render() {
    // inline styles used for brevity, use a stylesheet when possible
    var textStyle = {
      padding: 5,
      color:'#000',
      fontWeight:'500',
      fontSize:13,
    };

    var viewStyle = {
      backgroundColor: '#f1f1f1'
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <View style={{height:30, backgroundColor: '#fff'}}>
        <Text>{this.props.item}</Text>
      </View>
    );
  }
}
type Props = {};

export default class Search extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { 
      data: this.props.jsonList,
      newArr: [],
      text: 'Search',
      key: this.props.defaultkey,
      subkey: this.props.subkey,
      image: this.props.icon,
      extraData: this.props.data,
      visible: false,
      multiSelectShow: false,
      selectedItems: [],
      page:[],
      refreshing: false,
      alphabet: false
   };
  }
  

  onSelectionsChange = (selectedItems) => {
    // selectedItems is array of { label, value, subkey, image }
    this.setState({ selectedItems})
    this.props.selectedItems(selectedItems)
  }

  pressedRow = (e) => {
    alert('You pressed on ' + e)
  }

  clearText = () => {
    // Change data back to normal list without filter
  if(this.state.newArr.length > 0 )
  {
    this.setState({
      data: this.state.newArr
    })
  } else {
    this.setState({
      data: this.props.jsonList
    })
  }
  }

  searchText = (e) => {
    let text = e.toLowerCase()
    let filteredlist;
    if(this.state.newArr.length > 0 )
    {
      filteredList = this.state.newArr.filter(x => { return x[this.state.key].toLowerCase().match(text) || x[this.state.subkey].toLowerCase().match(text) });
    } else {
      filteredList = this.props.jsonList.filter(x => { return x[this.state.key].toLowerCase().match(text) || x[this.state.subkey].toLowerCase().match(text) });
    }

    if (!text || text === '') {
      this.clearText()
    } else if (Array.isArray(filteredList)) {
      this.setState({
        data: filteredList
      })
    }
  }

  multiSelect = () => {
    this.setState({
      multiSelectShow: true
    })
  }


  deleteRow = () => {
    let listcomp = this.CompatibleList()
    let selo = this.state.selectedItems

    listcomp = listcomp.filter(sel => {
      for (i = 0; i < selo.length; i++) { 
          return !selo.map(a => a.value).includes(sel.value)
      }
    } )

    let newArr = []

    for (i = 0; i < listcomp.length; ++i) {
      newArr.push({ [this.state.key]: listcomp[i].label, [this.state.subkey]: listcomp[i].subkey, [this.state.image]:listcomp[i].image });
    }

    this.setState({
      data: newArr,
      newArr: newArr,
      multiSelectShow: false,
      selectedItems: []
    })
  }

  CompatibleList = () => {
    var arr = this.state.data,
    i;
    let newArr = [];
    for (i = 0; i < arr.length; ++i) {
      newArr.push({ label: arr[i][this.state.key], value: i, subkey: arr[i][this.state.subkey], image: arr[i][this.state.image] });
    }
   return newArr
  }

  renderLabel = (label, subkey, image, style) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image style={{width: 40, height: 40, borderRadius: 20}} source={{uri: image}} />
        <View style={{marginLeft: 10}}>
          <Text style={style}>{label}</Text>
          <Text style={style}>{subkey}</Text>
        </View>
      </View>
    )
  }
  newNames = () => {
    this.state.data.reduce(function (list, name, index) {
        let listItem = list.find((item) => item.letter && item.letter === name.slice(0, 1).toUpperCase(name));
        if (!listItem) {
          list.push({"letter": name.slice(0, 1).toUpperCase(), "names": [name]})
        } else {
          listItem.this.state.data.push(name)
        }
        return list;
    }, []);
  }

  // Refresh all DATA from JSON file
  _onRefresh = () => {
    this.setState({ data: this.props.jsonList});
  }

  convert = () => {
    var temp = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],
    }

    var arr = this.state.data,
    i;

    for (i = 0; i < arr.length; ++i) {
            // temp.index(letter).push(name)
            temp[arr[i]['name'].charAt(0).toUpperCase()].push(arr[i]['name'])
    }
   return temp
}

  render() {

    if(this.state.alphabet == true) {
      RenderList = (
        <AlphabetListView
          data={this.convert()}
          cell={Cell}
          cellHeight={30}
          sectionListItem={SectionItem}
          sectionHeader={SectionHeader}
          sectionHeaderHeight={22.5}
        />
      )
    } else {

    if(this.state.multiSelectShow == false) {
      RenderList = (
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        >
          
        {
          this.state.data.map((l, i) => (
            <TouchableHighlight onPress={() => this.setState({visible: true, page: { key: l[this.state.key], subkey: l[this.state.subkey], image: l[this.state.image], data: l[this.state.extraData]}})} onLongPress={ this.multiSelect}>
              <ListItem
                key={i}
                leftAvatar= {{ source: { uri: l[this.state.image] } }}
                title={l[this.state.key]}
                subtitle={l[this.state.subkey]}
              />
            </TouchableHighlight>
          ))
        }
      </ScrollView>
      )
    } else {
      RenderList = (
        <SelectMultiple
        items={this.CompatibleList()}
        renderLabel={this.renderLabel}
        selectedItems={this.state.selectedItems}
        onSelectionsChange={this.onSelectionsChange} />
      )
    }
  }

    if(this.state.selectedItems.length > 0) {
      DeleteButton = (
        <Button
        onPress={this.deleteRow}
        title={ "Delete " +  this.state.selectedItems.length + " items" } 
        color="#e74c3c"
        />
      )
    } else {
      DeleteButton = (
        <View>

        </View>
      )
    }
    return (
      <View style={styles.container}>
        <SearchBar
        lightTheme
        round
        onChangeText={this.searchText}
        onClear={this.clearText}
        placeholder='Search' />

        { 
          RenderList
        }
          <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => this.setState({ alphabet: false})}>
                <Icon name="ios-person" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => this.setState({alphabet: true})} >
                <Icon name="ios-bookmarks" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>

        <SlidingUpPanel
          visible={this.state.visible}
          onRequestClose={() => this.setState({visible: false})}>
          <View style={styles.slidepanel}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.state.page.image }}
              />
            <Text>{ this.state.page.key }</Text>
            <Text>{ this.state.page.data }</Text>
            <Button title='Hide' onPress={() => this.setState({visible: false})} />
          </View>
        </SlidingUpPanel>
        
        {
          DeleteButton
        }
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#ccc',
    marginTop:45
  },
  slidepanel: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10
  }
});