
const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const idValue = document.getElementsByClassName('card-subtitle');
const btnSubmit = document.querySelector('.btn')
let output = '';
const renderPosts = (posts) => {
    posts.forEach(post => {
        // console.log(post);
        output += `
   <div class="card col mt-4 col-md-6 bg-light">
   <div class="card-body">
     <h5 class="card-title">${post.title}</h5>
     <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
     <p class="card-text">${post.body}</p>
     <a href="#" class="card-link" id="edit-post">Edit</a>
     <a href="#" class="card-link" id="delete-post">Delete</a>
   </div>
 </div>
   `;
    });
    postsList.innerHTML = output;

}

const url = 'http://jsonplaceholder.typicode.com/posts';
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))
postsList.addEventListener('click', (e) => {
    e.preventDefault();
    let editButtonIsPressed = e.target.id == 'edit-post';
    let id = e.target.parentElement.dataset.id;
   


if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector('.card-title'); //to grab the card title waala area
    let bodyContent = parent.querySelector('.card-text');//to grab the card title waala area

    titleValue.value = titleContent.textContent;// to write the title content in title value
    bodyValue.value = bodyContent.textContent;
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                body: bodyValue.value,
    
            })
        })
            .then(()=> {
                titleContent=titleValue.value;
                bodyContent=bodyValue.value;
            })
            //.then(() => location.reload())

    })
};
})

//update
/*btnSubmit.addEventListener('click',(e)=>{
    e,preventDefault();
    fetch(`${url}/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value,
            id: idValue.value,    
        })
    })
    .then(res => res.json())
    .then(() =>location.reload())
    
})
});*/


//post karne ke liye
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault(); //it is used so that the page doesn't get reloaded
    //console.log('form subitted');
    //console.log(titleValue.value)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value,
            id: idValue.value,

        })
    })

        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
    //to empty the textfield
    titleValue.value = '';
    bodyValue.value = '';

})

    postsList.addEventListener('click', (e) => {
        e.preventDefault();
        let editButtonIsPressed = e.target.id == 'edit-post';
        let id = e.target.parentElement.dataset.id;
       
    
    
    if (editButtonIsPressed) {
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title'); //to grab the card title waala area
        let bodyContent = parent.querySelector('.card-text');//to grab the card title waala area
    
        titleValue.value = titleContent.textContent;// to write the title content in title value
        bodyValue.value = bodyContent.textContent;
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: titleValue.value,
                    body: bodyValue.value,
        
                })
            })
                .then(()=> {
                    titleContent=titleValue.value;
                    bodyContent=bodyValue.value;
                })
                //.then(() => location.reload())
    
        })
    };
    })
    


