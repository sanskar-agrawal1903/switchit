// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
      setupUI(user);
  } else {
    setupUI();
  }
})

// create new store
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
e.preventDefault();

var timestamp=JSON.stringify(Date.now());
db.collection('shop').doc(firebase.auth().currentUser.uid).set({
  name: createForm['storename'].value,
  address: createForm['address'].value,
  city: createForm['city'].value,
  pincode: createForm['pincode'].value,
  mobile: createForm['mobile'].value,
  email: createForm['email'].value,
  timestamp:timestamp,

 }).then(() => {
    db.collection('users').doc(firebase.auth().currentUser.uid).update({
    shop:true
    });
    location.reload();
  createForm.reset();
}).catch(err => {
  console.log(err.message);
});
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  base_pro=new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(base_pro).then(function(result){
     console.log(result);
     console.log("Sucess");
  }).catch(function(err){
     console.log(err);
     console.log('error');
  })
});



// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut().then(() => {
  window.location.replace("index.html");
  alert('Successfully, logged out !!!');
})
});


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
e.preventDefault();

// get user info
const email = loginForm['login-email'].value;
const password = loginForm['login-password'].value;

// log the user in
auth.signInWithEmailAndPassword(email, password).then((user) => {
  if (!firebase.auth().currentUser.emailVerified)
  {
    auth.signOut();
    alert("Verify your email first and try logging in...");
  }
  loginForm.reset();
}).catch(err => {
  alert(err.message);
});

});


// reset password
function forpass(){
  var foremail = prompt("Please enter your email");
  if (foremail != null) {
    auth.sendPasswordResetEmail(foremail).then(function() {
      alert("Email reset mail has been sent to " + foremail + ". Check your inbox !!!");
    }).catch(function(error) {
      alert(error.message);
    });
  }
  else
  {
    alert("Enter a valid email !!!");
  }
}