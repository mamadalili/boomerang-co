/* Design-only interactions; existing inquiry service and event boundary unchanged. */
(()=>{
  'use strict';
  const dialog=document.querySelector('[data-design-search]');
  const field=dialog?.querySelector('input');
  const results=dialog?.querySelector('[data-design-search-results]');
  const trigger=document.querySelector('[data-design-search-open]');
  const clear=dialog?.querySelector('[data-design-search-clear]');
  const state=dialog?.querySelector('[data-design-search-state]');
  const nav=document.querySelector('#primary-navigation'),toggle=document.querySelector('.mobile-nav-toggle');
  const languagePicker=document.querySelector('[data-language-intro]');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(languagePicker&&document.documentElement.lang==='en'&&!reducedMotion.matches){
    try{
      const introKey='boomerang-language-intro-v1';
      if(!sessionStorage.getItem(introKey)){
        sessionStorage.setItem(introKey,'shown');
        languagePicker.open=true;
        languagePicker.classList.add('is-entry-highlight');
        window.setTimeout(()=>{
          languagePicker.classList.remove('is-entry-highlight');
          if(languagePicker.open&&!languagePicker.matches(':hover')&&!languagePicker.contains(document.activeElement))languagePicker.open=false;
        },1500);
      }
    }catch{}
  }
  let index=[];
  try{index=JSON.parse(document.querySelector('[data-design-search-index]')?.textContent||'[]')}catch{}
  const normalize=value=>String(value).normalize('NFKD').toLocaleLowerCase().replace(/\p{M}/gu,'').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[أإآٱ]/g,'ا').replace(/[۰-۹٠-٩]/g,d=>String(d.charCodeAt(0)-(d>='۰'?1776:1632))).replace(/[\s\-_–—\u200c]+/g,'');
  function search(){
    if(!results)return;
    results.replaceChildren();
    const tokens=field.value.trim().split(/\s+/).map(normalize).filter(Boolean);
    if(clear)clear.hidden=!field.value;
    if(!tokens.length){if(state)state.textContent=state.dataset.idle;return}
    const matches=index.filter(item=>{const text=normalize(item.name+' '+item.model+' '+(item.slug||'')+' '+(item.category||''));return tokens.every(token=>text.includes(token))}).slice(0,8);
    if(state)state.textContent=matches.length+' '+state.dataset.countLabel;
    for(const item of matches){
      const link=document.createElement('a'), small=document.createElement('small');
      link.href=item.url;link.textContent=item.name;small.textContent=item.category;link.append(small);results.append(link);
    }
    if(!matches.length)results.textContent=results.dataset.empty;
    // Free-form search text is intentionally not sent to analytics.
  }
  trigger?.addEventListener('click',()=>{
    nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');
    document.querySelectorAll('.design-header details[open]').forEach(item=>item.open=false);
    document.documentElement.classList.add('design-search-active');
    if(!dialog.open)dialog.showModal();search();field.focus();
  });
  dialog?.querySelector('[data-design-search-close]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('close',()=>{document.documentElement.classList.remove('design-search-active');(trigger?.getClientRects().length?trigger:toggle)?.focus()});
  dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog?.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dialog.close()}});
  dialog?.querySelector('form')?.addEventListener('submit',event=>{event.preventDefault();search()});
  field?.addEventListener('input',search);
  field?.addEventListener('search',search);
  clear?.addEventListener('click',()=>{field.value='';search();field.focus()});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!document.querySelector('dialog[open]')&&nav?.classList.contains('is-open')){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.focus()}
  });
  // Explicit containment for the new search and existing optional Quick View.
  document.querySelectorAll('dialog').forEach(modal=>modal.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const items=[...modal.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(x=>!x.disabled&&x.getClientRects().length);
    const first=items[0],last=items.at(-1);if(!first)return;
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }));
  // Native scrolling keeps touch, trackpad and keyboard support without a library.
  document.querySelectorAll('[data-design-carousel]').forEach(section=>{
    const track=section.querySelector('[data-carousel-track]');
    const previous=section.querySelector('[data-carousel-prev]'),next=section.querySelector('[data-carousel-next]');
    const progress=section.querySelector('[data-carousel-progress]');
    if(!track||!previous||!next)return;
    const rtl=getComputedStyle(track).direction==='rtl';
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    function update(){
      const max=Math.max(0,track.scrollWidth-track.clientWidth),position=Math.min(max,Math.abs(track.scrollLeft));
      previous.disabled=position<2;next.disabled=position>=max-2;
      if(progress)progress.style.width=`${max?Math.min(100,(position+track.clientWidth)/track.scrollWidth*100):100}%`;
    }
    function move(direction){
      const card=track.querySelector('.design-card');
      const distance=(card?.getBoundingClientRect().width||track.clientWidth)+parseFloat(getComputedStyle(track).columnGap||0);
      track.scrollBy({left:direction*(rtl?-1:1)*distance,behavior:reduced.matches?'instant':'smooth'});
    }
    previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
    track.addEventListener('scroll',update,{passive:true});
    track.addEventListener('keydown',event=>{
      if(event.target!==track)return;
      if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
        event.preventDefault();move((event.key==='ArrowRight'?1:-1)*(rtl?-1:1));
      }else if(event.key==='Home'||event.key==='End'){
        event.preventDefault();track.scrollTo({left:event.key==='Home'?0:(rtl?-1:1)*track.scrollWidth,behavior:reduced.matches?'instant':'smooth'});
      }
    });
    new ResizeObserver(update).observe(track);update();
  });
})();
