"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
const favoritesKey = 'favorited';
/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  const favsJson = localStorage.getItem(favoritesKey);
  const favs = JSON.parse(favsJson)

  const isFavorited = favs !== null && favs.filter(fav => fav === story.storyId).length === 1
 const startButtonMarkup = currentUser ? `<button id="starButton"  type="submit" style=" background-color: transparent; border: none;"> <i class="far fa-star ${isFavorited ? 'fas' : 'far'}"></i></button>` : "";
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
    ${startButtonMarkup}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by  ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);

}

 

/** Gets list of stories from server, generates their HTML, and puts on page. */


function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
 $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);

  }
 $allStoriesList.show();
}



 function submitStories() {
$submitForm.hide();  
const title = $("#title").val(); 
const author = $("#author").val();
const url = $("#url").val();

const newStoryList = new StoryList();
const newStory = newStoryList.addStory(currentUser, {title: title, author: author, url: url } );
putStoriesOnPage(newStory);

};

  $submitStoryButton.on("click", submitStories);
 


//figure out how to get story
 async function favOnClick(){

const $star = $(this).find("i");
const $storyId = $(this).closest('li').attr('id');
$star.toggleClass("fas far");

// is this favorited?
const favsJson = localStorage.getItem(favoritesKey);
let favs = JSON.parse(favsJson);
if (favs !== null && favs.includes($storyId)){
  favs = favs.filter(fav => fav === $storyId );
  await currentUser.deleteFavorite(currentUser.username, $storyId);
} else {
  if (favs === null) {
    favs = [$storyId]
  } else {
    favs.push($storyId)  
  }
  
 await currentUser.addFavorite(currentUser.username, $storyId);  
}

localStorage.setItem(favoritesKey, JSON.stringify(favs))
};






$allStoriesList.on("click", "li button",  favOnClick);




function putFavOnPage(){
  $allStoriesList.empty();
const favStory = currentUser.favorites;
for (let fav of favStory){
  const favorites = generateStoryMarkup(fav);
  $allStoriesList.append(favorites);
  
}
$allStoriesList.show();
} 


async function userStories(){
  $allStoriesList.empty();
let myStories = currentUser.ownStories;
for(let story of myStories){
const myStoryList = generateStoryMarkup(story);
$allStoriesList.append(myStoryList);
}
const $star = $("button").find('i');
let $icon = $('<i>').addClass("fas fa-trash-alt");
$icon.hover(function() {
  $(this).css("color", "red");
},
function() {
  $(this).css("color", "");
});
$icon.insertBefore($star);

$allStoriesList.show();
};





async function deleteOnClick(evt){
const $storyId = $(this).closest("li").attr("id");
  const deleteStory =  await storyList.deleteStories($storyId);
  return deleteStory;
};


  $allStoriesList.on("click", "i.fas.fa-trash-alt", deleteOnClick);

