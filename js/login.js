localStorage.removeItem("email");



  //if user found redirect to home
  auth.onAuthStateChanged(function(user){

    if(user){
      var email = user.email;
      localStorage.setItem("email",email);

      console.log(user.email);
      
      console.log("email after signout " + user.email);
      //window.location.replace("buy-card.html");
      
    }else{
      signInAlert("login , please");
    }

  })

    