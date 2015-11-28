<!doctype html>
<html>
    <head>
        <meta charset='utf-8'>

        <title>
            <?php echo (isset($title) ? $title : 'Brandonian'); ?>
        </title>

        <?php $stylesheets[] = 'style'; ?>
        <?php $stylesheets[] = 'bootstrap.min'; ?>
        <?php $stylesheets = array_reverse($stylesheets); ?>
        <?php foreach ($stylesheets as $stylesheet): ?>
            <link href='css/<?php echo $stylesheet; ?>.css' rel='stylesheet' type='text/css'>
        <?php endforeach; ?>
    </html>
    <body>
        <nav class='navbar'>
            <div class='container-fluid'>
                <div class='navbar-header'>
                    <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navigation' aria-expanded='false'>
                        <span class='sr-only'>Toggle navigation</span>
                        <span class='icon-bar'></span>
                        <span class='icon-bar'></span>
                        <span class='icon-bar'></span>
                    </button>

                    <a href='/' class='navbar-brand'>
                        <img alt='Brandonian'>
                    </a>
                </div>

                <div class='collapse navbar-collapse' id='navigation'>
                    <ul class='nav navbar-nav navbar-right'>
                        <li>
                            <a>
                                TOUR
                            </a>
                        </li>
                        <li>
                            <a>
                                BLOG
                            </a>
                        </li>
                        <li>
                            <a href='start'>
                                TAKE THE TEST
                            </a>
                        </li>
                        <li>
                            <a class='btn btn-default active'>
                                FIND OUT MORE
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
