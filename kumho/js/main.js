$(document).ready(function(){

    /****************** header와 메뉴 : 시작 ********************
     * pc인지 모바일인지 구분 - 브라우저 넓이로
     * 스크롤값 계산
     * 공통사항 : 브라우저가 스크롤되면 header에 오버하면 header에 fixed 클래스를 추가
     * pc일때 : 마우스를 오버한 li에만 over클래스 추가
     * 모바일일때 : 메뉴열기를 클릭하면 header에 menu_open 클래스 추가
                1차메뉴 클릭하면 (하위메뉴가 있는 1차메뉴만) 클릭한 li에 open클래스 추가
     *  ********/

    let device_status //모바일인지 pc인지
    let scrolling // 스크롤값
    let window_w // 브라우저 넓이
    let mobile_size = 1024 //모바일로 전환되는 사이즈 
    
    scroll_chk() //함수실행 (처음에 문서가 로딩되었을때 1번)
    resize_chk() //함수실행
    $(window).resize(function(){ //브라우저가 리사이즈 될때마다 1번씩 실행
        resize_chk() //함수실행
    })
    $(window).scroll(function(){ //브라우저를 스크롤 할때마다 1번씩 실행
        scroll_chk() //함수실행
    })

    function scroll_chk(){ //함수선언
       // console.log('스크롤했다')
       scrolling = $(window).scrollTop()
       //console.log(scrolling)
       if(scrolling > 0){
            $('header').addClass('fixed')
       }else{
            $('header').removeClass('fixed')
       }
    }
    function resize_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
       // console.log(device_status)
    }

    /*********** header에 마우스를 오버했을때 -- 클릭했을떄도 작동함 ************/
    $('header').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('fixed')
           // console.log('mouseenter 너?')
        }
    })
    $('header').on('mouseleave focusout', function(){
         /* 브라우저가 스크롤된 상태에서는 header에 fixed 클래스를 삭제하면 안됨 
            맨 위에 있을때만 삭제해야함 */
        if(scrolling <= 0){ 
            //console.log('아웃')
            $('header').removeClass('fixed')
        }//if종료 
    })

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            //console.log('오버했다!!!')
            $(this).addClass('over')
        }
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave ', function(){
       // console.log('아웃!!!')
        $(this).removeClass('over')
    })
    $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2 > li:last-child').on('focusout', function(){
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })

    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_open')
    })
    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_open')
    })
    /*
        닫힌메뉴를 클릭하면 열리고, 열린메뉴를 클릭하면 닫힘
        동시에 여러개의 메뉴가 열려있을 수도 있음
        toggleClass - 클래스가 없으면 추가하고 있으면 삭제 
    */
    $('header .gnb .gnb_wrap ul.depth1 > li:has(ul.depth2) > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault()
            console.log('클릭했따!!')
            $(this).parents('li').toggleClass('open')
        }
    })

    /****************** header와 메뉴 : 종료 ****************************/


    /****************** visual swiper : 시작 ****************************/
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000, /*5초*/
            disableOnInteraction: true,
        },
    
        effect: "fade", /* fade 효과 */
    
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_wrap button.btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_wrap button.btn_prev',  
        },
    
    });
    //visual_swiper.autoplay.stop();  /* 일시정지 기능 */
    //visual_swiper.autoplay.start();  /* 재생 기능 */      
    $('.visual .btn_wrap button.btn_stop').on('click', function(){
        //console.log('일시정지 버튼 클릭')
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()// 정지버튼 나 자신은 숨김
        $('.visual .btn_wrap button.btn_play').show() //재생 나타남
    })
    $('.visual .btn_wrap button.btn_play').on('click', function(){
        //console.log('재생버튼클릭')
        visual_swiper.autoplay.start();  /* 재생 기능 */ 
        $(this).hide()//재생버튼 자신은 숨김
        $('.visual .btn_wrap button.btn_stop').show()//정지버튼이 나타남
    })
    /****************** visual swiper : 끝 ****************************/

    /*********************find 탭 기능 : 시작 **********************
     * 1. 클릭한 li에서 data-content 값을 가져와서 
     *  ==> tab_item 중에 해당값이 id인 요소를 찾아서 나타나게 해야함 (다른요소는 숨김)
     * 2. 클릭한 li에만 active 클래스 줌
     * 3. 클릭한 li안에 있는 span에 선택됨이라고 글자 써줌(다른li에 있는 건 삭제)
     * 4. 클릭한 li 속성 aria-selected값을 true로 변경(다른 li는 모두 false)
     * *******/
    let find_content // 클릭한 메뉴의 이름(id)
    $('.find .list .tab_list ul li').on('click', function(){

        if($(this).hasClass('active') == false){
           // console.log('선택안된메뉴')
           find_content = $(this).attr('data-content') /*attr - 속성값*/
            //console.log(find_content)

            $('.find .list .tab_content .tab_item').removeClass('active')
            $('.find .list .tab_content').find('#'+find_content).addClass('active')

            $('.find .list .tab_list ul li').removeClass('active')
            $(this).addClass('active')

            $('.find .list .tab_list ul li button span').text('')
            $(this).find('span').text('선택됨')

            $('.find .list .tab_list ul li').attr('aria-selected', 'false') /*속성값 변경*/
            $(this).attr('aria-selected', 'true') /*속성값 변경*/
        }
    })
    /********************* find 탭 기능 : 끝 *****************************/

    /************************ 분양 swiper : 시작 ****************************/

    const adopt_swiper = new Swiper('.adopt .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 동그라미해야되서 auto줘야함, 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때*/
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            768: {    /* 640px 이상일때 적용 */
                spaceBetween: 24, /* 팝업사이 여백*/
                centeredSlides: true
            },
        },
        centeredSlides: false, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        navigation: {
            nextEl: '.adopt .list_ctrl .btn_next',
            prevEl: '.adopt .list_ctrl .btn_prev',
        },
    });
    /************************ 분양 swiper : 종료 ****************************/


     /************************ 후기 swiper : 시작 ****************************/

     const review_swiper = new Swiper('.review .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            768: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            1024: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
         loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        // autoplay: {  /* 팝업 자동 실행 */
        //     delay: 2500,
        //     disableOnInteraction: true,
        //},
        navigation: {
            nextEl: '.review .list .btn_next',
            prevEl: '.review .list .btn_prev',
        }
    });
    // review_swiper.autoplay.stop();  /* 일시정지 기능 */
    // review_swiper.autoplay.start();  /* 재생 기능 */
        
     /************************ 후기 swiper : 끝 ****************************/

    /************************ footer top버튼 : 시작 ****************************/
    // $('footer .top').on('click', function(){
    //     //console.log('클릭')
    //     //$(window).scrollTop(0)
    //     $('html, body').animate({
    //         scrollTop: 0
    //     }, 500)
        $('footer .top2').on('click', function(){
            //console.log('클릭')
            //$(window).scrollTop(0)
            $('html, body').animate({
                scrollTop: 0
            }, 500)

    })

    /************************ footer top버튼 : 끝 ****************************/

})//document.ready