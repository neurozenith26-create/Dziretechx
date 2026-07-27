// ============================================
// OUR PRODUCTS
// ============================================
// No backend needed. To add a product, copy one block below and fill in:
//   name        -> product name shown on the card
//   description -> one or two short sentences
//   image       -> landing-page screenshot. Drop the file into
//                  public/Images/products/  and point here as
//                  '/Images/products/<your-file>.png'
//   url         -> the live website the "Use it" button opens (new tab)
//   badge       -> (optional) small label on the image, e.g. 'Live', 'Beta'
//
// The first entry below is an EXAMPLE using an existing image — replace it
// with your real product (URL + screenshot + description).

export const products = [
  {
    id: 1,
    name: 'Arogya Diagnostic',
    description:
      'A full-stack platform for a diagnostic laboratory. Patients book tests and doctor appointments online and pay securely with integrated online payments. A clean admin dashboard lets the lab configure everything — test prices, dates and availability — and track every booking, payment and appointment in real time.',
    image: '/Images/products/arogya-diagnostic.png',
    url: 'https://arogyadiagnostic.com/',
    badge: 'Live',
  },
  // {
  //   id: 2,
  //   name: 'Your Second Product',
  //   description: 'Short description here.',
  //   image: '/Images/products/second-product.png',
  //   url: 'https://your-second-product-url.com',
  //   badge: 'Beta',
  // },
];

export default products;
