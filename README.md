# react-native-select-list-easy

A customizeable search list.

## Example

```js
import React, {Component} from 'react';
import Search from 'search-all-list-comp'

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Search 
        /* Add your own JSON file */
        jsonList={ require('./list.json') } 

         /* 
           Name is the name of the key in the JSON file
           if you want to use custom styling (change the textStyle to however you want)

           defaultkey={{ name: 'key', textStyle: { color: '#000', fontSize: 19, fontWeight:'bold' }}}
           subkey={{ name: 'subkey', textStyle: { color: '#000', fontSize: 15, fontWeight:'bold' }}}
        */
        defaultkey={{ name: 'name', textStyle: { color: '#000', fontSize: 15, fontWeight:'bold' }}}
        subkey="subtitle"

        /* Extra data & custom color of the text in app*/
        data="data" 

        /* Make sure the icon is a image */
        icon="avatar_url" 

        /* Costumize the box style of the list */
        boxStyle={{ backgroundColor: '#fff' }}

        /* Get selected data back from list*/
        selectedItems={ (selected) => { /*console.log(selected)*/ }} 

        /* option button includes alphabet list */
        optionbutton="false"
        
      />
      );
    }
  }
```


## Properties

| Prop  | Type | Description |
| :------------ | :---------------:| :-----|
| jsonList | `json` | JSON file with all your data key can be changed in component  [{key: "key", subkey: "subkey", data: "extra data", icon: "icon.jpg"}]  |
| defaultkey | `object` | First key in JSON data (from jsonList) and style of how it looks in list. |
| subkey | `func` | Subkey in JSON data(from jsonList) and style of how it looks in list. |
| data  | `object` | Data in JSON data (from jsonList). |
| icon | `object` | Icon in JSON data (from jsonList). |
| boxStyle | `object` | Style boxes of list |
| selectedItems | `object` | All selected items (do what you want with it) |
| optionbutton | `object` | Option button there's an alphabet list in it. Put on true to turn on |

----

![list](https://im4.ezgif.com/tmp/ezgif-4-181664465efe.gif)


Ilias Harvey
