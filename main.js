import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://tell-me-more-b9400-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const secretListInDB = ref(database, "secretList")

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-btn')
const secretListEl = document.getElementById('secret-list')

addButtonEl.addEventListener('click', function() {
    let inputValue = inputFieldEl.value

    push(secretListInDB, inputValue)

    clearInputFieldEl()
})

onValue(secretListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())

        clearSecretListEl()

        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i]
            let currentItemID = itemArray[0]
            let currentItemValue = itemArray[1]

            appendItemToSecretListEl(currentItem)
        } 
    } else {
        secretListEl.innerHTML = 'Nothing in here yet....'
    }
})

function clearSecretListEl() {
    secretListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToSecretListEl(item) {
    let itemID = item[0] 
    let itemValue = item[1]

    let newEl = document.createElement('li')

    newEl.textContent = itemValue

    newEl.addEventListener('click', function() {
        let exactLocationOfItemInDB = ref(database, `secretList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })
    secretListEl.append(newEl)
}
