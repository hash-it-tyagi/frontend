app.controller("admin-controller",($scope,adminFactory)=>{
    $scope.login = function(){
        var spanArr = document.getElementsByClassName("emptySpan");
        var errorSpan = document.getElementById("errorSpan");
        errorSpan.innerText = "";
        spanArr[0].innerText = "";
        spanArr[1].innerText = "";

        if(($scope.username == undefined || $scope.username == "") && ($scope.password == undefined || $scope.password == "")){
            errorSpan.innerText = "Enter required fields to proceed";
        }
        else if(($scope.username == undefined || $scope.username == "") && ($scope.password != undefined || $scope.password != "")){
            spanArr[0].innerText = "Enter username to proceed";
        }
        else if(($scope.username != undefined || $scope.username != "") && ($scope.password == undefined || $scope.password == "")){
            spanArr[1].innerText = "Enter password to proceed";
        }
        else{
            adminFactory.apiCall($scope.username,$scope.password).then(data=>{
                if(data.data.status == 200){
                    localStorage.setItem($scope.username,data.data.token);
                    var queryStr = utilityObject.queryString([{"username":$scope.username}]);
                    var path = "admindashboard.html" + queryStr;
                    
                    location.href = path;
                }
                else{
                    errorSpan.innerText = "Incorrect Username or Password";
                }})
            .catch(err=>errorSpan.innerText = "Error connecting: try reconnecting");
        }
    }
});