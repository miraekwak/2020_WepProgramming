var div = document.getElementById("visuContent"); // 시각화 표현될 div
var firstAddBtn = document.getElementById("firstAdd");//처음 삽입 버튼
var lastAddBtn = document.getElementById("lastAdd");// 마지막 삽입 버튼
var firstRmvBtn = document.getElementById("firstRemove");// 처음 삭제 버튼
var lastRmvBtn = document.getElementById("lastRemove");// 마지막 삭제 버튼
var quiz = document.getElementsByTagName("h1"); // 제목에 해당하는 element를 가져옴
var size=0;
function sizeUp(){
    size++;
}
function sizeDown(){
    size--;
}

// 삽입 버튼 클릭시 노드 역할을 하는 button을 생성한다.
// 처음 또는 마지막 삽입 버튼 클릭에 따라 맞는 위치에 노드를 연결한다.
// button을 통해 노드를 만들고 화살표 이미지로 노드 연결과정을 보여줌
firstAddBtn.addEventListener("click", function(){ // front에 삽입하는 코드
    var addValue = document.getElementById("addValue").value;
    if(addValue==""){
        alert("value를 입력하세요.");
    }
    else if(size==0){ // 사이즈가 0일 경우 front와 rear을 가리키는 화살표와 함께 노드를 추가한다.
        var top = document.createElement('strong');
        top.innerHTML = "Front⬅";
        top.className = "arrow";
        div.appendChild(top);
        var btn = document.createElement('button');
        btn.innerHTML = addValue;
        btn.className = "deque";
        div.appendChild(btn);
        var bottom = document.createElement('strong');
        bottom.innerHTML = "⬅Rear";
        bottom.className = "arrow";
        div.appendChild(bottom);
        $(top).fadeOut(0); //애니메이션 효과를 위한 코드로 화살표는 1초동안 띄우고 버튼은 slideDown으로 추가한다.
        $(top).fadeIn(1000);
        $(btn).slideUp(0);
        $(btn).slideDown(1000);
        $(bottom).fadeOut(0);
        $(bottom).fadeIn(1000);
        sizeUp();
    }
    else{ // 입력받은 값으로 노드를 추가한다.
            var btn = document.createElement('button');
            btn.innerHTML = addValue;
            btn.className = "deque";
            div.insertBefore(btn, div.childNodes[2]);
            $(btn).slideUp(0);
            $(btn).slideDown(1000);
            sizeUp();
    }
    document.getElementById("addValue").value = "";
});

// rear에 삽입하는 코드로 마지막에 삽입한다.
lastAddBtn.addEventListener("click", function(){
    var addValue = document.getElementById("addValue").value;
    if(addValue==""){
        alert("value를 입력하세요.");
    }
    else if(size==0){// 사이즈가 0일 경우 front와 rear을 가리키는 화살표와 함께 노드를 추가한다.
        var top = document.createElement('strong');
        top.innerHTML = "First➡";
        top.className = "arrow";
        div.appendChild(top);
        var btn = document.createElement('button');
        btn.innerHTML = addValue;
        btn.className = "deque";
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
    else{ // 마지막에 버튼을 추가한다.
        var btn = document.createElement('button');
        btn.innerHTML = addValue;
        btn.className = "deque";
        div.insertBefore(btn, div.childNodes[size+2]);
        $(btn).slideUp(0);
        $(btn).slideDown(1000);
        sizeUp();
    }
    document.getElementById("addValue").value = "";
});

// 삭제 버튼 클릭시 노드 역할을 하는 버튼과 화살표 이미지를 삭제하여 시각적으로 노드가 삭제되었음을 보여주는 함수
// 입력받은 값에 대한 validation을 진행
// 값을 삭제할 때 decue구조에 맞게 맨처음 또는 맨뒤에서 선택한 버튼에 맞게 값을 삭제한다.
firstRmvBtn.addEventListener("click", function(){ // front의 값을 삭제
    if(size==0){
        alert('삭제할 값이 없습니다.');
        return;
    }
    if(size==1){ // 사이즈가 1일 경우 front와 rear을 가리키는 화살표도 같이 삭제한다.
        $(div.childNodes[1]).fadeOut(1000);//애니메이션 효과를 주며 화살표와 버튼을 사라지게 함
        $(div.childNodes[2]).slideUp(1000);
        $(div.childNodes[3]).fadeOut(1000);
        setTimeout(function(){// 애니메이션 효과가 끝나면 노드를 삭제
            div.removeChild(div.childNodes[1]);
            div.removeChild(div.childNodes[1]);
            div.removeChild(div.childNodes[1]);
        },1000);
        sizeDown();
        return;
    }
    // 이외의 경우 첫번째 버튼만 삭제
    sizeDown();
    $(div.childNodes[2]).slideUp(1000);
        setTimeout(function(){
            div.removeChild(div.childNodes[2]);
        },1000);

});
lastRmvBtn.addEventListener("click", function(){ // rear의 값을 삭제
    if(size==0){
        alert('삭제할 값이 없습니다.');
        return;
    }
    if(size==1){// 사이즈가 1일 경우 front와 rear을 가리키는 화살표도 같이 삭제한다.
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
    //이외의 경우 마지막 버튼을 삭제
    sizeDown();
    $(div.childNodes[size+2]).slideUp(1000);
        setTimeout(function(){
            div.removeChild(div.childNodes[size+2]);
        },1000);
});

// 이미 시각화된 노드의 값 변경을 원할 경우 해당 버튼을 클릭함
window.onclick = function(event){
    // event target이 버튼이면 해당 button의 값 변경을 위한 모달이 나타남
    // 모달을 통해 값을 입력받아 이미 시각화된 노드의 값을 변경
    if(event.target.className == "deque"){
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