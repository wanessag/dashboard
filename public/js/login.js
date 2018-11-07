var database = firebase.database();

$(document).ready(function () {
  $(".btn-signup").click(signUpClick);
  $(".btn-login").click(signInClick);
});

function signUpClick(event) {
  event.preventDefault();
  const email = $(".email").val();
  const password = $(".password").val();
  createUser(email, password);
}

function signInClick(event) {
  event.preventDefault();
  const email = $(".email").val();
  const password = $(".password").val();
  loginUserAuth(email, password);
}

function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      if (response.operationType === "signIn") {
        let userId = response.user.uid;
        createUserInDB(userId, email);
        signInRedirect(userId);
      }
    })
    .catch(function (error) { handleError(error); });
}

function loginUserAuth(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (response) {
      if (response.operationType === "signIn") {
        let userId = response.user.uid;
        signInRedirect(userId);
      }
    })
    .catch(function (error) { handleError(error); });
}

function createUserInDB(id, email) {
  database.ref('users/' + id).set({
    email: email
  });
}

function signInRedirect(userId) {
  window.location = "dashboard.html?=" + userId;
}

function handleError(error) {
  alert(error.message);
  console.log(error.code, error.message);
}
