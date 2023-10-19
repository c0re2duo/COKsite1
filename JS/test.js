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
  },
  "4": {
    "text": "Вопрос 4",
    "options": [
      {
        "text": "1",
        "correct": false
      },
      {
        "text": "2",
        "correct": true
      },
      {
        "text": "3",
        "correct": false
      },
      {
        "text": "4",
        "correct": false
      }
    ]
  },
  "5": {
    "text": "ФВфв",
    "options": [
      {
        "text": "1",
        "correct": false
      },
      {
        "text": "2",
        "correct": true
      },
      {
        "text": "3",
        "correct": false
      },
      {
        "text": "4",
        "correct": false
      }
    ]
  }
}

var score = 0;
var originalOption
var originalQuestionNumber
var button_list


document.addEventListener('DOMContentLoaded', function() {
    setQuestion(1);
    button_list = document.getElementById('button_list');
    updateQuestionNumber(1)
});


function updateQuestionNumber(question_number) {
    console.log('Update' + question_number)

    originalQuestionNumber = document.getElementsByClassName('question_number')[0];
    button_list.innerHTML = ''

    for (let option_index in questions) {
        // console.log(option_index);
        const clonedQuestionNumber = originalQuestionNumber.cloneNode(true);
        button_list.appendChild(clonedQuestionNumber);
        clonedQuestionNumber.style.display = 'inline-block'
        var question_number_li = clonedQuestionNumber.getElementsByClassName('question_number_li')[0]
        question_number_li.innerHTML = option_index
        console.log(option_index + ' ' + question_number, option_index == question_number, option_index < question_number)
        if (option_index == question_number) {
            question_number_li.className = 'question_number_li current'
        }
        else if (option_index < question_number) {
            question_number_li.className = 'question_number_li passed'
        }
        else if (option_index > question_number) {
            question_number_li.className = 'question_number_li'
        }
    }
}


function setQuestion(number) {
    number = Number(number);
    console.log('Setting question ' + number);

    originalOption = document.getElementsByClassName('option')[0];

    var question = questions[number];

    if (number == Object.keys(questions).length) {
        // console.log('Yes')
        document.getElementById('next_question').style.display = 'none'
        document.getElementById('finish_test').style.display = 'block'
    }
    // else {
        // console.log('No')
    var question_tag = document.getElementById("question");
    question_tag.setAttribute('question_number', number);
    p = document.getElementById('question_text');
    p.innerHTML = question['text'];

    var questions_ul = document.getElementById('questions_ul');
    questions_ul.innerHTML = '';

    for (let option_index in question['options']) {
            const option = question['options'][option_index];
            const clonedOption = originalOption.cloneNode(true);
            questions_ul.appendChild(clonedOption);
            var option_id = "option" + option_index;
            label_tag = clonedOption.getElementsByTagName('label')[0];
            label_tag.innerHTML = option['text'];
            label_tag.setAttribute('for', option_id);
            input_tag = clonedOption.getElementsByTagName('input')[0];
            input_tag.setAttribute('correct', option['correct']);
            input_tag.id = option_id;
            input_tag.checked = false;
        }
    originalOption.style.display = 'none'
    // }


}


function nextQuestion() {
    var question_tag = document.getElementById('question');
    // console.log(question_tag)
    var options = question_tag.getElementsByTagName('input');
    for (var j = 0; j < options.length; j++) {
        var option = options[j];
        // console.log(option.getAttribute('correct'));
        if (option.checked && option.getAttribute('correct') === 'true') {
            score++;
            break;
        }
    }
    var question_number = Number(question_tag.getAttribute('question_number'));
    next_question_number = question_number + 1;
    setQuestion(next_question_number);
    updateQuestionNumber(next_question_number);
}


function endTest() {
    // alert('Количество правильных ответов: ' + score);
    results_div = document.getElementsByClassName('test_results')[0]
    results_div.style.display = 'block'
    test_results_p = document.getElementById('test_results_p');
    test_results_p.innerHTML = 'Количество правильных ответов: ' + score

    document.getElementById('question').style.display = 'none'
    document.getElementById('finish_test').style.display = 'none'
}
