//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyDkFC5U8wpEZepYRIQTQIErgijc34CsY1g",
      authDomain: "kwitter-ab9b1.firebaseapp.com",
      databaseURL: "https://kwitter-ab9b1.firebaseio.com",
      projectId: "kwitter-ab9b1",
      storageBucket: "kwitter-ab9b1.appspot.com",
      messagingSenderId: "595629750308",
      appId: "1:595629750308:web:5ce5ab5c8565fb1dca40b1"
    };
    firebase.initializeApp(firebaseConfig);
    username=localStorage.getItem("username");
room_name=localStorage.getItem("room_name");
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("show_message").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(message_data);
console.log(firebase_message_id);
name=message_data["name"];
like=message_data["like"];
message=message_data["message"];
name_html="<h4>"+name+"<img src='tick.png'class='user_tick'></h4>";
message_html="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-warning'id='"+firebase_message_id+"' onclick='update_like(this.id)'>likes"+like+"</button>";
document.getElementById("show_message").innerHTML+=name_html+message_html+like_button;

//End code
      } });  }); }
getData();
function log(){
      window.location="index.html";
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
}
function send(){
message= document.getElementById("message").value;
firebase.database().ref(room_name).push({
      name:username, message:message, like:0

      
});
document.getElementById("message").value="";

}
function update_like(message_id){
button_id=message_id;
likes=document.getElementById(button_id).value;
updated_likes=Number(likes)+1;
console.log(updated_likes);
firebase.database().ref(room_name).child(message_id).update({like:updated_likes});
}