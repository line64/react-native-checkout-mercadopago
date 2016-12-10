package com.line64.reactnative.checkoutmercadopago;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.mercadopago.core.MercadoPago;

import com.line64.reactnative.checkoutmercadopago.CheckoutMercadoPagoEventListener;

public class CheckoutMercadoPagoModule extends ReactContextBaseJavaModule {

  private CheckoutMercadoPagoEventListener _resultListener;

  public CheckoutMercadoPagoModule(ReactApplicationContext reactContext) {
    super(reactContext);

    _resultListener = new CheckoutMercadoPagoEventListener();
    reactContext.addActivityEventListener(_resultListener);

  }

  @Override
  public String getName() {
    return "CheckoutMercadoPagoModule";
  }

  @ReactMethod
  public void startCheckout(String publicKey, String checkoutPreferenceId, Promise promise) {

    _resultListener.setCurrentPromise(promise);

    new MercadoPago.StartActivityBuilder()
      .setActivity(this.getCurrentActivity())
      .setPublicKey(publicKey)
      .setCheckoutPreferenceId(checkoutPreferenceId)
      .startCheckoutActivity();

  }

}
