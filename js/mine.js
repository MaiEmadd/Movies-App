let response =``;
let responseData;
let apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=d9b244d9b5931b7deac91affc3743dba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

async function getMovies(apiURL){
    let temp = ``;
    response = await fetch(`${apiURL}`)
    responseData = await response.json();

    for(let i = 0 ; i<responseData.results.length;i++){
        let url = `https://image.tmdb.org/t/p/w500${responseData.results[i].poster_path}`
        temp+=`
                <div class="col-md-6 col-lg-4 my-3 ">
                    <div class="movie  shadow position-relative overflow-hidden">
                        <img id="poster" class="img-fluid rounded" src= ${url}>
                        <div class="layer text-center rounded px-3 d-flex flex-column justify-content-center align-items-center">
                            <h3 id="title" class="mb-4">${responseData.results[i].title}</h3>
                            <p id="overview">${responseData.results[i].overview}</p>
                            <p id="rate">rate: ${responseData.results[i].vote_average}</p>
                            <p id="date">${responseData.results[i].release_date}</p>
                        </div>
                    </div>
                </div>
                
            `
    }
    document.getElementById("specialRow").innerHTML=temp;
}
getMovies(apiURL);


$("#toggle").click(function(){

    let width = $(".left").innerWidth();
    let left = $(".right").css("left");
    if(left == "0px"){
        $(".left").animate({left: "0"},500);
        $(".right").animate({left: `${width-10}`},500);
        $("#toggle i").removeClass("fa-align-justify");
        $("#toggle i").addClass("fa-xmark fa-2xl");        
    }
    else{
        $(".left").animate({left: `-${width}`},500);
        $(".right").animate({left: "0"},500); 
        $("#toggle i").addClass("fa-align-justify");
        $("#toggle i").removeClass("fa-xmark"); 
    }
    
})


let contactTop = $("#form").offset().Top;
$("#contactLink").click(function(){
    $("html , body").animate({scrollTop : 4120} , 2000)
})


let searchMovieBar= document.getElementById("searchBar");
searchMovieBar.addEventListener("keyup", function() {
    let usersearch = searchMovieBar.value;
    apiURL = `https://api.themoviedb.org/3/search/movie?api_key=d9b244d9b5931b7deac91affc3743dba&language=en-US&include_adult=false&query=${usersearch}`;
    getMovies(apiURL);
});



let searchWordBar= document.getElementById("searchWord");
searchWordBar.addEventListener("keyup", function() {
    let usersearch = searchWordBar.value;
    apiURL = `https://api.themoviedb.org/3/search/collection?api_key=d9b244d9b5931b7deac91affc3743dba&language=en-US&query=${usersearch}`;
    getMovies(apiURL);
});



$("#sideBar a").click(function(){

    let attr = $(this).attr("id");
    if(attr == "trending"){
        apiURL = `https://api.themoviedb.org/3/trending/all/day?api_key=d9b244d9b5931b7deac91affc3743dba`;
    }
    else{
    apiURL = `https://api.themoviedb.org/3/movie/${attr}?api_key=d9b244d9b5931b7deac91affc3743dba&language=en-US&page=1`;
        }
    getMovies(apiURL);
});




let nameRegex = /^[a-zA-Z0-9]([._-]([._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let ageRegex = /(1[0-9]|[2-9][0-9]|100)/;
let regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
document.getElementById("submitButtonId").disabled = true;

$("#form .form-control").keyup(function(){
    $("#form .btn").prop('disabled', true);

    let field =$(this).attr("id");
    
    if(field == "name"){
        regex = nameRegex
    }
    else if(field == "email"){
        regex = emailRegex
    }
    else if(field == "phone"){
        regex = phoneRegex
    }
    else if(field == "pass"){
        regex = passRegex
    }
    else if(field == "age"){
        regex = ageRegex
    }

    if(regex.test($(this).val()) == false)
    {
        $(this).next().removeClass("d-none");
        $(this).next().addClass("d-block");
    } 
    else 
    {
        $(this).next().removeClass("d-block");
        $(this).next().addClass("d-none");
    }

    if($("#repass").val().length !== 0 && $("#pass").val().length !== 0 && $("#name").val().length !== 0 && $("#email").val().length !== 0 && $("#phone").val().length !== 0 && $("#age").val().length !== 0&&
    $(".alert").hasClass("d-block")==false){
        document.getElementById("submitButtonId").disabled = false;
    }
    
    
});

    
   

$("#repass").keyup(function(){
    if($("#repass").val() != $("#pass").val())
    {
        $("#repass").next().removeClass("d-none");
        $("#repass").next().addClass("d-block");
    }
})



