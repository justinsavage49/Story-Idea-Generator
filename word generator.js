const express = require('express')
const { request } = require('node:http')
const app = express()
const http = require('node:http')
var serv = require('http').Server(app)
var vm = require("vm");
var fs = require("fs");




filePath = 'https://kit.fontawesome.com/a076d05399.js'

preArray = ['The Tale of', 'Diaries of', 'A Story About', 'The Sisterhood of', 'It all Started with',
'The Mystery of', 'Long ago,', 'A Short Read About', 'The Book of', 'The Bible, Explaining', 'a Volume Detailing',
'The Prophecy about', 'In Memory of', 'A Respectful Salute to', 'The mistakes of', 'A riveting tale of', 'Jeremy, and',
`Brandon's demise, and`, `The case of`, 'Without further ado..', 'A cautionary tale of']

artArray = ['the', 'a', 'when', 'how', 'where']

aDescArray = ['Surprised', 'Fickle', 'Raging', 'Pickled', 'Steamy', 'Salted', 'Stifled', 'Cowardly',
'Rambunctious', 'Scared', 'Chadly', 'Horned', 'Snide', 'Longitudinal', 'Dastardly', 'Determined',
'Sharpened', 'Wilted', 'Simple', 'Greedy','Gliding', 'Heinous', 'Savory', 'Pompous', 'Disrespectful',
'Lousy', 'Sinister', 'Chipper', 'Pernicious', 'Harmless', 'Trustworthy', 'Psychotic', 'Destructive',
'Noble', 'Knighted', 'Religious', 'Salivating', 'Stinky', 'Jacked', 'Built', 'Mangled', 'Conspicuous',
'GOATed', 'Pilfered', 'Haunted', 'Glowing', 'Theoretical', 'Sickly', 'Stationary', 'Dull', 'Sparkling',
'Stately', 'Catholic', 'Savage', 'Damp', 'holy', 'Lethal', 'Magic', 'Married', 'Veiny', 'Particular',
'Vascular', 'Hairy', 'Spicy', 'Dreamy', 'Special', 'Feline', 'Derelict', 'Lonely', 'Failed', 'Moldy',
'Flattered', 'Lanky', 'Lethargic', 'Manic', 'Calcified', 'Frenzied', 'Spoiled', 'Balding',
'Platonic', 'Slippery', 'Stern', 'Red-faced', 'Weathered', 'Dank', 'Sheepish', 'Ethereal', 'Feverish',
'Mighty', 'Arboreal', 'Non-commital', 'Grafted', 'Grandiose', 'Miraculous', 'Woeful', 'Shouting',
'Cylindrical', 'Comical']

anDescArray = ['Imaginary', 'Uncanny', 'Insignificant', 'Unforgettable', 'Unsanitary', 'Unremarkable', 
'Unsightly', 'Aggressive', 'Unreasonable', 'Apologetic', 'Alcoholic', 'Unrelenting', 'Appetizing',
'Aggravating', 'Excruciating', 'Involuntary', 'Enlightening', 'Unlikely', 'Orange', 'Almighty', 
'Encompassing', 'Untrainable', 'Incomplete', 'Apprehensive', 'Electrified', 'Insufferable', 'Iconic', 
'Unkempt', 'Incredible', 'Insufferable', 'Astounding', 'Industrious', 'Insideous']

subArray = ['Cathedral', 'Corndog', 'Spatula', 'Anus', 'Esophagus', 'Tickler', 'Lavatory', 'Loser',
'Diaper', 'Snatcher', 'Barnacle', 'Piece of Rubbish', 'Diglett', 'Employee', 'Politician', 'Sphincter',
'Raspberry', 'Limiter', 'Cactus', 'Apothecary', 'Garden', 'Expendenture', 'Accusation', 'Lacerator',
'Electron', 'Reactionary', 'Cigarette', 'Criminal', 'Inflated Bag', 'Dessert', 'Man-Eater', 'Cardigan',
'Duck', 'Squirtle', 'Sperm Whale', 'Light Bulb', 'Lamb', 'Snail named Chester', 'Lone Fingernail', 'Tuba',
'Dilemma', 'Arbitration', 'Litigator', 'Mango', 'Theory Crafter', 'Individual', 'Sagittarius', 
'Narcissist', 'Courteous Fellow', 'Star Wars Fan', 'Canteloupe', 'Gratitude', 'Orangutan', 'Protagonist',
'Neck Beard', 'FBI Agent', 'Activist', 'Political Warrior', 'Scammer', 'In-Law', 'Fermenter',
'Explanation', 'Sympathizer', 'Mother', 'Courier', 'Alpaca', 'Object', 'Trebuchet', 'ClapTrap',
'Silent Child', 'Dumpster', 'Milkman', 'Predator', 'Soldier', 'Crossing Guard', 'School Teacher',
'Marital Counselor', 'Burglar', 'Walnut', 'Arsen', 'Octopus', 'Camel', 'Bum', 'Camper', 'Lifeguard',
'Ex-Boyfriend', 'Kindrick', 'Recursion']

postPreArray = ['who', 'that', 'and how somebody', 'that, to put it Nicely,', 'that, quite Frankly,']

postArray = ['heard God', 'went all Wrong', 'heard a Sound', 'crashed and Burned', 'hurt a Flower', 'baked a Cake',
'felt Salvation within','scared Many', 'felt Important', 'felt Angry', 'had a Rough Time', 'hid from the World',
'made Millions', 'passed Secret Gas', 'was closed for the Season', 'saved Society', 'danced until Sunset', 
'spoke only in Tongues', 'had a Bad Attitude', 'became Sentient', 'cried like a Child', 'freaked Out', 
'withheld Information', 'remained within Reason', 'amazingly Survived', 'took the World on for Size', 
'caught the Plague', 'gained Knowledge', 'became quite Wise', `didn't make a Friend`, 'remained a Legend',
'cancelled a Stranger', 'fought like Popeye', 'made Amends with Alfred', 'stayed up Late', 'gave everything for Love',
`hadn't eaten Recently`, 'saluted the Flag', 'saved an insect', 'repeated a past Mistake', 'coughed Randomly',
'made a day Special', 'sold away the Seeds', 'managed to Thrive', 'had enough of Society', `didn't have a Great Evening`,
'snuck up on a Horse', 'maintained Control', 'sat near the back Row', 'stumbled down some Steps', 'ate a Carrot',
'saved room for Dinner', `didn't take Yes for an Answer`, 'Refused a glass of Wine', 'called off Work', 'remained Insecure',
'did it for the Cause', 'salvaged a Blade', 'got better at Nothing', 'bought too many Friends', 'ate without Silverware',
'invented the Rake', 'stole valuable Candles', 'disliked Rain', 'saved the best for Last', `can't leave things Alone`,
'scythed a Lawn', 'kept a Skittle stash hidden away', `couldn't hear Plants`, 'stayed home in Episode 4', 'made amends in Season 2',
'spilled a glass of Milk', 'planned a Heist', 'made a fool out of Brandon', 'looked sternly to the Side', 'had amazing Features',
'cleaned Windows', 'upset a whole Generation', 'found a reason to Knit', 'held a pencil Menacingly', 'received a phone call',
'captured a bird', 'drank from a dirty cup', 'managed to swallow a whole plum', 'finished a burger', 'created a mediocre recipe',
'charged through a hallway', 'liked a Facebook comment', 'shook hands with the president', 'juiced a pear', 'weaved six baskets',
'overcharged a credit card', 'shook the baby', 'surrendered a fine satchel', 'claimed nobody saw it', 'chose to stay in bed',
'denied accusations of yawning', 'had a slimy friend', 'wished upon a star', 'made friends with a squirrel']

function RandNum(array) {
    return Math.floor(Math.random() * array.length)
}

app.get('/generator', (req, res) => {
    let adj = 1
    a = false
    skip_a = false
    an = false
    when_how = false
    pre_word = false

    // 1/4 chance for pre-phrase. The pre-phrase always requires a post-phrase.
    if (Math.floor(Math.random() * 4) == 0){
        word0 = preArray[RandNum(preArray)]
        pre_word = true
    }else{
        word0 = ''
    } 

    // Pick article. This will determine if a pronoun is required before the final phrase. 
    word1 = artArray[RandNum(artArray)]
    if (word1 == artArray[1]){
        a = true
    } 
    if (word1 == artArray[2] || word1 == artArray[3] || word1 == artArray[4]){
        when_how = true;
    }

    // Pick adjective(s). 2/3 chance of using 'a' compatible adjectives, weighted due to array size. 
    rand = Math.floor(Math.random() * 3)
    if (rand < 2){
        word2 = aDescArray[RandNum(aDescArray)]
    }else{
        an = true
        word2 = anDescArray[RandNum(anDescArray)] 
    }
    if (adj == 2) {
            do {
                adj = anDescArray[RandNum(anDescArray)]
            } while (adj != word2)
    }else{
        adj = ''
    }

    // Insert 'a' or 'an' depending on adjective choice.
    if (an == true && word1 != artArray[1]){
        modWord = 'an'
        if (word1 == artArray[0] || word1 == artArray[1]){
            word1 = ''
        }
    }
    else if (an == true && word1 == artArray[1]){
        modWord = ''
        word1 = 'an'
    }else{
        modWord = 'a'
        if (word1 == artArray[0] || word1 == artArray[1]){
            word1 = ''
        }
    }

    // Select a Noun
    word3 = subArray[RandNum(subArray)]

    // Determine if a post-phrase needs to happen, and if a pronoun is required depending on the first article selection.
    if (when_how == true){
        word4 = ''
        word5 = postArray[RandNum(postArray)]
    }
    else if (pre_word == true){
        word4 = postPreArray[RandNum(postPreArray)]
        word5 = postArray[RandNum(postArray)]
    }
    else if (pre_word == false && when_how == false){
        if (Math.floor(Math.random() * 3) == 0){
        word4 = postPreArray[RandNum(postPreArray)]
        word5 = postArray[RandNum(postArray)]
        }else{
            word4 = ''
            word5 = ''
        }
    }

    res.json(`${word0} ${word1} ${modWord} ${adj} ${word2} ${word3} ${word4} ${word5}`)
})

app.listen(3100)

const {Client} = require('pg')
const path = require('node:path')
app.use('/', express.static(__dirname + '/'))
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static('./static'))

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/word_generator.html')
})

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/styles.css')
})

/*
function DbConnect(){
    const client = new Client({
        host: "localhost",
        user: "postgres",
        post: 5432,
        password: "",
        database: "webdata",
    })
    return client
}

function postgresSelect(){
    client = DbConnect()
    client.connect()
    client.query( 'SELECT * FROM worddata', (err, res) => {
       if (!err) {
           data = res.rows
           console.log(data)  
       } else {
       console.log(err)
       }
    client.end()
    })
}

function postgresInsert(wordType, dataString) {
    client = DbConnect()
    client.connect()
    client.query(`INSERT INTO worddata(${wordType}) VALUES ($1)`, [`${dataString}`], (err, res) => {
       if (err){
          console.log(err.message)
       }
       client.end()
    })
}

function pselect () {
    client = DbConnect()
    client.connect()
    client.query( 'SELECT * FROM worddata', (err, res) => {
    if (!err) {
        data = res.rows

    } else {
   console.log(err)
    }
    client.end()
    })
}
*/