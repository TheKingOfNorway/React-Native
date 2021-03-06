/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { PeripheralListView } from  './BluetoothView/PeripheralListView';
// import { ServiceListView } from './BluetoothView/ServiceListView';
// import { CharacteristicListView } from './BluetoothView/CharacteristicListView';
// import { CommunicationWithPeripheral } from '/BluetoothView/CommunicationWithPeripheral';

var buletooth = require('react-native').NativeModules.ConnetionWithBlueTooth;
var { NativeAppEventEmitter } = require('react-native');


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Navigator,
  TouchableOpacity,
} from 'react-native';

class customView extends Component {

  constructor(props) {
    super(props);

    this.didDiscoverPeripheralNotification;



    this.centralManagerStateChangeNotification;

    this.state = {
      bluetoothPowerState: false,
      bluetoothPeripheral: {},
    };

    buletooth.creatCenteralManager();
  }

  componentDidMount() {
    this.centralManagerStateChangeNotification = NativeAppEventEmitter.addListener(
      'centralManagerStateChange', (bluetooth) => {
          this.state.bluetoothPowerState = bluetooth.powerState;
          this._startSearchPeripheral();
       }
    );

    this.didDiscoverPeripheralNotification = NativeAppEventEmitter.addListener(
        'didDiscoverPeripheral', () => {}
    );

    this.didConnectPeripheralNotification = NativeAppEventEmitter.addListener(
        'didConnectPeripheral', () => {}
    );

    this.didDiscoverServicesNotifiction = NativeAppEventEmitter.addListener(
        'didDiscoverServices', () => {}
    );

    this.didDiscoverCharacteristicNotification = NativeAppEventEmitter.addListener(
        'didDiscoverCharacteristics', (peripheral) => {

        }
    );
  }

  componentWillUnmount() {
    this.centralManagerStateChangeNotification.remove();
    this.didDiscoverPeripheralNotification.remove();
    this.didConnectPeripheralNotification.remove();
    this.didDiscoverServicesNotifiction.remove();
    this.didDiscoverCharacteristicNotification.remove();
  }

  _startSearchPeripheral() {
      if (this.state.bluetoothPowerState) {
        console.log('\npowerState: ' + this.state.bluetoothPowerState + '\n');
        buletooth.searchlinkDevice();
        console.log('开始搜索周边设备');
      }
  }

  render() {
    return (
        <Navigator
            initialRoute={{name: PeripheralListView, index: 0}}
            renderScene={this._renderScene.bind(this)}
            navigationBar={ <Navigator.NavigationBar routeMapper={NavigationBarRouteMapper} style={ styles.navBar }/>}
        >
        </Navigator>
    );
  }

  _renderScene(route, navigator) {
      let Component = route.name;
      return (
          <Component navigator={navigator} route={route} UUID ={route.index}/>
      );
  }

}

const route = {
    component: null,
    navigationBarTitle: null,
    navigationBarHidden: null,
    navigationBarPreViousTitle: null,
    parameters: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75FCFF',
  },
  navBar: {
    backgroundColor: '#AEAEAE',
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

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
            >
                <Text>
                    Back
                </Text>
            </TouchableOpacity>
        );
    },

    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                onPress={() => {console.log('啊！我被点击了')} }
            >
                <Text>
                    { 'Don' + '\'' + 't' }
                </Text>
            </TouchableOpacity>
        )
    },

    Title(route, navigator, index, navState) {
        return (
            <Text>
                { '\<' + 'Title' + '\>' }
            </Text>
        )
    }
};

AppRegistry.registerComponent('customView', () => customView);
