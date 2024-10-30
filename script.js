let req = new XMLHttpRequest();

req.onload = function() {
    if (req.readyState == 4) {
        if (req.status == 200) {
            let data = JSON.parse(req.responseText);
            let posts = data.posts;
            console.log(posts);
            console.log("data received...");
            posts.map(function(post) {
                let containerPosts = document.querySelector('.posts');
                let containerPost = document.createElement("div");
                let likeData=post.reactions.likes
                let disLikeData=post.reactions.dislikes 
                containerPost.innerHTML = `
                <div class="post-card">
                    <h2>${post.body}</h2>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                    <div class="reactions">
                        <div class="views"><i class="fa-solid fa-eye"> ${post.views}</i></div>
                        <div class="likes">
                            <i class="fa-solid fa-heart" onclick="increaseLike(${post.id})"> ${likeData}</i>
                        </div>
                        <div class="dislikes">
                            <i class="fa-solid fa-thumbs-down" onclick="increaseDislike(${post.id})"> ${disLikeData}</i>
                        </div>
                    </div>
                </div>`;
            
            containerPosts.appendChild(containerPost);
            });

        } else {
            console.log("Error in response...");
        }
    } else {
        console.log("Error in request...");
    }
};

req.open("GET", "https://dummyjson.com/posts", true);
req.send();

function increaseLike(postId) {
    let postElement = document.querySelector(`.likes i[onclick="increaseLike(${postId})"]`);
    let currentLikes = parseInt(postElement.textContent.trim());
    postElement.innerHTML = ` ${currentLikes + 1}`;
}

function increaseDislike(postId) {
    let postElement = document.querySelector(`.dislikes i[onclick="increaseDislike(${postId})"]`);
    let currentDislikes = parseInt(postElement.textContent.trim());
    postElement.innerHTML = ` ${currentDislikes + 1}`;
}



let reqTag=new XMLHttpRequest();
reqTag.onload=function(){
    if(reqTag.readyState==4){
        if(reqTag.status==200){
            let data=JSON.parse(reqTag.responseText)
            let tag=data.tags
            console.log(tag)
            console.log("data res...")

            data.map(function(tag) {

                let tagsContainer=document.querySelector(".tags")
                tagsContainer.innerHTML += `<span onclick="click()"># ${tag.slug}</span>`
                function click(url){
                    fetch('https://dummyjson.com/posts/search?q=love')
                    .then(res => res.json())
                    .then(console.log);
                }

            });
        }
        else{
            console.log("eror..")   
          }
    }
    else{
        console.log("eror in req..")
    }


}
        
reqTag.open("GET","https://dummyjson.com/posts/tags",true)
reqTag.send()


function search(word) {
    let containerPosts = document.querySelector('.posts');
    containerPosts.innerHTML = ``;  

    let searchReq = new XMLHttpRequest();
    searchReq.onload = function() {
        if (searchReq.readyState == 4) {
            if (searchReq.status == 200) {
                let data = JSON.parse(searchReq.responseText);
                let posts = data.posts;
                console.log(posts);

        posts.map(function(post) {
                let containerPosts = document.querySelector('.posts');
                let containerPost = document.createElement("div");
                let likeData=post.reactions.likes
                let disLikeData=post.reactions.dislikes 
                containerPost.innerHTML = `
                    <div class="post-card">
                        <h2>${post.body}</h2>
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                        <div class="reactions">
                        <div class="views"><i class="fa-solid fa-eye "> ${post.views}</i></div>
                        <div class="likes"><i class="fa-solid fa-heart "> ${likeData}</i></div>
                        <div class="dislikes"><i class="fa-solid fa-thumbs-down "> ${disLikeData}</i></div>
                        </div>
                    </div>`;
                containerPosts.appendChild(containerPost);
            });
            } else {
                console.log("Error in search response...");
            }
        }
    };
    searchReq.open("GET", `https://dummyjson.com/posts/search?q=${word}`, true);
    searchReq.send();
}

let searchField = document.querySelector(".search");

searchField.addEventListener("keyup", () => {
    search(searchField.value);
});





