"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */
 function hideNavComponents() {
  const components = [
    $submitStory, 
    $favorites, 
    $myStories
  ];
  components.forEach(c => c.hide());
}
function showNavComponents() {
  const components = [
    $submitStory, 
    $favorites, 
    $myStories 
  ];
  components.forEach(c => c.show());
}
/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();

}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $allStoriesList.hide();
  $signupForm.show();

}

$navLogin.on("click", navLoginClick);


function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt); 
$storyForm.show();
$submitForm.show();
$allStoriesList.hide();
}
$submitStory.on("click", navSubmitClick);
/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
 showNavComponents();
  $navUserProfile.text(`${currentUser.username}`).show();

}

function myStorieslClick(evt){
userStories();
};

$myStories.on("click", myStorieslClick);

async function navFavoriteClick(){
  hidePageComponents(); 
putFavOnPage();

  //if the favories list is empty...say add favorites!

  //otherwise fill page up eith favorited stories 
  }
 $favorites.on("click", navFavoriteClick);
