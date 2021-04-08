// in this we need to create two functiions 
// 1) function which handles the submission of this post like sending data
// 2) function which receives the data of the created post and display it over here
{
    // methos to submit the form data using ajax
    let createPost = ()=>{
        // iss line se hmne home.ejs wale form ko fetch kr lia yha
        let newPostForm = $('#new-post-form');
        // preventdefault() kya krta h---mere form ko directly submit nhi hone deta h
        newPostForm.submit((e)=>{
            e.preventDefault();
            // we enabled preventdefault so we need to submit it manually using ajax
            $.ajax({
                type: 'post',
                url: '/posts/create-posts',
                data: newPostForm.serialize(),
                success: (data)=>{
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    req.flash('success',"Post created successfully!!");
                    deletePost($(' .delete-post-button',newPost));
                },error: (error)=>{
                    console.log(error.responseText);
                }
            });
        });
    }
    // NOTE FOR ABOVE FUNCTION:- once we submitted the data we will receive it in posts_conteroole

    // method to create a post in DOM(taki wo dikhe page pr)
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
          <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a>
          </small>
           ${post.content}
          <small>${post.user.name}</small>
        </p>
      
        <div class="post-comments">
          <form action="/comments/create" method="post">
            <input
              type="text"
              name="content"
              placeholder="Type here to add comment....."
              required
            />
            <input type="hidden" name="post" value="${post._id}" />
            <input type="submit" value="Add comment" />
          </form>
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
          </div>
        </div>
      </li>
      `)
    }


// method to delete a function from DOM

let deletePost = function(deleteLink){
  $('deleteLink').click(function(e){
    e.preventDefault();

    $.ajax({
      type: 'get',
      url: $(deleteLink).prop('href'),
      success: function(data){
        $(`#post-${data.data.post_id}`).remove();
      },
      error: function(error){
        console.log(err.responseText);
      }
    })
  })

}

    createPost();

}


// newpostForm.serialize() converts the form data into JSON