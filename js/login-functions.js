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
   
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    

      const promise = auth.signInWithEmailAndPassword(email,password);
      signInAlert(`<img src="pics/loading.gif" >`);
      promise.then(function(){
        localStorage.setItem("carderEmail",email);
        location.replace("buy-card.html")
      }).catch(e => signInAlert(e.message));  
      ;
      localStorage.setItem("isUserSignedIn","yes");
  }

  function signOut(){
    //auth.signOut();

    auth.signOut().then(function() {
      console.log('Signed Out');
      localStorage.setItem("isUserSignedIn","no");
      location.replace("login.html");
    }, function(error) {
      console.error('Sign Out Error', error);
    });

    localStorage.removeItem("carderEmail");
    localStorage.setItem("isUserSignedIn","no");
    
    //alert("signed Out");
    //window.location.replace("login.html");
  }

  function signInAlert(msg){
    let loadingGifContainer = document.getElementById("loading-gif-container");
    let loadingGif = `<img src="pics/loading.gif" >`;
     loadingGifContainer.innerHTML = msg;
   }

   function registerAlert(msg){
    let registerInfo = document.getElementById("register_info");
    let loadingGif = `<img src="pics/loading.gif" >`;
     registerInfo.innerHTML = msg;
   } 
  

   function signUp(){
    
    

    let email = document.getElementById("email");
    let password = document.getElementById("password");


    if (comparePassword()){
        const promise = auth.createUserWithEmailAndPassword(email.value,comparePassword());
        registerAlert(`<img src="pics/loading.gif" >`);
        promise.then(function (){
          registerAlert("Thanks for signing up. head on to sign in");
      }).catch(e => registerAlert(e.message));  
      // alert("Signed Up");
    }

     

  } 

  function comparePassword(){
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;
  
    if ( password === confirm_password){
        return password;
    }else{
      registerAlert("Password don't match");
    }
  
  }


   function ifNotSignInRedirect(){
    let isUserSignedIn = localStorage.getItem("isUserSignedIn");
  if (isUserSignedIn === "no"){
    console.log(isUserSignedIn);
  signOut();

  }
}