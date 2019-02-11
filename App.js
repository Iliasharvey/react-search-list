import React, {Component} from 'react';
import Search from './components/Search';

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Search 
        jsonList={ require('./components/list.json') } /* Link to JSON file */
        defaultkey="name" /* First key in json data */
        subkey="subtitle" /* Second key in json data */
        data="data" /* Extra data */
        icon="avatar_url" /* Make sure the icon is a image */
        selectedItems={ (selected) => { /*console.log(selected)*/ }} /* Get selected data back from child */
      />
      );
    }
  }


