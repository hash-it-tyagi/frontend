app.controller("product-controller",($scope,$compile,$location,productFactory,DELETEPRODUCT,SEARCHPRODUCT)=>{

    $scope.label = {
        prodName:"Product Name",
        prodPrice:"Product Price",
        prodDescription:"Product Description",
        prodUrl:"Product Url",
        prodType:"Product Type",
        prodCategory:"Product Category"
    };

    $scope.input = {
        search:"",
        productName:"",
        productPrice:null,
        productDescription:"",
        productUrl:"",
        productType:"",
        productCategory:""
    };

    $scope.rest = {
        category:"",
    };

    $scope.functions = {
        load(){
            var url = $location.absUrl();
            var username = url.split("?")[1];
            username = username.split("#")[0];
            var userValue = username.split("=")[1];
            $scope.username = userValue;

            this.decide(0);
        },
        decide(number){
            var searchArr = document.getElementsByName("searchBar");
            var spanArr = document.getElementsByClassName("emptySpan");
            var errorSpan = document.getElementById("errorSpan");
    
            errorSpan.innerText = "";
            utilityObject.emptySpan(spanArr);
    
            if(number == 0){
                getProductCategory(errorSpan);
            }
            else if(number == 1 || number == 2){
                if($scope.input.search == ""){
                    if(number == 1){
                        utilityObject.applyClass(searchArr,false,1);
                    }
                    else{
                        utilityObject.applyClass(searchArr,false,2);
                    }
                }
                else{
                    searchProduct(searchArr);
                }
            }
            else if(number == 3 || number == 4){
                console.log($scope.input);
                let result = utilityObject.validations($scope.input.productName,$scope.input.productPrice,$scope.input.productDescription,$scope.input.productUrl,$scope.input.productType,$scope.input.productCategory,spanArr,errorSpan);
    
                console.log($scope.input);
                if(result == true){
                    if(number == 3){
                        addProduct(spanArr,searchArr);
                    }
                    else if(number == 4){
                        updateProduct(spanArr,searchArr);
                    }
                }    
            }
            else if(number == 5){
                if($scope.input.productName == ""){
                    spanArr[0].innerText = "Enter Product Name to delete";
                }
                else{
                    deleteProduct(errorSpan,searchArr);
                }
            }
        },
        printInput(){

        },
    };

    const getProductCategory = function(errorSpan){
        productFactory.apiCallGetProductCategory().then(data=>{
            if(data.data.status == 200){
                $scope.rest.category = data.data.categories;
            }
            else{
                errorSpan.innerText = "There are no Product Categories in DB kindly add one";
            }
        }).catch(err=>errorSpan.innerText = "Error Connecting: Try Reconnecting");
    };

    const searchProduct = function(searchArr){
        var queryStr = utilityObject.queryString([{"productName":$scope.input.search}]);
        SEARCHPRODUCT = SEARCHPRODUCT + queryStr;

        productFactory.apiCallSearchProduct(SEARCHPRODUCT).then(data=>{
            if(data.data.status == 200){
                utilityObject.emptyInput($scope);
                utilityObject.applyClass(searchArr,true,1);
                utilityObject.applyClass(searchArr,true,2);
                SEARCHPRODUCT = "http://localhost:1234/products/searchProduct";
                
                utilityObject.makeParentDiv($compile,$scope);
                utilityObject.makeHeadingDiv($compile,$scope);
                $scope.title = "LIST OF PRODUCTS";
                utilityObject.makeTable($compile,$scope);
                utilityObject.makeRow($compile,$scope,data.data.doc);
            }
            else{
                utilityObject.emptyInput($scope);
                utilityObject.applyClass(searchArr,false,1);
                utilityObject.applyClass(searchArr,false,2);
                searchArr[0].placeholder = "Product Not Found";
                searchArr[1].placeholder = "Product Not Found";
                SEARCHPRODUCT = "http://localhost:1234/products/searchProduct";
            }
        }).catch(err=>alert("Error Connecting: Try Reconnecting"));
    };

    const addProduct = function (spanArr,searchArr){
        productFactory.apiCallAddProduct($scope.input.productName,$scope.input.productPrice,$scope.input.productDescription,$scope.input.productUrl,$scope.input.productType,$scope.input.productCategory).then(data=>{
            if(data.data.status == 200){
                utilityObject.emptyInput($scope);
                utilityObject.applyClass(searchArr,true,1);
                utilityObject.applyClass(searchArr,true,2);
                alert("Product Added Successfully");
            }
            else{
                spanArr[0].innerText = "Product Name already taken";
            }
        }).catch(err=>alert("Error Connecting: Try Reconnecting"));
    };

    const updateProduct = function(spanArr,searchArr){
        productFactory.apiCallUpdateProduct($scope.input.productName,$scope.input.productPrice,$scope.input.productDescription,$scope.input.productUrl,$scope.input.productType,$scope.input.productCategory).then(data=>{
            if(data.data.status == 200){
                utilityObject.emptyInput($scope);
                utilityObject.applyClass(searchArr,true,1);
                utilityObject.applyClass(searchArr,true,2);
                alert("Product Updated Successfully");
            }
            else{
                spanArr[0].innerText = "Invalid Product Name";
            }
        }).catch(err=>alert("Error Connecting: Try Reconnecting"));
    };

    const deleteProduct = function(errorSpan,searchArr){
        var queryStr = utilityObject.queryString([{"productName":$scope.input.productName}]);
        DELETEPRODUCT = DELETEPRODUCT + queryStr;
        
        productFactory.apiCallDeleteProduct(DELETEPRODUCT).then(data=>{
            utilityObject.emptyInput($scope);
            utilityObject.applyClass(searchArr,true,1);
            utilityObject.applyClass(searchArr,true,2);

            if(data.data.status == 200){
                DELETEPRODUCT = "http://localhost:1234/products/deleteProduct";
                alert("Product Deleted Successfully");
            }
            else{
                DELETEPRODUCT = "http://localhost:1234/products/deleteProduct";
                errorSpan.innerText = "Invalid Product Name";
            }
        }).catch(err=>alert("Error Connecting: Try Reconnecting"));
    };
});