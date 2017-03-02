/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { startCheckout } from 'react-native-checkout-mercadopago';

const MERCADOPAGO_TEST_PUBLICKEY = 'TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a';
const MERCADOPAGO_TEST_PREFERENCEID = '150216849-ceed1ee4-8ab9-4449-869f-f4a8565d386f';

export default class example extends Component {

  constructor(context) {
    super(context);
    this.state = { status: null };
  }

  async handleClick() {

    try {

      let payment = await startCheckout(MERCADOPAGO_TEST_PUBLICKEY, MERCADOPAGO_TEST_PREFERENCEID);

      this.setState({status: JSON.stringify(payment)});

    } catch (err) {

      this.setState({status: err.toString()})

    }

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native MercadoPago Checkout
        </Text>
        <Text style={styles.instructions}>
          Tap the following button to start the checkout flow
        </Text>
        <TouchableHighlight onPress={ () => this.handleClick() }>
          <Text style={styles.button}>CHECKOUT PRODUCT FOR $100</Text>
        </TouchableHighlight>
        <Text>{this.state.status}</Text>
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
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10
  }
});

AppRegistry.registerComponent('example', () => example);
