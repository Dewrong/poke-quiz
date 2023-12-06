

var submission = document.getElementById("answer-input");
submission.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitButton(this.value);
  }
});


//choose a random pokemon from PokeApi
function findId(){
    document.getElementById("answer-input").value = "";
    let safeApiTotal = 903;
    var pokemonId = Math.floor(Math.random() * safeApiTotal);
    //debugging line, swap between real and test
    //var pokemonId = 640;
    document.getElementById("pokemonHiddenNumber").setAttribute("value", pokemonId);
    document.getElementById("hint-1").setAttribute("value", pokemonId);
    document.getElementById("hint-2").setAttribute("value", pokemonId);
    document.getElementById("hint-3").setAttribute("value", pokemonId);
    document.getElementById("submit-button").setAttribute("value", pokemonId);
    //document.getElementById("pokemonHiddenNumber").innerHTML = pokemonId;
    document.getElementById("hint-1").style.display = "inline";
    document.getElementById("hint-1-field").style.display = "none";
    document.getElementById("hint-2").style.display = "inline";
    document.getElementById("hint-2-field").style.display = "none";
    document.getElementById("hint-3").style.display = "inline";
    document.getElementById("hint-3-field").style.display = "none";
    document.getElementById("begin-button").innerHTML = "Try A Different Question?";
    document.getElementById("submit-button").style.display = "inline";
    document.getElementById("answer-box").style.display = "inline";
    document.getElementById("validator").style.visibility = "hidden";
    document.getElementById("validator").innerHTML = "";
}

//first hint finds height and weight
function createFirstHint(id){
    document.getElementById("hint-1-field").style.display = "inline";
    fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
    .then(species => species.json())
    .then(data => {
        document.getElementById("height").innerHTML = ("Height: " + (0.328084 * data.height).toFixed(2) + " ft")
        document.getElementById("weight").innerHTML = ("Weight: " + (0.220462 * data.weight).toFixed(2) + " lbs")
        
    })
}

//second hint finds type and stat spread, uncertain on best way to display it right now
function createSecondHint(id){
    document.getElementById("hint-2-field").style.display = "inline";
    fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
    .then(species => species.json())
    .then(data => {
        const typestring = data.types[0].type.name;
        pokeTypeString = typestring.charAt(0).toUpperCase() + typestring.slice(1)
        if (data.types[1]) {
            let secondType = data.types[1].type.name
            pokeTypeString = typestring.charAt(0).toUpperCase() + typestring.slice(1) + "/" + secondType.charAt(0).toUpperCase() + secondType.slice(1)
        }
        document.getElementById("type").innerHTML = pokeTypeString;

        pokeStatScoreHp = data.stats[0].base_stat;
        document.getElementById("statHP").innerHTML = pokeStatScoreHp;
        pokeStatScoreAtk = data.stats[1].base_stat;
        document.getElementById("statAtk").innerHTML = pokeStatScoreAtk;
        pokeStatScoreDef = data.stats[2].base_stat;
        document.getElementById("statDef").innerHTML = pokeStatScoreDef;
        pokeStatScoreSAt = data.stats[3].base_stat;
        document.getElementById("statSAt").innerHTML = pokeStatScoreSAt;
        pokeStatScoreSDf = data.stats[4].base_stat;
        document.getElementById("statSDf").innerHTML = pokeStatScoreSDf;
        pokeStatScoreSpe = data.stats[5].base_stat;
        document.getElementById("statSpe").innerHTML = pokeStatScoreSpe;
    })
}

async function createThirdHint(id){
    document.getElementById("hint-3-field").style.display = "inline";
    let specimen;
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + id + '/')
    .then(species => species.json())
    .then(data => {
        specimen = data.name;
        console.log(specimen);
        let gamename = data.generation.name;
        gamename = gamename + " ";
        gamename = gamename.split('-').join(" ");
        gamename = gamename.split(' i ').join(" I ");
        gamename = gamename.split(' ii ').join(" II ");
        gamename = gamename.split(' iii ').join(" III ");
        gamename = gamename.split(' iv ').join(" IV ");
        gamename = gamename.split(' v ').join(" V ");
        gamename = gamename.split(' vi ').join(" VI ");
        gamename = gamename.split(' vii ').join(" VII ");
        gamename = gamename.split(' viii ').join(" VIII ");
        gamename = gamename.split(' iv ').join(" IV ");
        gamename = gamename.charAt(0).toUpperCase() + gamename.slice(1);
        document.getElementById("game-released").innerHTML = gamename;
        finishThirdHint(specimen);
    })
    
}

function finishThirdHint(specimen){
        // replace with later https://pokeapi.co/api/v2/pokemon-species/{id or name}/
        fetch('https://pokeapi.co/api/v2/pokemon-species/' + specimen +'/')
            .then(species => species.json())
            .then(data => {
                shape = data.shape.name;
                shape = shape.charAt(0).toUpperCase() + shape.slice(1);
                document.getElementById("shape").innerHTML = shape;
                
            })
}

function submitButton(id) {
    let userInput = document.getElementById("answer-input").value;
    userInput = userInput.toLowerCase();
    let specimen;
    fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
    .then(species => species.json())
    .then(data => {
        specimen = data.species.name;
        console.log(specimen);
        userInput = userInput.split('.').join("");
        userInput = userInput.split(' ').join("-");
        if (specimen == userInput) {
            document.getElementById("validator").style.visibility = "visible";
            document.getElementById("validator").innerHTML = "Correct!";
            document.getElementById("begin-button").innerHTML = "Another Question?";
            document.getElementById("hint-1").style.display = "none";
            document.getElementById("hint-2").style.display = "none";
            document.getElementById("hint-3").style.display = "none";
            document.getElementById("hint-1-field").style.display = "none";
            document.getElementById("hint-2-field").style.display = "none";
            document.getElementById("hint-3-field").style.display = "none";
            document.getElementById("submit-button").style.display = "none";
            document.getElementById("correctAns").value ++;
          } else {
            let errorMessage = "";
            let currentMessage = "";
            document.getElementById("validator").style.visibility = "visible";
            let errors = ["Wrong!", "Incorrect!", "Not Right!"];
            errorMessage = errors[Math.floor(Math.random() * 3)];
            currentMessage = document.getElementById("validator").innerHTML;
            while (currentMessage == errorMessage) {
              errorMessage = errors[Math.floor(Math.random() * 3)];
            }
            document.getElementById("validator").innerHTML = errorMessage;
          }
    })
  }
