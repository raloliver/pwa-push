const tasks = {
    data: []
}

const updateTasks = () => {
    console.info('Observe watch changes...')
    Array.observe(tasks.data, (changes) => {
        let index = null
        let value = ''
        let status = null
        console.warn(changes)
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