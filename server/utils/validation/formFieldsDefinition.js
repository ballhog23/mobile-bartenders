const formFieldsDefintion = {
  name: {
    name: 'name',
    errorMessage: 'Please enter your legal name'
  },
  email: {
    name: 'email',
    errorMessage: 'Invalid email format. Use this format: example@domain.com'
  },
  phone: {
    name: 'phone',
    errorMessage: 'Invalid phone format. Only Digits. No area code. Use this format: 1231231234'
  },
  inquiry: {
    name: 'inquiry',
    errorMessage: 'Please enter a message'
  },
  eventDate: {
    name: 'eventDate',
    errorMessage: 'Please select a date in the future'
  },
  service: {
    name: 'service',
    errorMessage: 'Please select a service'
  }
};

export default formFieldsDefintion;