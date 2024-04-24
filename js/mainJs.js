//External
$(".email-slides").slick({
     slidesToShow: 3,
     slidesToScroll: 1,
    // variableWidth:true,
   //  draggable:true,
   arrows:true,
   vertical:true
});
$(".picture-slides").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    //centerMode:true,
  arrows:true,
  //vertical:true
  responsive:[
{   
     breakpoint:500,
    settings: {
        slidesToShow: 1
    }
}
  ]
});
//Constants
const isEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const picX = 200;
const picY = 300;
let imageEmailArray = [];
//Class Definitions
class emailAccount{
    constructor(email){
        this.email =email;
        this.images = [];
    }
}
function validateEmail(){
    let emailValue = document.querySelector(".email-input").value;
    emailValue = emailValue.trim();
    if(emailValue === "")
    {
        showDialog("You didn't enter a value in email");
        return false;
    }
    else if(isEmail.test(emailValue)){
        return true;
    }
    showDialog("The email was invalid; emails should have the form of 'something@somethingelse.com'");
    return false;
        
    
}
function addEmail(currentEmail){
    let emptySlides = document.querySelectorAll(".slick-slide:not(.slick-cloned) .empty");
    //let emptySlide = undefined;
    // for(let i = 0;i<slides.length;i++){
    //     if(slides[i].innerHTML === ""){
    //         emptySlide = slides[i];
    //         break;
    //     }
    // }
    if(emptySlides.length !== 0){
        $(".email-slides").slick('slickRemove',0);
    }
    $(".email-slides").slick('slickAdd','<div><div class="email"><span>'+ currentEmail +'</span></div>');
    //else{

    //    let test = emptySlides[0].children[0];
    //     emptySlides[0].children[0].innerHTML = currentEmail;
    //     emptySlides[0].classList.remove("empty");
   // }
    
}
function addImageToAccount(currentAcc,src){
    currentAcc.images.push(src);
    seed = Math.floor( Math.random()*1000);
    src ="https://picsum.photos/seed/"+seed+"/200/300";
    image.src = src;

    return src;
}
function getAccount(email){
   return imageEmailArray.find((item)=>item.email ===email);
}
function reassignCentralEmail(){
    let selectedEmails = document.querySelectorAll(".slick-active");
    let selectedEmail;
    if(selectedEmails === undefined || selectedEmails.length===0){
        return;
     }
         else if(selectedEmails.length == 2)
         {
             selectedEmail = selectedEmails[1];
         }
         else if(selectedEmails.length == 1){
             selectedEmail = selectedEmails[0];
         }
         else{
             selectedEmail = selectedEmails[1];
         }
         for(let i =0; i<selectedEmails.length;i++){
            selectedEmails[i].classList.remove("central");
         }
         let addButtonLoc = document.querySelector(".add-btn");
         if(!selectedEmail.children[0].classList.contains("empty")){

         selectedEmail.classList.add("central");
         
         addButtonLoc.classList.add("make-visible");
        }
        else{
            addButtonLoc.classList.remove("make-visible");
        }
}
function changeToSlide(slideName){
    let selectedEmails = document.querySelectorAll(".slick-slide:not(.slick-cloned) .email span");
    for(let i=0;i<selectedEmails.length;i++){
        if(slideName === selectedEmails[i].innerHTML){
            $(".email-slides").slick('slickGoTo',i-1);
        }
    }
}
function changeToSlideActive(slideName){
    let selectedEmails = document.querySelectorAll(".slick-active .email span");
    for(let i=0;i<selectedEmails.length;i++){
        if(slideName === selectedEmails[i].innerHTML){
            $(".email-slides").slick('slickGoTo',i-1);
        }
    }
}
function showDialog(message){
    let locDialog = document.querySelector(".error-dialog");
    let locFilter = document.querySelector(".full-filter");
    let locDialogContent = document.querySelector(".error-dialog p");
    locDialog.classList.add("reveal-hidden");
   locFilter.classList.add("reveal-hidden");
    locDialogContent.innerHTML = message;
}
function updateImages(){
    let selectedEmails = document.querySelectorAll(".slick-active .email span");
    let selectedEmail;
if(selectedEmails === undefined || selectedEmails.length===0){
   return;
}
    else if(selectedEmails.length == 2)
    {
        selectedEmail = selectedEmails[1];
    }
    else if(selectedEmails.length == 1){
        selectedEmail = selectedEmails[0];
    }
    else{
        selectedEmail = selectedEmails[1];
    }

    let emailAddress = selectedEmail.innerHTML;
    let account = getAccount(emailAddress);

    let  displayedSlides = document.querySelectorAll(".user-image").length;
    //Remove all slides
    for(let i =displayedSlides-1;i>=0;i--){
        $(".picture-slides").slick('slickRemove',i);
    }
    if(account != undefined){

        
        for(let i =0;i<account.images.length;i++){
            let accountImage = account.images[i];
            $(".picture-slides").slick('slickAdd','<div><div class="user-image"><img src="'+ accountImage +'"></div>');
            
        }
    }
}
//Element Variables
let submitButton = document.querySelector(".submit");
let emailInput = document.querySelector(".email-input");
let emailValue = $(".email-input").val();
let image = document.querySelector(".main-panel .image-container img");
let dialog = document.querySelector(".error-dialog");
let filter = document.querySelector(".full-filter");
let pictures = document.querySelector(".picture-slides");
let popupImage = document.querySelector(".full-filter .image-container img");
let popupImageContainer = document.querySelector(".full-filter .image-container");
let seed = Math.floor( Math.random()*1000);
let newSrc ="https://picsum.photos/seed/"+seed+"/200/300";
    let currentEmail;
    let currentAccount;

//Initial image
image.src = newSrc;

//Listeners
submitButton.addEventListener('click',()=>{
    

    if(validateEmail()){
        currentEmail = document.querySelector(".email-input").value;
        currentEmail = currentEmail.toLowerCase();
        currentAccount = imageEmailArray.find((item)=>item.email ===currentEmail);
        if(currentAccount===undefined){
            imageEmailArray.push(new emailAccount(currentEmail));
            currentAccount = imageEmailArray.find((item)=>item.email ===currentEmail);
            addEmail(currentEmail);
           // $(".email-slides").slick('slickAdd','<div><div class="email"><span>'+ currentEmail +'</span></div>');
            
        }

        //currentAccount = imageEmailArray.find((item)=>item.email ===currentEmail);
        // currentAccount.images.push(newSrc);
        // seed = Math.floor( Math.random()*1000);
        // newSrc ="https://picsum.photos/seed/"+seed+"/200/300";
        // image.src = newSrc;
        newSrc = addImageToAccount(currentAccount,newSrc);
        changeToSlide(currentEmail);
        updateImages();
        reassignCentralEmail();
    }

});
let addButton = document.querySelector(".add-btn");

addButton.addEventListener('click',()=>{
    let selected = document.querySelector(".slick-active.central .email span");
    let selected1 = document.querySelector(".central");
    currentEmail = selected.innerText;
    currentAccount = imageEmailArray.find((item)=>item.email ===currentEmail);
    if(currentAccount!=undefined){
        newSrc = addImageToAccount(currentAccount,newSrc);
        updateImages();
    }
})


let prevButton = document.querySelector(".slick-prev");
let nextButton = document.querySelector(".slick-next");
let slidesContainer = document.querySelector(".email-slides");

//prevButton.addEventListener('click',()=> updateImages());
slidesContainer.addEventListener('click',(e) => {
 //   let innerSpan;
    if(e.target.classList.contains("slick-prev") ||e.target.classList.contains("slick-next")){
        updateImages();
        
        reassignCentralEmail();
    }
    // if(e.target.classList.contains("email")){
    //     changeToSlideActive(e.target.innerText);
    //     updateImages();
        
    //     reassignCentralEmail();
    // }
});


//ZOOM FUNCTIONALITY


pictures.addEventListener('click',(e)=>{
    if(e.target.parentNode.classList.contains("user-image")){
        popupImage.src = e.target.src;
        filter.classList.add("reveal-hidden");
        popupImageContainer.classList.add("reveal-hidden");
    }
  
});
filter.addEventListener('click',()=>{
    filter.classList.remove("reveal-hidden");
    popupImageContainer.classList.remove("reveal-hidden");
    dialog.classList.remove("reveal-hidden");
});
 //Test
//  let testButton = document.querySelector(".testbtn");
//  testButton.addEventListener('click',(e)=>{
//     e.preventDefault();
//     $(".email-slides").slick('slickGoTo',0);
//  })