        <footer>
            <?php $scripts[] = 'bootstrap.min'; ?>
            <?php $scripts[] = 'jquery-1.11.3.min'; ?>
            <?php $scripts = array_reverse($scripts); ?>
            <?php foreach ($scripts as $script): ?>
                <script src='js/<?php echo $script; ?>.js' type='text/javascript'></script>
            <?php endforeach; ?>
        </footer>
    </body>
</html>
