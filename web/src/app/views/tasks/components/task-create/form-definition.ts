const FORM_STEP_1 = {
    title: { type: 'text', validations: {}, errors: {}, placeholder: 'Title' },
    description: { type: 'text', validations: {}, errors: {}, placeholder: 'Details' },
};

const FORM_STEP_2 = {
    address: { type: 'textarea', validations: {}, errors: {}, placeholder: 'Full Address' },
};

const STEP_ITEMS = [
    { label: 'Step 1', data: FORM_STEP_1 },
    { label: 'Step 2', data: FORM_STEP_2 },
    { label: 'Review & Submit', data: {} }
];

export { STEP_ITEMS }