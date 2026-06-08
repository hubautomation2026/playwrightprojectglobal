/**
 * test-data/cart.data.ts
 *
 * Real product URLs from skoda-parts.com used in cart tests.
 * Using direct product page URLs keeps tests fast and stable —
 * no searching or navigating through categories needed.
 */

export const cartProducts = {

  // Bosch Air Filter — 10.54 € — in stock 10+ pcs
  airFilter: {
    path: '/spare-part/1j0129620-air-filter-bosch-22154.html',
    name: 'Air Filter Bosch',
    partNumber: '1J0 129 620',
    price: 10.54,
  },

  // Oil Filter 1.9TDI — 3.79–17.24 € — in stock
  oilFilter: {
    path: '/spare-part/074115562-oil-filter-1-9tdi-1-9sdi-2-0tdi-bosch-22123.html',
    name: 'Oil Filter 1.9TDI',
    partNumber: '074 115 562',
    price: 3.79,
  },

  // Cabin Odour Filter — 6.70 € — in stock
  cabinFilter: {
    path: '/spare-part/1j0819644a-cabin-odour-filter-bosch-21833.html',
    name: 'Cabin Odour Filter',
    partNumber: '1J0 819 644 A',
    price: 6.70,
  },

};
