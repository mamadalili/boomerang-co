/* Decorative hero only: never fetch motion before checking user preferences. */
(()=>{
  'use strict';
  const video=document.querySelector('[data-hero-video]');
  const button=document.querySelector('[data-hero-toggle]');
  if(!video||!button)return;
  const hero=video.closest('.design-video-hero');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection=navigator.connection;
  let loaded=false,userPaused=false,manualOptIn=false,inView=true,failed=false;
  video.muted=true;
  function label(){
    const text=video.paused?button.dataset.playLabel:button.dataset.pauseLabel;
    button.textContent=text;button.setAttribute('aria-label',text);
  }
  function pause(){video.pause();label()}
  async function play(){
    if(failed)return;
    if(!loaded){
      video.querySelectorAll('source[data-src]').forEach(source=>source.src=source.dataset.src);
      video.load();loaded=true;
    }
    try{await video.play()}catch{ /* Autoplay refusal leaves the real poster and play control. */ }
    label();
  }
  function sync(){
    const allowed=manualOptIn||(!motion.matches&&!connection?.saveData);
    if(!document.hidden&&inView&&!userPaused&&allowed)void play();else pause();
  }
  button.hidden=false;
  button.addEventListener('click',()=>{
    if(video.paused){userPaused=false;manualOptIn=true;void play()}
    else{userPaused=true;pause()}
  });
  video.addEventListener('playing',()=>{hero.classList.add('has-video-frame');label()});
  video.addEventListener('pause',label);
  video.addEventListener('error',()=>{
    failed=true;pause();hero.classList.remove('has-video-frame');button.hidden=true;
  });
  function preferencesChanged(){
    manualOptIn=false;
    if(motion.matches||connection?.saveData)hero.classList.remove('has-video-frame');
    sync();
  }
  motion.addEventListener('change',preferencesChanged);
  connection?.addEventListener?.('change',preferencesChanged);
  document.addEventListener('visibilitychange',sync);
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      inView=entries.some(entry=>entry.isIntersecting);sync();
    },{threshold:0.05}).observe(hero);
  }
  sync();
})();
