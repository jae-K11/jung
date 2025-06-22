/* header, footer 의 공통요소에 들어가는 jquery */
/*************
 * pc버전, 모바일 버전 구분
 * 스크롤된값 계산
 * 스크롤을 내리면 header에 fixed클래스 추가
 * 메뉴에 마우스를 올리면  header에 menu_over클래스 추가
 * 메뉴를 오버한 li에 over클래스 추가
 * 
 * 
 * 스크롤을 내릴때는 gnb_up클래스 추가
 * 스크롤은 올릴떄는 gnb_up클래스 삭제
 * ===> 이전에 스크롤값과 현재스크롤 값 비교해서 
 *      현재값이 더 크면 내려가는 중 (100 --> 200 내려가는중)
 *      현재값이 작으면 올라가는 중 (200 --> 100 올라가는중)
 * ******/


let device_status //pc인지 모바일인지 구분하는 값
let scrolling //브라우저가 스크롤 된 값
let scroll_prev// 이전에 스크롤 된 값
let window_w //브라우저 넓이값
let mobile_size = 1024 // 모바일로 변경되는 사이트

$(window).scroll(function(){ //브라우저가 스크롤될때마다 1번실행
    //console.log('브라우저가 스크롤될떄마다 1번실행')
    scroll_chk()
})
$(window).resize(function(){ //리사이즈 될떄마다 1번실행
    //console.log('브라우저 크기 변한다')
    resize_chk() //함수의 실행 
})

$(document).ready(function(){ //문서가 로딩되고 단 1번 실행
    //console.log ('로딩되냐')
    resize_chk() //함수의 실행 
    scroll_chk()

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        if(device_status == 'pc'){
            //console.log('나 오버한다')
            $('header').addClass('menu_over')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $(this).addClass('over')
        }//if 
    })

    $('header').on('mouseleave', function(){
        $('header').removeClass('menu_over')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })

    /******** 모바일 메뉴 열고 닫기 *********/
    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_open')
    })
    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_open')
    })






})//$(document).ready


//함수의 선언 
 function resize_chk(){
    window_w = $(window).width()
    //console.log(window_w)
     if(window_w > mobile_size){ //1024보다 크면
       device_status = 'pc'
     }else{//같거나 작으면
        device_status = 'mobile'
     }
     console.log(device_status)
 }

 function scroll_chk(){
    scroll_prev = scrolling //스크롤값을 다시 계산하기 전에 이전값을 prev에 저장
    scrolling = $(window).scrollTop()
    //console.log(scroll_prev, scrolling)
    if(scrolling > 0){ // 조금이라도 스크롤 됬으면
        $('header').addClass('fixed')
        if(scrolling > scroll_prev){
           // console.log('내려가는중')
           $('header').addClass('gnb_up')
        }else{
           // console.log('올라가는중')
            $('header').removeClass('gnb_up')
        }
    }else{//0일떄
         $('header').removeClass('fixed')
    }
 }