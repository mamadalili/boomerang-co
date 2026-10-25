(function(){
  "use strict";
  const digitMap={"۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9"};
  const normalize=value=>String(value||"").replace(/[۰-۹٠-٩]/g,d=>digitMap[d]).replace(/[يى]/g,"ی").replace(/ك/g,"ک").toLocaleLowerCase().normalize("NFKD").replace(/[\s\-_–—/\\|]+/g,"").replace(/[^a-z0-9آ-یа-яё]+/gi,"");
  const parseList=value=>String(value||"").split("|").filter(Boolean);

  function setupCatalogue(root){
    const cards=[...root.querySelectorAll("[data-product-card]")];
    const controls=[...root.querySelectorAll("[data-filter]")];
    const count=root.querySelector("[data-search-count]");
    const empty=root.querySelector("[data-no-results]");
    function apply(){
      let visible=0;
      cards.forEach(card=>{
        const pass=controls.every(control=>{
          const value=control.value;
          if(!value)return true;
          const key=control.dataset.filter;
          if(key==="search")return normalize(card.dataset.searchText).includes(normalize(value));
          if(key==="price"){
            const price=Number(card.dataset.price||0),min=Number(control.selectedOptions[0]?.dataset.min||0),max=Number(control.selectedOptions[0]?.dataset.max||Number.MAX_SAFE_INTEGER);
            return price>0&&price>=min&&price<=max;
          }
          return parseList(card.dataset[key]).includes(value);
        });
        card.hidden=!pass;if(pass)visible++;
      });
      if(count)count.textContent=String(visible);
      if(empty)empty.hidden=visible!==0;
    }
    controls.forEach(control=>control.addEventListener(control.type==="search"?"input":"change",apply));
    root.querySelector("[data-filter-reset]")?.addEventListener("click",()=>{controls.forEach(x=>x.value="");apply();});
  }
  document.querySelectorAll("[data-catalogue]").forEach(setupCatalogue);

  const navToggle=document.querySelector(".mobile-nav-toggle"), navTools=document.querySelector("#primary-navigation");
  navToggle?.addEventListener("click",()=>{const open=navToggle.getAttribute("aria-expanded")!=="true";navToggle.setAttribute("aria-expanded",String(open));navTools?.classList.toggle("is-open",open);});
  document.querySelectorAll(".site-search").forEach(form=>form.addEventListener("submit",event=>{
    const field=form.querySelector('[name="q"]');if(!field?.value.trim())return;
    const target=document.querySelector("main[data-catalogue]")||document.querySelector("main[data-comparison-scope]");
    if(!target||!target.querySelector("[data-product-card]"))return;
    event.preventDefault();const query=normalize(field.value);let count=0;
    target.querySelectorAll("[data-product-card]").forEach(card=>{const match=normalize(card.dataset.searchText).includes(query);card.hidden=!match;if(match)count++;});
    target.querySelector("[data-search-count]")?.replaceChildren(document.createTextNode(String(count)));
    const empty=target.querySelector("[data-no-results]");if(empty)empty.hidden=count!==0;
    target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  }));
  const initialQuery=new URLSearchParams(location.search).get("q"), headerSearch=document.querySelector('.site-search [name="q"]');
  if(initialQuery&&headerSearch){headerSearch.value=initialQuery;document.querySelector(".site-search")?.requestSubmit();}

  const main=document.querySelector("[data-gallery-main]");
  const originalImage=main?{src:main.getAttribute("src"),srcset:main.getAttribute("srcset")||"",sizes:main.getAttribute("sizes")||"",alt:main.alt,width:main.width,height:main.height}:null;
  const galleryButtons=[...document.querySelectorAll("[data-gallery-thumb]")];
  const galleryImages=originalImage?[originalImage,...galleryButtons.map(button=>({...button.dataset}))]:[];
  let galleryIndex=0;
  function showImage(image){
    if(!main)return;
    // Set the responsive candidates before src so changing colour does not
    // briefly request the previous colour at a different resolution.
    main.srcset=image.srcset||"";main.sizes=image.sizes||main.sizes;main.src=image.src;
    main.alt=image.alt||main.alt;
    if(image.width)main.setAttribute("width",image.width);
    if(image.height)main.setAttribute("height",image.height);
    galleryIndex=galleryImages.findIndex(item=>item.src===image.src);
    galleryButtons.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.src===image.src)));
  }
  if(main)galleryButtons.forEach(button=>button.addEventListener("click",()=>{
    showImage({...button.dataset,alt:button.dataset.alt});
  }));
  const galleryViewport=main?.closest(".gallery-main");
  if(galleryViewport&&galleryImages.length>1){
    const rtl=document.documentElement.dir==="rtl";
    const move=index=>showImage(galleryImages[(index+galleryImages.length)%galleryImages.length]);
    main.draggable=false;
    galleryViewport.addEventListener("keydown",event=>{
      if(event.target!==galleryViewport)return;
      const delta=event.key==="ArrowRight"?(rtl?-1:1):event.key==="ArrowLeft"?(rtl?1:-1):0;
      if(delta){event.preventDefault();move(Math.max(0,galleryIndex)+delta);}
      else if(event.key==="Home"||event.key==="End"){event.preventDefault();move(event.key==="Home"?0:galleryImages.length-1);}
    });
    let start=null;
    galleryViewport.addEventListener("pointerdown",event=>{if(event.button===0)start={x:event.clientX,y:event.clientY,id:event.pointerId};});
    galleryViewport.addEventListener("pointercancel",()=>{start=null;});
    galleryViewport.addEventListener("pointerup",event=>{
      if(!start||event.pointerId!==start.id)return;
      const dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;
      if(Math.abs(dx)>=50&&Math.abs(dx)>Math.abs(dy)*1.5)move(Math.max(0,galleryIndex)+(dx<0?1:-1)*(rtl?-1:1));
    });
  }
  document.querySelectorAll("[data-variant-select]").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll("[data-variant-select]").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
    document.querySelectorAll('[data-inquiry-form] [name="variant_color"]').forEach(field=>field.value=button.dataset.variantId);
    const status=document.querySelector("[data-variant-status]");
    if(button.dataset.src){
      showImage({...button.dataset,alt:(originalImage?.alt||"")+" — "+button.dataset.variantLabel});
      if(status)status.textContent=button.dataset.variantLabel;
    }else{
      if(originalImage)showImage(originalImage);
      if(status)status.textContent=button.dataset.variantLabel+" — "+button.dataset.imageMissing;
    }
  }));

  const quickView=document.querySelector("[data-product-quick-view]");
  if(quickView){
    const closeButton=quickView.querySelector("[data-quick-view-close]");
    const imageHost=quickView.querySelector("[data-quick-view-media]");
    const title=quickView.querySelector("[data-quick-view-title]");
    const model=quickView.querySelector("[data-quick-view-model]");
    const facts=quickView.querySelector("[data-quick-view-facts]");
    const productLink=quickView.querySelector("[data-quick-view-link]");
    let factLabels={};
    try{factLabels=JSON.parse(facts?.dataset.factLabels||"{}")}catch{}
    let opener=null;
    function closeQuickView(){
      if(typeof quickView.close==="function"&&quickView.open)quickView.close();
      else quickView.removeAttribute("open");
      opener?.focus();opener=null;
    }
    document.querySelectorAll("[data-quick-view]").forEach(button=>button.addEventListener("click",()=>{
      let product;
      try{product=JSON.parse(button.dataset.quickView||"{}")}catch{return;}
      if(!product.productId||!product.url||!product.image?.src)return;
      opener=button;
      title.textContent=product.name||"";model.textContent=product.model||product.productId;productLink.href=product.url;
      imageHost.replaceChildren();
      const image=document.createElement("img");image.src=product.image.src;image.alt=product.name||"";
      image.width=Number(product.image.width)||1;image.height=Number(product.image.height)||1;
      image.loading="eager";image.decoding="async";
      if(product.image.srcset)image.srcset=product.image.srcset;
      if(product.image.sizes)image.sizes=product.image.sizes;
      imageHost.append(image);
      facts.replaceChildren();
      Object.entries(product.facts||{}).forEach(([label,value])=>{
        if(value===null||value===undefined||value==="")return;
        const term=document.createElement("dt"),description=document.createElement("dd");
        term.textContent=factLabels[label]||label;description.textContent=Array.isArray(value)?value.join(", "):String(value);
        facts.append(term,description);
      });
      if(typeof quickView.showModal==="function")quickView.showModal();
      else quickView.setAttribute("open","");
      closeButton.focus();
    }));
    closeButton?.addEventListener("click",closeQuickView);
    quickView.addEventListener("click",event=>{if(event.target===quickView)closeQuickView();});
    quickView.addEventListener("close",()=>{if(opener){opener.focus();opener=null;}});
    quickView.addEventListener("keydown",event=>{if(event.key==="Escape"){event.preventDefault();closeQuickView();}});
  }

  function setupComparison(scope){
    const toggles=[...scope.querySelectorAll("[data-compare-toggle]")];if(!toggles.length)return;
    const dock=scope.querySelector("[data-compare-dock]"),selection=scope.querySelector("[data-compare-selection]"),open=scope.querySelector("[data-compare-open]"),panel=scope.querySelector("[data-comparison-panel]"),table=scope.querySelector("[data-comparison-table]"),status=scope.querySelector("[data-compare-status]");
    const labels=JSON.parse(scope.dataset.compareLabels||"{}");
    const chosen=()=>toggles.filter(x=>x.checked);
    function refresh(){
      const selected=chosen();
      toggles.forEach(x=>x.disabled=!x.checked&&selected.length>=3);
      if(dock)dock.hidden=selected.length===0;
      if(selection)selection.innerHTML=selected.map(x=>`<span class="compare-chip">${escapeHtml(JSON.parse(x.dataset.compare).name)}</span>`).join("");
      if(open){open.disabled=selected.length<2;open.textContent=`${labels.open||"Compare"} (${selected.length}/3)`;}
      if(status)status.textContent=selected.length===1?(labels.needOne||""):selected.length>=3?(labels.limit||""):"";
    }
    function render(){
      const products=chosen().map(x=>JSON.parse(x.dataset.compare));if(products.length<2)return;
      const keys=[...new Set(products.flatMap(p=>Object.keys(p.fields)))];
      const head=`<thead><tr><th scope="col">${escapeHtml(labels.field||"Field")}</th>${products.map(p=>`<th scope="col"><a href="${escapeAttr(p.url)}">${escapeHtml(p.name)}</a></th>`).join("")}</tr></thead>`;
      const body=`<tbody>${keys.map(key=>`<tr><th scope="row">${escapeHtml(labels[key]||key)}</th>${products.map(p=>`<td>${escapeHtml(p.fields[key]||labels.notProvided||"—")}</td>`).join("")}</tr>`).join("")}</tbody>`;
      table.innerHTML=head+body;panel.hidden=false;panel.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
    }
    toggles.forEach(x=>x.addEventListener("change",refresh));open?.addEventListener("click",render);scope.querySelector("[data-comparison-close]")?.addEventListener("click",()=>{panel.hidden=true;open?.focus();});refresh();
  }
  document.querySelectorAll("[data-comparison-scope]").forEach(setupComparison);

  function escapeHtml(value){const node=document.createElement("span");node.textContent=String(value??"");return node.innerHTML;}
  function escapeAttr(value){return String(value??"").replace(/["'<>`]/g,"");}

  function setupInquiry(form){
    const status=form.querySelector("[data-form-status]"),submit=form.querySelector('[type="submit"]');
    const locale=form.elements.language?.value||document.documentElement.lang||"en";
    const copy={
      fa:{success:"درخواست شما ثبت شد. کد پیگیری:",required:"لطفاً فیلدهای الزامی را بررسی کنید.",network:"ارتباط با سامانه برقرار نشد. دوباره تلاش کنید.",rate_limited:"تعداد درخواست‌ها زیاد است. کمی بعد دوباره تلاش کنید.",duplicate_submission:"این درخواست به‌تازگی ثبت شده است.",validation_failed:"اطلاعات فرم معتبر نیست. موارد مشخص‌شده را بررسی کنید.",storage_or_server_error:"ثبت درخواست انجام نشد. دوباره تلاش کنید.",submitting:"در حال ثبت درخواست…"},
      en:{success:"Your inquiry was recorded. Tracking code:",required:"Please review the required fields.",network:"The inquiry service could not be reached. Please retry.",rate_limited:"Too many requests. Please try again later.",duplicate_submission:"This inquiry was submitted recently.",validation_failed:"Some form details are invalid. Please review them.",storage_or_server_error:"The inquiry could not be recorded. Please retry.",submitting:"Submitting inquiry…"},
      ar:{success:"تم تسجيل طلبك. رقم المتابعة:",required:"أدخل بريدًا إلكترونيًا أو رقم هاتف صالحًا.",network:"تعذر الاتصال بالخدمة. حاول مرة أخرى.",rate_limited:"طلبات كثيرة. حاول لاحقًا.",duplicate_submission:"تم تسجيل هذا الطلب مؤخرًا.",validation_failed:"بيانات الطلب غير صالحة.",storage_or_server_error:"تعذر تسجيل الطلب. حاول مرة أخرى.",submitting:"جارٍ تسجيل الطلب…"},
      ru:{success:"Запрос зарегистрирован. Номер:",required:"Введите корректный email или номер телефона.",network:"Не удалось подключиться. Повторите попытку.",rate_limited:"Слишком много запросов. Попробуйте позже.",duplicate_submission:"Этот запрос уже отправлен недавно.",validation_failed:"Проверьте данные запроса.",storage_or_server_error:"Не удалось сохранить запрос. Повторите попытку.",submitting:"Отправка запроса…"}
    };
    const words=copy[locale]||{};
    const contact=form.elements.reply_contact;
    function checkContact(){
      if(!contact)return;
      const raw=contact.value.trim(),digits=raw.replace(/[۰-۹٠-٩]/g,d=>digitMap[d]);
      const phone=digits.replace(/[\s().-]/g,"");
      const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)||(digits.length<=32&&/^\+?[\d\s().-]+$/.test(digits)&&/^\+?\d{7,15}$/.test(phone));
      const message={fa:"ایمیل یا شماره تماس معتبر وارد کنید.",en:"Enter a valid email or phone number.",ar:"أدخل بريدًا إلكترونيًا أو رقم هاتف صالحًا.",ru:"Введите корректный email или номер телефона."}[locale];
      contact.setCustomValidity(valid?"":message);
    }
    contact?.addEventListener("input",checkContact);
    const page=form.querySelector('[name="page_url"]');if(page&&!page.value)page.value=document.querySelector('link[rel="canonical"]')?.href||location.href.split("?")[0];
    const params=new URLSearchParams(location.search);["product_id","product_name","language"].forEach(name=>{const input=form.elements[name];const value=params.get(name.replace("_id",""));if(input&&!input.value&&value)input.value=value;});
    [...form.elements].forEach(control=>{if(control.id&&control.labels?.length){const hint=control.closest("label")?.querySelector("[data-field-hint]");if(hint)control.setAttribute("aria-describedby",hint.id);}});
    form.addEventListener("submit",async event=>{
      event.preventDefault();
      if(submit.disabled)return;
      checkContact();
      [...form.elements].forEach(control=>control.setAttribute?.("aria-invalid",control.validity&&!control.validity.valid?"true":"false"));
      if(!form.checkValidity()){form.reportValidity();status.dataset.state="error";status.setAttribute("role","alert");status.textContent=words.required||form.dataset.error||"Please complete required fields.";return;}
      const config=window.BoomerangInquiryConfig||{};
      if(config.enabled!==true||!config.endpoint){status.dataset.state="error";status.setAttribute("role","alert");status.textContent=form.dataset.unavailable||"Inquiry service unavailable.";return;}
      const data=new FormData(form),components=[...form.querySelectorAll('[name="components"]:checked')].map(x=>x.value);
      if(!components.length){try{components.push(...JSON.parse(document.querySelector("[data-product-facts]")?.textContent||"{}").componentIds||[])}catch{}}
      const payload=Object.fromEntries(data.entries());payload.selected_components=components;payload.quantity=Number(payload.quantity);
      if(contact){
        const value=contact.value.trim();delete payload.reply_contact;
        payload.reply_email=value.includes("@")?value:"";
        payload.reply_phone=value.includes("@")?"":value.replace(/[۰-۹٠-٩]/g,d=>digitMap[d]).replace(/[\s().-]/g,"");
      }
      submit.disabled=true;submit.setAttribute("aria-disabled","true");form.setAttribute("aria-busy","true");status.dataset.state="submitting";status.setAttribute("role","status");status.textContent=words.submitting||"Submitting…";
      try{
        const response=await fetch(config.endpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
        const result=await response.json().catch(()=>({}));
        if(!response.ok||result.success!==true||!/^INQ-[0-9]{8}-[A-Z0-9]{8}$/.test(result.inquiry_id||"")){const error=new Error(result.error||"network");error.code=result.error||"network";throw error;}
        status.dataset.state="success";status.setAttribute("role","status");status.textContent=(words.success||"Request recorded. Tracking code:")+" "+result.inquiry_id;
        form.dispatchEvent(new CustomEvent("boomerang:inquiry-success",{bubbles:true,detail:{success:true,product_id:payload.product_id||null,language:payload.language,request_type:payload.request_type,quantity:payload.quantity,variant_color:payload.variant_color||null}}));
        form.reset();
        const selected=document.querySelector('[data-variant-select][aria-pressed="true"]');
        if(selected&&form.elements.variant_color)form.elements.variant_color.value=selected.dataset.variantId;
      }catch(error){status.dataset.state="error";status.setAttribute("role","alert");status.textContent=words[error.code]||words.network||form.dataset.error||"Request failed.";}
      finally{submit.disabled=false;submit.removeAttribute("aria-disabled");form.removeAttribute("aria-busy");}
    });
    form.addEventListener("input",event=>{event.target.removeAttribute?.("aria-invalid");if(status.dataset.state==="error"){status.textContent="";status.dataset.state="";}});
  }
  document.querySelectorAll("[data-inquiry-form]").forEach(setupInquiry);
  window.BoomerangCatalogue={normalize};
})();
