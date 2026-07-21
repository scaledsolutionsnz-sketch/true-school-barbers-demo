/* True School Barbers — site behaviour */
(function(){
  "use strict";

  /* Intro overlay */
  var intro = document.getElementById('intro');
  if(intro){
    window.addEventListener('load', function(){
      setTimeout(function(){ intro.classList.add('done'); }, 1400);
    });
    // safety: never trap the page
    setTimeout(function(){ intro.classList.add('done'); }, 3000);
  }

  /* Mobile nav */
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if(burger && links){
    burger.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  /* Hero slideshow */
  var slides = document.querySelectorAll('.hero-slide');
  if(slides.length > 1){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce){
      var i = 0;
      setInterval(function(){
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 6000);
    }
  }

  /* Reveal on scroll */
  var revs = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    revs.forEach(function(el){ io.observe(el); });
  } else {
    revs.forEach(function(el){ el.classList.add('in'); });
  }

  /* Gmail compose links (built in JS so the address is never raw in HTML) */
  document.querySelectorAll('a[data-gmail]').forEach(function(a){
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
             '&su=' + (a.getAttribute('data-su') || '') +
             '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Footer year */
  var yr = document.getElementById('yr');
  if(yr){ yr.textContent = new Date().getFullYear(); }
})();
