$app.controller('ChatController', [
    '$scope', 'UserFactory', '$location', '$firebaseArray',
    function($scope, UserFactory, $location, $firebaseArray){
        var userInfo = UserFactory.get();

        if(!userInfo || !userInfo.nick)
            return $location.path('/');

        $scope.user = userInfo;

        var ref = firebase.database().ref().child('messages');

        var messages = $firebaseArray(ref);
        $scope.messages = messages;

        $scope.sendMessage = function(){
            if(!$scope.newmessage || !$scope.newmessage.value)
                return alert("Digite uma mensagem");

            var newMessage = {
                value: $scope.newmessage.value,
                date: new Date().getTime(),
                user: userInfo
            };

            messages.$add(newMessage);
            $scope.newmessage.value = "";
        }
    }
]);