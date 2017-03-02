
#import "CheckoutMercadoPagoModule.h"
#import "AppDelegate.h"

@import MercadoPagoSDK;

@implementation CheckoutMercadoPagoModule

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(startCheckout:(NSString *)publicKey:(NSString *)prefId:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject) {
    
    [MercadoPagoContext setPublicKey: publicKey];
    [MercadoPagoContext setSiteID:@"MLA"];
    
    UINavigationController *checkoutFlow = [MPFlowBuilder startCheckoutViewController:prefId callback:^(Payment *payment) {
        NSDictionary *dictionary = @{@"id": payment._id, @"status": payment.status};
        resolve(dictionary);
    } callbackCancel:nil];
    
    AppDelegate *share = (AppDelegate *)[UIApplication sharedApplication].delegate;
    UINavigationController *nav = (UINavigationController *) share.window.rootViewController;
    [nav presentViewController:checkoutFlow animated:YES completion:^{}];
}

@end
  
