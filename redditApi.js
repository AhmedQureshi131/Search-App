export default {
    search: function(searchterm, searchLimit, sortBy){
        return fetch(`http://www.reddit.com/search.json?q=${searchterm}&sort=${sortBy}&limit=${searchLimit}`)
        //we want response in json
        .then(res => res.json())
        //now we can get the data
        .then(data => data.data.children.map(data => data.data)).catch(err => console.log(err));
    }
};
