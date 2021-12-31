/**
 * Subscription sink that holds Observable subscriptions
 * until you call unsubscribe on it in ngOnDestroy.
 */

const isFunction = (fn: any) => typeof fn === 'function'

export interface SubscriptionLike {
  unsubscribe(): void
}

export class SubSink {
  protected subs: SubscriptionLike[] = []

  constructor() {}

  add(...subscriptions: SubscriptionLike[]): void {
    this.subs = this.subs.concat(subscriptions)
  }

  set sink(subscription: SubscriptionLike) {
    this.subs.push(subscription)
  }

  unsubscribe(): void {
    this.subs.forEach(
      (sub) => sub && isFunction(sub.unsubscribe) && sub.unsubscribe()
    )
    this.subs = []
  }
}
