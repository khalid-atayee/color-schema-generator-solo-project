const formInput =document.getElementById('color-form');
const baseUrl="https://www.thecolorapi.com/";
const footer = document.getElementById('footer');
const main = document.getElementById('main');
const alert = document.querySelector('.alert');
let main_content,footer_content;


window.addEventListener('load', getColorApi)
formInput.addEventListener('submit',(event)=>{

    event.preventDefault();
    getColorApi();
});

// **** this function responsible for getting data from input fields and fetching data from api  ****
function getColorApi(){
    let newColors = [];
    const fromData = new FormData(formInput);
    let inputColor = fromData.get('color');
    let mode = fromData.get('mode');
    inputColor=inputColor.slice(1);
    
    fetch(baseUrl + 'scheme?hex='+inputColor+'&mode='+mode)
    .then(Response=>Response.json())
    .then((data)=>{
        let dataColors = data.colors;
        dataColors.map(color=>newColors.push(color.hex.value));
        setColors(newColors);
    })
}

// *** this function responsible for setting colors in the view
function setColors(colors){
    main_content='';
    footer_content='';
    for(let i=0; i<colors.length; i++){
        main_content +=`<div  data-id="${colors[i]}" style="background-color:${colors[i]}" class="color-container"></div>`; 
        footer_content+=`<p data-id="${colors[i]}" class="color-code">${colors[i]}</p>`;
    }
    main.innerHTML=main_content;
    footer.innerHTML=footer_content;
}

// and this event listener will responsible for comying the color and showing the alert message
document.addEventListener('click',(e)=>{

    if(e.target.parentElement==main|| e.target.parentElement==footer){
        let x=e.clientX-40;
        let y=e.clientY-60;
        alert.style.top=y+'px';
        alert.style.left=x+'px';
        navigator.clipboard.writeText(e.target.dataset.id);

        alert.classList.add('show-message')
        setTimeout(function(){
            alert.classList.remove('show-message')
        },500)
    }

})









/*  this is another way of doing this basic project just follow the instructions.
    and  this way is not the best best practice but its good to know how it works, becuase it may help you in another project***

*/ 


/*  put this inside main 
 <div id="color0" class="color-container"></div>
<div id="color1" class="color-container"></div>
<div id="color2" class="color-container"></div>
<div id="color3" class="color-container"></div>
<div id="color4" class="color-container"></div> 

*/

/* put this inside footer 
 <p id="code0" class="color-code"></p>
<p id="code1" class="color-code"></p>
<p id="code2" class="color-code"></p>
<p id="code3" class="color-code"></p>
<p id="code4" class="color-code"></p> 
 */


// *** and replace these code instead of above code
// function setColors(colors){
//     for(let i=0; i<colors.length; i++){
//         document.getElementById('color'+i).style.backgroundColor = colors[i];
//         document.getElementById('color'+i).value=colors[i];
//         document.getElementById('code'+i).textContent=colors[i];
//         document.getElementById('code'+i).value=colors[i];
//     }
// }

// document.addEventListener('click',(e)=>{

//     if(e.target.parentElement==main|| e.target.parentElement==footer){
//         let x=e.clientX-40;
//         let y=e.clientY-60;
//         alert.style.top=y+'px';
//         alert.style.left=x+'px';
//         navigator.clipboard.writeText(e.target.value);

//         alert.classList.add('show-message')
//         setTimeout(function(){
//             alert.classList.remove('show-message')
//         },500)
//     }

// })
