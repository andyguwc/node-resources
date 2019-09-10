// # Params 

// ## Passing Route Params / Dynamic Routes
// For example, add product details page, and click on details will direct to the details page
// - first make sure products have id in the model

// - then add the button to product-list.ejs and clicking this button will trigger get /products/12345 where 12345 is the product id 

// add below in views/shop/product-list.ejs 
{/* <div class="card__actions">
    <a href="/products/<%= product.id %>" class="btn">Details</a>
    <%- include('../includes/add-to-cart.ejs', {product: product}) %>
</div> */}

// - then add the route, controller, and product-detail view

// add below in routes/shop.js to make sure can extract id from the path 
router.get('/products/:productId', shopController.getProduct);

// add below in ' controllers/:productId' so the controller uses the extracted product id

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};


// ## Passing Data with POST Requests
// In the EJS template, make sure to pass in the product.id as a hidden value
{/* <form action="/admin/delete-product" method="POST">
    <input type="hidden" value="<%= product.id %>" name="productId">
    <button class="btn" type="submit">Delete</button>
</form> */}

{/* In the controller get the value */}
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};


// ## Using Query Params
// Example of Using Query Params to pre-poulate form with previously filled out data

// Route
router.get('/edit-product/:productId', adminController.getEditProduct);

// View
// <%- include('../includes/head.ejs') %>
//     <link rel="stylesheet" href="/css/forms.css">
//     <link rel="stylesheet" href="/css/product.css">
// </head>

// <body>
//    <%- include('../includes/navigation.ejs') %>

//     <main>
//         <form class="product-form" action="/admin/<% if (editing) { %>edit-product<% } else { %>add-product<% } %>" method="POST">
//             <div class="form-control">
//                 <label for="title">Title</label>
//                 <input type="text" name="title" id="title" value="<% if (editing) { %><%= product.title %><% } %>">
//             </div>
//             <div class="form-control">
//                 <label for="imageUrl">Image URL</label>
//                 <input type="text" name="imageUrl" id="imageUrl" value="<% if (editing) { %><%= product.imageUrl %><% } %>">
//             </div>
//             <div class="form-control">
//                 <label for="price">Price</label>
//                 <input type="number" name="price" id="price" step="0.01" value="<% if (editing) { %><%= product.price %><% } %>">
//             </div>
//             <div class="form-control">
//                 <label for="description">Description</label>
//                 <textarea name="description" id="description" rows="5"><% if (editing) { %><%= product.description %><% } %></textarea>
//             </div>
//             <% if (editing) { %>
//                 <input type="hidden" value="<%= product.id %>" name="productId">
//             <% } %>

//             <button class="btn" type="submit"><% if (editing) { %>Update Product<% } else { %>Add Product<% } %></button>
//         </form>
//     </main>
// <%- include('../includes/end.ejs') %>

// Controller

const editMode = req.query.edit;
if (!editMode) {
  return res.redirect('/');
}
const prodId = req.params.productId;
Product.findById(prodId, product => {
  if (!product) {
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product
  });
});

