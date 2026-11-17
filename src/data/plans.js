// DATA FILE: the three subscription plans.
// Home, Plans, SignUp and Welcome all read from this list, so a change here
// updates the whole site.
//
// Each plan has:
//   price, items    the monthly price and how many items are in the box
//   tagline         one sentence shown under the plan name
//   perks           the bullet list shown on the plan card and the Welcome page
//   guide, shipping, preview, vote    short values used in the comparison table

export const plans = [
  {
    id: 'silver',
    name: 'Silver',
    price: 15,
    items: 5,
    tagline: 'A first taste of each city.',
    perks: [
      '5 local items each month',
      'Pocket card with a short city guide',
      'Standard shipping included',
    ],
    guide: 'Pocket card',
    shipping: 'Standard',
    preview: 'When your box ships',
    vote: 'No',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 30,
    items: 10,
    tagline: 'The full city, with a printed guide.',
    perks: [
      '10 local items each month',
      'Printed city guide with maker stories',
      'Priority shipping included',
      'Next city announced one week early',
    ],
    guide: 'Printed guide',
    shipping: 'Priority',
    preview: '1 week early',
    vote: 'No',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 60,
    items: 20,
    tagline: 'The deepest look, and a say in what comes next.',
    perks: [
      '20 local items each month',
      'Printed city guide and a map print',
      'Priority shipping in gift-ready packaging',
      'Next city announced two weeks early',
      'Vote on a future city each quarter',
    ],
    guide: 'Printed guide and map print',
    shipping: 'Priority, gift-ready',
    preview: '2 weeks early',
    vote: 'Yes',
  },
]

// Find a plan by its id. If the id is missing or wrong, fall back to Silver.
export function getPlan(id) {
  return plans.find((plan) => plan.id === id) || plans[0]
}
