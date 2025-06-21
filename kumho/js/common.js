/* header, footer 의 공통요소에 들어가는 jquery */
/*************
 * pc버전, 모바일 버전 구분
 * 스크롤된값 계산
 * 스크롤을 내리면 header에 fixed클래스 추가
 * 메뉴에 마우스를 올리면  header에 menu_over클래스 추가
 * 메뉴를 오버한 li에 over클래스 추가
 * ******/


let device_status //pc인지 모바일인지 구분하는 값
let scrolling //브라우저가 스크롤 된 값
let window_w //브라우저 넓이값
let mobile_