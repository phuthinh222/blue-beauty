export type VoucherMap = Record<string, number>;

export const VOUCHERS: VoucherMap = {
  BLUE10: 0.1,
  BLUE20: 0.2,
  BEAUTY50K: 50000,
};

export function calcDiscount(price: number, voucherValue: number): number {
  return voucherValue < 1 ? Math.round(price * voucherValue) : voucherValue;
}
