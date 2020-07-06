const app={};

const clientID= "yrC0Lmn5O1rA3LNro7VZdUiRJ_vJHOXdrNGY6lLPOMQ"
const testword="dogs"
var keyword1="";
var Keyword2="";
var picCount= 0;

app.innit = () =>{
    app.getKeyword1();
    app.getKeyword2();
    app.submit();
}
app.getKeyword1 = () =>{
    $("#submitKeyword1").on('click', function(){
        $(".display").empty();
        $(".keyword1").empty();
        keyword1= $('#keyword1').val();
        console.log("Your first key word is: ", keyword1);
        htmlkeyword1=`<h3>The first word is: ${keyword1}</h3>`;
        $(".keyword1").append(htmlkeyword1);
        

    })
}

app.getKeyword2 =() => {
    $("#submitKeyword2").on('click', function(){
        $(".display").empty();
        $(".keyword2").empty();
        keyword2= $('#keyword2').val();
        console.log("Your second key word is: ", keyword2);
        htmlkeyword2=`<h3>The filter word is: ${keyword2}</h3>`;
        $(".keyword2").append(htmlkeyword2);

    })
}

app.submit =()=>{
    $("#submitButton").on('click', function(){
        if(keyword1 == "" || keyword2 == ""){
            alert('Error! Please enter both keywords!')
        }
        else{
            app.searchKeyword();
        }

        
    })
}


app.searchKeyword = () => {
    console.log("test :" + keyword1)
    $.ajax({
        url: 'https://api.unsplash.com/search/photos?per_page=100&query='+keyword1+'&client_id='+clientID,
        method: 'GET',
        dataType: 'json',
    }).then(Result => {
        console.log("test return: " + Result)
        console.log(Result)
        app.displayPics(Result)
})}



app.displayPics =(Result) =>{
    picCount= 0;
    console.log("display test:"+ Result)
    console.log(Result)
    Result.results.forEach(Pic => {
        Pic.tags.forEach(tag => {
            if (tag.title == keyword2)
                {
                console.log("endpoint test: " + Pic.urls.raw)
                htmlstring1=`<img src="${Pic.urls.raw}" height=200 width=200>`
                $(".display").append(htmlstring1);
                picCount = picCount +1;
                }

            })


            
        
        
    });
    if (picCount == 0){
        htmlstringError =`<h3>No pictures with both tags</h3>`
        $(".display").append(htmlstringError);
    }

}

$(function(){
    app.innit();
    
})