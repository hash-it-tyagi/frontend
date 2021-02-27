app.factory("adminFactory",($http,$q,ADMINLOGIN)=>{
    const adminOperations = {
        apiCall(username,password){
            var defer = $q.defer();
            $http.post(ADMINLOGIN,{"username":username,"password":password})
            .then(data=>defer.resolve(data))
                .catch(err=>defer.reject(err));

            return defer.promise;
        }
    };
    return adminOperations;
});