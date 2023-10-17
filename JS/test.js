const questions = {"1": {
    "text": "Как зовут Эльдара?",
    "options": [
      {
        "text": "Эльдар",
        "correct": true
      },
      {
        "text": "Ъ",
        "correct": false
      },
      {
        "text": "Эээ",
        "correct": false
      },
      {
        "text": "Ъхэ",
        "correct": false
      }
    ]
  },
  "2": {
    "text": "Второй вопрос?",
    "options": [
      {
        "text": "Да",
        "correct": false
      },
      {
        "text": "Нет",
        "correct": false
      },
      {
        "text": "Возможно",
        "correct": false
      },
      {
        "text": "Ъхэ",
        "correct": true
      }
    ]
  },
  "3": {
    "text": "Ачу?",
    "options": [
      {
        "text": "Аничу",
        "correct": false
      },
      {
        "text": "Аничу на",
        "correct": true
      },
      {
        "text": "Нормально общайся",
        "correct": false
      },
      {
        "text": "Ъхэ",
        "correct": false
      }
    ]
  }
}

var score = 0;
var originalOption


document.addEventListener('DOMContentLoaded', function() {
    setQuestion(1)
});


function setQuestion(number) {
    number = Number(number)
    console.log('Setting first question ' + number);

    originalOption = document.getElementsByClassName('option')[0];

    var question = questions[number];
    // console.log(question)
    var question_tag = document.getElementById("question");
    question_tag.setAttribute('question_number', number)
    p = document.getElementById('question_text')
    p.innerHTML = question['text'];

    // console.log(question['options'])

    var questions_ul = document.getElementById('questions_ul')
    questions_ul.innerHTML = ''

    for (let option_index in question['options']) {
            const option = question['options'][option_index]
            const clonedOption = originalOption.cloneNode(true);
            questions_ul.appendChild(clonedOption);
            var option_id = "option" + option_index
            label_tag = clonedOption.getElementsByTagName('label')[0]
            label_tag.innerHTML = option['text']
            label_tag.setAttribute('for', option_id)
            input_tag = clonedOption.getElementsByTagName('input')[0]
            input_tag.setAttribute('correct', option['correct'])
            input_tag.id = option_id
        }
    // originalOption.remove()
    originalOption.style.display = 'none'
}


function nextQuestion() {
    var question_tag = document.getElementById('question');
    // console.log(question_tag)
    var options = question_tag.getElementsByTagName('input');
    for (var j = 0; j < options.length; j++) {
        var option = options[j];
        console.log(option.getAttribute('correct'))
        if (option.checked && option.getAttribute('correct') === 'true') {
            score++;
            break;
        }
    }
    var question_number = Number(question_tag.getAttribute('question_number'))
    next_question_number = question_number + 1
    console.log(next_question_number)
    setQuestion(next_question_number)
}


function endTest() {
    alert('Количество правильных ответов: ' + score);
}
