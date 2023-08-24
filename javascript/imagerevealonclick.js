function revealImageOnClick(clicked_id) {
    var button = document.getElementById(clicked_id);
    var img = button.previousElementSibling;

    console.log(button.classList.contains("active"));
    if(button.classList.contains("active")) {
        button.classList.remove("active");
        img.classList.remove("active");
        button.textContent = "See Image";

        console.log("Image hidden");
    }
    else {
        button.classList.add("active");
        img.classList.add("active");
        button.textContent = "Hide Image";

        console.log("Image revealed");
    }
    
}