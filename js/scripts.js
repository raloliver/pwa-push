let tasks = window.localStorage.getItem('tasks') || '{"data": []}'

tasks = JSON.parse(tasks)

const updateTasks = () => {
    console.info('Observe watch changes...')
    Array.observe(tasks.data, (changes) => {
        let index = null
        let value = ''
        let status = null

        //CRUD with observer (+ polyfill)
        if (changes[0].type === 'splice') {
            index = changes[0].index
            value = changes[0].object[index]
            status = (changes[0].addedCount > 0) ? 'created' : 'removed'
        }

        if (changes[0].type === 'update') {
            index = changes[0].name
            value = changes[0].object[index]
            status = updated
        }

        if (!value && status === 'created' && status === 'updated') {
            return
        }

        let taskSpot = document.getElementById('tasks')

        if (status === 'removed') {
            let listTasks = document.querySelectorAll('#tasks li')
            taskSpot.removeChild(listTasks[index])
        }

        if (status === 'created') {
            let newTask = document.createElement('li')
            newTask.innerHTML = value
            taskSpot.appendChild(newTask)
        }

        if (status === 'updated') {
            console.warn('#TODO')
        }

        window.localStorage.setItem('tasks', JSON.stringify(tasks))
    })
}

const addTask = () => {
    let input = document.querySelector('#form-add input[type="text"]')
    let desc = input.value

    tasks.data.push(desc)

    input.value = ''
}

//init
updateTasks()

document.addEventListener('DOMContentLoaded', (event) => {
    //fixed array problem
    let listTasks = document.getElementById('tasks')
    let listContent = ''

    for (let index = 0; index < tasks.data.length; index++) {
        listContent += `<li>${tasks.data[index]}</li>`
    }

    listTasks.innerHTML = listContent

    //add task and clean form
    let formAdd = document.getElementById('form-add')
    formAdd.addEventListener('submit', (event) => {
        event.preventDefault()
        addTask()
    })
})

document.addEventListener('click', (event) => {
    let taskSpot = document.getElementById('tasks')

    if (event.target.parentElement === taskSpot) {
        if (confirm('Gostaria mesmo de concluir essa tarefa?')) {
            let listTasks = document.querySelectorAll('#tasks li')
            listTasks.forEach((item, index) => {
                if (event.target === item) {
                    tasks.data.splice(index, 1)
                }
            })
        }
    }
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then((reg) => {
            console.log('SW Registrado');
        })
        .catch((error) => {
            console.log('Error: ' + error); 
        })
}