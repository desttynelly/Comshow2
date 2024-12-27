

document.querySelector(".signupb").addEventListener("click", function(){
    window.location = "/signup"
});



document.querySelector("#open").addEventListener("click", function(){

    document.querySelector("#open").classList.add("active");
    document.querySelector("#closee").classList.add("active");

    document.querySelector(".navlinks").classList.add("active");

});


document.querySelector("#closee").addEventListener("click", function(){

    document.querySelector("#open").classList.remove("active");
    document.querySelector("#closee").classList.remove("active");

    document.querySelector(".navlinks").classList.remove("active");
    
});