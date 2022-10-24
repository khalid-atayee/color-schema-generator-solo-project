const formInput =document.getElementById('color-form');
let inputField = document.getElementById('color');
formInput.addEventListener('submit',(event)=>{

    let newColors = [];
    event.preventDefault();
    const fromData = new FormData(formInput);

    let inputColor = fromData.get('color');
    inputColor=inputColor.slice(1);
    let baseUrl="https://www.thecolorapi.com";

    let mode = fromData.get('mode');

    fetch(baseUrl + '/scheme?hex='+inputColor+'&mode='+mode)
    .then(Response=>Response.json())
    .then((data)=>{
        let dataColors = data.colors;
        dataColors.map((color)=>{
            newColors.push(color.hex.value);
            
        });
        setColors(newColors);
    })

});

function setColors(colors){
    for(let i=0; i<colors.length; i++){
        document.getElementById('color'+i).style.backgroundColor = colors[i];
        document.getElementById('color'+i).value=colors[i]
        document.getElementById('code'+i).textContent=colors[i];
    }

}
document.addEventListener('click',(e)=>{
    console.log()
    if(e.target.parentElement==document.getElementById('main')|| e.target.parentElement==document.getElementById('footer')){

        navigator.clipboard.writeText(e.target.value);
        let count =0;
        document.querySelector('.alert').classList.add('show-message')
        setTimeout(function(){
            document.querySelector('.alert').classList.remove('show-message')
        },1000)
    }

})