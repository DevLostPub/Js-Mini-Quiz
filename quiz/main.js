var currentIndex = 0;
var points = 0;

function getQuiz(index){
    
    if(index >= quiz.length){
        quizWrapUp();
        return;
    }
    
    document.getElementById('questionIndex').innerHTML = 'Pergunta '+(index + 1);
    document.getElementById('questionDesc').innerHTML = quiz[index].content;
    
    for(let i = 0; i < quiz[index].options.length; i++){
        let id = 'questionOpt'+i;
        document.getElementById(id).textContent =   quiz[index].options[i];
    }
    
}

/* Post quiz operations */ 
function quizWrapUp(){

    /* Store points */
    let date = new Date();
    let reg = {
        points: points,
        date: date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
    };
    
    console.log(reg);
    
    if(localStorage.getItem('quiz-history') === null){
        let temp = [];
        temp.push(reg);
            localStorage.setItem('quiz-history', JSON.stringify(temp));

    }else{
        let temp = JSON.parse(localStorage.getItem('quiz-history'));
        temp.push(reg);
            localStorage.setItem('quiz-history', JSON.stringify(temp));

    }
    
    document.getElementById('resultLabel').innerHTML = 'Você acertou '+ points +' de '+ quiz.length +' questões!';
    
    setVisibility('none', '', 'none');
    currentIndex = 0;
    points = 0;
}

/* Start Quiz */
document.getElementById('quizStart').addEventListener('click', function(e){
    e.target.innerHTML = 'Reiniciar';
    currentIndex = 0;
    getQuiz(currentIndex);
    
    setVisibility('', 'none', 'none')
})

/* Show player history */
document.getElementById('quizStats').addEventListener('click', showStats);
function showStats(){
    let reg = JSON.parse(localStorage.getItem('quiz-history'));
    document.querySelector('#quizHistory ul').innerHTML = '';
    for(let i = 0; i < reg.length; i++){
        document.querySelector('#quizHistory ul').innerHTML += '<li>'+reg[i].points+' em '+
            reg[i].date +'.</li>'
        }
    
    setVisibility('none', 'none', '');
}


/* Check answers */
document.forms['formQuiz'].addEventListener('submit', function(e){
    var user_answer = document.querySelector('input[name="answerRadio"]:checked');
    
    if(user_answer.value == quiz[currentIndex].answer){
        //right answer - add points
        points++;
    }
   getQuiz(++currentIndex);    
   e.target.reset();
   e.preventDefault(); 
});

function setVisibility(container = '', result = '', history = ''){
     document.getElementById('quizContainer').style.display = container;
     document.getElementById('quizResult').style.display = result;
     document.getElementById('quizHistory').style.display = history;
}


/*

Perguntas do Quiz

*/


var quiz = [
    {
        content: 'Qual a capital da Alemanha?',
        answer: '2',
        options: [
            'Madrid', 'Helsink', 'Berlin'
        ]
    },    
    {
        content: 'O museu do esta localizado em qual cidade?',
        answer: '0',
        options: [
            'Paris', 'Belarus', 'Sant-Etienne'
        ]
    },
    {
        content: 'Quando terminou a Segunda Guerra Mundial?',
        answer: '1',
        options: [
            '1965', '1945', '1980'
        ]
    },
    {
        content: 'A sigle ISS é utilizada para denominar: ',
        answer: '1',
        options: [
            'Um grupo terrorista', 'A estação espacial internacional', 'O aparelho ocular'
        ]
    },
    {
        content: 'Qual desses é um tipo de memoria não-volatil?',
        answer: '1',
        options: [
            'Cache', 'ROM', 'RAM'
        ]
    }

]