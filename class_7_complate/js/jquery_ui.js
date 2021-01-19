$(function(){
    $(".input_area input[type='text']").keypress(function(event){
        console.log()
        if(event.keyCode == 13 && $(this).val().length !=0){ //입력되는 값이 있을 경우에만 실행 시키는 조건문
        var _val = $(this).val(); //입력된 input의 내용을 담는 변수
        var _class = $(this).attr("class"); //입력된 input의 클래스명을 담는 변수
        var _time; //입력되는 순간의 시간을 담는 변수

        //현재 시간을 구하기
        var _date = new Date();
        var _hh = _date.getHours();
        var _mm = _date.getMinutes();
        var _apm = "오전";
        if(_hh > 12){
            _apm = "오후";
            _hh -= 12;
        }
        _time = _apm+" "+_hh+":"+_mm;
        
        $(".chat_area").append(' <div class="item '+_class+' on"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>');


        //0.01초 딜레이 후 chat_area 맨 끝 item(말풍선)에 on클래스 추가
        setTimeout(function(){
            $(".chat_area .item").last().addClass("on");
        },10)

        
        //입력된 input의 값을 지워줌(초기화)
        $(this).val("");

        //채팅창 맨 밑으로 갈 수 있게 하는 스크롤 이벤트
        var _itemL = $(".chat_area .item").length(); //말풍선의 갯수
        var _itmeH = 0;
        for(var i=0; i<_itemL; i++){ //
            _itemH = _itemH + $(".chat_area .item").eq(i).height(); +15; //15=말풍선 사이 마진값
        };

        $(".chat_area").stop().animate({
            scrollTop: _itemH
        });
        };
    });
});