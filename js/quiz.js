var quiz = {
    form: null,

    current: 0,
    answered: -1,

    init: function () {
        quiz.form = document.getElementById('quiz_form');
    },

    moveTo: function (position) {
        // Prevent looking ahead
        var nextQuestion = quiz.answered + 1;
        if (position > nextQuestion) {
            position = nextQuestion;
        }

        // Hide current question
        $('#question-' + quiz.current).addClass('hidden');
        $('#indicator-' + quiz.current).removeClass('active');

        // Set current
        quiz.current = position;

        // Show specified question
        $('#question-' + quiz.current).removeClass('hidden');
        $('#indicator-' + quiz.current).addClass('active');
    },

    answer: function (btn, question, answer) {
        // Remove active from all answers
        $('#question-' + quiz.current).find('.active').removeClass('active');
        // Set selected answer as active
        $(btn).addClass('active');

        // Store answer
        quiz.form['question-' + question].value = answer;

        // Record which questions have been answered
        if (quiz.answered < quiz.current) {
            quiz.answered = quiz.current;
        }

        // Check if there is a next question
        if ($('#question-' + (quiz.current + 1)).length == 0) {
            // if not - submit the form
            quiz.form.submit();
        } else {
            // Delay for some extra confirmation
            setTimeout(function () {
                // Display next question
                quiz.moveTo(quiz.current + 1);
            }, 50);
        }
    },

    startOver: function () {
        // Remove active class from everything
        $('#quiz_form').find('.active').removeClass('active');

        // Reset quiz answered position
        quiz.answered = -1;

        // Move back to start
        quiz.moveTo(0);
    }
};

$(document).ready(quiz.init);
