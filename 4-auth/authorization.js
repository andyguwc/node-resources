// Authorization
// make sure loggedin user can only access products added by the user

// we know user_id on the product

// on admin controller, only render products by the loggedin user 
exports.getProducts = (req, res, next) => {
    this.getProducts.find({userId: req.user._id})
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
}

// delete product where not only ids match but also user
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({_id: prodId, userId: req.user._id})
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
  };
