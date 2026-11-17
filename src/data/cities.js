// DATA FILE: all the city content lives here, in one place.
// Home, Cities, CityDetail and the search box all read from this list,
// so to add a city or change a description you only edit this file.
//
// NOTE: city names are real, but the businesses are made-up placeholders.
// Replace them with real partners (with permission) before you submit.
//
// Each city has a photo (a file in public/images) and photoAlt, a text
// description for people who use screen readers.

export const regions = ['Northeast', 'South', 'Midwest', 'West']

// The label shown on each item card
export const typeLabels = {
  business: 'Local business',
  product: 'Local product',
  culture: 'Cultural experience',
}

export const cities = [
  {
    slug: 'santa-fe', // used in the web address: /cities/santa-fe
    photo: '/images/santa-fe.jpg',
    photoAlt: 'Two hanging strings of dried red chile beside adobe buildings in Santa Fe at sunset',
    name: 'Santa Fe',
    state: 'NM',
    region: 'West',
    month: 'March',
    blurb: 'High-desert coffee, red chile and clay work from a city built around its plaza and its galleries.',
    items: [
      { type: 'business', name: 'High Desert Roasters', description: 'Small-batch coffee roasted in a converted adobe workshop.' },
      { type: 'product', name: 'Red Chile Ristra', description: 'A hand-tied ristra of dried New Mexico red chile.' },
      { type: 'culture', name: 'Plaza Walking Tour Pass', description: 'A guided hour through the historic plaza with a local historian.' },
      { type: 'business', name: 'Sage and Juniper Candle Works', description: 'Hand-poured candles scented with regional plants.' },
      { type: 'product', name: 'Mesa Clay Mug', description: 'A hand-thrown stoneware mug glazed in desert tones.' },
      { type: 'culture', name: 'Gallery Road Map', description: 'A folded map of independent galleries, with a short note on each.' },
    ],
    maker: {
      name: 'High Desert Roasters',
      story: 'The roastery started as a one-room workshop and still roasts in small batches. Your box includes the roast they pour for neighbors.',
    },
  },
  {
    slug: 'savannah',
    photo: '/images/savannah.jpg',
    photoAlt: 'The Savannah riverfront at night, with lit buildings and their reflections on the water',
    name: 'Savannah',
    state: 'GA',
    region: 'South',
    month: 'April',
    blurb: 'Lowcountry pantry staples, handmade soap and a walking guide to the city squares.',
    items: [
      { type: 'business', name: 'Lowcountry Praline Kitchen', description: 'Pralines cooked in small copper pots.' },
      { type: 'product', name: 'Stone-Ground Grits', description: 'Coarse grits milled from regional corn, with a recipe card.' },
      { type: 'culture', name: 'Riverfront Storytelling Walk', description: 'A self-guided audio walk with stories from the river district.' },
      { type: 'business', name: 'Live Oak Soap Company', description: 'Cold-process soap made with local botanicals.' },
      { type: 'product', name: 'Marsh Tea Blend', description: 'A loose-leaf black tea blended with citrus peel.' },
      { type: 'culture', name: 'Squares Sketch Kit', description: 'A sketchbook and prompts for drawing the city squares.' },
    ],
    maker: {
      name: 'Lowcountry Praline Kitchen',
      story: 'The kitchen cooks each batch by hand and wraps it the same day. The box carries a small selection from the week you receive it.',
    },
  },
  {
    slug: 'providence',
    photo: '/images/providence.jpg',
    photoAlt: 'The Providence river and a pedestrian bridge in the snow, with the downtown skyline behind',
    name: 'Providence',
    state: 'RI',
    region: 'Northeast',
    month: 'May',
    blurb: 'Sea salt, coffee milk and letterpress prints from a compact, creative harbor city.',
    items: [
      { type: 'business', name: 'Narragansett Salt Works', description: 'Flaky sea salt evaporated from bay water.' },
      { type: 'product', name: 'Harbor Knit Scarf', description: 'A wool scarf knit in a small neighborhood studio.' },
      { type: 'culture', name: 'East Side Bookshop Trail', description: 'A stamp card for independent bookstores on the East Side.' },
      { type: 'business', name: 'Coffee Milk Syrup Kitchen', description: 'The Rhode Island classic, made in small batches.' },
      { type: 'product', name: 'Jewelry District Letterpress Print', description: 'A pressed print of a local landmark.' },
      { type: 'culture', name: 'Sunday Market Map', description: 'A guide to the weekend market and the stalls worth finding.' },
    ],
    maker: {
      name: 'Narragansett Salt Works',
      story: 'The salt works dries bay water in shallow trays on a rooftop. Each box includes a tin from the most recent harvest.',
    },
  },
  {
    slug: 'milwaukee',
    photo: '/images/milwaukee.jpg',
    photoAlt: 'Downtown Milwaukee seen from above, with a street leading toward a classical building',
    name: 'Milwaukee',
    state: 'WI',
    region: 'Midwest',
    month: 'June',
    blurb: 'Cheese, pretzels and brick-colored keepsakes from a lakefront city with deep food traditions.',
    items: [
      { type: 'business', name: 'Third Ward Cheese Counter', description: 'A wedge of aged Wisconsin cheddar, cut to order.' },
      { type: 'product', name: 'Soft Pretzel Mix', description: 'A bake-at-home pretzel mix with a pub-style mustard.' },
      { type: 'culture', name: 'Riverwalk Mural Map', description: 'A map of public murals along the river.' },
      { type: 'business', name: 'Cream City Brick Coasters', description: 'Coasters cut from reclaimed local brick.' },
      { type: 'product', name: 'Lakefront Honey', description: 'Raw honey from urban hives.' },
      { type: 'culture', name: 'Neighborhood Bakery Class Voucher', description: 'A voucher toward a hands-on baking class.' },
    ],
    maker: {
      name: 'Third Ward Cheese Counter',
      story: 'The counter ages and cuts its cheese in-house. The box includes a wedge chosen to pair with the pretzel mix.',
    },
  },
]

// Find one city by its slug. Used by the city detail page.
export function getCity(slug) {
  return cities.find((city) => city.slug === slug)
}
