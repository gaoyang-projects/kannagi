function initStarColor (elementClass, score) {
  var scoreActiveEle = document.querySelector('.' + elementClass)
  var progress = score / 5 * 100
  scoreActiveEle && (scoreActiveEle.style.width = progress + '%')
}

function changeFileLabel1(e) {
  console.log(e.files)
  if (!e.files.length) { return false }
  document.querySelector('.style-placeholder1').innerHTML = e.files[0].name;
  document.querySelector('.style-placeholder1').classList.add('active');
  document.querySelector('.style-btn1').style.display = 'none';
  
}

function changeFileLabel2(e) {
  if (!e.files.length) { return false }
  document.querySelector('.style-placeholder2').innerHTML = e.files[0].name;
  document.querySelector('.style-placeholder2').classList.add('active');
  document.querySelector('.style-btn2').style.display = 'none';
}

function changeFileLabel3(e) {
  if (!e.files.length) { return false }
  document.querySelector('.style-placeholder3').innerHTML = e.files[0].name;
  document.querySelector('.style-placeholder3').classList.add('active');
  document.querySelector('.style-btn3').style.display = 'none';
}

function advantageHandle() {
  $('.advantage-item-icon').click(function() {
    var index = $(this).attr('data-index')
    var top = $('.advantage-item').eq(index).offset().top
    var headerHeight = $('.header').height()
    $('html, body').animate({scrollTop: top - headerHeight}, 500)
  })
}

function faqHandle() {
  $('.faq-item').click(function() {
    $(this).find('.faq-answer-wrap').slideToggle()
  })
}

function troubleHandle() {
  $('.trouble-item').bind('click', function(e) {
    e.stopPropagation();
    if (e.target.type === 'checkbox') return;
    $(this).find('.trouble-note').toggle()
  })
}

function scrollShowAside() {
  $(document).on( "scroll", function(e) {
    var windowWidth = $(window).width()
    if (windowWidth < 769) {
      return false
    }
    var scrollTop = $(document).scrollTop()
    if (scrollTop > 940) {
      $('.aside-fixed-nav').show()
    } else {
      $('.aside-fixed-nav').hide()
    }
  })
}

function contactScroll() {
  $('.contact-btn.mail').click(function() {
    var top = $('.contact-page-section').offset().top
    var headerHeight = $('.header').height()
    $('html, body').animate({scrollTop: top - headerHeight}, 500)
  })
  $('.nav-btn.contact-wrap').click(function() {
    var top = $('.contact-page-section').offset().top
    var headerHeight = $('.header').height()
    $('html, body').animate({scrollTop: top - headerHeight}, 500)
  })
}

function debounce (fn, delay = 500) {
  return function () {
    clearTimeout(fn.timerId)
    fn.timerId = setTimeout(function () {
      fn.call(this, ...arguments)
    }, delay)
  }
}

var repairSlider = {}
var subsidySlider = {};
var ratingSlider = {};
var sliderOptions = {
  item: 3,
  slideMove: 1,
  slideMargin: 30,
  loop: true,
  auto: true,
  pause: 4000,
  pauseOnHover: true,
  controls: false,
  pager: false,
  adaptiveHeight: true,
  prevHtml: '<img src="../assets/images/part6_icon_left.svg" alt="前へ">',
  nextHtml: '<img src="../assets/images/part6_icon_right.svg" alt="次へ">',
  responsive: [
    {
      breakpoint: 780,
      settings: {
        item: 2,
        slideMove: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        item: 1,
        slideMove: 1
      }
    }
  ]
}

$(document).ready(function() {
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    document.body.classList.add('is-ios');
  }
  initStarColor('score-star', 4.1)
  faqHandle()

  AOS.init({
    offset: 200,
    duration: 400,
    easing: 'ease-out',
    delay: 0,
    once: true,
    disable: false,
    startEvent: 'DOMContentLoaded'
  })

  setTimeout(function() {
    repairSlider = $('#repair-slider').lightSlider(sliderOptions);
    subsidySlider = $('#subsidy-slider').lightSlider(sliderOptions);
    ratingSlider = $('#rating-slider').lightSlider({...sliderOptions, slideMargin: 30});
    AOS.refreshHard();
  }, 300);
  
  scrollShowAside()
  troubleHandle()
  advantageHandle()
  contactScroll()

  $(document).on('scroll', debounce(function() {
    if (window.innerWidth < 769) {
      AOS.refresh();
    }
  }, 50));

});
