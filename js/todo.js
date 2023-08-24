const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content 
const fragment = document.createDocumentFragment()

//Variable global para las tareas como objecto
let tareas = {  }

//Agregar los eventos 
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
}) 

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
        if (Object.values(tareas).length === 0) {
            listaTareas.innerHTML = /*html*/`
            <div class="mt-2" id="lista-tareas">
                <div class="alert alert-dark text">No pending task</div>
            </div>
        `
        return
    }
    listaTareas.innerHTML = ''
    Object.values(tareas).forEach((tarea) => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.textContent
        if(tarea.estado) {
            clone.querySelectorAll('.fas')[0].classList.replace('fa-circle-check', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}
