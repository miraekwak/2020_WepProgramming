var div = document.getElementById("visuContent"); // 시각화 표현될 div
var addBtn = document.getElementById("add");//삽입 버튼
var rmvBtn = document.getElementById("remove");// 삭제 버튼
var quiz = document.getElementsByTagName("h1"); // 제목에 해당하는 element를 가져옴
var size=0;
function sizeUp(){
    size++;
}
function sizeDown(){
    size--;
}

//--------------------------------------
//  입력받은 value 또는 인덱스와 value에 따라 버튼 태그를 만들어 삽입
// 삽입은 queue구조에 따라 마지막에 삽입됨
addBtn.addEventListener("click",function(){
    var addValue = document.getElementById("addValue").value;
    var addIndex = document.getElementById("addIndex").value;
    if(addValue=="" && addIndex==""){
        alert("index 또는 value를 입력하세요.");
    }
    else if(addValue==""){
        alert("value 입력은 필수입니다.");
    }
    else if(((addIndex=="") | (addIndex==0) ) && (size==0)){ // 사이즈가 0일 경우 first와 last 화살표와 함께 버튼 추가
        var top = document.createElement('strong');
        top.innerHTML = "First⬅";
        top.className = "arrow";
        div.appendChild(top);
        var btn = document.createElement('button');
        btn.innerHTML = addValue;
        btn.className = "queue";
        div.appendChild(btn);
        var bottom = document.createElement('strong');
        bottom.innerHTML = "⬅Last";
        bottom.className = "arrow";
        div.appendChild(bottom);
        $(top).fadeOut(0);
        $(top).fadeIn(1000);
        $(btn).slideUp(0);
        $(btn).slideDown(1000);
        $(bottom).fadeOut(0);
        $(bottom).fadeIn(1000);
        sizeUp();
    }
    else if(addIndex==""){ // index가 입력되지 않으면 마지막에 버튼을 추가
        var btn = document.createElement('button');
        btn.innerHTML = addValue;
        btn.className = "queue";
        div.insertBefore(btn, div.childNodes[size+2]);
        $(btn).slideUp(0);
        $(btn).slideDown(1000);
        sizeUp();
    }
    else{
        if(Number(addIndex)<size){ // index가 제대로 입력되면 해당 인덱스에 버튼을 추가
            var btn = document.createElement('button');
            btn.innerHTML = addValue;
            btn.className = "queue";
            div.insertBefore(btn, div.childNodes[Number(addIndex)+2]);
            $(btn).slideUp(0);
            $(btn).slideDown(1000);
            sizeUp();
        }else{
            alert("인덱스는 현재 사이즈보다 작아야합니다.");
        }
    }
    document.getElementById("addValue").value = "";
    document.getElementById("addIndex").value = "";
});

// 삭제 버튼 클릭시 노드 역할을 하는 버튼과 화살표 이미지를 삭제하여 시각적으로 노드가 삭제되었음을 보여주는 함수
// 입력받은 값에 대한 validation을 진행
// 값을 삭제할 때 queue구조에 맞게 맨뒤에서 선택한 버튼에 맞게 값을 삭제한다.
rmvBtn.addEventListener("click", function(){
    var rmvIndex = document.getElementById("remIndex").value;
    if(size==0){
        alert("삭제할 element가 존재하지 않습니다.");
        return;
    }
    if(size==1){//사이즈가 1이면 first와 last 화살표와 함께 버튼 삭제
        $(div.childNodes[1]).fadeOut(1000);
        $(div.childNodes[2]).slideUp(1000);
        $(div.childNodes[3]).fadeOut(1000);
        setTimeout(function(){
            div.removeChild(div.childNodes[1]);
            div.removeChild(div.childNodes[1]);
            div.removeChild(div.childNodes[1]);
        },1000);
        sizeDown();
        return;
    }
    if(rmvIndex==""){ // 먼저 삽입된 버튼을 삭제 
        sizeDown();
        $(div.childNodes[2]).slideUp(1000);
        setTimeout(function(){
            div.removeChild(div.childNodes[2]);
        },1000);
    }
    else { 
        if(Number(rmvIndex) < size){ // 인덱스가 존재하면 해당 인덱스의 버튼을 삭제
            sizeDown();
            $(div.childNodes[Number(rmvIndex)+2]).slideUp(1000);
            setTimeout(function(){
                div.removeChild(div.childNodes[Number(rmvIndex)+2]);
            },1000);
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
    if(event.target.className == "queue"){
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