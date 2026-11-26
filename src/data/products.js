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
    name: 'DzArogya',
    description:
      'A full-stack platform for a multispeciality clinic and diagnostic centre. Patients book specialist doctors, lab tests and home visits online and pay securely. A clean admin dashboard lets the clinic manage doctors, test prices, schedules and availability — and track every booking, payment and report in real time.',
    image: '/Images/products/dzarogya.png',
    url: 'https://www.dziretechx.com/products/dzarogya',
    badge: 'Live',
  },
  {
    id: 2,
    name: 'DZ Lead Generator',
    description:
      'A lead-qualification tool for industrial crane sales. Sales teams screen a company in four quick steps — eligibility, classification, product requirement and company checks — and get a qualification score across 7 dimensions. Scoring runs right in the browser, and whole lists of companies can be checked at once from a CSV or Excel file.',
    image: '/Images/products/dzleadgenerator.png',
    url: 'https://www.dziretechx.com/products/dzleadgenerator',
    badge: 'Live',
  },
  // {
  //   id: 3,
  //   name: 'Your Second Product',
  //   description: 'Short description here.',
  //   image: '/Images/products/second-product.png',
  //   url: 'https://your-second-product-url.com',
  //   badge: 'Beta',
  // },
];

export default products;
