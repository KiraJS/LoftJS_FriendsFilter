(function(){
  'use strict';
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
  var data = response.response;
  for (var i = 0; i < data.length; i++){
    var friendsList = document.getElementById('friendsList');
    var friendItem = document.createElement("li");
    var friendImgContainer = document.createElement("div");
    var friendImg = document.createElement("img");
    var friendName = document.createElement("span");
    var friendAdd = document.createElement("span");
    friendItem.setAttribute("draggable", "true");
    friendItem.className = "friend";
    friendAdd.className = "friend--add";
    friendImgContainer.className = "friend__img";
    friendName.className = "friend__name";
    friendImg.src = data[i].photo_50;
    friendName.innerHTML = data[i].first_name + " " + data[i].last_name;
    friendsList.appendChild(friendItem);
    friendItem.appendChild(friendImgContainer);
    friendImgContainer.appendChild(friendImg);
    friendItem.appendChild(friendName);
    friendItem.appendChild(friendAdd);
  }
})
var friendsSelect = document.getElementById('friendsSelect');
var search = document.getElementById('search');
var newlistSearch = document.getElementById('newlistSearch');
friendsList.addEventListener('click', selectFriend, true);
friendsSelect.addEventListener('click', removeSelectFriend, true);
search.addEventListener('input', searchFriend);
newlistSearch.addEventListener('input', searchNewFriends);



// Function to create new list
function selectFriend(e){
  if(e.target.className == "friend--add"){
    var selectedFriend = e.target.parentNode;
    friendsSelect.appendChild(selectedFriend);
    selectedFriend.children[2].style.transform = "rotate(45deg)";
    console.log(selectedFriend.children[2])
  }
}
// Function to remove new list
function removeSelectFriend(e){
  if(e.target.className == "friend--add"){
    var selectedFriend = e.target.parentNode;
    friendsList.appendChild(selectedFriend)
    console.log(selectedFriend)
    selectedFriend.children[2].style.transform = "rotate(90deg)";
  }
}
// Function to sort friendsList
function searchFriend(){
  var searchValue = search.value;
  for(var prop in friendsList.children){
    if(friendsList.children[prop].children[1].innerHTML.toLowerCase().indexOf(searchValue.toLowerCase()) == -1){
        friendsList.children[prop].style.display = "none";
    } else{
      friendsList.children[prop].style.display = "block";
    }
  }
}
  // Function to sort friendsList
  function searchNewFriends(){
    var searchValue = newlistSearch.value;
    for(var prop in friendsSelect.children){
      if(friendsSelect.children[prop].children[1].innerHTML.toLowerCase().indexOf(searchValue.toLowerCase()) == -1){
          friendsSelect.children[prop].style.display = "none";
      } else{
        friendsSelect.children[prop].style.display = "block";
      }
    }
  }

})();
