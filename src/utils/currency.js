export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const DISCOUNT_CODES = {
  'SOLVEN20': { rate: 0.20, label: 'Atelier Privilege (20% OFF)' },
  'FIRST10': { rate: 0.10, label: 'First Order (10% OFF)' },
  'FREESHIP': { rate: 0.0, freeShipping: true, label: 'Complimentary Express Courier' }
};
