const CONFIG = {
  // 공연 일시 (카운트다운 기준) — "YYYY-MM-DDTHH:MM:SS+09:00"
  concertDate : "2026-08-01T18:00:00+09:00",
  concertEndDate : "2026-08-01T22:00:00+09:00",   // 공연 종료(이후 마무리 문구)
  dateText    : "2026. 08. 01 (토) 오후 6시",
  venue       : "아트홀 베짱이 · 서울 마포구 독막로15길 3-12 B1",

  venueAddr   : "서울 마포구 상수동 313-3 지하1층",
  venueGeo    : { lat: 37.5484185, lng: 126.9215116 },
  naverMapKey : "w775fm1uhs",

  // 실제 링크로 교체 (예: "https://...") — 비워두면 '#'
  ticketLink  : "https://",   // 선예매 폼/페이지
  mapLink     : "https://map.naver.com/p/search/아트홀%20베짱이",   // 오시는 길 (네이버 지도)

  // 계좌 정보
  account : {
    bank    : "카카오뱅크",
    holder  : "권서진",
    display : "3333-36-1550617",   // 화면 표시용
    number  : "3333361550617"      // 복사용(숫자만)
  },

  encore : {
    title : "AGAINST ALL",
    note  : "P.E."   // 앵콜 예고 문구 (나중에 채우세요). 줄바꿈은 \n 로.
  },

  // 방명록 공유 백엔드 (선택). 비워두면 이 기기에만 저장(localStorage).
  // Firebase 웹 설정 객체를 그대로 넣으면 전체 관객이 공유하는 은하수가 됩니다.
  firebase : {
    apiKey: "AIzaSyCv7sHltUys91fb1lQeFYRqP9w2FriCUiY",
    authDomain: "turami2026-summer.firebaseapp.com",
    projectId: "turami2026-summer",
    storageBucket: "turami2026-summer.firebasestorage.app",
    messagingSenderId: "931198123638",
    appId: "1:931198123638:web:3d59430b2acea3fc976957",
    measurementId: "G-JL2371PFSM"
  },
  // 처음 보일 예시 응원(시드)
  seedWishes : []
};

/* 셋리스트 — 북두칠성 일곱 별에 한 곡씩.
   star: 별 이름 / title: 곡명 / team: 팀·아티스트 / crew: 참여진 / lyric: 대표 가사 */
const SETLIST = [
  { star:"DUBHE",   kr:"두베",     title:"곡 제목", team:"아티스트 / 팀명", crew:"Vocal ○○○ · Guitar ○○○ · Bass ○○○ · Drum ○○○ · Key ○○○", lyric:"여기에 대표 가사 한 소절을 적어 주세요." },
  { star:"MERAK",   kr:"메라크",   title:"곡 제목", team:"아티스트 / 팀명", crew:"Vocal ○○○ · Guitar ○○○ · Bass ○○○ · Drum ○○○", lyric:"대표 가사 한 소절." },
  { star:"PHECDA",  kr:"페크다",   title:"곡 제목", team:"아티스트 / 팀명", crew:"Vocal ○○○ · Guitar ○○○ · Bass ○○○ · Drum ○○○", lyric:"대표 가사 한 소절." },
  { star:"MEGREZ",  kr:"메그레즈", title:"곡 제목", team:"아티스트 / 팀명", crew:"Vocal ○○○ · Guitar ○○○ · Bass ○○○ · Drum ○○○", lyric:"대표 가사 한 소절." },
  { star:"ALIOTH",  kr:"알리오트", title:"곡 제목", team:"아티스트 / 팀명", crew:"Vocal ○○○ · Guitar ○○○ · Bass ○○○ · Drum ○○○", lyric:"대표 가사 한 소절." },
  { star:"MIZAR",   kr:"미자르",   title:"곡 제목", team:"아티스트 / 팀명", crew:"Vocal ○○○ · Guitar ○○○ · Bass ○○○ · Drum ○○○", lyric:"대표 가사 한 소절." },
  { star:"ALKAID",  kr:"알카이드", title:"곡 제목", team:"아티스트 / 팀명", crew:"Vocal ○○○ · Guitar ○○○ · Bass ○○○ · Drum ○○○", lyric:"대표 가사 한 소절." },
];

/* 부원 목록: [학번, 이름, 한마디] */
const MEMBERS = [
  ["50","강정민","화이팅!!!"],
  ["50","구연성","재즈가 뭐라고 생각하세요?"],
  ["50","권서진","헤헤"],
  ["50","김동현","올해도 홧팅~"],
  ["50","김민희","뚜근…!"],
  ["50","김예은","계속 계속 계속..."],
  ["50","김채영","소신발언, 시달은 명곡이에요"],
  ["50","부경민","게슈탈트 붕괴가 와버렸습니다"],
  ["50","서범석","'루바토'란 도둑맞은 이라는 뜻이며..."],
  ["50","신대환","모두에게 행복이 깃들기를"],
  ["50","장희수","덕분에 즐거웠어요"],
  ["50","정민기","뚜라미 화이팅!"],
  ["50","조아름","FinTU Me!"],
  ["50","최현민","우리 '뛰어' 봅시다"],
  ["50","허은찬","너도 멸종되지 않게 조심해"],
  ["49","김리율","그럼에도 우리는 즛토즛토즛토"],
  ["49","박지니","누가 받아줘!!!!"],
  ["49","유수민","아뜨거"],
  ["49","이수인","뚜벅뚜벅"],
  ["49","이제하","못토 못토 야레루다"],
  ["49","최민석","뚜라미 화이팅!"],
];

/* ============================================================
   RENDER
   ============================================================ */
// 공연 정보
{const e=document.getElementById("i-date"); if(e) e.textContent=CONFIG.dateText;}
{const e=document.getElementById("i-venue"); if(e) e.textContent=CONFIG.venue;}

// 링크 연결 (비어 있으면 '#' 유지)
function wire(id, url, emptyNote){
  const el = document.getElementById(id);
  if(!el) return;
  if(url && url.trim()){ el.href = url; if(emptyNote) emptyNote.style.display="none"; }
}
wire("ticketBtn", CONFIG.ticketLink, document.getElementById("ticketNote"));
wire("mapBtn", CONFIG.mapLink);
wire("mapBtn2", CONFIG.mapLink);

// 계좌
{const a=document.getElementById("acctInfo"); if(a) a.innerHTML=`${CONFIG.account.display}<span>${CONFIG.account.bank} · 예금주 ${CONFIG.account.holder}</span>`;}

// 셋리스트 (팀 접기: 무대 → 곡 → 가사)
(function(){
  const box=document.getElementById("setlistBox"); if(!box) return;
  const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const hl=s=>esc(s).replace(/\*([^*\n]+)\*/g,'<span class="lyric-hl">$1</span>');
  const pad=n=>String(n).padStart(2,"0");
  const flat=()=>SETLIST.map((t,i)=>`<div class="track"><div class="track-head"><div class="star"><b>${t.star}</b>${t.kr} · No.${pad(i+1)}</div><div><div class="ttl">${t.title}</div><div class="tartist">${t.team}</div></div><span class="tplus">+</span></div><div class="track-body"><div class="inner"><div class="crew">${t.crew}</div><div class="lyric">${t.lyric}</div></div></div></div>`).join("");
  if(!CONFIG.firebase){ box.innerHTML=flat(); return; }
  (async ()=>{
    let fs,db;
    try{
      const appMod=await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
      fs=await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
      const a=appMod.getApps().length?appMod.getApp():appMod.initializeApp(CONFIG.firebase);
      db=fs.getFirestore(a);
    }catch(e){ box.innerHTML=flat(); return; }
    try{
      const {collection,getDocs,query,orderBy}=fs;
      const [tSnap,sSnap]=await Promise.all([
        getDocs(query(collection(db,"teams"),orderBy("order"))),
        getDocs(query(collection(db,"songs"),orderBy("order")))
      ]);
      const teams=tSnap.docs.map(d=>({id:d.id,...d.data()}));
      const songs=sSnap.docs.map(d=>({id:d.id,...d.data()}));
      if(!teams.length){ box.innerHTML=flat(); return; }
      let html="";
      teams.forEach((t,ti)=>{
        const sg=songs.filter(x=>x.team===t.id);
        let tracks="";
        if(!sg.length) tracks=`<div class="set-empty" style="padding:12px 8px">곡 준비 중이에요</div>`;
        else sg.forEach((x,si)=>{
          const lyr=(x.lyrics||"").trim();
          tracks+=`<div class="track"><div class="track-head song"><div class="tnum">${pad(si+1)}</div><div><div class="ttl">${esc(x.title||"곡")}</div>${x.artist?`<div class="tartist">${esc(x.artist)}</div>`:""}</div><span class="tplus">+</span></div><div class="track-body"><div class="inner song">${x.session?`<div class="set-session">${esc(x.session)}</div>`:""}${lyr?`<div class="set-lyric">${hl(lyr)}</div>`:''}</div></div></div>`;
        });
        html+=`<div class="set-team"><div class="set-team-head"><div class="stt-idx">STAGE ${pad(ti+1)}</div><div class="stt-name">${esc(t.name||"")}</div><div class="stt-line"></div><span class="stt-count">${sg.length}곡</span><span class="stt-chev">+</span></div><div class="set-team-body"><div class="set-tracks">${tracks}</div></div></div>`;
      });
      box.innerHTML=html;
      box.addEventListener("click",e=>{
        const th=e.target.closest(".track-head");
        if(th){
          const tr=th.closest(".track"), b=tr.querySelector(".track-body"), inner=b.querySelector(".inner");
          const open=tr.classList.toggle("open");
          b.style.maxHeight=open?inner.scrollHeight+"px":"0px";
          const tb=tr.closest(".set-team-body"); if(tb) tb.style.maxHeight="none";  // 부모 무대 높이 고정 해제(가사 잘림 방지)
          return;
        }
        const teamHead=e.target.closest(".set-team-head");
        if(teamHead){
          const team=teamHead.closest(".set-team"), body=team.querySelector(".set-team-body");
          const open=team.classList.toggle("open");
          if(open){ body.style.maxHeight=body.scrollHeight+"px";
            body.addEventListener("transitionend",function te(){ if(team.classList.contains("open")) body.style.maxHeight="none"; body.removeEventListener("transitionend",te); }); }
          else { body.style.maxHeight=body.scrollHeight+"px"; requestAnimationFrame(()=>{ body.style.maxHeight="0px"; }); }
        }
      });
      const kr=document.querySelector("#setlist .kr"); if(kr) kr.textContent="팀을 선택해 셋리를 펼치고, 곡을 눌러 참여 세션과 가사를 확인하세요";
    }catch(e){ box.innerHTML=flat(); }
  })();
})();

// 멤버
/* 멤버: Firebase(teams+members) 기반 팀별 렌더. 팀 없으면 기존 MEMBERS 목록 */
(function(){
  const grid=document.getElementById("memberGrid"); if(!grid) return;
  const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const flat=()=>MEMBERS.map(([no,name,quote])=>`<div class="member"><span class="pos">No. ${no}</span><div class="nm">${esc(name)}</div><div class="quote">${esc(quote)}</div></div>`).join("");
  if(!CONFIG.firebase){ grid.innerHTML=flat(); return; }
  (async ()=>{
    let fs,db;
    try{
      const appMod=await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
      fs=await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
      const a=appMod.getApps().length?appMod.getApp():appMod.initializeApp(CONFIG.firebase);
      db=fs.getFirestore(a);
    }catch(e){ grid.innerHTML=flat(); return; }
    try{
      const {collection,getDocs,query,orderBy}=fs;
      const [tSnap,mSnap]=await Promise.all([
        getDocs(query(collection(db,"teams"),orderBy("order"))),
        getDocs(query(collection(db,"members"),orderBy("order")))
      ]);
      const teams=tSnap.docs.map(d=>({id:d.id,...d.data()}));
      const members=mSnap.docs.map(d=>({id:d.id,...d.data()})).filter(m=>m.message&&m.message.trim());
      if(!teams.length){ grid.innerHTML=flat(); return; }
      const partsOf=x=>(x.parts&&x.parts.length?x.parts:(x.part?[x.part]:[]));
      grid.classList.add("by-team");
      let html="";
      teams.forEach((t,ti)=>{
        const mem=members.filter(m=>Array.isArray(m.teams)&&m.teams.some(x=>x.team===t.id));
        if(!mem.length) return;
        html+=`<div class="team-section"><div class="team-head"><div><div class="th-star">TEAM</div><div class="th-name">${esc(t.name||"")}</div></div><div class="th-line"></div><span class="th-count">${mem.length}</span></div><div class="team-grid">`;
        mem.forEach(m=>{
          const membership=m.teams.find(x=>x.team===t.id)||{};
          const parts=partsOf(membership);
          const label=parts.join(" · ");
          const voc=parts.some(p=>/vocal|보컬/i.test(p));
          html+=`<div class="member compact${voc?' vocal':''}"><span class="part">NO.${esc(m.gen||"")}</span><div class="nm">${esc(m.name||"")}</div><div class="quote">${esc(m.message||"")}</div></div>`;
        });
        html+="</div></div>";
      });
      grid.innerHTML = html || '<p style="color:var(--muted);text-align:center">아직 등록된 멤버가 없어요.</p>';
      const kr=document.querySelector("#members .kr"); if(kr) kr.textContent="일곱 팀, 흩어진 별들이 하나의 무대로 모입니다";
    }catch(e){ grid.innerHTML=flat(); }
  })();
})();

/* ============================================================
   INTERACTION
   ============================================================ */
// countdown — Days / Hrs / Min / Sec
const CONCERT = new Date(CONFIG.concertDate);
const pad=n=>String(n).padStart(2,"0");
const CONCERT_END = new Date(CONFIG.concertEndDate || CONFIG.concertDate);
let cdState="";
function tick(){
  const now=new Date();
  const diff=CONCERT-now;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  const cd=document.getElementById("countdown");
  if(now>=CONCERT_END){                       // 공연 후
    if(cd && cdState!=="after"){cdState="after";
      cd.innerHTML="<div class='cd-unit'><span class='cd-num cd-msg'>공연이 막을 내렸습니다</span><span class='cd-sub'>함께해 주셔서 감사합니다 ✦</span></div>";}
    return;
  }
  if(diff<=0){                                // 공연 중
    if(cd && cdState!=="live"){cdState="live";
      cd.innerHTML="<div class='cd-unit'><div class='cd-live-eyebrow'><span class='cd-live-dot'></span>LIVE NOW</div><span class='cd-live-now'>지금, 무대에서</span></div>";}
    return;
  }
  cdState="before";                            // 공연 전
  set("cd-d",pad(Math.floor(diff/864e5)));
  set("cd-h",pad(Math.floor(diff%864e5/36e5)));
  set("cd-m",pad(Math.floor(diff%36e5/6e4)));
  set("cd-s",pad(Math.floor(diff%6e4/1e3)));
}tick();setInterval(tick,1000);

// nav (멀티페이지)
const nav=document.getElementById("nav");
if(nav) addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>40));
const burger=document.getElementById("burger"),navlinks=document.getElementById("navlinks"),drawerClose=document.getElementById("drawerClose");
function closeDrawer(){if(navlinks)navlinks.classList.remove("open");if(drawerClose)drawerClose.classList.remove("show");}
if(burger) burger.addEventListener("click",()=>{navlinks.classList.add("open");drawerClose.classList.add("show");});
if(drawerClose) drawerClose.addEventListener("click",closeDrawer);
if(navlinks) navlinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeDrawer));

// 현재 페이지에 맞춰 메뉴 활성화
(function(){
  const here=(location.pathname.split("/").pop()||"index.html").toLowerCase()||"index.html";
  document.querySelectorAll(".navlink").forEach(l=>{
    if((l.getAttribute("href")||"").toLowerCase()===here) l.classList.add("active");
  });
})();

// 성도 내비게이션: 별을 누르면 해당 페이지로 이동
[...document.querySelectorAll(".navstar")].forEach(g=>{
  const t=(g.dataset.target||"").replace("#","");
  const url=(t==="home"||t===""?"index":t)+".html";
  const go=()=>{location.href=url;};
  g.addEventListener("click",go);
  g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
});

// copy account
{const acct=document.getElementById("acct"),copyLab=document.getElementById("copyLab");
if(acct) acct.addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText(CONFIG.account.number);copyLab.textContent="복사됨 ✓";setTimeout(()=>copyLab.textContent="복사",1600);}
  catch(e){copyLab.textContent="복사 실패"}
});}

// reveal
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

const DIPPER_STARS = [
  {en:"ALCYONE", kr:"알키오네"}, {en:"MAIA",    kr:"마이아"},
  {en:"ELECTRA", kr:"엘렉트라"}, {en:"MEROPE",  kr:"메로페"},
  {en:"TAYGETA", kr:"타이게타"}, {en:"CELAENO", kr:"켈라이노"},
  {en:"STEROPE", kr:"스테로페"}
];
// 별무리(플레이아데스) 좌표 — 티켓 캔버스 박스 비율 0~1
const DIPPER_PTS = [[.34,.28],[.50,.19],[.63,.33],[.44,.45],[.58,.52],[.73,.42],[.29,.57]];

function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}

if(document.getElementById("ticketCanvas")){
const tCanvas=document.getElementById("ticketCanvas"), tctx=tCanvas.getContext("2d");
const mkImg=document.getElementById("mkImg"), mkWrap=document.getElementById("mkWrap"),
      mkPlaceholder=document.getElementById("mkPlaceholder"), mkSave=document.getElementById("mkSave");
let lastTicketURL=null;

async function genTicket(){
  let name=document.getElementById("mkName").value.trim();
  if(!name) name="GUEST";
  const h=hashStr(name+"|turami2026");
  const starIdx=h%7;
  const star=DIPPER_STARS[starIdx];
  const serial="CLST-2026-"+String(h%10000).padStart(4,"0");

  // 폰트 로드 보장
  try{ await Promise.all([
    document.fonts.load('700 64px "Gowun Batang"'),
    document.fonts.load('400 30px "Gowun Batang"'),
    document.fonts.load('700 22px "Space Mono"'),
    document.fonts.load('400 18px "Space Mono"'),
  ]); await document.fonts.ready; }catch(e){}

  const W=tCanvas.width, H=tCanvas.height, ctx=tctx;
  ctx.clearRect(0,0,W,H);

  // 배경 (차콜 + 청록 기운)
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,"#16201f"); bg.addColorStop(.55,"#111a1b"); bg.addColorStop(1,"#0c1113");
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

  // 별가루 (seed 고정)
  let seed=h;
  const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
  for(let i=0;i<150;i++){
    const x=rnd()*W,y=rnd()*H*.55,r=rnd()*1.4+.3,a=rnd()*.5+.15;
    ctx.beginPath();ctx.arc(x,y,r,0,7);
    ctx.fillStyle=rnd()<.14?`rgba(126,214,198,${a})`:`rgba(232,237,233,${a})`;ctx.fill();
  }

  // 외곽 청록 테두리
  ctx.strokeStyle="rgba(126,214,198,.5)";ctx.lineWidth=2;
  roundRect(ctx,18,18,W-36,H-36,18);ctx.stroke();

  // 상단 라벨
  ctx.textAlign="center";
  ctx.fillStyle="#7ed6c6";ctx.font='700 17px "Space Mono"';
  ctx.fillText("H O N G I K   U N I V E R S I T Y", W/2, 70);
  ctx.fillStyle="#8a9490";ctx.font='400 15px "Space Mono"';
  ctx.fillText("창작곡 밴드 동아리 뚜라미", W/2, 96);
  ctx.fillStyle="#565f5b";ctx.font='400 14px "Space Mono"';
  ctx.fillText("2026  SUMMER  CONCERT", W/2, 150);

  // 타이틀
  const tg=ctx.createLinearGradient(0,170,0,250);
  tg.addColorStop(0,"#ffffff");tg.addColorStop(.55,"#7ed6c6");tg.addColorStop(1,"#56b6a6");
  ctx.fillStyle=tg;ctx.font='700 70px "Gowun Batang"';
  ctx.fillText("별무리", W/2, 230);
  ctx.fillStyle="#56b6a6";ctx.font='700 22px "Space Mono"';
  ctx.save();ctx.font='700 20px "Space Mono"';
  drawSpaced(ctx,"C L U S T A R", W/2, 266, 2);
  ctx.restore();

  // 별무리(성단) — 흩어진 별 + 당신의 별 강조 (선 없이)
  const cx0=70,cy0=298,cw=W-140,ch=178;
  // 성단 먼지(주변 잔별)
  for(let i=0;i<34;i++){
    const x=cx0+rnd()*cw, y=cy0+rnd()*ch, r=rnd()*1.3+.4, a=rnd()*.4+.12;
    ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fillStyle=`rgba(150,225,212,${a})`;ctx.fill();
  }
  DIPPER_PTS.forEach((p,i)=>{
    const x=cx0+p[0]*cw, y=cy0+p[1]*ch, me=(i===starIdx);
    const gr=ctx.createRadialGradient(x,y,0,x,y,me?26:12);
    gr.addColorStop(0,me?"rgba(180,245,235,.95)":"rgba(126,214,198,.5)");
    gr.addColorStop(1,"rgba(126,214,198,0)");
    ctx.fillStyle=gr;ctx.beginPath();ctx.arc(x,y,me?26:12,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(x,y,me?5:2.6,0,7);ctx.fillStyle=me?"#ffffff":"#b7ecdf";ctx.fill();
    if(me){ctx.strokeStyle="rgba(126,214,198,.5)";ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x,y,12,0,7);ctx.stroke();}
  });

  // 구분선
  ctx.strokeStyle="rgba(90,145,135,.5)";ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(60,540);ctx.lineTo(W-60,540);ctx.stroke();

  // 이름
  ctx.fillStyle="#8a9490";ctx.font='700 14px "Space Mono"';
  ctx.fillText("A D M I T   O N E", W/2, 580);
  ctx.fillStyle="#e8ede9";ctx.font='700 52px "Gowun Batang"';
  ctx.fillText(name, W/2, 642);

  // 당신의 별
  ctx.fillStyle="#7ed6c6";ctx.font='700 15px "Space Mono"';
  ctx.fillText("✦  YOUR STAR", W/2, 706);
  ctx.fillStyle="#7ed6c6";ctx.font='700 30px "Gowun Batang"';
  ctx.fillText(star.kr+"  ·  "+star.en, W/2, 744);

  // 일시 / 장소
  ctx.fillStyle="#8a9490";ctx.font='400 19px "Gowun Batang"';
  ctx.fillText(CONFIG.dateText, W/2, 810);
  ctx.font='400 16px "Gowun Batang"';
  ctx.fillText(stripVenue(CONFIG.venue), W/2, 838);

  // 천공 점선
  ctx.strokeStyle="rgba(140,148,144,.4)";ctx.setLineDash([6,8]);ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(40,892);ctx.lineTo(W-40,892);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle="#0c1113";
  ctx.beginPath();ctx.arc(18,892,14,0,7);ctx.fill();
  ctx.beginPath();ctx.arc(W-18,892,14,0,7);ctx.fill();

  // 스텁: 일련번호
  ctx.fillStyle="#565f5b";ctx.font='400 15px "Space Mono"';
  ctx.fillText(serial, W/2, 952);
  ctx.fillStyle="#8a9490";ctx.font='400 16px "Gowun Batang"';
  ctx.fillText("우리가 만든 노래로, 우리만의 밤을 켭니다.", W/2, 1000);

  lastTicketURL=tCanvas.toDataURL("image/png");
  mkImg.src=lastTicketURL;
  mkPlaceholder.style.display="none";
  requestAnimationFrame(()=>mkWrap.classList.add("show"));
  mkSave.classList.add("show");
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function stripVenue(v){const n=(v.split("·")[0]||v).trim();return n.length>26?n.slice(0,25)+"…":n;}
function drawSpaced(ctx,text,cx,y,extra){const w=ctx.measureText(text).width;ctx.textAlign="left";let x=cx-w/2;for(const ch of text){ctx.fillText(ch,x,y);x+=ctx.measureText(ch).width;}ctx.textAlign="center";}

document.getElementById("mkGen").addEventListener("click",genTicket);
document.getElementById("mkName").addEventListener("keydown",e=>{if(e.key==="Enter")genTicket();});
document.getElementById("mkDownload").addEventListener("click",()=>{
  if(!lastTicketURL)return;
  const name=(document.getElementById("mkName").value.trim()||"guest").replace(/\s+/g,"_");
  const a=document.createElement("a");a.href=lastTicketURL;a.download=`turami2026_ticket_${name}.png`;
  document.body.appendChild(a);a.click();a.remove();
});
}

/* ============================================================
   ★ STARLIGHT 응원봉 — 전체 관객 시계 동기화 + 화면 꺼짐 방지
   ============================================================ */
const LS_COLORS=[
  {name:"골드", rgb:[244,214,138]},
  {name:"화이트", rgb:[255,255,255]},
  {name:"블루",  rgb:[120,170,255]},
  {name:"바이올렛",rgb:[185,150,255]},
  {name:"로즈",  rgb:[255,150,180]},
  {name:"청록", rgb:[126,214,198]},
];
let lsColor=LS_COLORS[0].rgb, lsRAF=null, lsWake=null;
let lsPattern="pulse";
const LS_PRESET={gold:[244,214,138],white:[255,255,255],blue:[120,170,255],violet:[185,150,255],rose:[255,150,180],green:[150,240,170],red:[255,110,110],teal:[126,214,198]};
function hsl2rgb(h,s,l){h/=360;const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h*12)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1));};return [f(0)*255,f(8)*255,f(4)*255];}
function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h*=60;}return [h,s,l];}
const lsOverlay=document.getElementById("lsOverlay"),
      lsGlow=document.getElementById("lsGlow"), lgx=lsGlow.getContext("2d"),
      lsColorsBox=document.getElementById("lsColors");

LS_COLORS.forEach((c,i)=>{
  const b=document.createElement("button");
  b.style.background=`rgb(${c.rgb.join(",")})`;
  b.setAttribute("aria-label",c.name);
  if(i===0)b.classList.add("sel");
  b.addEventListener("click",()=>{lsColor=c.rgb;[...lsColorsBox.children].forEach(x=>x.classList.remove("sel"));b.classList.add("sel");});
  lsColorsBox.appendChild(b);
});

function lsDraw(){
  const t=Date.now();
  const W=lsGlow.width,H=lsGlow.height,cx=W/2,cy=H/2;
  let [r,g,b]=lsColor, bright;
  const slow=(Math.sin(t/1000*Math.PI)+1)/2;
  const fast=(Math.sin(t/450*Math.PI)+1)/2;
  switch(lsPattern){
    case "solid":  bright=0.92; break;
    case "blink":  bright=(Math.floor(t/380)%2)?0.95:0.12; break;
    case "wave":   { const h=rgb2hsl(r,g,b); [r,g,b]=hsl2rgb((h[0]+(t/40))%360,h[1],h[2]); bright=0.6+slow*0.35; break; }
    case "rainbow":{ [r,g,b]=hsl2rgb((t/25)%360,0.75,0.62); bright=0.7+fast*0.2; break; }
    case "off":    bright=0; break;
    default:       bright=0.55+slow*0.4+fast*0.05;   // pulse
  }
  lgx.clearRect(0,0,W,H);
  if(bright>0.01){
    const R=W*0.46*(0.92+slow*0.08);
    const grad=lgx.createRadialGradient(cx,cy,0,cx,cy,R);
    grad.addColorStop(0,`rgba(${r|0},${g|0},${b|0},${bright})`);
    grad.addColorStop(0.45,`rgba(${r|0},${g|0},${b|0},${bright*0.55})`);
    grad.addColorStop(1,`rgba(${r|0},${g|0},${b|0},0)`);
    lgx.fillStyle=grad;lgx.beginPath();lgx.arc(cx,cy,R,0,7);lgx.fill();
    lgx.fillStyle=`rgba(255,255,255,${Math.min(0.9,bright*0.6+slow*0.3)})`;
    lgx.beginPath();lgx.arc(cx,cy,W*0.05,0,7);lgx.fill();
  }
  lsRAF=requestAnimationFrame(lsDraw);
}
async function lsOpen(){
  lsOverlay.classList.add("on");lsOverlay.setAttribute("aria-hidden","false");
  if(!lsRAF)lsDraw();
  try{ if("wakeLock" in navigator){ lsWake=await navigator.wakeLock.request("screen"); } }catch(e){}
  try{ if(lsOverlay.requestFullscreen) await lsOverlay.requestFullscreen(); }catch(e){}
}
async function lsClose(){
  lsOverlay.classList.remove("on");lsOverlay.setAttribute("aria-hidden","true");
  if(lsRAF){cancelAnimationFrame(lsRAF);lsRAF=null;}
  try{ if(lsWake){await lsWake.release();lsWake=null;} }catch(e){}
  try{ if(document.fullscreenElement) await document.exitFullscreen(); }catch(e){}
}
{const lo=document.getElementById("lsOpen"); if(lo) lo.addEventListener("click",lsOpen);}
document.getElementById("lsFab").addEventListener("click",lsOpen);
document.getElementById("lsClose").addEventListener("click",lsClose);
// 탭 복귀 시 wakeLock 재요청
document.addEventListener("visibilitychange",async()=>{
  if(document.visibilityState==="visible" && lsOverlay.classList.contains("on") && "wakeLock" in navigator){
    try{ lsWake=await navigator.wakeLock.request("screen"); }catch(e){}
  }
});

/* ============================================================
   ★ GUESTBOOK — 은하수 방명록 (별 = 메시지)  · localStorage / Firebase 겸용
   ============================================================ */
const WishStore = (()=>{
  const KEY="turami2026_wishes";
  let fb=null;
  async function initFB(){
    if(!CONFIG.firebase) return false;
    try{
      const app=await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
      const fs=await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
      const a=app.initializeApp(CONFIG.firebase);
      fb={db:fs.getFirestore(a),fs};
      return true;
    }catch(e){console.warn("Firebase 연결 실패, 로컬 저장으로 대체:",e);return false;}
  }
  const ready=initFB();
  async function all(){
    await ready;
    if(fb){const {collection,getDocs,query,orderBy}=fb.fs;
      const snap=await getDocs(query(collection(fb.db,"wishes"),orderBy("ts")));
      return snap.docs.map(d=>d.data());}
    try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch(_){return [];}
  }
  async function add(w){
    await ready; w.ts=Date.now();
    if(/hidden/i.test(location.pathname) && !w.source) w.source="hidden";  // 히든에서 남긴 별
    if(fb){const {collection,addDoc}=fb.fs;await addDoc(collection(fb.db,"wishes"),w);return;}
    const list=await all();list.push(w);
    try{localStorage.setItem(KEY,JSON.stringify(list));}catch(_){}
  }
  return {all,add};
})();

if(document.getElementById("gbSky")){
const gbSky=document.getElementById("gbSky"), gbx=gbSky.getContext("2d"),
      gbTip=document.getElementById("gbTip"), gbCount=document.getElementById("gbCount");
let wishStars=[], gbHover=-1, gbSeeded=false;

function gbResize(){
  const r=gbSky.getBoundingClientRect();
  gbSky.width=r.width*devicePixelRatio; gbSky.height=r.height*devicePixelRatio;
  layoutWishes();
}
function layoutWishes(){
  const W=gbSky.width,H=gbSky.height;
  wishStars.forEach((w,i)=>{
    const seed=(hashStr((w.name||"")+w.msg+i)%10000)/10000;
    const seed2=(hashStr(w.msg+(w.name||"")+i)%10000)/10000;
    w.x=40*devicePixelRatio+seed*(W-80*devicePixelRatio);
    w.y=30*devicePixelRatio+seed2*(H-60*devicePixelRatio);
    w.r=(2.2+ (i%3)*0.7)*devicePixelRatio;
    w.ph=seed*6.28; w.tw=0.02+seed2*0.02;
    w.hidden=(w.source==="hidden");
    w.hue=hashStr((w.name||"")+"|hue")%360;
  });
}
function gbDraw(){
  const W=gbSky.width,H=gbSky.height;
  gbx.clearRect(0,0,W,H);
  // 은하수 배경 띠 (별 많을수록 밝게)
  const density=Math.min(1,wishStars.length/40);
  const band=gbx.createLinearGradient(0,H*0.2,W,H*0.8);
  band.addColorStop(0,"rgba(120,140,220,0)");
  band.addColorStop(0.5,`rgba(150,170,240,${0.05+density*0.09})`);
  band.addColorStop(1,"rgba(120,140,220,0)");
  gbx.fillStyle=band;gbx.fillRect(0,0,W,H);
  const t=Date.now()/1000;
  wishStars.forEach((w,i)=>{
    const tw=0.55+Math.sin(t*(w.tw*30)+w.ph)*0.35;
    const hov=(i===gbHover);
    const isH=w.hidden, R=w.r*(isH?1.5:1);
    if(isH){ // 히든 별: 이름 기반 색 + 글로우 + 링
      const g=gbx.createRadialGradient(w.x,w.y,0,w.x,w.y,R*6);
      g.addColorStop(0,`hsla(${w.hue},85%,68%,${0.5*tw})`);g.addColorStop(1,"hsla(0,0%,0%,0)");
      gbx.fillStyle=g;gbx.beginPath();gbx.arc(w.x,w.y,R*6,0,7);gbx.fill();
      gbx.strokeStyle=`hsla(${w.hue},85%,72%,${0.35*tw})`;gbx.lineWidth=1;
      gbx.beginPath();gbx.arc(w.x,w.y,R*2.4,0,7);gbx.stroke();
    }
    if(hov){const g=gbx.createRadialGradient(w.x,w.y,0,w.x,w.y,R*7);
      g.addColorStop(0,isH?`hsla(${w.hue},90%,70%,.7)`:"rgba(244,214,138,.7)");g.addColorStop(1,"hsla(0,0%,0%,0)");
      gbx.fillStyle=g;gbx.beginPath();gbx.arc(w.x,w.y,R*7,0,7);gbx.fill();}
    gbx.beginPath();gbx.arc(w.x,w.y,hov?R*1.6:R,0,7);
    gbx.fillStyle=hov?"#fff":(isH?`hsl(${w.hue},90%,${Math.round(60+tw*15)}%)`:`rgba(244,232,200,${tw})`);
    gbx.fill();
  });
  requestAnimationFrame(gbDraw);
}
function gbPick(mx,my){
  const r=gbSky.getBoundingClientRect();
  const x=(mx-r.left)*devicePixelRatio, y=(my-r.top)*devicePixelRatio;
  let best=-1,bd=1e9;
  wishStars.forEach((w,i)=>{const d=Math.hypot(w.x-x,w.y-y);if(d<24*devicePixelRatio&&d<bd){bd=d;best=i;}});
  return best;
}
gbSky.addEventListener("mousemove",e=>{
  gbHover=gbPick(e.clientX,e.clientY);
  gbSky.style.cursor=gbHover>=0?"pointer":"crosshair";
  if(gbHover>=0){showTip(wishStars[gbHover],e.clientX,e.clientY);}else hideTip();
});
gbSky.addEventListener("mouseleave",()=>{gbHover=-1;hideTip();});
gbSky.addEventListener("click",e=>{const i=gbPick(e.clientX,e.clientY);if(i>=0)showTip(wishStars[i],e.clientX,e.clientY,true);});
function showTip(w,cx,cy,sticky){
  const wrap=gbSky.parentElement.getBoundingClientRect();
  const mark=w.hidden?`<div class="t-hidden" style="color:hsl(${w.hue},85%,72%);font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.1em;margin-bottom:5px">✦ 히든에서 온 별</div>`:"";
  gbTip.innerHTML=mark+`<div class="t-msg">${escapeHtml(w.msg)}</div><div class="t-name">— ${escapeHtml(w.name||"익명")}</div>`;
  gbTip.classList.add("show");                 // 먼저 보이게 해서 크기를 잰다
  const tw=gbTip.offsetWidth, th=gbTip.offsetHeight, pad=14;
  let x=cx-wrap.left+14, y=cy-wrap.top+14;
  if(x+tw > wrap.width-pad)  x=cx-wrap.left-tw-14;   // 오른쪽 넘치면 왼쪽으로
  if(y+th > wrap.height-pad) y=cy-wrap.top-th-14;    // 아래로 넘치면 위로
  x=Math.max(pad, Math.min(x, wrap.width-tw-pad));   // 좌우 안쪽으로 보정
  y=Math.max(pad, Math.min(y, wrap.height-th-pad));  // 상하 안쪽으로 보정
  gbTip.style.left=x+"px"; gbTip.style.top=y+"px";
  if(sticky){clearTimeout(gbTip._t);gbTip._t=setTimeout(hideTip,3500);}
}
function hideTip(){gbTip.classList.remove("show");}
function escapeHtml(s){return (s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

async function gbLoad(){
  let list=await WishStore.all();
  if(list.length===0 && !gbSeeded){
    gbSeeded=true;
    for(const s of (CONFIG.seedWishes||[])) await WishStore.add(s);
    list=await WishStore.all();
  }
  wishStars=list.map(w=>({...w}));
  layoutWishes();
  gbCount.textContent=`별 ${wishStars.length}개`;
}
document.getElementById("gbAdd").addEventListener("click",async()=>{
  const msg=document.getElementById("gbMsg").value.trim();
  const name=document.getElementById("gbName").value.trim();
  if(!msg){document.getElementById("gbMsg").focus();return;}
  await WishStore.add({name,msg});
  document.getElementById("gbMsg").value="";
  await gbLoad();
  // 새 별을 살짝 강조
  gbHover=wishStars.length-1;setTimeout(()=>{gbHover=-1;},1400);
  // 전역 밤하늘도 한 톨 밝게
  if(typeof addBackgroundStar==="function")addBackgroundStar();
});
document.getElementById("gbMsg").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("gbAdd").click();});
addEventListener("resize",gbResize);
gbResize(); gbDraw(); gbLoad();
}

/* ============================================================
   ★ HIDDEN — 흩어진 별을 쓸어 모아 별무리 완성 → 단서 해금
   app.js 의 646~730줄(기존 '별자리 잇기' if 블록 전체)을 이 블록으로 교체.
   해금 모달·앵콜 힌트·방명록은 그대로 유지됩니다.
   ============================================================ */
if(document.getElementById("connectCanvas")){
const conC=document.getElementById("connectCanvas"), cox=conC.getContext("2d");
const conStatus=document.getElementById("connectStatus");
const DPRc=Math.min(devicePixelRatio||1,2);
const NSTARS=80, TARGET=55;          // 전체 별 수 / 중앙에 모으면 완성되는 수
let stars=[], down=false, px=-999, py=-999, done=false, progress=0;

function conResize(){
  const r=conC.getBoundingClientRect();
  conC.width=r.width*DPRc; conC.height=r.height*DPRc;
  if(!stars.length){
    for(let i=0;i<NSTARS;i++)stars.push({x:Math.random()*conC.width,y:Math.random()*conC.height,vx:0,vy:0,r:(.8+Math.random()*2)*DPRc,tw:Math.random()*6.28});
  }
}
function conPos(e){const r=conC.getBoundingClientRect();const cx=(e.touches?e.touches[0].clientX:e.clientX);const cy=(e.touches?e.touches[0].clientY:e.clientY);return {x:(cx-r.left)*DPRc,y:(cy-r.top)*DPRc};}

function conDraw(){
  const W=conC.width,H=conC.height,t=Date.now()/1000;
  cox.clearRect(0,0,W,H);
  const cx=W/2, cy=H/2, GATHER=Math.min(W,H)*.22, PULL=150*DPRc;
  let inCenter=0;
  cox.globalCompositeOperation="lighter";
  for(const s of stars){
    if(down && !done){const dx=px-s.x,dy=py-s.y,d=Math.hypot(dx,dy);if(d<PULL){const f=(1-d/PULL)*.022;s.vx+=(cx-s.x)*f;s.vy+=(cy-s.y)*f;}}
    s.vx*=.9; s.vy*=.9; s.x+=s.vx; s.y+=s.vy;
    const dc=Math.hypot(s.x-cx,s.y-cy), near=dc<GATHER; if(near)inCenter++;
    const tw=.5+.5*Math.sin(t*2+s.tw);
    if(near){const g=cox.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*4);g.addColorStop(0,`rgba(150,232,218,${tw*.55})`);g.addColorStop(1,"rgba(150,232,218,0)");cox.fillStyle=g;cox.beginPath();cox.arc(s.x,s.y,s.r*4,0,7);cox.fill();}
    cox.fillStyle=near?`rgba(215,255,248,${tw})`:`rgba(140,190,182,${.4+.3*tw})`;
    cox.beginPath();cox.arc(s.x,s.y,s.r,0,7);cox.fill();
  }
  cox.globalCompositeOperation="source-over";
  // 진행 링 (중앙)
  progress=Math.min(1,inCenter/TARGET);
  cox.strokeStyle="rgba(90,145,135,.3)";cox.lineWidth=2.5*DPRc;cox.beginPath();cox.arc(cx,cy,GATHER,0,7);cox.stroke();
  cox.strokeStyle="rgba(126,214,198,.95)";cox.lineWidth=3*DPRc;cox.lineCap="round";
  cox.beginPath();cox.arc(cx,cy,GATHER,-1.5708,-1.5708+progress*6.283);cox.stroke();
  if(progress>=1 && !done){ done=true; conStatus.innerHTML="✦ 별무리 완성! 단서를 해금합니다 ✦"; setTimeout(openUnlock,650); }
  else if(!done && down){ conStatus.innerHTML=`${Math.round(progress*100)}% — 흩어진 빛을 계속 모으세요`; }
  requestAnimationFrame(conDraw);
}
function conStart(e){ if(done)return; e.preventDefault(); down=true; const p=conPos(e); px=p.x; py=p.y; }
function conMove(e){ if(!down||done)return; e.preventDefault(); const p=conPos(e); px=p.x; py=p.y; }
function conEnd(){ down=false; px=py=-999; }
conC.addEventListener("mousedown",conStart); conC.addEventListener("mousemove",conMove); addEventListener("mouseup",conEnd);
conC.addEventListener("touchstart",conStart,{passive:false}); conC.addEventListener("touchmove",conMove,{passive:false}); addEventListener("touchend",conEnd);
document.getElementById("connectReset").addEventListener("click",()=>{done=false;progress=0;stars=[];conResize();conStatus.innerHTML="화면을 <b>문질러</b> 흩어진 별을 가운데로 모으세요";});
conResize(); addEventListener("resize",conResize); conDraw();

// 해금 모달 (기존 유지)
const unlockModal=document.getElementById("unlockModal");
let unlockedOnce=false;
function openUnlock(){
  if(!unlockedOnce){
    const e=CONFIG.encore||{};
      document.getElementById("umEncore").innerHTML =
        `<div class="um-encore-tag">HINT</div>`+
        `<div class="um-encore-eyebrow">ENCORE · 여덟 번째 별</div>`+
        `<div class="um-encore-title">${e.title||"여기에 앵콜 힌트가 들어갑니다"}</div>`+
        (e.note?`<div class="um-encore-note">${e.note.replace(/\n/g,"<br/>")}</div>`:"");
    unlockedOnce=true;
  }
  unlockModal.classList.add("on");unlockModal.setAttribute("aria-hidden","false");
}
function closeUnlock(){unlockModal.classList.remove("on");unlockModal.setAttribute("aria-hidden","true");}
document.getElementById("umClose").addEventListener("click",closeUnlock);
unlockModal.addEventListener("click",e=>{if(e.target===unlockModal)closeUnlock();});
addEventListener("keydown",e=>{if(e.key==="Escape")closeUnlock();});
}


/* ============================================================
   PER-PAGE SPACE BACKGROUND  (별무리 : CLUSTAR)
   app.js 의 기존 "AMBIENT STARFIELD ..." 블록(608번째 줄부터 파일 끝까지)을
   이 블록으로 통째로 교체하세요. #sky 캔버스 하나에 페이지별 효과를 그립니다.
   페이지 구분은 <body data-page="home|about|setlist|members|ticket|memento|guestbook|hidden">
   ============================================================ */
const prefersReduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
(function(){
  const cv = document.getElementById("sky"); if(!cv) return;
  const ctx = cv.getContext("2d");
  const isMobile = matchMedia("(max-width:760px)").matches || matchMedia("(pointer:coarse)").matches;
  const DPR = Math.min(devicePixelRatio||1, isMobile?1.5:2);
  let W, H;
  const gauss = ()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(6.283*v);};
  const TEAL=[120,222,205], TEALW=[210,250,242], BLUE=[150,225,255], INK="#141619";

  const page = (document.body.dataset.page || (location.pathname.split("/").pop().replace(".html","")||"home")).toLowerCase();

  /* 히어로 시차(내비 별) — 홈에서만 은은하게 */
  const heroConst=document.querySelector(".hero-constellation");
  const heroNav=document.querySelector(".hero-navstars");
  let tgX=0,tgY=0,pxX=0,pxY=0;
  if(!prefersReduced){
    addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;tgX=e.clientX/innerWidth-.5;tgY=e.clientY/innerHeight-.5;},{passive:true});
    addEventListener("pointerleave",()=>{tgX=0;tgY=0;},{passive:true});
  }

  const area = ()=> (W*H)/(DPR*DPR);
  const MOBILE_FACTOR = isMobile ? 0.7 : 1;
  const scale = base => Math.max(40, Math.round(base * MOBILE_FACTOR * area()/1400000));

  let build=()=>{}, step=()=>{};

 /* ---------- ① 나선 은하 (home) — 촘촘한 나선팔 + 정교한 코어 ---------- */
  function galaxy(){
    let disk,dust,bg; const ARMS=2,WIND=3.0,TILT=.42;
    build=()=>{disk=[];dust=[];bg=[];
      const nd=Math.min(9000,scale(6500));
      for(let i=0;i<nd;i++){const t=Math.pow(Math.random(),.55);const arm=i%ARMS;
        const base=arm*Math.PI+t*WIND*6.283;
        const spread=(.16*(1-t)+.028)*gauss();          // 팔을 또렷하게 (퍼짐 축소)
        const ang=base+spread;
        const young=Math.random()<(1-t)*.65;
        disk.push({r:t,ang,
          sz:young?(.6+Math.random()*1.0):(.35+Math.random()*.6),
          col:young?BLUE:(Math.random()<.28?[235,248,228]:TEAL),
          base:young?.9:.5,tw:Math.random()*6.28,tsp:.4+Math.random()*.9});}
      const ndu=Math.min(1800,scale(1400));
      for(let i=0;i<ndu;i++){const t=Math.pow(Math.random(),.6);const arm=i%ARMS;const ang=arm*Math.PI+t*WIND*6.283+.30+.14*gauss();dust.push({r:t,ang,sz:4+Math.random()*10});}
      const nb=Math.min(700,scale(600));for(let i=0;i<nb;i++)bg.push({x:Math.random(),y:Math.random(),s:.3+Math.random()*.7,b:.12+Math.random()*.35,tw:Math.random()*6.28});};
    let rot=0;
    step=t=>{ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);const cx=W*.66,cy=H*.5,R=Math.min(W,H)*.66;rot+=.0011;
      for(const s of bg){const tw=s.b*(.6+.4*Math.sin(t/900+s.tw));ctx.globalAlpha=tw;ctx.fillStyle="rgb(170,215,208)";ctx.fillRect(s.x*W,s.y*H,s.s*DPR,s.s*DPR);}ctx.globalAlpha=1;
      const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,R);halo.addColorStop(0,"rgba(90,182,166,.16)");halo.addColorStop(.45,"rgba(70,150,150,.05)");halo.addColorStop(1,"rgba(70,150,150,0)");ctx.fillStyle=halo;ctx.beginPath();ctx.ellipse(cx,cy,R,R*TILT,0,0,7);ctx.fill();
      ctx.globalCompositeOperation="multiply";
      for(const d of dust){const a=d.ang+rot/(.35+d.r);const rr=d.r*R;const px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr*TILT;const g=ctx.createRadialGradient(px,py,0,px,py,d.sz*DPR);g.addColorStop(0,"rgba(12,13,17,.5)");g.addColorStop(1,"rgba(12,13,17,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,d.sz*DPR,0,7);ctx.fill();}
      ctx.globalCompositeOperation="lighter";
      for(const s of disk){const a=s.ang+rot/(.35+s.r);const rr=s.r*R;const px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr*TILT;const tw=.65+.35*Math.sin(t/700*s.tsp+s.tw);const al=s.base*tw*(.45+.55*(1-s.r));const r=s.sz*DPR;
        if(s.sz>1){const g=ctx.createRadialGradient(px,py,0,px,py,r*3);g.addColorStop(0,"rgba("+s.col[0]+","+s.col[1]+","+s.col[2]+","+(al*.5)+")");g.addColorStop(1,"rgba("+s.col[0]+","+s.col[1]+","+s.col[2]+",0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r*3,0,7);ctx.fill();}
        ctx.fillStyle="rgba("+s.col[0]+","+s.col[1]+","+s.col[2]+","+al+")";ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();}
      const core=ctx.createRadialGradient(cx,cy,0,cx,cy,R*.3);core.addColorStop(0,"rgba(240,255,250,.95)");core.addColorStop(.18,"rgba(170,238,225,.65)");core.addColorStop(.5,"rgba(90,200,185,.22)");core.addColorStop(1,"rgba(90,200,185,0)");ctx.fillStyle=core;ctx.beginPath();ctx.ellipse(cx,cy,R*.3,R*.3*(TILT+.16),0,0,7);ctx.fill();
      ctx.globalCompositeOperation="source-over";};
  }

/* ---------- 2. 흐르는 별 먼지 (about — 차분하되 살아있게) ---------- */
  function cluster(){
    let dust;
    build=()=>{dust=[];const n=scale(220);for(let i=0;i<n;i++)dust.push(mkd(Math.random(),Math.random()));};
    function mkd(x,y){const big=Math.random()<.14;return {x,y,r:big?(1.2+Math.random()*1.6):(.3+Math.random()*1),sp:.000015+Math.random()*.000025,tw:Math.random()*6.28,tsp:.3+Math.random()*.5,drift:.000005*(Math.random()-.5),big};}
    step=t=>{ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation="lighter";
      for(const d of dust){
        d.x+=d.sp*16.7; d.y+=d.drift*16.7;
        if(d.x>1.03){d.x=-.03;d.y=Math.random();}
        const tw=.28+.4*Math.pow(.5+.5*Math.sin(t/1100*d.tsp+d.tw),1.4);
        const px=d.x*W,py=d.y*H,r=d.r*DPR;
        if(d.big){const g=ctx.createRadialGradient(px,py,0,px,py,r*4.5);g.addColorStop(0,"rgba(150,232,218,"+(tw*.5)+")");g.addColorStop(1,"rgba(150,232,218,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r*4.5,0,7);ctx.fill();}
        ctx.fillStyle="rgba(180,235,225,"+tw+")";
        ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();
      }
      ctx.globalCompositeOperation="source-over";};
  }

  /* ---------- ② 초신성 방사 (setlist) — 촘촘한 방사선 ---------- */
  function supernova(){
    let ps,bg;
    build=()=>{ps=[];const n=Math.min(900,scale(560));
      for(let i=0;i<n;i++){const ang=Math.random()*6.28;ps.push({ang,off:Math.random(),sp:.1+Math.random()*.36,sz:Math.random()*1.1+.3,dots:3+((Math.random()*4)|0)});}
      bg=[];const nb=Math.min(160,scale(120));for(let i=0;i<nb;i++)bg.push({x:Math.random(),y:Math.random(),s:.3+Math.random()*.8,tw:Math.random()*6.28});};
    step=t=>{ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);const cx=W*.72,cy=H*.5,R=Math.max(W,H)*.95;
      for(const s of bg){const tw=.22+.4*Math.sin(t/800+s.tw);if(tw<0)continue;ctx.fillStyle="rgba(160,220,210,"+tw+")";ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.s*DPR,0,7);ctx.fill();}
      ctx.globalCompositeOperation="lighter";
      for(const p of ps){const prog=((t/1000*p.sp+p.off)%1);for(let d=0;d<p.dots;d++){const tt=prog-d*.045;if(tt<0||tt>1)continue;const rr=tt*R;const px=cx+Math.cos(p.ang)*rr,py=cy+Math.sin(p.ang)*rr*.62;const al=(1-tt)*(1-d*.2);ctx.fillStyle="rgba(140,235,215,"+al+")";ctx.beginPath();ctx.arc(px,py,p.sz*DPR*(1-tt*.35),0,7);ctx.fill();}}
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,R*.15);g.addColorStop(0,"rgba(215,255,248,.95)");g.addColorStop(.35,"rgba(150,240,222,.5)");g.addColorStop(1,"rgba(140,235,215,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R*.15,0,7);ctx.fill();
      ctx.globalCompositeOperation="source-over";};
  }

/* ============================================================
   소용돌이 flow field (vortexField) — HIDDEN 배경
   ① app.js 배경 엔진 안, 다른 효과 함수 근처(예: function supernova 아래)에 붙여넣기
   ② MAP 줄에서  hidden:supernova  →  hidden:vortexField  로 변경
   ※ 트레일(잔상) 방식이라 매 프레임 전체를 지우지 않고 살짝만 덮습니다(엔진 호환 처리 완료).
   ============================================================ */
  function vortexField(){
    let PS, N, cx, cy, rmax, tt;
    const nz=(px,py)=>Math.sin(px*0.9+Math.cos(py*0.7))*0.6+Math.sin(py*1.3+Math.cos(px*0.5))*0.4;
    function spawn(i){const a=Math.random()*6.28;const r=Math.pow(Math.random(),0.5)*rmax;PS[i]={x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,life:60+(Math.random()*260|0),teal:Math.random()<0.16};}
    build=()=>{
      cx=W*0.5; cy=H*0.5; rmax=Math.min(W,H)*0.42; tt=0;
      N=isMobile?1500:3400; PS=[];
      for(let i=0;i<N;i++)spawn(i);
      ctx.fillStyle="#0a0c0d"; ctx.fillRect(0,0,W,H);          // 어두운 베이스 1회
    };
    step=t=>{
      tt+=0.015;
      ctx.fillStyle="rgba(10,12,13,0.09)"; ctx.fillRect(0,0,W,H);   // 트레일 페이드
      ctx.strokeStyle="rgba(120,150,145,.03)"; ctx.lineWidth=1*DPR;
      for(let k=1;k<=3;k++){ctx.beginPath();ctx.arc(cx,cy,rmax*0.32*k,0,7);ctx.stroke();}
      ctx.globalCompositeOperation="lighter";
      const spd=1.25*DPR, swirl=1.0, pull=0.16;
      for(let i=0;i<N;i++){
        const p=PS[i];
        const dx=p.x-cx, dy=p.y-cy;
        const r=Math.hypot(dx,dy)||1e-6, ang=Math.atan2(dy,dx);
        const n=nz((dx/rmax)*2.4,(dy/rmax)*2.4+tt)*0.6;
        let vx=(-Math.sin(ang)*swirl - Math.cos(ang)*pull)+(-Math.sin(ang+n))*0.5;
        let vy=( Math.cos(ang)*swirl - Math.sin(ang)*pull)+( Math.cos(ang+n))*0.5;
        const vl=Math.hypot(vx,vy)||1e-6;
        p.x+=vx/vl*spd; p.y+=vy/vl*spd; p.life--;
        if(p.life<0 || r<rmax*0.04 || r>rmax*1.15){spawn(i);continue;}
        const al=0.5*(1-Math.min(1,r/(rmax*1.1)))+0.06;
        ctx.fillStyle=p.teal?"rgba(150,235,215,"+(al*0.95)+")":"rgba(232,238,236,"+(al*0.85)+")";
        ctx.fillRect(p.x,p.y,1.15*DPR,1.15*DPR);
      }
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,rmax*0.3);
      cg.addColorStop(0,"rgba(150,232,218,.13)");cg.addColorStop(1,"rgba(150,232,218,0)");
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(cx,cy,rmax*0.3,0,7);ctx.fill();
      ctx.globalCompositeOperation="source-over";
    };
  }


  /* ---------- 4. 성좌 그리드 (members) ---------- */
  function openCluster(){
    let nodes,rings; const CN=[[.28,.5],[.5,.5],[.72,.5]];
    build=()=>{
      nodes=[];const n=Math.max(20,Math.min(46,scale(40)));
      for(let i=0;i<n;i++){const ci=i%CN.length;const ang=Math.random()*6.28;const rad=(.06+Math.random()*.2);
        nodes.push({cx:CN[ci][0],cy:CN[ci][1],ang,rad,sz:.6+Math.random()*1.8,tw:Math.random()*6.28,sp:.4+Math.random()*.8,osp:(.06+Math.random()*.12)*(Math.random()<.5?1:-1)});}
      rings=CN.map((c,i)=>({x:c[0],y:c[1],r:.1+i*.03,ph:Math.random()*6.28}));
    };
    step=t=>{ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);const asp=W/H;
      ctx.lineWidth=DPR*.7;
      for(const r of rings){const rr=r.r*Math.min(W,H)*(1+.04*Math.sin(t/2600+r.ph));ctx.strokeStyle="rgba(90,182,166,.10)";ctx.beginPath();ctx.ellipse(r.x*W,r.y*H,rr,rr*.62,0,0,7);ctx.stroke();}
      const pos=nodes.map(nd=>{const a=nd.ang+t/1000*nd.osp;return {x:(nd.cx+Math.cos(a)*nd.rad/asp)*W,y:(nd.cy+Math.sin(a)*nd.rad)*H,nd};});
      const lim=Math.min(W,H)*.16;
      for(let i=0;i<pos.length;i++)for(let j=i+1;j<pos.length;j++){const dx=pos[i].x-pos[j].x,dy=pos[i].y-pos[j].y;const d=Math.hypot(dx,dy);if(d<lim){ctx.strokeStyle="rgba(120,215,200,"+(.12*(1-d/lim))+")";ctx.beginPath();ctx.moveTo(pos[i].x,pos[i].y);ctx.lineTo(pos[j].x,pos[j].y);ctx.stroke();}}
      ctx.globalCompositeOperation="lighter";
      for(const p of pos){const tw=.4+.6*Math.pow(.5+.5*Math.sin(t/650*p.nd.sp+p.nd.tw),1.6);const r=p.nd.sz*DPR;const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*5);g.addColorStop(0,"rgba(150,232,218,"+(tw*.5)+")");g.addColorStop(1,"rgba(150,232,218,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,r*5,0,7);ctx.fill();ctx.fillStyle="rgba(210,250,242,"+tw+")";ctx.beginPath();ctx.arc(p.x,p.y,r,0,7);ctx.fill();}
      ctx.globalCompositeOperation="source-over";};
  }

  /* ---------- 5. 성운 (ticket) ---------- */
  function nebula(){
    let blobs,stars;
    build=()=>{blobs=[];for(let i=0;i<6;i++)blobs.push({x:Math.random(),y:Math.random(),r:.3+Math.random()*.3,ph:Math.random()*6.28,sp:.3+Math.random()*.4,h:Math.random()});
      stars=[];const n=scale(130);for(let i=0;i<n;i++)stars.push({x:Math.random(),y:Math.random(),s:.3+Math.random()*1,tw:Math.random()*6.28,sp:.4+Math.random()});};
    step=t=>{ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation="lighter";
      for(const b of blobs){const pr=b.r*Math.min(W,H)*(.9+.12*Math.sin(t/2600*b.sp+b.ph));const px=(b.x+.02*Math.sin(t/5000+b.ph))*W,py=(b.y+.02*Math.cos(t/6000+b.ph))*H;const c=b.h<.5?"90,190,175":"70,160,175";const g=ctx.createRadialGradient(px,py,0,px,py,pr);g.addColorStop(0,"rgba("+c+",.1)");g.addColorStop(.5,"rgba("+c+",.04)");g.addColorStop(1,"rgba("+c+",0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,pr,0,7);ctx.fill();}
      for(const s of stars){const tw=.3+.6*Math.sin(t/700*s.sp+s.tw);if(tw<0)continue;ctx.fillStyle="rgba(190,240,230,"+tw+")";ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.s*DPR,0,7);ctx.fill();}
      ctx.globalCompositeOperation="source-over";};
  }

  /* ---------- 6. 별밭 + 유성 (memento) ---------- */
  function meteorField(){
    let stars,shoot=[],last=0;
    build=()=>{stars=[];const n=scale(200);for(let i=0;i<n;i++)stars.push({x:Math.random(),y:Math.random(),sz:.3+Math.random()*1.3,tw:Math.random()*6.28,sp:.4+Math.random()});shoot=[];};
    function spawn(){const startX=Math.random()*W*.5-W*.1;shoot.push({x:startX,y:-H*.1,len:0,max:Math.hypot(W,H)*1.25,sp:11*DPR,life:0});}
    step=t=>{ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);
      for(const s of stars){const tw=.3+.55*Math.pow(.5+.5*Math.sin(t/700*s.sp+s.tw),1.5);const px=s.x*W,py=s.y*H,r=s.sz*DPR;
        if(s.sz>1){ctx.globalCompositeOperation="lighter";const g=ctx.createRadialGradient(px,py,0,px,py,r*4);g.addColorStop(0,"rgba(150,230,215,"+(tw*.4)+")");g.addColorStop(1,"rgba(150,230,215,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r*4,0,7);ctx.fill();ctx.globalCompositeOperation="source-over";}
        ctx.fillStyle="rgba(200,242,232,"+tw+")";ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();}
      if(t-last>2600&&shoot.length<2&&Math.random()<.5){spawn();last=t;}
      shoot=shoot.filter(s=>s.len<s.max);
      for(const s of shoot){s.life+=.018;s.len=Math.min(s.max,s.len+s.sp);const ang=Math.PI*.75;const ex=s.x+Math.cos(ang)*s.len,ey=s.y+Math.sin(ang)*s.len;const tx=s.x+Math.cos(ang)*(s.len-80*DPR),ty=s.y+Math.sin(ang)*(s.len-80*DPR);
        const g=ctx.createLinearGradient(tx,ty,ex,ey);g.addColorStop(0,"rgba(150,235,218,0)");g.addColorStop(1,"rgba(200,250,242,"+Math.max(0,1-s.life*.6)+")");ctx.strokeStyle=g;ctx.lineWidth=1.6*DPR;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(ex,ey);ctx.stroke();
        ctx.fillStyle="rgba(215,255,248,"+Math.max(0,1-s.life*.6)+")";ctx.beginPath();ctx.arc(ex,ey,1.8*DPR,0,7);ctx.fill();}};
  }

  /* ---------- 7. 떠오르는 빛 입자 (guestbook — 방명록 은하수는 #gbSky) ---------- */
  function quietField(){
    let motes;
    build=()=>{motes=[];const n=scale(90);for(let i=0;i<n;i++)motes.push(mk(Math.random()));};
    function mk(yInit){return {x:Math.random(),y:yInit,r:.6+Math.random()*2,sp:.00002+Math.random()*.00006,drift:(Math.random()-.5)*.00003,tw:Math.random()*6.28,tsp:.4+Math.random()*.9,big:Math.random()<.16};}
    step=t=>{ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation="lighter";
      for(const m of motes){
        m.y-=m.sp*16.7; m.x+=m.drift*16.7*Math.sin(t/2000+m.tw);
        if(m.y<-0.03){Object.assign(m,mk(1.03));}
        const tw=.35+.65*Math.pow(.5+.5*Math.sin(t/700*m.tsp+m.tw),1.7);
        const px=m.x*W,py=m.y*H,r=m.r*DPR;
        const g=ctx.createRadialGradient(px,py,0,px,py,r*(m.big?6:4));
        g.addColorStop(0,"rgba("+(m.big?"180,245,235":"130,222,205")+","+(tw*.55)+")");
        g.addColorStop(1,"rgba(130,222,205,0)");
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r*(m.big?6:4),0,7);ctx.fill();
        ctx.fillStyle="rgba(210,250,242,"+tw+")";ctx.beginPath();ctx.arc(px,py,r*.7,0,7);ctx.fill();
      }
      ctx.globalCompositeOperation="source-over";};
  }

/* ============================================================
   물결 성운 (waveNebula) — 배경 엔진에 추가할 함수
   app.js 배경 엔진 안, 다른 효과 함수들 근처(예: function ringCluster 바로 위/아래)에
   이 함수를 붙여넣으세요. 그리고 MAP 줄을 아래처럼 바꾸세요:

   기존:
     const MAP={home:ringCluster,about:cluster,setlist:meteorField,members:openCluster,ticket:nebula,memento:galaxy,guestbook:quietField,hidden:supernova};
   변경:
     const MAP={home:waveNebula,about:cluster,setlist:meteorField,members:ringCluster,ticket:nebula,memento:galaxy,guestbook:quietField,hidden:supernova};
   (home → waveNebula, members → ringCluster 두 곳만 바뀜)
   ============================================================ */
  function waveNebula(){
    const LOBES=2;
    const radiusAt=v=>{const wave=Math.pow(Math.abs(Math.cos(v*Math.PI*LOBES)),1.1);const ends=Math.pow(Math.abs(v-0.5)*2,1.5);return 0.14+0.58*wave+0.26*ends;};
    let rings,wisps,RINGS,PER;
    build=()=>{
      RINGS=isMobile?90:200; PER=isMobile?34:56; const NWISP=isMobile?600:2000;
      rings=[];
      for(let i=0;i<RINGS;i++){const v=i/(RINGS-1);
        rings.push({v,phase:Math.random()*6.28,ox:(Math.sin(v*7.1)*0.5+Math.sin(v*3.3+1)*0.5)*0.16,oy:Math.sin(v*4.2+2)*0.04,tilt:Math.sin(v*5.0)*0.9,warp:0.7+Math.random()*1.1,rowTeal:Math.random()<0.14});}
      wisps=[];
      for(let i=0;i<NWISP;i++){const v=Math.random(),a=Math.random()*6.28;
        wisps.push({v,a,reach:0.25+Math.random()*1.2,off:Math.random(),curl:(Math.random()-0.5)*2.6,teal:Math.random()<0.15,sz:0.35+Math.random()*1.2});}
    };
    let rot=0;
    step=t=>{
      ctx.fillStyle="#0f1113";ctx.fillRect(0,0,W,H);
      const cx=W*(isMobile?0.5:0.72), cy=H*0.5, hgt=Math.min(H*0.46,W*0.66), rmax=Math.min(W,H)*0.32;
      rot+=0.0012;
      ctx.strokeStyle="rgba(120,150,145,.045)";ctx.lineWidth=1*DPR;
      ctx.beginPath();ctx.moveTo(cx,cy-hgt*1.2);ctx.lineTo(cx,cy+hgt*1.2);ctx.stroke();
      for(let k=1;k<=3;k++){ctx.beginPath();ctx.arc(cx,cy,rmax*0.5*k,0,7);ctx.stroke();}
      ctx.globalCompositeOperation="lighter";
      for(const w of wisps){
        const baseR=radiusAt(w.v)*rmax, yv=cy+(w.v-0.5)*2*hgt;
        const spin=rot*(0.5+radiusAt(w.v))+w.curl*0.3;
        const flow=(t/3000*(0.5+w.off)+w.off)%1;
        const rr=baseR*(1+w.reach*flow);
        const a=w.a+spin+flow*w.curl*0.9;
        const px=cx+Math.cos(a)*rr+Math.sin(w.v*20+t/2000)*8*DPR*flow;
        const py=yv+Math.sin(a)*rr*0.13 - w.reach*flow*26*DPR*(w.v<0.5?1:-1);
        const al=(1-flow)*0.5, r=w.sz*DPR;
        ctx.fillStyle=w.teal?"rgba(160,240,222,"+Math.min(1,al*1.1)+")":"rgba(220,230,228,"+(al*0.8)+")";
        ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();
      }
      for(const ring of rings){
        const baseR=radiusAt(ring.v)*rmax, yv=cy+(ring.v-0.5)*2*hgt;
        const ccx=cx+ring.ox*rmax, ccy=yv+ring.oy*rmax;
        const spin=rot*(0.5+radiusAt(ring.v)*1.0)+ring.phase;
        for(let j=0;j<PER;j++){
          const a=(j/PER)*6.283+spin+ring.tilt*Math.sin((j/PER)*6.28);
          const warp=1+0.20*Math.sin(a*3+ring.v*10+t/2600)*ring.warp+0.11*Math.sin(a*7-t/1800)+0.05*Math.sin(a*13+ring.v*20);
          const R=baseR*warp;
          const px=ccx+Math.cos(a)*R, py=ccy+Math.sin(a)*R*0.13;
          const z=Math.sin(a), depth=0.26+0.74*(z*0.5+0.5);
          const al=depth*(0.5+0.35*Math.sin(t/900+ring.v*8)), r=(0.45+0.55*depth)*DPR;
          const teal=ring.rowTeal&&(j%3===0);
          if(teal){ctx.fillStyle="rgba(160,240,222,"+Math.min(1,al*1.15)+")";ctx.beginPath();ctx.arc(px,py,r*1.3,0,7);ctx.fill();}
          else{ctx.fillStyle="rgba(232,238,236,"+Math.min(1,al*1.05)+")";ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();}
        }
      }
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,rmax*0.5);
      cg.addColorStop(0,"rgba(150,232,218,.1)");cg.addColorStop(1,"rgba(150,232,218,0)");
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(cx,cy,rmax*0.5,0,7);ctx.fill();
      ctx.globalCompositeOperation="source-over";
      ctx.strokeStyle="rgba(180,235,225,.4)";ctx.lineWidth=1*DPR;const d=7*DPR;
      ctx.beginPath();ctx.moveTo(cx,cy-d);ctx.lineTo(cx+d,cy);ctx.lineTo(cx,cy+d);ctx.lineTo(cx-d,cy);ctx.closePath();ctx.stroke();
    };
  }

  /* ---------- ③ 고리 성단 (hidden) — 촘촘한 링 ---------- */
  function ringCluster(){
    let pts,bg,blobs;
    build=()=>{pts=[];const n=Math.min(4200,scale(3000));
      for(let i=0;i<n;i++){const a=Math.random()*6.28;const rr=1+gauss()*.15;const big=Math.random()<.1;
        pts.push({a,rr,sz:big?1.2+Math.random()*1.3:.35+Math.random()*.8,col:big?BLUE:TEAL,base:big?.9:.5,tw:Math.random()*6.28,sp:.4+Math.random()*.9,rsp:.6+Math.random()*.8});}
      bg=[];const nb=Math.min(140,scale(100));for(let i=0;i<nb;i++)bg.push({x:Math.random(),y:Math.random(),s:.3+Math.random()*.7,tw:Math.random()*6.28});
      blobs=[];for(let i=0;i<4;i++)blobs.push({x:Math.random(),y:Math.random(),r:.35+Math.random()*.3,ph:Math.random()*6.28,sp:.2+Math.random()*.3});};
    let rot=0;
    step=t=>{ctx.fillStyle="#0f1113";ctx.fillRect(0,0,W,H);const cx=W*(isMobile?.5:.73),cy=H*.5,R=Math.min(W,H)*.36;rot+=.0009;
      ctx.globalCompositeOperation="lighter";
      for(const b of blobs){const pr=b.r*Math.min(W,H)*(.9+.1*Math.sin(t/3200*b.sp+b.ph));const px=(b.x+.015*Math.sin(t/6000+b.ph))*W,py=(b.y+.015*Math.cos(t/7000+b.ph))*H;const g=ctx.createRadialGradient(px,py,0,px,py,pr);g.addColorStop(0,"rgba(50,140,130,.08)");g.addColorStop(.5,"rgba(45,110,120,.03)");g.addColorStop(1,"rgba(45,110,120,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,pr,0,7);ctx.fill();}
      for(const s of bg){const tw=.2+.4*Math.sin(t/800+s.tw);if(tw<0)continue;ctx.fillStyle="rgba(150,215,205,"+tw+")";ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.s*DPR,0,7);ctx.fill();}
      for(const p of pts){const a=p.a+rot*p.rsp;const rr=p.rr*R;const px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr*.82;const tw=p.base*(.5+.5*Math.sin(t/650*p.sp+p.tw));const r=p.sz*DPR;
        if(p.sz>1.1){const g=ctx.createRadialGradient(px,py,0,px,py,r*3);g.addColorStop(0,"rgba("+p.col[0]+","+p.col[1]+","+p.col[2]+","+(tw*.5)+")");g.addColorStop(1,"rgba("+p.col[0]+","+p.col[1]+","+p.col[2]+",0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r*3,0,7);ctx.fill();}
        ctx.fillStyle="rgba("+p.col[0]+","+p.col[1]+","+p.col[2]+","+tw+")";ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill();}
      ctx.globalCompositeOperation="source-over";
      const inner=ctx.createRadialGradient(cx,cy,0,cx,cy,R*.72);inner.addColorStop(0,"rgba(15,17,19,.65)");inner.addColorStop(.7,"rgba(15,17,19,.15)");inner.addColorStop(1,"rgba(15,17,19,0)");ctx.fillStyle=inner;ctx.beginPath();ctx.arc(cx,cy,R*.72,0,7);ctx.fill();};
  }

  const MAP={home:waveNebula,about:cluster,setlist:meteorField,members:ringCluster,ticket:nebula,memento:galaxy,guestbook:quietField,hidden:vortexField};
  (MAP[page]||galaxy)();

  let lastW=innerWidth, lastH=innerHeight;
  function resize(force){
    // 모바일에서 스크롤 중 주소창이 접히고/펼쳐지며 innerHeight만 바뀌어도 resize 이벤트가 발생함.
    // 그때마다 파티클 전체를 재생성(build)하면 스크롤할 때마다 버벅임이 생기므로,
    // 너비가 실제로 바뀌었을 때만(=진짜 리사이즈/회전일 때만) 재빌드한다.
    const wChanged = innerWidth !== lastW;
    if(!force && !wChanged) { lastH = innerHeight; return; }
    lastW=innerWidth; lastH=innerHeight;
    W=cv.width=innerWidth*DPR;H=cv.height=innerHeight*DPR;cv.style.width=innerWidth+"px";cv.style.height=innerHeight+"px";build();
  }
  resize(true);addEventListener("resize",()=>resize(false));

// 탭이 백그라운드일 때는 정지 (배터리·부하 절약)
  let docHidden=false;
  document.addEventListener("visibilitychange",()=>{docHidden=document.hidden;});

  // 30fps 상한 — 부하를 절반으로. 스크롤 중에도 멈추지 않고 계속 그린다.
  const FRAME=1000/(isMobile?30:60); let lastDraw=0;
  function loop(t){
    requestAnimationFrame(loop);
    if(docHidden) return;
    // 내비 별 시차 (데스크톱 전용, 가벼움)
    if(!prefersReduced && !isMobile && (heroConst||heroNav)){
      pxX+=(tgX-pxX)*.06;pxY+=(tgY-pxY)*.06;
      const tf=`translate(${(-pxX*16).toFixed(2)}px,${(-pxY*12).toFixed(2)}px)`;
      if(heroConst)heroConst.style.transform=tf;if(heroNav)heroNav.style.transform=tf;
    }
    if(t-lastDraw<FRAME) return;   // 프레임 상한
    lastDraw=t; step(t);
  }
  if(prefersReduced){ step(0); }
  else requestAnimationFrame(loop);
})();


/* ============================================================
   ★ NAVER MAP — 오시는 길 (키 있으면 지도 임베드, 없으면 버튼만)
   ============================================================ */
(function(){
  const openBtn = document.getElementById("mapOpen");
  if(openBtn) openBtn.href = CONFIG.mapLink || "#";
  const copyBtn = document.getElementById("mapCopy");
  if(copyBtn) copyBtn.addEventListener("click", async ()=>{
    try{ await navigator.clipboard.writeText(CONFIG.venueAddr || CONFIG.venue || "");
      copyBtn.textContent="복사됨 ✓"; setTimeout(()=>copyBtn.textContent="주소 복사",1600); }
    catch(_){ copyBtn.textContent="복사 실패"; }
  });

  const box = document.getElementById("naverMap");
  if(!box) return;
  const fb = document.getElementById("mapFallback"), geo = CONFIG.venueGeo;

  if(!CONFIG.naverMapKey || !geo){
    if(fb) fb.innerHTML = "지도는 네이버 지도 API 키 등록 후 표시됩니다.<br/>아래 ‘네이버 지도에서 열기’로 바로 이동할 수 있어요.";
    return;
  }
  window.navermap_authFailure = function(){
    if(fb){ fb.style.display="flex"; fb.innerHTML = "지도 인증 실패 — 도메인 등록/키를 확인해 주세요.<br/>‘네이버 지도에서 열기’는 정상 동작합니다."; }
  };

  // 마커·정보창 커스텀 스타일 (1회 주입)
  if(!document.getElementById("tm-map-style")){
    const st=document.createElement("style"); st.id="tm-map-style";
    st.textContent=`
@keyframes tmRing{0%{transform:scale(.45);opacity:1}100%{transform:scale(3.2);opacity:0}}
@keyframes tmPing{0%{transform:scale(.45);opacity:.45}100%{transform:scale(3.2);opacity:0}}
.tm-pin{position:relative;width:46px;height:46px}
.tm-pin .halo{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle, rgba(8,10,18,.55) 0%, rgba(8,10,18,0) 70%)}
.tm-pin .ping{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:radial-gradient(circle, rgba(244,214,138,.5), rgba(244,214,138,0) 70%);animation:tmPing 2.6s ease-out infinite}
.tm-pin .ring{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:2.5px solid rgba(244,214,138,.95);box-shadow:0 0 0 1px rgba(8,10,18,.5), 0 0 9px rgba(244,214,138,.55);animation:tmRing 2.6s ease-out infinite}
.tm-pin .ring.d{animation-delay:1.3s}
.tm-pin .disc{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:radial-gradient(circle at 50% 35%, #1a2030, #0b0e16);border:1.5px solid #f4d68a;box-shadow:0 2px 8px rgba(0,0,0,.5), 0 0 12px 2px rgba(244,214,138,.55)}
.tm-pin .star{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#f4d68a;font-size:15px;line-height:1;text-shadow:0 0 6px rgba(244,214,138,.9)}
.tm-info{position:relative;background:rgba(11,14,22,.95);border:1px solid rgba(217,169,78,.5);border-radius:12px;padding:11px 16px;font-family:'Noto Sans KR',sans-serif;color:#e9edf9;box-shadow:0 12px 30px rgba(0,0,0,.55);white-space:nowrap}
.tm-info .v{color:#f4d68a;font-size:12px;letter-spacing:.05em}
.tm-info .t{font-size:14px;font-weight:500;margin-top:3px}
.tm-info .a{color:#8a93b8;font-size:11px;margin-top:5px}
.tm-info::after{content:"";position:absolute;left:50%;bottom:-7px;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);background:rgba(11,14,22,.95);border-right:1px solid rgba(217,169,78,.5);border-bottom:1px solid rgba(217,169,78,.5)}
`;
    document.head.appendChild(st);
  }

  const s = document.createElement("script");
  s.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=" + encodeURIComponent(CONFIG.naverMapKey);
  s.onload = function(){
    if(!window.naver || !naver.maps) return;
    if(fb) fb.style.display = "none";
    const pos = new naver.maps.LatLng(geo.lat, geo.lng);
    const map = new naver.maps.Map(box, { center: pos, zoom: 16, scrollWheel: false });

    const marker = new naver.maps.Marker({
      position: pos, map,
      icon: {
        content: '<div class="tm-pin"><span class="halo"></span><span class="ping"></span><span class="ring"></span><span class="ring d"></span><span class="disc"></span><span class="star">✦</span></div>',
        anchor: new naver.maps.Point(23,23)
      }
    });
    const info = new naver.maps.InfoWindow({
      content: '<div class="tm-info"><div class="v">아트홀 베짱이</div><div class="t">2026 뚜라미 여름공연</div><div class="a">6호선 상수역 1번 출구 · 도보 5분</div></div>',
      borderWidth: 0,
      backgroundColor: "transparent",
      disableAnchor: true,
      pixelOffset: new naver.maps.Point(0, -16)
    });
    info.open(map, marker);
    naver.maps.Event.addListener(marker, "click", ()=> info.getMap() ? info.close() : info.open(map, marker));
  };
  s.onerror = function(){ if(fb) fb.innerHTML = "지도를 불러오지 못했어요. 네트워크를 확인해 주세요."; };
  document.head.appendChild(s);
})();

/* ============================================================
   ★ HERO 별자리 반응형 — 모바일에선 '제목 ~ 타이머' 사이에 배치 + 전체 표시
   ============================================================ */
(function(){
  const hero  = document.querySelector(".hero");
  const c     = document.querySelector(".hero-constellation");
  const n     = document.querySelector(".hero-navstars");
  const title = hero && hero.querySelector("h1");
  const timer = document.getElementById("countdown");
  if(!hero || (!c && !n)) return;
  const svgs = [c, n].filter(Boolean);
  const mq = window.matchMedia("(max-width:880px)");

  function apply(){
    const mobile = mq.matches;
    svgs.forEach(svg=>{
      if(mobile){
        svg.setAttribute("viewBox", "40 110 920 380");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      }else{
        svg.setAttribute("viewBox", "0 0 1000 600");
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        svg.style.top = svg.style.height = svg.style.bottom = "";  // 데스크톱은 inset:0 복원
      }
    });
    if(mobile && title && timer){
      const hr  = hero.getBoundingClientRect();
      const top = title.getBoundingClientRect().bottom - hr.top;   // 제목 아래
      const bot = timer.getBoundingClientRect().top    - hr.top;   // 타이머 위
      const h   = Math.max(120, bot - top);
      svgs.forEach(svg=>{ svg.style.top = top+"px"; svg.style.height = h+"px"; svg.style.bottom = "auto"; });
    }
  }
  let lastAppW = innerWidth;
  apply();
  addEventListener("resize", ()=>{
    // 위와 동일: 모바일 주소창 토글로 인한 높이 변화는 무시하고, 너비가 바뀔 때만 재계산
    if(innerWidth === lastAppW) return;
    lastAppW = innerWidth;
    apply();
  });
  addEventListener("load", apply);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
})();

/* ============================================================
   ★ 응원봉 중앙제어 구독 — control.html 신호를 실시간 적용
   ============================================================ */
(async function lsLiveSubscribe(){
  if(!CONFIG.firebase) return;
  let appMod,fsMod;
  try{
    appMod=await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    fsMod =await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
  }catch(e){ return; }
  const app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(CONFIG.firebase);
  const db=fsMod.getFirestore(app);
  const {doc,onSnapshot}=fsMod;
  const sync=document.querySelector(".ls-sync");
  onSnapshot(doc(db,"live","state"), snap=>{
    const d=snap.data(); if(!d) return;
    if(d.pattern) lsPattern=d.pattern;
    if(d.color && LS_PRESET[d.color]) lsColor=LS_PRESET[d.color];
    if(sync) sync.textContent="운영자와 실시간 동기화 중 ✦";
  }, ()=>{});
})();

/* ★ 히든 발견자 방명록 — 남기면 은하수에 특별한 별(source:hidden 자동) */
{const hgAdd=document.getElementById("hgAdd");
 if(hgAdd){
   const hgMsg=document.getElementById("hgMsg"), hgName=document.getElementById("hgName"), hgDone=document.getElementById("hgDone");
   async function hgSubmit(){
     const msg=(hgMsg.value||"").trim(), name=(hgName.value||"").trim();
     if(!msg){hgMsg.focus();return;}
     hgAdd.disabled=true; const old=hgAdd.textContent; hgAdd.textContent="띄우는 중…";
     try{ await WishStore.add({name,msg}); hgMsg.value="";hgName.value="";hgDone.textContent="GUESTBOOK 페이지에서 확인할 수 있습니다 ✦"; }
     catch(err){ hgDone.textContent="잠시 후 다시 시도해 주세요."; }
     hgAdd.textContent=old; hgAdd.disabled=false;
   }
   hgAdd.addEventListener("click",hgSubmit);
   hgMsg.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();hgSubmit();}});
 }}

/* 맨 위로 버튼 (전 페이지 공통) */
(function(){
  const btn=document.createElement("button");
  btn.id="toTop"; btn.type="button"; btn.setAttribute("aria-label","맨 위로");
  btn.innerHTML="↑";
  document.body.appendChild(btn);
  const onScroll=()=>btn.classList.toggle("show", window.scrollY>400);
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
  btn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
})();