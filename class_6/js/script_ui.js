$(function(){
    var loadData;
    var loadDataLength;
    var selectiNameArr;
    var selectTotal;

    //자리셋팅 버튼
    $("btn_setting").click(function(){
        $(".section.bot_intro").removeClass("on");
        loadDataFn();
    });
    
    //자리배치 완료 버튼
    $(".box_info .btn_submit").click(function(){
        $(".section.reservation").removeClass("on");
        $(".section.complete")
    })

    var loadData; //json 데이터를 담는 변수
    function loadDataFn(){
        $.ajax({
            url:"js/data.json",//데이터 경로
            dataType:"json",
            success:function(result){
                loadData = result.seatInfo;
                settingSeatFn();

            }
        });
    };

    //완료화면의 리셋
    $("btn_reset").click(function(){
        location.reload();
    })
    
    //자리배치
    function settingSeatFn(){
        // console.log(loadData.length);
        $(".section.reservation").addClass("on"); //자리배치 보임
        loadDataLength = loadData.length;
        for(var i = 0; i<loadData.length; i++){
            var n = loadData[i].name;
            var p = loadData[i].price;
            var r = loadData[i].reserve;
            // console.log(n,p,r);
            $(".section.reservation > ol").append('li class="unit"><button> '+n+'data-price="'+p+'" '+r+'</button></li>');
            
            }
            $(".section.reservation > ol button").click(function(){
                $(this).addClass("select");
                
        });
    }

    //자리값 업데이트
    function updateInfoFn(){
        var selectArr = []; //배열 초기화 & 정의
        selectiNameArr = []; //선택된 자리의 이름
        selectTotal = 0; //선택된 자리가격의 총합

        //index값 찾기
        for(var i = 0; i <loadDataLength; i++){
            if($(".section.reservation > ol button").eq(i).hasClass("select") == true){
                selectArr.push(i); //선택된 자리의 index값을 배열에 저장
            }
        }
    
        //하단 선택 정보 업데이트
        for(var i=0; i<selectArr.length; i++){
                var _i = selectArr[i];
                var _cost;
                selectiNameArr.push(loadData[_i].name);
                _cost = loadData[_i].price;
                selectTotal += Number(_cost);
            }

            $(".txt_info_name").text(selectiNameArr);
            $(".txt_info_total").text(selectTotal);

            $(".section.complete .txt_name").text(selectiNameArr);
            $(".section.complete .txt_price").text(selectTotal);
    }
})