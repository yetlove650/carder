function bouncer(){
  let isUserSignedIn = localStorage.getItem("isUserSignedIn");
   
  if(isUserSignedIn !== "yes"){
    location.replace("login.html");
  }
}
bouncer();