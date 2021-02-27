app.factory("productFactory",($q,$http,GETPRODUCTCATEGORY,ADDPRODUCT,UPDATEPRODUCT)=>{
    const productOperations = {
        apiCallGetProductCategory(){
            var defer = $q.defer();
            $http.get(GETPRODUCTCATEGORY).then(data=>defer.resolve(data)).catch(err=>defer.reject(err));
            return defer.promise;
        },
        apiCallAddProduct(productName,productPrice,productDescription,productUrl,productType,productCategory){
            var productObject = new Product(productName,productPrice,productDescription,productUrl,productType,productCategory);
            var defer = $q.defer();
            $http.post(ADDPRODUCT,{"data":productObject}).then(data=>defer.resolve(data)).catch(err=>defer.reject(err));
            return defer.promise;
        },
        apiCallUpdateProduct(productName,productPrice,productDescription,productUrl,productType,productCategory){
            var productObject = new Product(productName,productPrice,productDescription,productUrl,productType,productCategory);
            var defer = $q.defer();
            $http.post(UPDATEPRODUCT,{"data":productObject}).then(data=>defer.resolve(data)).catch(err=>defer.reject(err));
            return defer.promise;
        },
        apiCallDeleteProduct(DELETEPRODUCT){
            var defer = $q.defer();
            $http.get(DELETEPRODUCT).then(data=>defer.resolve(data)).catch(err=>defer.reject(err));
            return defer.promise;
        },
        apiCallSearchProduct(SEARCHPRODUCT){
            var defer = $q.defer();
            $http.get(SEARCHPRODUCT).then(data=>defer.resolve(data)).catch(err=>defer.reject(err));
            return defer.promise;
        }
    };
    return productOperations;
});