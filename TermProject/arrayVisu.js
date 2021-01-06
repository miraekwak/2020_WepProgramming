var div = document.getElementById("visuDiv"); // 시각화할 div 영역
var addBtn = document.getElementById("add"); // add버튼
var insertBtn = document.getElementById("insert");//insert버튼
var rmvBtn = document.getElementById("remove"); // 삭제 버튼
var table = document.getElementById("table"); // 생성할 배열을 나타낼 table
var quiz = document.getElementsByTagName("h1"); // 제목에 해당하는 element를 가져옴
var num ; // 배열 크기
var size = 0;
function sizeUp(){
    size++;
}
function sizeDown(){
    size--;
}

// 배열의 크기를 입력받기 위해 모달 띄우기
window.onload = function(){
    document.getElementById("modal").style.display = "block";
};
document.getElementById('make').addEventListener('click',function(){
    document.getElementById("modal").style.display = "block";
});

// 모달의 취소버튼 클릭시 모달을 띄우지 않음
document.getElementById("NO").addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
});

// 모달의 확인 버튼 클릭 시 해당하는 값으로 테이블의 row와 colum을 생성해서 div에 삽입
document.getElementById("OK").addEventListener("click", function(){
    document.getElementById('make').disabled = true;
    document.getElementById('make').style.backgroundColor = "gray";
    document.getElementById("modal").style.display = "none";
    var row1 = document.getElementById("row1");
    var row2 = document.getElementById("row2");
    var cell1 = document.createElement("th");
    var cell2 = document.createElement("td");
    num = document.getElementById("arrSize").value;
    cell1.innerHTML = "index";
    cell2.innerHTML = "value";
    row1.appendChild(cell1);
    row2.appendChild(cell2);
    for(var i=0; i<num ; i++){
        var cell1 = document.createElement("th");
        var cell2 = document.createElement("td");
        cell1.innerHTML = i;
        cell2.id = "col"+i;
        row1.appendChild(cell1);
        row2.appendChild(cell2);
    }
    $(table).fadeIn(1000);
});


//삽입버튼 클릭 시 값 넣는 함수
// 인덱스 값의 범위가 맞는지, 인덱스와 value중 입력하지 않은게 있는지 검사
// 둘중 하나만 입력했을 경우, 둘다 입력했을 경우에 대해 각각 테이블에 값 저장
addBtn.addEventListener("click", function(){ 
    var addValue = document.getElementById("addValue").value;
    var addIndex = document.getElementById("addIndex").value;
    if(size >= num){
        alert("배열이 꽉 찼습니다.");
        return;
    }
    if(addIndexExist(addIndex)){
        if(addIndex == ""){
            if(addValue == ""){
                alert("value 값은 필수입니다.");
            }else{
                var cel = document.getElementById(`col${size}`);
                cel.innerHTML = addValue;
                sizeUp();
                $(cel).fadeOut(0);
                $(cel).fadeIn(1000);
            }
        }
        else {
            if(addValue == ""){
                alert("value 값은 필수입니다.");
            }
            else{
                var target = document.getElementById(`col${addIndex}`);
                if(target.innerHTML == ""){
                    alert('인덱스 값 교체는 배열의 값이 있어야 가능합니다.');
                }
                else{
                    target.innerHTML = addValue;
                    $(target).fadeOut(0);
                    $(target).fadeIn(1000);
                }
            }
        }
    }else{
        alert("인덱스가 존재하지 않습니다.");
    }
});

// 값이 차있는 중간 index에 값을 넣고 싶은 경우 버튼 클릭 시 index에 입력받은 값을 넣는다.
// 배열이 다 차있거나 인덱스나 밸류가 입력되지 않는 등의 예외처리
insertBtn.addEventListener("click", function(){ 
    var addValue = document.getElementById("addValue").value;
    var addIndex = document.getElementById("addIndex").value;
    if(size >= num){
        alert("배열이 꽉 찼습니다.");
        return;
    }
    else if(addIndex>size){
        alert("삽입은 배열이 index까지 차있어야 가능합니다.");
        return;
    }
    if(addIndexExist(addIndex)){
        if(addIndex == ""){
            alert('index값은 필수입니다.');
        }
        else {
            if(addValue == ""){
                alert("value 값은 필수입니다.");
            }
            else{// 배열을 하나 생성하여 인덱스부터 끝까지의 값을 array에 넣고 입력받은 index에 값을 넣고 배열의 값을 차례로 다시 넣는다. 
                var arr = new Array();
                for(var i=addIndex; i<size; i++ ){
                    var item = document.getElementById(`col${i}`);
                    arr.push(item.innerHTML);
                }
                var target = document.getElementById(`col${addIndex}`);
                target.innerHTML = addValue;
                $(target).fadeOut(0);
                $(target).fadeIn(1000);
                for(var i=0; i<arr.length; i++){
                    var target = document.getElementById(`col${Number(addIndex)+1+i}`);
                    target.innerHTML = arr[i];
                }
                sizeUp();
            }
        }
    }else{
        alert("인덱스가 존재하지 않습니다.");
    }
});

function addIndexExist(data){ //삽입 삭제 입력값이 범위내에 존재하는지 확인
    if(Number(data)<0 |Number(data)>=num){
        return false;
    }
    return true;
}

// 삭제 버튼 클릭시 값 삭제하는 함수
// 인덱스 값의 범위가 맞는지, 인덱스와 value 중 입력하지 않은것이 있는지 점검
// 둘중 하나만 입력한 경우, 둘다 입력한 경우에 대해 각각 테이블에 값 저장
rmvBtn.addEventListener("click",function(){
    if(size<=0){
        alert("삭제할 값이 존재하지 않습니다.");
        return;
    }
    sizeDown();
    var target = document.getElementById(`col${size}`);
    var originColor = $(target).css('color');
    $(target).css('color','red');
    $(target).animate({
        opacity:'0.5',
    },'slow',function(){
        target.innerHTML = "";
        $(target).css('color',originColor);
    });
});
