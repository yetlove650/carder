
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDL8zYIR0E15N68_3kMMsRRJamjjBFHw3k",
    authDomain: "top-carder-fc437.firebaseapp.com",
    databaseURL: "https://top-carder-fc437.firebaseio.com",
    projectId: "top-carder-fc437",
    storageBucket: "top-carder-fc437.appspot.com",
    messagingSenderId: "559715167106",
    appId: "1:559715167106:web:bdcd1cf880d18ee6943d9b"
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

      