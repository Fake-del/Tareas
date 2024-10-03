const input = document.querySelector("input");//seleccionar todos los elementos que vamos utilizar en este caso el input
const addBtn = document.querySelector(".btn-add");//boton para añadir una tarea
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();//para que no se regargue la pagina

    const text = input.value.trim();//Cuando se pique el botón va agarrar el valor que este actualmente en el input y lo va guardar en la variable
    
    if(text !== ""){
    
    const li =document.createElement("li");//
    const p = document.createElement("p");//para crear un parrafo que tendra el li
    p.textContent = text; 

    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);//en este punto ya sale la tarea

    // Añadir evento para marcar como completada
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });


    input.value = "";//cada vez que piquemos el boton de dañir se hara blanco
    empty.style.display ="none";//como ya hay elemntos en la vista esto ayuda para que ya no se vea el parrafo, de no tienes pendientes
    }//va checar que el valor de input no sea blanco, y hara las instrucciones si no esta en blanco
    else{
        alert("¡Por favor, ingresa una tarea!");
    }
});

function addDeleteBtn(){//para que el codigo no este todo amontonado
    const deleteBtn = document.createElement('button');//el booton que vamos a crear

    deleteBtn.textContent = "X";//para que funcione como x
    deleteBtn.className = "btn-delete";//agregaremos una clase para que se ve a bonito

    deleteBtn.addEventListener('click', (e) => {//agregamos el listener aqui ya que luego sera mas dificil
        const item = e.target.parentElement; /*e.target se refiere al boton, lo que queremos 
        eliminar es el elemento de arriba el que lo contiene para eso usamo el elemnto parentElement que es como el elemnto papá el que contiene el item */
         ul.removeChild(item);//para poder elimar tenemos que liminarlo desde el papa, 

         const items = document.querySelectorAll("li");//checar cuando no hay elementos volvera aparecer el parrafo
         if(items.length === 0){
            empty.style.display = "block";
         }
    });
    return deleteBtn;
}