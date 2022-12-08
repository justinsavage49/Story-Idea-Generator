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
