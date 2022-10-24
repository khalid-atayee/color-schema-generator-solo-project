const formInput =document.getElementById('color-form');
let inputField = document.getElementById('color');
formInput.addEventListener('submit',(event)=>{
    // document.getElementById('code1').innerHTML= `<h1>khalid</h1>`;

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
        // let color = colors[i];
        document.getElementById('color'+i).style.backgroundColor = colors[i];
        // console.log(color)
        document.getElementById('code'+i).textContent=colors[i];
    }

}