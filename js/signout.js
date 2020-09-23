
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCE351TvDwT-6RyudkUjye4sr9ZWoCe5OE",
    authDomain: "top-carder.firebaseapp.com",
    databaseURL: "https://top-carder.firebaseio.com",
    projectId: "top-carder",
    storageBucket: "top-carder.appspot.com",
    messagingSenderId: "731877222333",
    appId: "1:731877222333:web:0eb5720108110b2e17d4d4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  function signIn(){
      
    let email = document.getElementById("email");
    let password = document.getElementById("password");


      const promise = auth.signInWithEmailAndPassword(email.value,password.value);
      promise.catch(e => alert(e.message));  
      alert("Signed In " + email.value);
  }

  function signOut(){
    auth.signOut();
    alert("signed Out");
    window.location.replace("login.html");
  }
  
  
  //if user found redirect to home
  auth.onAuthStateChanged(function(user){

    if(user){
      var email = user.email;
      window.location.replace("buy-card.html");
      //alert("Active user "+ email);
      //is logined in
    }else{
      
      alert("Please Sign in");
      //no user loged in 
    }

  })

      