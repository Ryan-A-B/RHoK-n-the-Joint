<?php
    $require = ['name', 'business_name', 'email'];
    foreach ($require as $required) {
        if (empty($_POST[$required])) {
            header('location: /start');
            exit;
        }
    }

    require 'database.php';

    function getQuestions (PDO $pdo) {
        $query = $pdo->prepare("
            SELECT number, type, text
            FROM question
            ORDER BY number ASC
        ");
        $query->execute();

        return $query->fetchAll(PDO::FETCH_OBJ);
    }

    function getAnswers (PDO $pdo) {
        $query = $pdo->prepare("
            SELECT question, number, text
            FROM answer
            ORDER BY number ASC
        ");
        $query->execute();

        $tmp = $query->fetchAll(PDO::FETCH_OBJ);

        $questionAnswers = array();
        foreach ($tmp as $answer) {
            $questionAnswers[$answer->question][$answer->number] = $answer;
        }

        foreach ($questionAnswers as $question => $answers) {
            $dir = @opendir("{$_SERVER['DOCUMENT_ROOT']}/images/$question/");
            if ($dir !== false) {
                while (($file = readdir($dir)) !== false) {
                    if (preg_match("/^(\d+)\.(jpg|png)$/", $file, $matches)) {
                        if (isset($answers[$matches[1]])) {
                            $answers[$matches[1]]->image = "/images/$question/$file";
                        }
                    }
                }
            }
        }

        return $questionAnswers;
    }

    function typeClass ($type) {
        switch ($type) {
        case 3:
            echo 'img-caption';
            break;
        case 2:
            echo 'img';
            break;
        case 1:
            echo 'quote';
            break;
        default:
            echo 'default';
            break;
        }
    }

    $pdo = Database::connect();

    $questions = getQuestions($pdo);
    $answers = getAnswers($pdo);

    $title = 'Brandonian Quiz';
    $stylesheets[] = 'quiz';
    $scripts[] = 'quiz';
?>
<?php include 'model/header.php'; ?>
    <div class='wrapper'>
        <div class='indicators'>
            <?php $first = true; ?>
            <?php foreach ($questions as $i => $discard): ?>
                <span class='indicator <?php echo ($first ? 'active' : ''); ?>' id='indicator-<?php echo $i; ?>'>
                    <button type='button' onclick='quiz.moveTo(<?php echo $i; ?>);'></button>
                </span>

                <?php $first = false; ?>
            <?php endforeach; ?>
        </div>

        <form action='result' method='post' id='quiz_form'>
            <?php foreach ($_POST as $key => $value): ?>
                <input type='hidden' name='<?php echo $key; ?>' value='<?php echo $value; ?>'>
            <?php endforeach; ?>

            <?php $first = true; ?>
            <?php foreach ($questions as $i => $question): ?>
                <input type='hidden' name='question-<?php echo $question->number; ?>'>

                <div class='question <?php typeClass($question->type); ?> <?php echo (!$first ? 'hidden' : ''); ?> text-center' id='question-<?php echo $i; ?>'>
                    <h1><?php echo $question->text; ?></h1>
                <?php if ($question->type == 1): ?>
                    <div class='container-fluid'>
                        <div class='row'>
                        <?php foreach ($answers[$question->number] as $answer): ?>
                            <div class='col-xs-12 col-sm-6 col-md-3 col-lg-2 quote' onclick='quiz.answer(this, <?php echo $question->number; ?>, <?php echo $answer->number; ?>);'>
                                <p>
                                    "<?php echo $answer->text; ?>"
                                </p>
                            </div>
                        <?php endforeach; ?>
                        </div>
                    </div>
                <?php elseif ($question->type == 2): ?>
                    <div class='container-fluid'>
                        <div class='row'>
                            <?php foreach ($answers[$question->number] as $answer): ?>
                                <div class='col-xs-6 col-sm-4 col-md-2'>
                                    <button type='button' onclick='quiz.answer(this, <?php echo $question->number; ?>, <?php echo $answer->number; ?>);' class='btn-block'>
                                    <img src='<?php echo $answer->image; ?>' alt='<?php echo $answer->text; ?>' class='img-responsive center-block'>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php elseif ($question->type == 3): ?>
                    <div class='container-fluid'>
                        <div class='row'>
                            <?php foreach ($answers[$question->number] as $answer): ?>
                                <div class='col-xs-6 col-sm-4 col-md-2'>
                                    <label>
                                        <button type='button' onclick='quiz.answer(this, <?php echo $question->number; ?>, <?php echo $answer->number; ?>);' class='btn-block'>
                                            <img src='<?php echo $answer->image; ?>' alt='<?php echo $answer->text; ?>' class='img-responsive center-block'>
                                        </button>
                                        <?php echo $answer->text; ?>
                                    </label>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php else: ?>
                    <?php foreach ($answers[$question->number] as $answer): ?>
                        <label>
                            <button type='button' onclick='quiz.answer(this, <?php echo $question->number; ?>, <?php echo $answer->number; ?>);'></button>
                            <?php echo $answer->text; ?>
                        </label>
                    <?php endforeach; ?>
                <?php endif; ?>
                </div>

                <?php $first = false; ?>
            <?php endforeach; ?>
        </form>
    </div>

    <div class='container-fluid'>
        <div class='row'>
            <div class='col-xs-12' style='padding: 20px 15px;'>
                <button type='button' class='btn btn-default active center-block' onclick='quiz.startOver();'>
                    START AGAIN
                </button>
            </div>
        </div>
    </div>
<?php include 'model/footer.php'; ?>
