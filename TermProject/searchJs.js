var quiz = document.getElementsByTagName("h1"); // 제목에 해당하는 element를 가져옴

// api 사용을 위한 코드로 다음의 블로그를 가져와서 블로그 목록을 출력
$(document).ready(function(){
    //검색 버튼을 클릭하면 입력 값에 대한 검색을 시작함
        $("#search").click(function(){
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v2/search/blog",

            data: { query: $("#blogname").val()},
            headers: {Authorization: "KakaoAK 3940030f83e192ed5f3b3726b76aeed1"} //카카오로 부터 받은 key를 넣음
        })
        // 검색이 끝나면 서버로 부터 검색에 대한 결과를 받아와서 출력함
            .done(function(msg){
                $("#content div").remove(); //원래 출력된 div를 삭제
                for(var i=0; i<msg.documents.length; i++){
                    var target = msg.documents[i]; //div안에 img와 a, strong 태그를 넣어 출력
                    $("#content").append(`<div><img src="${target.thumbnail}"/><a href="${target.url}"><strong>${target.title}</strong></a><br><br>${target.contents}</div>`);
                }
            })
    });
});