new Promise(function(resolve) {
  if(document.readyState === 'complete') {
    redolve();
  } else {
    window.onload = resolve;
  }
}).then(function(){
  return new Promise(function(resolve, reject){
    VK.init({
       apiId: 5388713
     });
     VK.Auth.login(function(response){
        if (response.session) {
          resolve(response);
          console.log('авторизация прошла успешно');
        } else {
          console.log('ошибка авторизации');
        }
     }, 2);
  })
}).then(function(){
  return new Promise(function(resolve, reject){
    VK.api('friends.get', {'fields': 'first_name', 'fields': 'last_name', 'fields': 'photo_50' }, function(response){
      resolve(response);
    })
  })
}).then(function(response){
  console.log(response.response);
  for (var i = 0; i < response.response.length; i++){
    var friendsList = document.getElementById('friendsList');
    var friendItem = document.createElement("li");
    var friendImgContainer = document.createElement("div");
    var friendImg = document.createElement("img");
    var friendName = document.createElement("span");
    var friendAdd = document.createElement("span");
    friendItem.className = "friend";
    friendAdd.className = "friend--add";
    friendImgContainer.className = "friend__img";
    friendName.className = "friend__name";
    friendImg.src = response.response[i].photo_50;
    friendName.innerHTML = response.response[i].first_name + " " + response.response[i].last_name;
    friendsList.appendChild(friendItem);
    friendItem.appendChild(friendImgContainer);
    friendImgContainer.appendChild(friendImg);
    friendItem.appendChild(friendName);
    friendItem.appendChild(friendAdd);
  }
})
