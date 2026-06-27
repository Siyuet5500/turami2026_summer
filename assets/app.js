const CONFIG = {
  // 공연 일시 (카운트다운 기준) — "YYYY-MM-DDTHH:MM:SS+09:00"
  concertDate : "2026-08-01T18:00:00+09:00",
  dateText    : "2026. 08. 01 (토) 오후 6시",
  venue       : "아트홀 베짱이 · 서울 마포구 독막로15길 3-12 B1",

  venueAddr   : "서울 마포구 상수동 313-3 지하1층",
  venueGeo    : { lat: 37.5484185, lng: 126.9215116 },
  naverMapKey : "w775fm1uhs",

  // 실제 링크로 교체 (예: "https://...") — 비워두면 '#'
  ticketLink  : "",   // 선예매 폼/페이지
  mapLink     : "https://map.naver.com/p/search/아트홀%20베짱이",   // 오시는 길 (네이버 지도)

  // 계좌 정보
  account : {
    bank    : "카카오뱅크",
    holder  : "권서진",
    display : "3333-36-1550617",   // 화면 표시용
    number  : "3333361550617"      // 복사용(숫자만)
  },

  // 히든 티저 (별자리를 완성하면 해금) — 유튜브/오디오 임베드 코드를 넣으면 영상이 뜹니다
  teaserEmbed : "",   // 예: '<iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>'
  timeline : [
    ["D-30", "티켓 선예매 오픈"],
    ["D-7",  "셋리스트 전체 공개"],
    ["D-1",  "리허설 비하인드 스토리"],
    ["D-DAY","2026 뚜라미 하계공연 · 북두칠성"],
  ],

  // 방명록 공유 백엔드 (선택). 비워두면 이 기기에만 저장(localStorage).
  // Firebase 웹 설정 객체를 그대로 넣으면 전체 관객이 공유하는 은하수가 됩니다.
  firebase : null,
  // 처음 보일 예시 응원(시드)
  seedWishes : [
    {name:"뚜라미", msg:"올여름, 가장 빛나는 밤을 함께해요 ✦"},
    {name:"45기 OB", msg:"무대 위 일곱 별을 응원합니다"},
    {name:"익명의 관객", msg:"첫 곡부터 마지막 곡까지 기대돼요!"},
  ]
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

// 셋리스트
{const box=document.getElementById("setlistBox"); if(box) box.innerHTML = SETLIST.map((t,i)=>`
  <div class="track">
    <div class="track-head">
      <div class="star"><b>${t.star}</b>${t.kr} · No.${String(i+1).padStart(2,"0")}</div>
      <div><div class="ttl">${t.title}</div><div class="tartist">${t.team}</div></div>
      <span class="tplus">+</span>
    </div>
    <div class="track-body"><div class="inner">
      <div class="crew">${t.crew}</div>
      <div class="lyric">${t.lyric}</div>
    </div></div>
  </div>`).join("");}

// 멤버
{const grid=document.getElementById("memberGrid"); if(grid) grid.innerHTML = MEMBERS.map(([no,name,quote])=>`
  <div class="member"><span class="pos">No. ${no}</span><div class="nm">${name}</div><div class="quote">${quote}</div></div>`).join("");}

/* ============================================================
   INTERACTION
   ============================================================ */
// countdown — Days / Hrs / Min / Sec
const CONCERT = new Date(CONFIG.concertDate);
const pad=n=>String(n).padStart(2,"0");
function tick(){
  const diff=CONCERT-new Date();
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  if(diff<=0){
    const cd=document.getElementById("countdown");
    if(cd)cd.innerHTML="<div class='cd-unit'><span class='cd-num'>지금, 무대에서</span></div>";
    return;
  }
  set("cd-d",pad(Math.floor(diff/864e5)));
  set("cd-h",pad(Math.floor(diff%864e5/36e5)));
  set("cd-m",pad(Math.floor(diff%36e5/6e4)));
  set("cd-s",pad(Math.floor(diff%6e4/1e3)));
}
tick();setInterval(tick,1000);

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

// setlist accordion
{const box=document.getElementById("setlistBox"); if(box) box.addEventListener("click",e=>{
  const t=e.target.closest(".track"); if(!t)return;
  const body=t.querySelector(".track-body"), open=t.classList.toggle("open");
  body.style.maxHeight=open?body.querySelector(".inner").scrollHeight+"px":"0";
});}

// copy account
{const acct=document.getElementById("acct"),copyLab=document.getElementById("copyLab");
if(acct) acct.addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText(CONFIG.account.number);copyLab.textContent="복사됨 ✓";setTimeout(()=>copyLab.textContent="복사",1600);}
  catch(e){copyLab.textContent="복사 실패"}
});}

// reveal
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

/* ============================================================
   ★ KEEPSAKE TICKET  — 이름 → 당신의 별 배정 + 티켓 이미지 발급
   ============================================================ */
const DIPPER_STARS = [
  {en:"DUBHE",  kr:"두베"},   {en:"MERAK",  kr:"메라크"},
  {en:"PHECDA", kr:"페크다"}, {en:"MEGREZ", kr:"메그레즈"},
  {en:"ALIOTH", kr:"알리오트"},{en:"MIZAR", kr:"미자르"},
  {en:"ALKAID", kr:"알카이드"}
];
// 북두칠성 좌표 (티켓 캔버스 좌표계 비율 0~1)
const DIPPER_PTS = [[.12,.20],[.30,.27],[.47,.34],[.62,.40],[.65,.62],[.90,.64],[.92,.41]];

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
  const serial="URSA-2026-"+String(h%10000).padStart(4,"0");

  // 폰트 로드 보장
  try{ await Promise.all([
    document.fonts.load('700 64px "Gowun Batang"'),
    document.fonts.load('400 30px "Gowun Batang"'),
    document.fonts.load('700 22px "Space Mono"'),
    document.fonts.load('400 18px "Space Mono"'),
  ]); await document.fonts.ready; }catch(e){}

  const W=tCanvas.width, H=tCanvas.height, ctx=tctx;
  ctx.clearRect(0,0,W,H);

  // 배경
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,"#0d1530"); bg.addColorStop(.55,"#0a1024"); bg.addColorStop(1,"#06090f");
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

  // 별가루 (seed 고정)
  let seed=h;
  const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
  for(let i=0;i<150;i++){
    const x=rnd()*W,y=rnd()*H*.55,r=rnd()*1.4+.3,a=rnd()*.5+.15;
    ctx.beginPath();ctx.arc(x,y,r,0,7);
    ctx.fillStyle=rnd()<.12?`rgba(244,214,138,${a})`:`rgba(233,237,249,${a})`;ctx.fill();
  }

  // 외곽 골드 테두리
  ctx.strokeStyle="rgba(217,169,78,.55)";ctx.lineWidth=2;
  roundRect(ctx,18,18,W-36,H-36,18);ctx.stroke();

  // 상단 라벨
  ctx.textAlign="center";
  ctx.fillStyle="#caa97a";ctx.font='700 17px "Space Mono"';
  ctx.fillText("H O N G I K   U N I V E R S I T Y", W/2, 70);
  ctx.fillStyle="#8a93b8";ctx.font='400 15px "Space Mono"';
  ctx.fillText("창작곡 밴드 동아리 뚜라미", W/2, 96);
  ctx.fillStyle="#5d678f";ctx.font='400 14px "Space Mono"';
  ctx.fillText("2026  SUMMER  CONCERT", W/2, 150);

  // 타이틀
  const tg=ctx.createLinearGradient(0,170,0,250);
  tg.addColorStop(0,"#ffffff");tg.addColorStop(.55,"#f4d68a");tg.addColorStop(1,"#d9a94e");
  ctx.fillStyle=tg;ctx.font='700 70px "Gowun Batang"';
  ctx.fillText("북두칠성", W/2, 230);
  ctx.fillStyle="#caa97a";ctx.font='italic 400 22px "Fraunces", serif';
  ctx.fillText("Ursa Major", W/2, 268);

  // 북두칠성 별자리 (당신의 별 강조)
  const cx0=70,cy0=300,cw=W-140,ch=170;
  ctx.strokeStyle="rgba(217,169,78,.4)";ctx.lineWidth=1.4;
  ctx.beginPath();
  DIPPER_PTS.forEach((p,i)=>{const x=cx0+p[0]*cw,y=cy0+p[1]*ch;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});
  // 손잡이-그릇 닫기 (마지막 → 4번째)
  ctx.lineTo(cx0+DIPPER_PTS[3][0]*cw, cy0+DIPPER_PTS[3][1]*ch);
  ctx.stroke();
  DIPPER_PTS.forEach((p,i)=>{
    const x=cx0+p[0]*cw,y=cy0+p[1]*ch, me=(i===starIdx);
    if(me){const g=ctx.createRadialGradient(x,y,0,x,y,22);g.addColorStop(0,"rgba(244,214,138,.9)");g.addColorStop(1,"rgba(244,214,138,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,22,0,7);ctx.fill();}
    ctx.beginPath();ctx.arc(x,y,me?5:3,0,7);ctx.fillStyle=me?"#ffffff":"#f4d68a";ctx.fill();
  });

  // 구분선
  ctx.strokeStyle="rgba(38,48,90,.9)";ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(60,540);ctx.lineTo(W-60,540);ctx.stroke();

  // 이름
  ctx.fillStyle="#8a93b8";ctx.font='700 14px "Space Mono"';
  ctx.fillText("A D M I T   O N E", W/2, 580);
  ctx.fillStyle="#e9edf9";ctx.font='700 52px "Gowun Batang"';
  ctx.fillText(name, W/2, 642);

  // 당신의 별
  ctx.fillStyle="#caa97a";ctx.font='700 15px "Space Mono"';
  ctx.fillText("✦  YOUR STAR", W/2, 706);
  ctx.fillStyle="#f4d68a";ctx.font='700 30px "Gowun Batang"';
  ctx.fillText(star.kr+"  ·  "+star.en, W/2, 744);

  // 일시 / 장소
  ctx.fillStyle="#8a93b8";ctx.font='400 19px "Gowun Batang"';
  ctx.fillText(CONFIG.dateText, W/2, 810);
  ctx.font='400 16px "Gowun Batang"';
  ctx.fillText(stripVenue(CONFIG.venue), W/2, 838);

  // 천공 점선
  ctx.strokeStyle="rgba(138,147,184,.4)";ctx.setLineDash([6,8]);ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(40,892);ctx.lineTo(W-40,892);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle="#06090f";
  ctx.beginPath();ctx.arc(18,892,14,0,7);ctx.fill();
  ctx.beginPath();ctx.arc(W-18,892,14,0,7);ctx.fill();

  // 스텁: 일련번호
  ctx.fillStyle="#5d678f";ctx.font='400 15px "Space Mono"';
  ctx.fillText(serial, W/2, 952);
  ctx.fillStyle="#8a93b8";ctx.font='400 16px "Gowun Batang"';
  ctx.fillText("우리가 만든 노래로, 우리만의 밤을 켭니다.", W/2, 1000);

  lastTicketURL=tCanvas.toDataURL("image/png");
  mkImg.src=lastTicketURL;
  mkPlaceholder.style.display="none";
  requestAnimationFrame(()=>mkWrap.classList.add("show"));
  mkSave.classList.add("show");
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function stripVenue(v){const n=(v.split("·")[0]||v).trim();return n.length>26?n.slice(0,25)+"…":n;}

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
];
let lsColor=LS_COLORS[0].rgb, lsRAF=null, lsWake=null;
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
  // 모든 기기가 공유하는 벽시계 → 동기 맥동 (period 2.0s) + 미세 반짝임 0.45s
  const slow=(Math.sin(t/1000*Math.PI)+1)/2;        // 0~1, 2초 주기
  const fast=(Math.sin(t/450*Math.PI)+1)/2;
  const bright=0.55+slow*0.4+fast*0.05;
  const [r,g,b]=lsColor;
  const W=lsGlow.width,H=lsGlow.height,cx=W/2,cy=H/2;
  lgx.clearRect(0,0,W,H);
  const R=W*0.46*(0.92+slow*0.08);
  const grad=lgx.createRadialGradient(cx,cy,0,cx,cy,R);
  grad.addColorStop(0,`rgba(${r},${g},${b},${bright})`);
  grad.addColorStop(0.45,`rgba(${r},${g},${b},${bright*0.55})`);
  grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
  lgx.fillStyle=grad;lgx.beginPath();lgx.arc(cx,cy,R,0,7);lgx.fill();
  // 중심 코어
  lgx.fillStyle=`rgba(255,255,255,${0.5+slow*0.4})`;
  lgx.beginPath();lgx.arc(cx,cy,W*0.05,0,7);lgx.fill();
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
    const tw=0.55+Math.sin(t* (w.tw*30) +w.ph)*0.35;
    const hov=(i===gbHover);
    if(hov){const g=gbx.createRadialGradient(w.x,w.y,0,w.x,w.y,w.r*7);
      g.addColorStop(0,"rgba(244,214,138,.7)");g.addColorStop(1,"rgba(244,214,138,0)");
      gbx.fillStyle=g;gbx.beginPath();gbx.arc(w.x,w.y,w.r*7,0,7);gbx.fill();}
    gbx.beginPath();gbx.arc(w.x,w.y,hov?w.r*1.6:w.r,0,7);
    gbx.fillStyle=hov?"#fff":`rgba(244,232,200,${tw})`;gbx.fill();
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
  gbTip.innerHTML=`<div class="t-msg">${escapeHtml(w.msg)}</div><div class="t-name">— ${escapeHtml(w.name||"익명")}</div>`;
  let x=cx-wrap.left+14, y=cy-wrap.top+14;
  x=Math.min(x,wrap.width-250);
  gbTip.style.left=x+"px";gbTip.style.top=y+"px";
  gbTip.classList.add("show");
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
   ★ HIDDEN — 별자리 잇기 → 티저 해금
   ============================================================ */
if(document.getElementById("connectCanvas")){
const conC=document.getElementById("connectCanvas"), cox=conC.getContext("2d");
const conStatus=document.getElementById("connectStatus");
// 북두칠성 순서 (비율좌표)
const CON_PTS=[[.10,.30],[.27,.40],[.44,.50],[.60,.58],[.63,.82],[.88,.84],[.90,.58]];
let conNodes=[], conNext=1, conDone=false, conDrag=false, conPointer=null;

function conResize(){
  const r=conC.getBoundingClientRect();
  conC.width=r.width*devicePixelRatio;conC.height=r.height*devicePixelRatio;
  conNodes=CON_PTS.map(p=>({x:p[0]*conC.width,y:p[1]*conC.height}));
}
function conDraw(){
  const W=conC.width,H=conC.height,t=Date.now()/1000;
  cox.clearRect(0,0,W,H);
  // 가이드 선 (흐릿)
  cox.strokeStyle="rgba(138,147,184,.18)";cox.lineWidth=1.2*devicePixelRatio;cox.setLineDash([5*devicePixelRatio,7*devicePixelRatio]);
  cox.beginPath();conNodes.forEach((n,i)=>i?cox.lineTo(n.x,n.y):cox.moveTo(n.x,n.y));cox.stroke();cox.setLineDash([]);
  // 완성된 선 (밝게)
  if(conNext>1){
    cox.strokeStyle=conDone?"rgba(244,214,138,.95)":"rgba(244,214,138,.7)";
    cox.lineWidth=(conDone?2.4:1.8)*devicePixelRatio;cox.lineCap="round";
    if(conDone)cox.shadowColor="rgba(244,214,138,.8)",cox.shadowBlur=14*devicePixelRatio;
    cox.beginPath();for(let i=0;i<conNext;i++){const n=conNodes[i];i?cox.lineTo(n.x,n.y):cox.moveTo(n.x,n.y);}
    // 드래그 중 현재 포인터까지 선
    if(conDrag&&conPointer&&!conDone){cox.lineTo(conPointer.x,conPointer.y);}
    cox.stroke();cox.shadowBlur=0;
  }
  // 노드
  conNodes.forEach((n,i)=>{
    const linked=i<conNext, isNext=(i===conNext&&!conDone)||(i===0&&conNext===1);
    const pulse=0.6+Math.sin(t*3)*0.4;
    if(isNext){const g=cox.createRadialGradient(n.x,n.y,0,n.x,n.y,20*devicePixelRatio);
      g.addColorStop(0,`rgba(244,214,138,${0.5*pulse})`);g.addColorStop(1,"rgba(244,214,138,0)");
      cox.fillStyle=g;cox.beginPath();cox.arc(n.x,n.y,20*devicePixelRatio,0,7);cox.fill();}
    cox.beginPath();cox.arc(n.x,n.y,(linked?5.5:isNext?5:3.4)*devicePixelRatio,0,7);
    cox.fillStyle=linked?"#fff":isNext?"#f4d68a":"rgba(138,147,184,.6)";cox.fill();
    // START 라벨
    if(i===0&&conNext===1){cox.fillStyle="#f4d68a";cox.font=`${10*devicePixelRatio}px "Space Mono",monospace`;cox.textAlign="center";cox.fillText("START",n.x,n.y-14*devicePixelRatio);}
  });
  requestAnimationFrame(conDraw);
}
function conPos(e){const r=conC.getBoundingClientRect();const cx=(e.touches?e.touches[0].clientX:e.clientX);const cy=(e.touches?e.touches[0].clientY:e.clientY);return {x:(cx-r.left)*devicePixelRatio,y:(cy-r.top)*devicePixelRatio};}
function conHit(pos,idx){const n=conNodes[idx];return Math.hypot(n.x-pos.x,n.y-pos.y)<28*devicePixelRatio;}
function tryConnect(pos){        // conNext = 다음 필요한 별 (0번은 시작 앵커)
  if(conDone)return;
  if(conHit(pos,conNext)){
    conNext++;
    if(conNext>=conNodes.length){conComplete();}
    else conStatus.innerHTML=`${conNext-1} / ${conNodes.length-1} 연결됨 — 다음 별로 이어보세요`;
  }
}
function conStart(e){ e.preventDefault(); conDrag=true; const p=conPos(e); conPointer=p; tryConnect(p); }
function conMove(e){ if(!conDrag||conDone)return; conPointer=conPos(e); tryConnect(conPointer); }
function conEnd(){conDrag=false;conPointer=null;}
function conComplete(){
  conDone=true;conDrag=false;
  conStatus.innerHTML="✦ 북두칠성 완성! 티저를 해금합니다…";
  setTimeout(openUnlock,650);
}
conC.addEventListener("mousedown",conStart); conC.addEventListener("mousemove",conMove); addEventListener("mouseup",conEnd);
conC.addEventListener("touchstart",conStart,{passive:false}); conC.addEventListener("touchmove",conMove,{passive:false}); addEventListener("touchend",conEnd);
document.getElementById("connectReset").addEventListener("click",()=>{conNext=1;conDone=false;conStatus.innerHTML="반짝이는 <b>START</b> 별을 누른 뒤, 순서대로 다음 별로 이어보세요";});
conResize(); addEventListener("resize",conResize); conDraw();

// 해금 모달
const unlockModal=document.getElementById("unlockModal");
let unlockedOnce=false;
function openUnlock(){
  if(!unlockedOnce){
    const tEl=document.getElementById("umTeaser");
    tEl.innerHTML = CONFIG.teaserEmbed ? CONFIG.teaserEmbed
      : `<div class="um-placeholder">여기에 히든 티저 영상이 들어갑니다.<br/>CONFIG의 <b>teaserEmbed</b>에 유튜브 임베드 코드를 넣어주세요.</div>`;
    document.getElementById("umTimeline").innerHTML=(CONFIG.timeline||[]).map(([t,d])=>
      `<div class="um-tl-row"><span class="tl-t">${t}</span><span class="tl-d">${d}</span></div>`).join("");
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
   AMBIENT STARFIELD  +  rare shooting star
   ============================================================ */
const prefersReduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
const cv=document.getElementById("sky"),ctx=cv.getContext("2d");
let W,H,stars=[],shoot=[];
function resize(){W=cv.width=innerWidth*devicePixelRatio;H=cv.height=innerHeight*devicePixelRatio;cv.style.width=innerWidth+"px";cv.style.height=innerHeight+"px";build();}
function build(){
  const n=Math.min(130,Math.floor(W*H/26000));
  stars=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.05*devicePixelRatio+.25,base:Math.random()*.38+.16,tw:Math.random()*.016+.003,ph:Math.random()*6.28,gold:Math.random()<.08}));
}
function spawn(){shoot.push({x:Math.random()*W*.8,y:Math.random()*H*.35,len:(Math.random()*160+110)*devicePixelRatio,sp:(Math.random()*5+6)*devicePixelRatio,ang:Math.PI*.78,life:1});}

// 시차(parallax) 깊이감 — 마우스를 따라 밤하늘이 미세하게 흐름
const heroConst=document.querySelector(".hero-constellation");
const heroNav=document.querySelector(".hero-navstars");
let tgX=0,tgY=0,pxX=0,pxY=0;
if(!prefersReduced){
  addEventListener("pointermove",e=>{
    if(e.pointerType==="touch")return;
    tgX=e.clientX/innerWidth-0.5; tgY=e.clientY/innerHeight-0.5;
  },{passive:true});
  addEventListener("pointerleave",()=>{tgX=0;tgY=0;},{passive:true});
}
let last=0;
function frame(t){
  pxX+=(tgX-pxX)*0.06; pxY+=(tgY-pxY)*0.06;
  const tf=`translate(${(-pxX*16).toFixed(2)}px,${(-pxY*12).toFixed(2)}px)`;
  if(heroConst)heroConst.style.transform=tf;
  if(heroNav)heroNav.style.transform=tf;
  ctx.clearRect(0,0,W,H);
  ctx.save();
  ctx.translate(pxX*6*devicePixelRatio, pxY*5*devicePixelRatio);
  for(const s of stars){s.ph+=s.tw;const a=(s.base+Math.sin(s.ph)*.25)*.8;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fillStyle=s.gold?`rgba(217,193,138,${a})`:`rgba(236,233,225,${a})`;ctx.fill();}
  for(let i=shoot.length-1;i>=0;i--){const m=shoot[i];const dx=Math.cos(m.ang)*m.len,dy=Math.sin(m.ang)*m.len;const g=ctx.createLinearGradient(m.x,m.y,m.x-dx,m.y-dy);g.addColorStop(0,`rgba(217,193,138,${.7*m.life})`);g.addColorStop(1,"rgba(217,193,138,0)");ctx.strokeStyle=g;ctx.lineWidth=1.3*devicePixelRatio;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(m.x-dx,m.y-dy);ctx.stroke();ctx.beginPath();ctx.arc(m.x,m.y,1.4*devicePixelRatio,0,7);ctx.fillStyle=`rgba(245,240,225,${m.life})`;ctx.fill();m.x+=Math.cos(m.ang)*m.sp;m.y+=Math.sin(m.ang)*m.sp;m.life-=.012;if(m.life<=0||m.y>H+50)shoot.splice(i,1);}
  ctx.restore();
  if(t-last>9000&&shoot.length<1&&Math.random()<.3){spawn();last=t;}
  requestAnimationFrame(frame);
}
function staticDraw(){ctx.clearRect(0,0,W,H);for(const s of stars){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fillStyle=s.gold?"rgba(244,214,138,.6)":"rgba(233,237,249,.55)";ctx.fill();}}
resize();addEventListener("resize",resize);
prefersReduced?staticDraw():requestAnimationFrame(frame);

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
      content: '<div class="tm-info"><div class="v">아트홀 베짱이</div><div class="t">2026 뚜라미 하계공연</div><div class="a">6호선 상수역 1번 출구 · 도보 5분</div></div>',
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
  apply();
  addEventListener("resize", apply);
  addEventListener("load", apply);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
})();