// app.js

const input = document.querySelector("input"); // seleccionar el input
const addBtn = document.querySelector(".btn-add"); // botón para añadir una tarea
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

// Función para agregar una nueva tarea
const agregarTarea = async (descripcion) => {
    try {
        const response = await fetch('http://localhost:3000/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar la tarea');
        }

        const tarea = await response.json();
        agregarTareaALista(tarea.descripcion);
    } catch (error) {
        console.error(error);
        alert('Hubo un problema al agregar la tarea');
    }
};

// Función para agregar la tarea a la lista en el DOM
const agregarTareaALista = (descripcion) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = descripcion;

    li.appendChild(p);
    li.appendChild(addDeleteBtn(li)); // Pasar el li al botón de eliminar
    ul.appendChild(li);

    // Añadir evento para marcar como completada
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    empty.style.display = "none"; // Ocultar el mensaje de vacío
};

// Evento del botón agregar tarea
addBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el envío del formulario

    const text = input.value.trim();
    if (text !== "") {
        agregarTarea(text); // Llamar a la función para agregar la tarea
        input.value = ""; // Limpiar el input
    } else {
        alert("¡Por favor, ingresa una tarea!");
    }
});

// Función para crear el botón de eliminar
function addDeleteBtn(li) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation(); // Evitar que el evento se propague al li
        const item = li; // El elemento li a eliminar
        const id = item.dataset.id; // Asumimos que guardamos el ID de la tarea en un atributo data-id

        try {
            const response = await fetch(`http://localhost:3000/tareas/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }

            ul.removeChild(item); // Eliminar el elemento de la lista

            const items = document.querySelectorAll("li");
            if (items.length === 0) {
                empty.style.display = "block"; // Mostrar mensaje si no hay tareas
            }
        } catch (error) {
            console.error(error);
            alert('Hubo un problema al eliminar la tarea');
        }
    });

    return deleteBtn;
}

// Función para cargar tareas al inicio
const cargarTareas = async () => {
    try {
        const response = await fetch('http://localhost:3000/tareas');
        const tareas = await response.json();
        tareas.forEach(tarea => agregarTareaALista(tarea.descripcion));
    } catch (error) {
        console.error('Error al cargar tareas:', error);
    }
};

// Cargar tareas al iniciar la aplicación
document.addEventListener('DOMContentLoaded', cargarTareas);
