const questions = {"1": {
    "text": "Текст слайда",
    "type": "step",
    "img_path": "image/test_img1.jpg",
    },
"2": {
      "text": "Текст слайда 2",
      "type": "step",
      "img_path": "image/gosling.jpeg",
      }
}

var score = 0;
var originalOption
var originalQuestionNumber
var button_list


document.addEventListener('DOMContentLoaded', function() {
    setSlide(1);
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


function setSlide(number) {
    number = Number(number);
    console.log('Setting question ' + number);

    originalOption = document.getElementsByClassName('option')[0];

    var question = questions[number];

    if (number == Object.keys(questions).length) {
        // console.log('Yes')
        document.getElementById('next_question').style.display = 'none'
        document.getElementById('finish_test').style.display = 'block'

        var step_tag = document.getElementById("step");
        step_tag.setAttribute('question_number', number);
    }
    // else {
        // console.log('No')

    var slide_tag = document.getElementById("slide");
    slide_tag.setAttribute('slide_number', number);

    if (question['type'] == 'step') {
        console.log('STEP')

        var step_tag = document.getElementById('step').style.display = 'block'
        document.getElementById('question').style.display = 'none'

        document.getElementById('slide_img').src = question['img_path']
        document.getElementById('slide_p').innerHTML = question['text']
    }
    else if (question['type'] == 'question') {
        console.log('QUESTION')

        document.getElementById('step').style.display = 'none'
        document.getElementById('question').style.display = 'block'

        var question_tag = document.getElementById("question");

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
                clonedOption.style.display = 'block'
            }
    }

    originalOption.style.display = 'none'


}


function nextSlide() {
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

    var step_tag = document.getElementById("slide");
    var slide_number = Number(step_tag.getAttribute('slide_number'));

    console.log('Slide number ' + slide_number)

    var next_slide_number = slide_number + 1;
    setSlide(next_slide_number);
    updateQuestionNumber(next_slide_number);
}


function endTest() {
    results_div = document.getElementsByClassName('test_results')[0]
    results_div.style.display = 'block'
    test_results_p = document.getElementById('test_results_p');
    test_results_p.innerHTML = 'Ваш результат: ' + score

    document.getElementById('question').style.display = 'none'
    document.getElementById('finish_test').style.display = 'none'
    document.getElementById('step').style.display = 'none'
}
