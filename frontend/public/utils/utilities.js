const utilityObject = {
    emptySpan(arr){
        for(let i=0;i<arr.length;i++){
            arr[i].innerText = "";
        }
    },
    emptyInput($scope){
        $scope.input = {
            search:"",
            productName:"",
            productPrice:"",
            productDescription:"",
            productUrl:"",
            productType:"",
            productCategory:""
        };
    },
    validations(...argv){
        if(argv[0] == "" && argv[1] == null && argv[2] == "" && argv[3] == "" && argv[4] == "" && argv[5] == ""){
            argv[7].innerText = "Enter required fields to proceed";
        }
        else if(argv[0] == "" && argv[1] != null && argv[2] != "" && argv[3] != "" && argv[4] != "" && argv[5] != ""){
            argv[6][0].innerText = "Enter Product Name to proceed";
        }
        else if(argv[0] != "" && argv[1] == null && argv[2] != "" && argv[3] != "" && argv[4] != "" && argv[5] != ""){
            argv[6][1].innerText = "Enter Product Price to proceed";
        }
        else if(argv[0] != "" && argv[1] != null && argv[2] == "" && argv[3] != "" && argv[4] != "" && argv[5] != ""){
            argv[6][2].innerText = "Enter Product Description to proceed";
        }
        else if(argv[0] != "" && argv[1] != null && argv[2] != "" && argv[3] == "" && argv[4] != "" && argv[5] != ""){
            argv[6][3].innerText = "Enter Product Url to proceed";
        }
        else if(argv[0] != "" && argv[1] != null && argv[2] != "" && argv[3] != "" && argv[4] == "" && argv[5] != ""){
            argv[6][4].innerText = "Select Product Type to proceed";
        }
        else if(argv[0] != "" && argv[1] != null && argv[2] != "" && argv[3] != "" && argv[4] != "" && argv[5] == ""){
            argv[6][5].innerText = "Select Product Category to proceed";
        }
        else if(argv[0] != "" && argv[1] != null && argv[2] != "" && argv[3] != "" && argv[4] != "" && argv[5] != ""){
            return true;
        }
        else{
            argv[7].innerText = "Enter required fields to proceed";
        }
    },
    queryString(objectArr){
        var completeStr = "?";
        for(let i=0;i<objectArr.length;i++){
            if(i > 0){
                completeStr = completeStr + "&";
            }
            let key = Object.keys(objectArr[i])[0];
            let value = objectArr[i][key];
            let queryStr = key + "=" + value;
            completeStr = completeStr + queryStr;
        }
        return completeStr;
    },
    applyClass(inputArr,bool,number){
        if(bool == true){
            if(number == 1){
                inputArr[0].placeholder = "Enter Product Name to Search";
                inputArr[0].className = "form-control bg-light border-0 small searchFound";
            }
            else{
                inputArr[1].placeholder = "Enter Product Name";
                inputArr[1].className = "form-control bg-light border-0 small searchFound";
            }
        }
        else{
            if(number == 1){
                inputArr[0].placeholder = "Enter Product Name to Search";
                inputArr[0].className = "form-control bg-light border-0 small searchNotFound";
            }
            else{
                inputArr[1].placeholder = "Enter Product Name";
                inputArr[1].className = "form-control bg-light border-0 small searchNotFound";
            }
        }
    },
    makeParentDiv($compile,$scope){
        var cardBody = document.getElementsByClassName("card shadow")[0];
        var div = `<div style='width:100% !important;' class="pl-4 pr-4">`;
        var compiledDiv = $compile(div)($scope);
        angular.element(cardBody).append(compiledDiv);
    },
    makeHeadingDiv($compile,$scope){
        var parentDiv = document.getElementsByClassName("pl-4")[0];
        var div = `<div> <h5 class="text-center m-0 font-weight-bold mycards">{{title}}</h5>
        <br/>`;
        var compiledDiv = $compile(div)($scope);
        angular.element(parentDiv).append(compiledDiv);
    },
    makeTable($compile,$scope){
        var parentDiv = document.getElementsByClassName("pl-4")[0];
        var table = `<table class="table-responsive table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{label.prodName}}</th>
            <th scope="col">{{label.prodPrice}}</th>
            <th scope="col">{{label.prodDescription}}</th>
            <th scope="col">{{label.prodUrl}}</th>
            <th scope="col">{{label.prodType}}</th>
            <th scope="col">{{label.prodCategory}}</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody id="prodTable">`;
        var compiledTable = $compile(table)($scope);
        angular.element(parentDiv).append(compiledTable);
    },
    makeRow($compile,$scope,doc){
        var tbody = document.getElementById("prodTable");
        var tr = `<tr>
        <th scope="row">1</th>
            <td>${doc.productName}</td>
            <td>${doc.productPrice}</td>
            <td>${doc.productDescription}</td>
            <td>${doc.productUrl}</td>
            <td>${doc.productType}</td>
            <td>${doc.productCategory}</td>
            <td><button class="btn btn-primary">
                <span class="icon text-white-50">
                    <i class="fas fa-edit"></i>
                </span>
                </button>&nbsp;
                <button class="btn btn-danger">
                    <span class="icon text-white-50">
                        <i class="fas fa-trash"></i>
                    </span>
                </button></td>
            </tr>`;
        var compiledTr = $compile(tr)($scope);
        angular.element(tbody).append(compiledTr);
    }
};