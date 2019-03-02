# useMany :: React Hook
This package allows you to chain multiple functions that are used to create your state.

This is especially useful if you are using an API against which you have to make multiple calls to satisfy rendering requirements.

eg.
```javascript
const React = require('react');
const useMany = require('usemany');
const axios = require('axios');

/**
 * Example Response:
 * 
 * {
 *  "id": 1,
 *  "productId": 4,
 *  "total": 3.50
 * }
 * 
 **/
const order = (id) => {
  const result = await axios.get(`/orders/${id}`);
  return result.data;
}

/**
 * Example Response:
 * 
 * {
 *  "id": 4,
 *  "name": "Loch Ness Monster Poster"
 *  "price": 3.50,
 *  "currency": "USD"
 * }
 * 
 **/
const productOfOrder = (order) => {
  const result = await axios.get(`/products/${order.productId}`);
  return {order, product: result.data};
}

function Order({id}) {
  /**
   * {
   *  "order": <SEE ORDER SAMPLE RESPONSE ABOVE>,
   *  "product": <SEE PRODUCT SAMPLE RESPONSE>
   * }
   * 
   **/
  const data = useMany(order(id), productOfOrder);

  if(!data) {
    return <div>loading</div>;
  }

  return <div>JSON.stringify(data, null, 2)</div>;
}

```

The first function in the useMany argument array can be a function, promise or value.

All subsequent functions must be functions. Any of the functions may be async, but do not have to be.
