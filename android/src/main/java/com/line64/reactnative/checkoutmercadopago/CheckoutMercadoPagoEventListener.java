package com.line64.reactnative.checkoutmercadopago;

import android.content.Intent;
import android.app.Activity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.mercadopago.exceptions.MPException;
import com.mercadopago.model.Payment;
import com.mercadopago.core.MercadoPago;
import com.mercadopago.util.JsonUtil;

public class CheckoutMercadoPagoEventListener extends BaseActivityEventListener {

  private Promise _currentPromise;

  public void setCurrentPromise(final Promise currentPromise) {
    _currentPromise = currentPromise;
  }

  private void clearCurrentPromise() {
    _currentPromise = null;
  }

  private MPException readExceptionFromData(Intent data) {

    if (data == null || !data.hasExtra("mpException")) {
      return null;
    }

    return JsonUtil
      .getInstance()
      .fromJson(data.getStringExtra("mpException"), MPException.class);

  }

  private Payment readPaymentFromData(Intent data) {

    if (data == null || !data.hasExtra("payment")) {
      return null;
    }

    return JsonUtil
      .getInstance()
      .fromJson(data.getStringExtra("payment"), Payment.class);

  }

  private WritableMap paymentToMap(Payment payment) {

    WritableMap map = Arguments.createMap();

    map.putString("id", payment.getId().toString());
    map.putString("status", payment.getStatus());

    return map;

  }

  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    if (_currentPromise == null) {
      return;
    }

    if (requestCode != MercadoPago.CHECKOUT_REQUEST_CODE) {
      return;
    }

    if (resultCode != Activity.RESULT_OK) {
      final MPException exception = this.readExceptionFromData(data);
      _currentPromise.reject("E_PAYMENT_FAILED", "Payment failed");
      this.clearCurrentPromise();
      return;
    }

    final Payment payment = this.readPaymentFromData(data);

    if (payment == null) {
      _currentPromise.reject("E_NO_PAYMENT", "Payment was cancelled by user");
      this.clearCurrentPromise();
    }

    final WritableMap paymentMap = this.paymentToMap(payment);

    _currentPromise.resolve(paymentMap);
    this.clearCurrentPromise();

  }

}
