const formInput =document.getElementById('color-form');
let baseUrl="https://www.thecolorapi.com";
const footer = document.getElementById('footer');
const main = document.getElementById('main');
const alert = document.querySelector('.alert');



window.addEventListener('load', getColorApi())
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
    
    fetch(baseUrl + '/scheme?hex='+inputColor+'&mode='+mode)
    .then(Response=>Response.json())
    .then((data)=>{
        let dataColors = data.colors;
        dataColors.map((color)=>{
            newColors.push(color.hex.value);
            
        });
        setColors(newColors);
    })

}


// *** this function responsible for seeting colors in view
function setColors(colors){
    for(let i=0; i<colors.length; i++){
        document.getElementById('color'+i).style.backgroundColor = colors[i];
        document.getElementById('color'+i).value=colors[i]
        document.getElementById('code'+i).textContent=colors[i];
        document.getElementById('code'+i).value=colors[i];
    }
}

// and this event listener will responsible for comying the color and showing the alert message
document.addEventListener('click',(e)=>{

    if(e.target.parentElement==main|| e.target.parentElement==footer){
        let x=e.clientX-40;
        let y=e.clientY-60;
        alert.style.top=y+'px';
        alert.style.left=x+'px';
        navigator.clipboard.writeText(e.target.value);

        alert.classList.add('show-message')
        setTimeout(function(){
            alert.classList.remove('show-message')
        },500)
    }

})