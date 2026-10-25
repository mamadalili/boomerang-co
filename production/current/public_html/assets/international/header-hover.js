/* Shared header disclosures: mouse hover on desktop, native tap/keyboard elsewhere. */
(()=>{
  'use strict';
  const menus=[...document.querySelectorAll('.design-header details')];
  const desktop=window.matchMedia('(min-width: 701px) and (any-hover: hover) and (any-pointer: fine)');
  const timers=new Map();
  function cancel(menu){window.clearTimeout(timers.get(menu));timers.delete(menu)}
  function close(menu){cancel(menu);menu.open=false}
  function closeOthers(current){menus.forEach(menu=>{if(menu!==current)close(menu)})}
  function isMouse(event){return desktop.matches&&event.pointerType==='mouse'}
  function dismissSearch(){
    const search=document.querySelector('[data-design-search]');
    const panel=search?.querySelector('[data-design-search-panel]');
    if(panel){panel.hidden=true;search.querySelector('input')?.setAttribute('aria-expanded','false')}
  }
  menus.forEach(menu=>{
    if(menu.dataset.headerHoverReady==='true')return;
    menu.dataset.headerHoverReady='true';
    const summary=menu.querySelector('summary');
    menu.addEventListener('pointerenter',event=>{
      if(!isMouse(event))return;
      cancel(menu);closeOthers(menu);dismissSearch();menu.open=true;
    });
    menu.addEventListener('pointerleave',event=>{
      if(!isMouse(event))return;
      cancel(menu);
      // A short bridge lets the pointer enter the dropdown without flicker.
      // Mouse-click focus must not pin the menu open after the pointer leaves.
      timers.set(menu,window.setTimeout(()=>{
        if(menu.contains(document.activeElement)&&document.activeElement!==summary)return;
        close(menu);
      },180));
    });
    summary?.addEventListener('click',event=>{
      closeOthers(menu);dismissSearch();
      if(isMouse(event)&&event.detail>0){
        event.preventDefault();cancel(menu);menu.open=true;
      }
    });
    menu.addEventListener('focusout',event=>{
      if(!menu.contains(event.relatedTarget)&&!menu.matches(':hover'))close(menu);
    });
  });
  document.addEventListener('pointerdown',event=>{
    menus.forEach(menu=>{if(!menu.contains(event.target))close(menu)});
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    const open=menus.find(menu=>menu.open);
    menus.forEach(close);open?.querySelector('summary')?.focus();
  });
  desktop.addEventListener('change',()=>menus.forEach(close));
})();
