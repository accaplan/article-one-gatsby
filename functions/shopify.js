const sanityClient = require('@sanity/client');

const {
  REACT_APP_SANITY_API_TOKEN,
  REACT_APP_SANITY_PROJECT_ID,
  REACT_APP_SANITY_DATASET,
} = process.env;

const client = sanityClient({
  projectId: REACT_APP_SANITY_PROJECT_ID,
  dataset: REACT_APP_SANITY_DATASET,
  token: REACT_APP_SANITY_API_TOKEN,
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      body: ''
    };
  }

  let data;
  let hasVariantsToSync = false;

  try {
    data = JSON.parse(event.body);
    
  } catch (error) {
    console.log('JSON parsing error:', error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Bad request body'
      })
    };
  }
  // Build our initial product
  const product = {
    _type: 'product',
    _id: data.id.toString(),
    productId: data.id.toString(),
    title: data.title,
    defaultPrice: data.variants[0].price,
    type: data.product_type,
    defaultImage: data.images[0].src,
    slug: {
      _type: 'slug',
      current: data.handle
    }
  };

  return client
    .transaction()
    .createIfNotExists(product)
    .patch(data.id.toString(), patch => patch.set(product))
    .commit()
    .then(res => {
      console.log(`Successfully updated/patched Product ${data.id} ${data.title} in Sanity`);

      if (data.variants.length > 1) {
        hasVariantsToSync = true;

        return Promise.all(data.variants.map(variant => {
          const variantData = {
            _type: 'productVariant',
            _id: variant.id.toString(),
            productId: data.product_id.toString(),
            variantId: variant.id.toString(),
            title: data.title,
            variantTitle: variant.title,
            sku: variant.sku,
            price: variant.price,
          };

          return client
            .transaction()
            .createIfNotExists(variantData)
            .patch(variant.id.toString(), patch => patch.set(variantData))
            .commit()
            .then(response => {
              console.log(`Successfully updated/patched Variant ${variant.id} ${variant.title} in Sanity`);
              return response;
            })
            .catch(error => {
              console.log('Sanity error:', error);
              return error;
            });
        })).then(result => {
          if (hasVariantsToSync) {
            return client
              .transaction()
              .createIfNotExists(product)
              .patch(data.id.toString(), patch => patch.set({
                variants: data.variants.map(variant => ({
                  _type: 'reference',
                  _ref: variant.id.toString(),
                  _key: variant.id.toString(),
                }))
              }))
              .commit()
              .then(response => {
                console.log(`Successfully added variant references to ${data.id} in Sanity`);
                return {
                  statusCode: 200,
                  body: JSON.stringify(response)
                };
              })
              .catch(error => {
                console.log('Sanity error:', error);
                return error;
              });
          } else {
            return {
              statusCode: 200,
              body: JSON.stringify(res)
            };
          }
        }).catch(error => {
          console.log('Sanity error:', error);

          return {
            statusCode: 500,
            body: JSON.stringify({
              error: 'An internal server error has occurred',
            })
          };
        });

      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(res)
        };
      }
    })
    .catch(error => {
      console.log('Sanity error:', error);

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'An internal server error has occurred',
        })
      };
    });
};