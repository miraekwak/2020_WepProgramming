<?php
    if($_POST["random"] != null){ //post로 받은 random number값이 있다면
        $myfile = fopen("questionList.json","r"); //문제가 저장된 파일을 열고
        $randomNum = (int)$_POST["random"]; // random에 저장된 값을 randomNum에 저장
        $i = 1;
        $line = fgets($myfile); //첫번째 줄을 읽음
        while(($i < $randomNum)&& !feof($myfile)){ //i가 randomNum보다 작거나 파일의 끝일 때까지 line을 읽음
            $line = fgets($myfile);
            $i++;
        }
        fclose($myfile); //파일을 닫음
        echo trim($line); // 읽은 line의 공백 제거 후 echo로 보냄
    }else{
        echo -1; //만약 post값이 없다면 -1을 보냄
    }
    
?>