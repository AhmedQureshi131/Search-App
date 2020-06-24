<script src="redditApi.js"></script>



const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


//add event listener to the form
searchForm.addEventListener('submit', e => {
    
    //get the input search term
    const searchterm = searchInput.value;
    //get sort by relivance or new
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //get Limit
    const searchLimit = document.getElementById('limit').value;
    //check input is not empty
    if(searchterm === ''){
        //show message
        showMessage('Please add a search term', 'alert-danger');
    }
    //clear input 
    searchInput.value = '';

    //search Reddit
    reddit.search(searchterm, searchLimit, sortBy).then(results => {
       
        let output = '<div class="card-columns">';
       //Loop through posts
       results.forEach(post => {
           const image = post.preview ? post.preview.images[0].source.url : 'https://assets.entrepreneur.com/content/3x2/2000/20180301190808-reddit-logo.jpeg?width=700&crop=2:1';
        output += `
        <div class="card" >
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit: ${post.subreddit} </span>
            <span class="badge badge-dark">Score: ${post.score} </span>

            </div>
      </div>
       `;   
       
       });  
         output += '</div>';
         document.getElementById('results').innerHTML = output;
    });
    e.preventDefault();
});

//let create showMessage function
function showMessage(message, className){
   //Create div
   const div = document.createElement('div');
   //Add classes
   div.className = `alert ${className}`;
   //Add text
   div.appendChild(document.createTextNode(message));
    //we are using DOM manipulation
   //Get the parent container
   const serachContainer = document.getElementById('search-container');
   //Get search
   const search = document.getElementById('search');
    //Insert message
   serachContainer.insertBefore(div, search);
   //Go away after certain amount of time
   //time out alert
   setTimeout(() => document.querySelector('.alert').remove(), 3000);
   


}
// Truncate Text
function truncateText(text, limit){
   const shortend = text.indexOf('',limit);
   if(shortend == -1) return text;
   return text.substring(0, shortend);
}
