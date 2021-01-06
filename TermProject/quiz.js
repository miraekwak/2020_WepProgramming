
$("#title").click(function(){ // 제목 클릭 시 퀴즈 시작 div 띄움
    $("#quizDiv").css("display","block");
});

$("#no").click(function(){ //no버튼 클릭 시 퀴즈 시작 div 사라지게함
    $("#quizDiv").css("display","none");
});

var answer ;
$("#yes").click(function(){ // yes버튼 클릭 시 퀴즈 시작 div사라지고 
    $("#quizDiv").css("display","none");
    var random = Math.floor(Math.random()*15);//몇번째 문제를 택할 것인지 random으로 정함
    $.post("quizPick.php",{random:random},function(data){//post를 통해 퀴즈 문제와 답을 파일에서 읽어옴
        var obj = JSON.parse(data); //읽어온 data를 객체로 바꿈
        $('#quizDiv2').css('display','block'); // 퀴즈 div를 띄우고 
        $('#question').text("Q. "+obj["question"]); // 문제를 띄움
        answer = obj["answer"]; // 답을 저장
    });
});

$('#submit').click(function(){ // 제출 버튼 클릭 시 해당 답이 맞는지 판별
    var res = $("#answer").val(); 
    if( res== ""){ // 답을 입력하지 않으면 퀴즈 div 사라지게 한 후 오류에 대한 div를 띄움
        $('#quizDiv2').css('display','none');
        $('#incorrectDiv').css('display','block');
        $("#warning").text('답을 입력해주세요!');
    }
    else if(res.toLowerCase() != answer.toLowerCase()){ // 답이 틀리면 퀴즈 div 사라지게 한 후 오류에 대한 div띄움
        $('#quizDiv2').css('display','none');
        $('#incorrectDiv').css('display','block');
        $("#warning").text('틀렸습니다! 다시 시도해보세요:D');
    }
    else{ // 답을 맞추면 정답 div를 띄움
        $('#quizDiv2').css('display','none');
        $('#correctDiv').css('display','block');
    }
    $("#answer").val("");
});

$('#ok').click(function(){ // 오류 시 ok버튼을 클릭하면 div를 사라지게 함
    $('#incorrectDiv').css('display','none');
});

$('#y').click(function(){ // 정답 div에서 title 변경에 y클릭 시 title 변경을 위한 div 띄움
    $("#correctDiv").css('display','none');
    $('#changeDiv').css('display','block');
});
$('#n').click(function(){ // 정답 div에서 title 변경에 n클릭 시 div사라지게 함
    $("#correctDiv").css('display','none');
});

$('#in').click(function(){ // push버튼 클릭 시 title에 값을 넣기위한 오류처리진행
    $('#changeDiv').css('display','none');
    var res = $('#inChar').val();
    var title = $('#title').text();
    if(res == ""){ //값을 입력하지 않을 경우 오률 div 띄움
        $('#incorrectDiv').css('display','block');
        $("#warning").text('한글자를 입력해주세요!');
    }
    else if(title.length > 15){ //title 제한 15글자를 넘어갈 경우 오류 div띄움
        $('#incorrectDiv').css('display','block');
        $("#warning").text('title은 최대 15글자까지 가능합니다.');
    }
    else{ // 원래 title에 입력받은 값을 더해 title변경
        title += res; 
        $('#title').text(title);
        $('#incorrectDiv').css('display','block');
        $("#warning").text('title이 변경되었습니다! :D');
    }
    $('#inChar').val("");
});

$('#stackOut').click(function(){ //stackOut으로 값을 삭제할 경우
    $('#changeDiv').css('display','none');
    var title = $('#title').text();
    if(title.length <= 1){ // title이 없으면 삭제 불가 
        $('#incorrectDiv').css('display','block');
        $("#warning").text('title이 존재하지 않아 삭제할 수 없습니다.');
    }
    else{ // title이 있다면 stack의 경우 마지막을 제외해 title 재 설정
        title = title.substr(0,title.length-1);
        $('#title').text(title);
        $('#incorrectDiv').css('display','block');
        $("#warning").text('title이 변경되었습니다! :D');
    }
});

$('#queueOut').click(function(){ //queueOut으로 값을 삭제할 경우
    $('#changeDiv').css('display','none');
    var title = $('#title').text();
    if(title.length <= 1){ // title이 없으면 삭제 불가
        $('#incorrectDiv').css('display','block');
        $("#warning").text('title이 존재하지 않아 삭제할 수 없습니다.');
    }
    else{//title이 있다면 queue의 경우 처음 한글자를 제외해 title 재 설정
        title = title.substr(2,title.length);
        $('#title').text("#"+title);
        $('#incorrectDiv').css('display','block');
        $("#warning").text('title이 변경되었습니다! :D');
    }
});