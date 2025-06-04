$(document).ready(function(){
/********************* header의 메뉴 : 시작 *************
 * pc인지 모바일인지 구분 - 브라우저 넓이로
 * 스크롤값계산
 * 공통사항 : 브라우저가 스크롤되면 or header에 오버하면  header에  fixed클래스 추가
 * pc일때 : 마우스를 오버한  li에만  over 클래스 추가 
 * 모바일떄 : 메뉴열기를 클릭하면   header 에 menu_open 클래스 추가
 *           1차메뉴를 클릭하면 (하위메뉴가 있는  1차메뉴만 ) 클릭한 li에  open클래스축가
 *********/

let device_status //모바일인지 pc인지
let scrolling //스크롤한 값 
let  window_w //브라우저 넓이
let  mobile_size = 1024 //모바일로 전환되는 사이즈 

scroll_chk()//함수실행 (처음에 문서가 로딩되었을때 1번)
resize_chk() //함수실행
$(window).resize(function(){//브라우저가 리사이즈될떄마다 1번씩 실행
    resize_chk() //함수실행
})
$(window).scroll(function(){
    scroll_chk()//함수실행
})

function scroll_chk(){
    //console.log('스크롤했다')
    scrolling = $(window).scrollTop()
    //console.log(scrolling)
    if(scrolling > 0){
        $('header').addClass('fixed')
    }else{
        $('header').removeClass('fixed')
    }
}
function resize_chk(){
    //console.log('리사이즈됬다')
    window_w = $(window).width()
    if(window_w > mobile_size){
        device_status = 'pc'
    }else{ 
        device_status = 'mobile'
    }
    //console.log(device_status)
}

/* header에 마우스를 오버했을때 -- 클릭했을떄도 작동함*/
$('header').on('mouseenter focusin', function(){
    if(device_status == 'pc'){
    $('header').addClass('fixed')
    //console.log('너?')
    }
})
$('header').on('mouseleave focusout', function(){
    /* <= 작거나 같으면 , 브라우저가 스크롤 된 상태에서는 header 가 fixed 클래스를 삭제하면 안됨
    맨 위에 있을때만 삭제해야함*/  
    if(scrolling <= 0){      
        //console.log('지금은 아니야')
        console.log('아웃')
        $('header').removeClass('fixed')
    }//if 종료
    
})

$('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
    if(device_status == 'pc'){
      //  console.log('오버했따')
        $(this).addClass('over')
    }
}) 
$('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
   // console.log('마우스아웃')
    $(this).removeClass('over')
}) 
$('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2 > li:last-child ').on('focusout', function(){
    $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
}) 


$('header .gnb .gnb_open').on('click', function(){
    $('header').addClass('menu_open')
})
$('header .gnb .gnb_close').on('click', function(){
    $('header').removeClass('menu_open')
})
/*
    닫힌메뉴를 클릭하면 열리고 , 열린메뉴를 클릭하면 닫힘
    동시에 여러개의 메뉴가 열려있을 수도 있음
    toggleClass - 클래스가 없으면 추가하고 있으면 삭제
*/


$('header .gnb .gnb_wrap ul.depth1 > li:has(ul.depth2) > a').on('click', function(e){
    if(device_status == 'mobile'){
         e.preventDefault()
         console.log('클릭했다')
         $(this).parents('li').toggleClass('open')
    }
   
})

/********************* header의 메뉴 : 종료 *********************/


 /********************* visual swiper : 시작 *********************/
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_wrap button.btn_next ',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_wrap button.btn_prev',  
        },

    });
    // visual_swiper.autoplay.stop();  /* 일시정지 기능 */
    // visual_swiper.autoplay.start();  /* 재생 기능 */
    $('.visual .btn_wrap button.btn_stop').on('click', function(){
        //console.log('일시정지버튼 클릭')
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()// 정지버튼 자신은 숨김
        $('.visual .btn_wrap button.btn_play').show()//재생 나타냄
    })
    $('.visual .btn_wrap button.btn_play').on('click', function(){
        console.log('재생버튼 클릭')
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()// 재생버튼 자신은 숨김
        $('.visual .btn_wrap button.btn_stop').show()//정지버튼 나타냄
    })

    /********************* visual swiper : 끝 *********************/

     /********************* find 탭 기능 : 시작 **********
      * 1. 클릭한 li에서 data-content 값을 가져와서
      * ==> tab_item 중에 해당 값이 id인 요소를 찾아서 나타나게 해야함 (다른요소는 숨김)
      * 2. 클릭한 li에만 active클래스를 줌
      * 3. 클릭한 li안에 있는 span에 선택됨이라고 글자 써줌(다른 li에 있는건 삭제)
      * 4. 클릭한 li 속성 aria-selected 값을  true로 변경 (다른 li는 모두 false )
      * ***********/

     let find_content //클릭한메뉴의 이름(id) 
     $('.find .list .tap_list ul li').on('click', function(){
        
        if($(this).hasClass('active') == false){
           // console.log('선택안된 메뉴')
           find_content = $(this).attr('data-content')
          // console.log(find_content)
        
           $('.find .list .tab_content .tab_item').removeClass('active')
           $('.find .list .tab_content').find('#'+find_content).addClass('active')
        
        
         $('.find .list .tap_list ul li').removeClass('active')
         $(this).addClass('active')

         $('.find .list .tap_list ul li button span').text('')
         $(this).find('span').text('선택됨')

         $('.find .list .tap_list ul li').attr('aria-selected', 'false')
         $(this).attr('aria-selected', 'true')
        }
    })
     
     
     
     
     /********************* find 탭 기능 : 끝 *********************/
})