(function() {
  'use strict';

  var friendsList = document.getElementById('friendsList');
  var friendsSelect = document.getElementById('friendsSelect');
  var popupAction = document.getElementById('popupAction');
  var search = document.getElementById('search');
  var newlistSearch = document.getElementById('newlistSearch');
  var localFriendList = [];
  var localFriendsSelectList = [];


  friendsList.addEventListener('click', selectFriend, true);
  friendsSelect.addEventListener('click', removeSelectFriend, true);
  search.addEventListener('input', searchFriend);
  newlistSearch.addEventListener('input', searchNewFriends);
  popupAction.addEventListener('click', saveToLocal, true);
  popupAction.addEventListener('click', saveSelectToLocal, true);

  // Interface for get FriendsList from VK
  new Promise(function(resolve) {
      if (document.readyState === 'complete') {
        redolve();
      } else {
        window.onload = resolve;
      }
    }).then(function() {
      return new Promise(function(resolve, reject) {
        VK.init({
          apiId: 5388713
        });
        VK.Auth.login(function(response) {
          if (response.session) {
            resolve(response);
            console.log('авторизация прошла успешно');
          } else {
            console.log('ошибка авторизации');
          }
        }, 2);
      })
    }).then(function() {
      return new Promise(function(resolve, reject) {
        VK.api('friends.get', {
          'fields': 'first_name',
          'fields': 'last_name',
          'fields': 'photo_50'
        }, function(response) {
          resolve(response);
        })
      })
    }).then(function(response) {
      var data = response.response;
      for (var i = 0; i < data.length; i++) {
        var friendItem = document.createElement("li");
        var friendImgContainer = document.createElement("div");
        var friendImg = document.createElement("img");
        var friendName = document.createElement("span");
        var friendAdd = document.createElement("span");
        friendItem.setAttribute("draggable", "true");
        friendItem.setAttribute("ondragstart", "event.dataTransfer.setData('text/plain',null)");
        friendItem.className = "friend";
        friendAdd.className = "friend--add";
        friendImgContainer.className = "friend__img";
        friendImg.src = data[i].photo_50;
        friendImg.setAttribute("draggable", "false");
        friendImgContainer.appendChild(friendImg);
        friendName.className = "friend__name";
        friendName.innerHTML = data[i].first_name + " " + data[i].last_name;
        friendsList.appendChild(friendItem);
        friendItem.appendChild(friendImgContainer);
        friendItem.appendChild(friendName);
        friendItem.appendChild(friendAdd);
      }
    })
    // Function to create new list
  function selectFriend(e) {
    if (e.target.className == "friend--add") {
      var selectedFriend = e.target.parentNode;
      friendsSelect.insertBefore(selectedFriend, friendsSelect.firstChild);
      selectedFriend.children[2].style.transform = "rotate(45deg)";
    }
  }
  // Function to remove new list
  function removeSelectFriend(e) {
    if (e.target.className == "friend--add") {
      var selectedFriend = e.target.parentNode;
      friendsList.insertBefore(selectedFriend, friendsList.firstChild);
      selectedFriend.children[2].style.transform = "rotate(90deg)";
    }
  }
  // Function to sort friendsList
  function searchFriend() {
    var searchValue = search.value;
    for (var prop in friendsList.children) {
      if (friendsList.children[prop].children[1].innerHTML.toLowerCase().indexOf(searchValue.toLowerCase()) == -1) {
        friendsList.children[prop].style.display = "none";
      } else {
        friendsList.children[prop].style.display = "block";
      }
    }
  }
  // Function to sort friendsList
  function searchNewFriends() {
    var searchValue = newlistSearch.value;
    for (var prop in friendsSelect.children) {
      if (friendsSelect.children[prop].children[1].innerHTML.toLowerCase().indexOf(searchValue.toLowerCase()) == -1) {
        friendsSelect.children[prop].style.display = "none";
      } else {
        friendsSelect.children[prop].style.display = "block";
      }
    }
  }
  // Drag N Drop
  var dragged;
  document.addEventListener("drag", function(event) {}, false);
  document.addEventListener("dragstart", function(event) {
    dragged = event.target;
    event.target.style.opacity = .5;
  }, false);
  document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "";
  }, false);
  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  }, false);
  friendsSelect.addEventListener("drop", function(event) {
    event.preventDefault();
    friendsSelect.insertBefore(dragged, friendsSelect.firstChild);
    dragged.children[2].style.transform = "rotate(45deg)";
  }, false);
  friendsList.addEventListener("drop", function(event) {
    event.preventDefault();
    friendsList.insertBefore(dragged, friendsList.firstChild);
    dragged.children[2].style.transform = "rotate(90deg)";
  }, false);
  // Save to localStorage

  function Friend(name, photo){
    this.name = name;
    this.photo = photo;
  }
  function saveToLocal(){
    for(var i = 0; i < friendsList.children.length; i++){
      localFriendList.push(new Friend(friendsList.children[i].textContent, friendsList.children[i].children[0].children[0].getAttribute("src")));
    }
    localStorage.setItem('localFriendList', JSON.stringify(localFriendList));
  }
  function saveSelectToLocal(){
    for(var i = 0; i < friendsSelect.children.length; i++){
      localFriendsSelectList.push(new Friend(friendsSelect.children[i].textContent, friendsSelect.children[i].children[0].children[0].getAttribute("src")));
    }
    localStorage.setItem('localFriendsSelectList', JSON.stringify(localFriendsSelectList));
}
})();
