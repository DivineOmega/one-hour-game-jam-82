var words = [ 'snow',
              'winter',
              'snowflake',
              'cold',
              'freezing',
              'ice',
              'icicle',
              'anorak',
              'arctic',
              'balaclava',
              'blustery',
              'blizzard',
              'blanket',
              'bitter',
              'chilly',
              'cough',
              'cold',
              'drafty',
              'earmuffs',
              'fire',
              'fireplace',
              'firewood',
              'frostbite',
              'fruitcake',
              'furnance',
              'gingerbread',
              'glacier',
              'gloves',
              'gust',
              'hypothermia',
              'hibernate',
              'heater',
              'hailstone',
              'hockey',
              'iceberg',
              'insulation',
              'jacket',
              'melt',
              'mittens',
              'muffler',
              'nippy',
              'overcoat',
              'overcast',
              'radiator',
              'polar',
              'pullover',
              'scarf',
              'ski',
              'slippery',
              'slush',
              'sneeze',
              'sniffle',
              'shiver',
              'sled',
              'sledge',
              'sleet',
              'stove',
              'storm',
              'thaw',
              'thermometer',
              'turtleneck',
              'whiteout',
              'wind',
              'wintry',
              'windy',
              'woolens']

var word = '';

var charsPressed = [];

var startTime = 30;
var timer = startTime;
var score = 0;

$(document).ready(function() {

    $(document).snowfall({flakeCount : 400, maxSpeed : 5, maxSize : 5});;

    newWord();

    if (!localStorage.highscore) {
        localStorage.highscore = 0;
    }

    setInterval(decreaseTimer, 100);
    setInterval(updateScoreAndTimer, 100);
});

function decreaseTimer() {
    timer -= 0.1;
    if (timer<=0) {
        $('#timer').fadeOut(250).fadeIn(250);
        $('#score').fadeOut(250).fadeIn(250);
        timer = startTime;
        score = 0;
        newWord();
    }
}

function updateScoreAndTimer() {
    $('#timer').html('Time left: '+timer.toFixed(1));
    $('#score').html('Score: '+score+', Highscore: '+localStorage.highscore);
}

function newWord() {
    charsPressed = [];
    var index = Math.floor(Math.random()*words.length);
    word = words[index];
    displayWord();
}

function displayWord() {
    var htmlWord = '';

    var numCharsInWordPressed = 0;

    for(var i = 0; i < word.length; i++) {
        var wordChar = word[i];
        
        if (charsPressed.indexOf(wordChar)!=-1) {
            numCharsInWordPressed++;
            htmlWord += '<span class="selectedChar">'+wordChar+'</span>';
        } else {
            htmlWord += wordChar;
        }
    }

    if (numCharsInWordPressed>=word.length) {
        $('#score').fadeOut(250).fadeIn(250);
        score++;
        if (score>localStorage.highscore) {
            localStorage.highscore = score;
        }
        newWord();
        return;
    }

    $('#word').html(htmlWord);
}

$(document).on('keypress', function(e) {
    var char = String.fromCharCode(e.keyCode);
    if (charsPressed.indexOf(char)) {
        charsPressed.push(char);
    }
    displayWord();
});
