
import { NativeModules } from 'react-native';

const { CheckoutMercadoPagoModule } = NativeModules;

export function startCheckout(publicKey, checkoutPreferenceId) {

  if (!publicKey) throw 'publicKey required to start MercadoPago checkout';
  if (!checkoutPreferenceId) throw 'checkoutPreferenceId required to start MercadoPago checkout';

  return CheckoutMercadoPagoModule.startCheckout(publicKey, checkoutPreferenceId);

}
