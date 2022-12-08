bookName = document.getElementById('name')
genButton = document.getElementById('btn')
soundswitch = document.getElementById('volume')

sound = true

function fixString(string) {
        string = string.substring(1, string.length - 1)
        string = string.trim()
        string = string.toLowerCase()
        string = string.charAt(0).toUpperCase() + string.slice(1)
        return string  
}

async function nameGenerator() {
    const response = await fetch('/generator')
    await response.json()
    .then(json => {
        let name = JSON.stringify(json)
        name = fixString(name)
        bookName.innerHTML = `"${name}."`
        if (sound == true){
            var voice = new SpeechSynthesisUtterance();
            voice.text = name
            window.speechSynthesis.speak(voice);
        }
        console.log(Math.floor(Math.random() * 3))
    })
}

soundswitch.addEventListener("click", () => {
    if (sound == true){
        soundswitch.classList.remove('fas', 'fa-volume-up')
        soundswitch.classList.add('fas', 'fa-volume-mute')
        sound = false
    }else{
        soundswitch.classList.remove('fas', 'fa-volume-mute')
        soundswitch.classList.add('fas', 'fa-volume-up')
        sound = true
    }
})

if (sound == false) {
    soundswitch.classList.remove('fas', 'fa-volume-up')
    soundswitch.classList.add('fas', 'fa-volume-mute')
    sound = false

}

genButton.addEventListener('click', nameGenerator)

var romanToInt = function(s) {
    length = s.length
    var value = 0

    for (i = 0; i < length; i++) {
        if (i != 0) {
            before = i - 1
        }
        if (s.charAt(i) === 'I'){
            value += 1
        }
        else if (s.charAt(i) === 'V'){
            value += 5
            if (i != 0 && s.charAt(before) === 'I') {
                value -= 2
            }
        }
        else if (s.charAt(i) === 'X'){
            value += 10
            if (i > 0 && s.charAt(before) === 'I') {
                value -= 2
            }
        }
        else if (s.charAt(i) === 'L'){
            value += 50
            if (i != 0 && s.charAt(before) === 'X') {
                value -= 20
            }
        }
        else if (s.charAt(i) === 'C'){
            value += 100
            if (i != 0 && s.charAt(before) === 'X') {
                value -= 20
            }
        }
        else if (s.charAt(i) === 'D'){
            value += 500
            if (i != 0 && s.charAt(before) === 'C') {
                value -= 200
            }
        }
        else if (s.charAt(i) === 'M'){
            value += 1000
            if (i != 0 && s.charAt(before) === 'C') {
                value -= 200
            }
        }

    }
    return value
}

console.log(romanToInt('IV'))