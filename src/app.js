const btn = document.querySelector('#btn')
const todos = document.querySelector('.todos')
const input = document.querySelector('#input')

const api = 'http://localhost:8000/todos'

const render = () => {
  fetch(api)
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      const todo = document.createElement('div')
      todo.setAttribute('class', 'todo')

      const delButton = document.createElement('button')
      delButton.setAttribute('class','delete')
      delButton.setAttribute('data-id',item.id)
      delButton.innerHTML = 'Сделано'

      todo.innerHTML = `
        <div>
          <span>${item.title}</span>
        </div>
      `
      todo.append(delButton)
      todos.append(todo)
    })
  })
}

render()

btn.onclick = (e) => {
  let todo = {
    id: null,
    title: input.value
  }
  fetch(api,{
    method: 'POST',
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify(todo)
  })
  input.value = ''
}

const onDelete = (e) => {
  let id = null
  // console.log(e.target.attributes['data-id'].value);
  if(e.target.tagName === 'BUTTON'){
    id = e.target.attributes['data-id'].value
  }
  if(id){
    fetch(`${api}/${id}`,{
      method: 'DELETE'
    })
  }
}
todos.addEventListener('click',onDelete)