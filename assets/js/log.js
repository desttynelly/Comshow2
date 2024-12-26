



document.querySelector(".goo").addEventListener("click", function(){

    // document.querySelector(".name").classList.add("active")
    // document.querySelector(".email").classList.remove("active")
    // document.querySelector(".password").classList.add("active")

    // window.alert("Signing up............ please wait")

    document.querySelector(".comm").classList.add("active")

    setTimeout(function(){
        document.querySelector(".comm").classList.remove("active")
    }, 2000);
})