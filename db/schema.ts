
export interface Subscription {
  id: string;
  createdAt: string;
  modifiedAt?: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  startedAt: string;
  endsAt?: string;
  endedAt?: string;
  customerId: string;
  productId: string;
  discountId?: string;
  checkoutId: string;
  customerCancellationReason?: string;
  customerCancellationComment?: string;
  metadata?: string; // JSON string
  customFieldData?: string; // JSON string
  userId?: string;
}
