<?php
session_start();
require_once 'incudes/connection.php'; // подключаем скрипт
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

    $login = $_SESSION['login'];

if($login !== "denis") {
     header("Location: login.php");
}

$q = "SELECT * FROM order_list WHERE id ORDER BY id DESC";
$result = mysqli_query($link, $q);
$numRows = mysqli_num_rows($result);


?>


<div id='result'></div>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Admin</title>
	<link href="https://fonts.googleapis.com/css?family=Literata&display=swap" rel="stylesheet">
</head>

<body style="font-family: 'Literata', serif;">
	<h3>Вернуться на главную <a href="index.php">Нажать сюда</a></h3>

	<?php
	for ($i=0; $i < $numRows ; $i++) { 
	$row = mysqli_fetch_assoc($result);
	$id =  $row['id'];
	$status = $row['status'];
	$answer = $row['answer'];
	echo "<p style='border: 2px solid black; padding:10px; font-size: 15px;'>";
	echo "<span>Ид $id</span><br>";
	echo nl2br($row['list']);

	if($status == 'Обработан'){
		echo "Статус - <span style='color:white;background-color:green;padding:2px 5px 2px 5px;border-radius:5px;'>$status</span><br> ";	
	}else{	
		echo "Статус - <span style='color:black; background-color:red; padding:2px 5px 2px 5px;border-radius:5px;';>$status</span><br> ";
	}
	echo "<span style='color:#3F51B5';>Комментарий:</span> $answer";
	echo "</p>";	
	echo "<form class='form'>";
	echo "<input type='button' data-id='$id' class='changeStatus' value='Обработан'><br><br>";
	echo "<textarea class='commentArea' style='height:100px; width:450px;'></textarea>";
	echo "</form>";	
	echo "<button class='buttonToday'>Сегодня</button>";
	echo "<button style='margin-left:10px;' class='buttonTomorrow'>Завтра</button>";
	echo "<button style='margin-left:10px;'class='buttonData'>Заказ Израиль</button>";
	}	
	?>

<script type="text/javascript" src="adminlistJS.js"></script>
</body>
</html>