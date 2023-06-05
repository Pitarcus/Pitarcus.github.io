const filterContainer = document.querySelector(".project-wrapper__filters-category"),
projectItems = document.querySelectorAll(".project-item");
var projectsCategorized = new Array;

document.addEventListener("DOMContentLoaded", createCategoryItems);

function createCategoryItems() {
    projectItems.forEach(function(project) { 
        var labelItems = project.querySelectorAll(".project-wrapper__text-labels > .label");
        var labels = new Array;
        labelItems.forEach(function(item) {
            var label = item.className.replace('label ', '');
            labels.push(label);
        })
        projectsCategorized.push({projectElement: project,labels: labels}); // Items with its labels
    })
}

filterContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("project-filter") && 
    !event.target.classList.contains(".active")) {
        // remove active element
        filterContainer.querySelector(".active").classList.remove("active");
        // select new active element
        event.target.classList.add("active");

        const filterValue = event.target.getAttribute("data-filter");
        
        projectsCategorized.forEach((project)=> {
            if(project.labels.includes(filterValue) || filterValue == "all"){
                project.projectElement.classList.remove("hide");
                project.projectElement.classList.add("show");
            }
            else {
                project.projectElement.classList.remove("show");
                project.projectElement.classList.add("hide");
            }
        })
        updateProjectReveal();
    }
})
