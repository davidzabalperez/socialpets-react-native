/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props){
    super(props);
      /* generar unos atributos para saber cuando se estan consumiendo */
      this.state = {
        loading:false,
        dogs:[],
        url: 'http://socialpetssss.herokuapp.com/api/dogs'
      }
  }
  componentDidMount(){
    this.getDogs();
  };

  getDogs = ()=>{

    this.setState({ loading:true })
    /* realiza la peticion al servidor*/
    fetch(this.state.url)
    /* la respuesta la convertimos en json parseamos*/
    .then(response => response.json())
    /* vamos a obtener los atributos que necesitamos */
    .then( response => {
      /* modificamos nuestros atributos */
      this.setState({
        dogs :response,
        url:response,
        loading:false
      })
    });
  };

  render() {
    /* si estamos en el proceso de descarga  */
    if (this.state.loading) {
    return (
      <View style={styles.container}>
          <Text>Descargando Dogs!</Text>     
      </View>
      );
    }
    return (
      <View style={{flex:1, paddingTop:50, paddingLeft:5}}>
          <FlatList
            data={this.state.dogs}
            renderItem={
              ({item}) => <Text>{ item.name}</Text>
            }
            keyExtractor={(item, index) =>index.toString()}
          />      
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
