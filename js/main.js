import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'  

//장바구니 드롭다운 클릭 이벤트 토글
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  if (basketEl.classList.contains('show')) {
    //hide
    hideBasket()
  } else {
    //show
    showBasket()
  }
})

basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})
window.addEventListener('click', function () {
  hideBasket()
})

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}

//검색 메뉴
const headerEl = document.querySelector('header');
/* 검색메뉴 애니메이션 */
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
///////////////
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.search-shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchStaterEl = headerEl.querySelector('.search-starter');
//검색인풋애니메이션
const searchDleayEls = [...searchWrapEl.querySelectorAll('li')];

searchStaterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);


function showSearch() {
  headerEl.classList.add('searching');
  //검색시 스크롤업애기 html fixed 추가
  document.documentElement.classList.add('fixed')
  //검색애니메이션
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  //검색인풋애니메이션
  searchDleayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching');
  //검색시 스크롤업애기 html fixed 추가
  document.documentElement.classList.remove('fixed')
  //검색애니메이션
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  //검색인풋애니메이션
  searchDleayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDleayEls.reverse()
  searchInputEl.value = ''
}

// 요소가 보이는지 아닌지, 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})

//비디오 재생 일시정지!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller-play')
const pauseBtn = document.querySelector('.stage .controller-pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')  
})
pauseBtn.addEventListener('click', function () {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')  
})

//컴페어 섹션 렌더링
const itemsEl = document.querySelector('section.compare .items')
 ipads.forEach(function (ipad) {
   //html 요소를 js를통해 생성
   const itemEl = document.createElement('div')
   itemEl.classList.add('item')

   let clist = ''
   ipad.colors.forEach(function (color) {
    clist += /* html*/ `<li style="background-color: ${color};"></li>`
   })

   //html구조로 내용 삽입
   itemEl.innerHTML = /* html */ `
   <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />
   </div>
   <ul class="colors">
    ${clist}
   </ul>
   <h3 class="name">${ipad.name}</h3>
   <p class="tagline">${ipad.tagline}</p>
   <p class="price">KRW ${ipad.price.toLocaleString('en-US')}부터</p>
   <button class="btn">구입하기</button>
   <a href="${ipad.url}" class="link">더 알아보기</a>
   `

   itemsEl.append(itemEl)
 })

// 푸터 네비게이션
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */  `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

//올해 연도 넣기
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()
