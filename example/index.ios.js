import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import * as MercadoPago from 'react-native-checkout-mercadopago';
import env from './app.json';

export default class Example extends React.Component {
    state = {
        status: null
    };

    handleClick = async () => {
        try {
            const payment = await MercadoPago.startCheckout(env['public_key'], env['preference_id']);

            this.setState({
                status: JSON.stringify(payment)
            });
        } catch (error) {
            this.setState({
                status: error.toString()
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native MercadoPago Checkout
                </Text>
                <Text style={styles.instructions}>
                    Tap the following button to start the checkout flow
                </Text>
                <TouchableHighlight onPress={this.handleClick}>
                    <Text style={styles.button}>
                        CHECKOUT PRODUCT FOR $100
                    </Text>
                </TouchableHighlight>
                <Text>
                    {this.state.status}
                </Text>
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

AppRegistry.registerComponent('example', () => Example);
