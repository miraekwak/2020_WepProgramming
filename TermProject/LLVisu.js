var div = document.getElementById("visuContent");
var addBtn = document.getElementById("add");
var rmvBtn = document.getElementById("remove");
var quiz = document.getElementsByTagName("h1"); // 제목에 해당하는 element를 가져옴
var size =0;
function sizeUp(){
    size++;
}
function sizeDown(){
    size--;
}

// 삽입 버튼 클릭시 노드 역할을 하는 button을 생성한다.
// 입력받은 순서, 또는 div에 존재하는 노드 뒤에 새로운 노드를 연결한다.
// button을 통해 노드를 만들고 화살표 이미지로 노드 연결과정을 보여줌
addBtn.addEventListener("click", function(){
    var addIndex = document.getElementById("addIndex").value;
    var addValue = document.getElementById("addValue").value;
    if(addIndex=="" && addValue==""){
        alert("인덱스나 value를 입력하세요.");
    }
    else if(addIndex==""){
        if(size==0){//사이즈가 0이면 head를 추가함
            var head = document.createElement('span');
            head.innerHTML = "head➡";
            head.className = "arrow";
            div.append(head);
            $(head).fadeOut(0);
            $(head).fadeIn(1000);
        }
        // 버튼과 화살표를 만들어 마지막에 연결
        var btn = document.createElement('button');
        btn.innerHTML = addValue;
        btn.className = "list";
        div.append(btn);
        var arrow = document.createElement('span');
        arrow.innerHTML = "➡";
        arrow.className = "arrow";
        div.append(arrow);
        $(btn).fadeOut(0);
        $(btn).fadeIn(1000);
        $(arrow).fadeOut(0);
        $(arrow).fadeIn(1000);
        sizeUp();
    }
    else if(addValue==""){
        alert("value 입력은 필수입니다.");
    }
    else{
        if(is_exist(addIndex)){//인덱스가 존재하면 해당 인덱스에 버튼과 화살표를 더함
            var btn = document.createElement('button');
            btn.innerHTML = addValue;
            btn.className = "list";
            var arrow = document.createElement('span');
            arrow.innerHTML = "➡";
            arrow.className = "arrow";
            div.insertBefore(btn, div.childNodes[Number(addIndex)*2+2]);
            div.insertBefore(arrow, div.childNodes[Number(addIndex)*2+3]);
            $(btn).fadeOut(0);
            $(btn).fadeIn(1000);
            $(arrow).fadeOut(0);
            $(arrow).fadeIn(1000);
            sizeUp();
        }else{
            alert("인덱스는 현재 사이즈보다 작아야합니다.");
        }
    }
    document.getElementById("addValue").value = "";
    document.getElementById("addIndex").value = "";
});

// 입력받은 인덱스와 value에 대해 인덱스의 존재 여부, 올바른 value값인지 판단하는 함수
// 이 함수를 사용하여 버튼 클릭시 validation 진행
function is_exist(index){
    if(index<size){
        return true;
    }
    return false;
}

// 삭제 버튼 클릭시 노드 역할을 하는 버튼과 화살표 이미지를 삭제하여 시각적으로 노드가 삭제되었음을 보여주는 함수
// 입력받은 값에 대한 validation을 진행
// 인덱스 또는 value값을 입력받을 때 어떤 값을 입력받는지에 따라 다르게 구현해야함
rmvBtn.addEventListener("click", function(){
    var rmvIndex = document.getElementById("remIndex").value;
    if(size==0){
        alert('삭제할 값이 없습니다.');
        return;
    }
    if(rmvIndex==""){ //인덱스를 입력하지 않은 경우 마지막에 있는 화살표와 버튼을 삭제
        sizeDown();
        $(div.childNodes[size*2+2]).css('backgroundColor','red');
        $(div.childNodes[size*2+2]).fadeOut(1000);
        $(div.childNodes[size*2+2]).next().fadeOut(1000,function(){
            div.removeChild(div.childNodes[size*2+2]);
            div.removeChild(div.childNodes[size*2+2]);
        });
    }
    else {
        if(is_exist(rmvIndex)){ //인덱스가 입력된 경우 해당 인덱스의 화살표와 버튼을 삭제
            sizeDown();
            $(div.childNodes[rmvIndex*2+2]).css('backgroundColor','red');
            $(div.childNodes[rmvIndex*2+2]).fadeOut(1000);
            $(div.childNodes[rmvIndex*2+2]).next().fadeOut(1000,function(){
                div.removeChild(div.childNodes[rmvIndex*2+2]);
                div.removeChild(div.childNodes[rmvIndex*2+2]);
            });
        }else{
            alert("인덱스가 존재하지 않습니다.");
        }    
    }
    document.getElementById("remIndex").value = "";
});

// 이미 시각화된 노드의 값 변경을 원할 경우 해당 버튼을 클릭함
window.onclick = function(event){
    // event target이 버튼이면 해당 button의 값 변경을 위한 모달이 나타남
    // 모달을 통해 값을 입력받아 이미 시각화된 노드의 값을 변경
    if(event.target.className == "list"){
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        var changeBtn = document.getElementById("change");
        changeBtn.addEventListener('click',function(){
            var value = document.getElementById("changeValue").value;
            event.target.innerHTML = value;
            modal.style.display = "none";
            var originColor = $(event.target).css('backgroundColor');
            $(event.target).css('backgroundColor','red');
            setTimeout(function(){
                $(event.target).css('backgroundColor',originColor);
            }, 500);
        });
    }
};