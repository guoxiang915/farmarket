export const defaultPlacePhotos = [
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
];

export const defaultGroceryBoxes = [
  {
    name: 'Vegetarian',
    description:
      'Our food is naturally processed and the strictest precautions are taken place to make sure you get the freshest foods',
    imgs: [
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
    ],
    properties: [
      { type: 'egg', value: 24 },
      { type: 'vegetables', value: 15 },
      { type: 'fruits', value: 13 },
    ],
    checks: [
      { checked: true, value: 'Vegetarian' },
      { checked: false, value: 'Delivery' },
      { checked: true, value: 'Enrolling untill June 1st' },
      { checked: true, value: 'Weekly pickup' },
      { checked: true, value: 'Organic' },
    ],
  },
];
