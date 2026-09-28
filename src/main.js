import './style.css';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const SHIFT_SECONDS = 10 * 60;
const QUERY = new URLSearchParams(location.search);

const STEP_DEFS = [
  { id: 'size', label: 'Cỡ ly', icon: '◯', station: 'Kệ ly', options: [
    { id: 'Vừa', label: 'Ly vừa', artX:0, artY:0 }, { id: 'Lớn', label: 'Ly lớn', artX:1, artY:0 },
  ]},
  { id: 'tea', label: 'Trà', icon: '♨', station: 'Ấm trà', options: [
    { id: 'Hồng trà', label: 'Hồng trà', artX:2, artY:0, color: '#9f5d3e' }, { id: 'Trà nhài', label: 'Trà nhài', artX:3, artY:0, color: '#d4bd72' },
    { id: 'Trà khoai môn', label: 'Khoai môn', artX:4, artY:0, color: '#9c79a7' }, { id: 'Trà matcha', label: 'Matcha', artX:5, artY:0, color: '#77966a' },
    { id: 'Trà ô long', label: 'Ô long', artX:2, artY:0, color: '#9a744f' },
  ]},
  { id: 'milk', label: 'Sữa', icon: '◇', station: 'Bình sữa', options: [
    { id: 'Sữa tươi', label: 'Sữa tươi', artX:0, artY:1 }, { id: 'Sữa yến mạch', label: 'Sữa yến mạch', artX:1, artY:1 },
    { id: 'Sữa dừa', label: 'Sữa dừa', artX:2, artY:1 }, { id: 'Không sữa', label: 'Không sữa', artX:3, artY:1 },
  ]},
  { id: 'syrup', label: 'Độ ngọt', icon: '⌁', station: 'Kệ đường', unlockDay: 6, options: [
    { id: 'Đường đen', label: 'Đường đen', artX:4, artY:1 }, { id: 'Mật ong', label: 'Mật ong', artX:5, artY:1 },
    { id: 'Vani', label: 'Vani', artX:0, artY:2 }, { id: 'Không đường', label: 'Không đường', artX:1, artY:2 },
  ]},
  { id: 'topping', label: 'Topping', icon: '●', station: 'Khay topping', options: [
    { id: 'Trân châu đen', label: 'T.châu đen', artX:2, artY:2, color: '#382a27' }, { id: 'Trân châu trắng', label: 'T.châu trắng', artX:3, artY:2, color: '#d8eee6' },
    { id: 'Sương sáo', label: 'Sương sáo', artX:4, artY:2, color: '#37463d' }, { id: 'Trân châu nổ', label: 'T.châu nổ', artX:5, artY:2, color: '#ed806b' },
  ]},
  { id: 'ice', label: 'Đá', icon: '❖', station: 'Thùng đá', unlockDay: 6, options: [
    { id: 'Không đá', label: 'Không đá', artX:0, artY:3 }, { id: 'Ít đá', label: 'Ít đá', artX:1, artY:3 },
    { id: 'Đá thường', label: 'Đá thường', artX:2, artY:3 },
  ]},
  { id: 'finish', label: 'Hoàn tất', icon: '✓', station: 'Máy dán nắp', options: [
    { id: 'Lắc & dán nắp', label: 'Lắc & dán nắp', artX:3, artY:3, color: '#708b52' },
  ]},
];

const drinkTemplates = [
  { name: 'Trà sữa đường đen', englishName:'brown sugar milk tea', productKey:'milkTea', flavorKey:'brownSugar', toppingKey:'blackPearls', tea: 'Hồng trà', milk: 'Sữa tươi', syrup: 'Đường đen', topping: 'Trân châu đen', ice: 'Ít đá', color: '#b87756' },
  { name: 'Trà nhài mật ong', englishName:'honey jasmine tea', productKey:'greenTea', flavorKey:'honey', toppingKey:'whitePearls', tea: 'Trà nhài', milk: 'Sữa yến mạch', syrup: 'Mật ong', topping: 'Trân châu trắng', ice: 'Đá thường', color: '#cbb77a' },
  { name: 'Trà sữa khoai môn', englishName:'taro milk tea', productKey:'thaiTea', flavorKey:'vanilla', toppingKey:'poppingBoba', tea: 'Trà khoai môn', milk: 'Sữa tươi', syrup: 'Vani', topping: 'Trân châu nổ', ice: 'Ít đá', color: '#9671a5' },
  { name: 'Matcha vườn xanh', englishName:'garden matcha latte', productKey:'matcha', flavorKey:'honey', toppingKey:'grassJelly', tea: 'Trà matcha', milk: 'Sữa yến mạch', syrup: 'Mật ong', topping: 'Sương sáo', ice: 'Đá thường', color: '#708c64' },
  { name: 'Trà nhài sữa dừa', englishName:'coconut jasmine tea', productKey:'greenTea', flavorKey:'noSugar', toppingKey:'whitePearls', tea: 'Trà nhài', milk: 'Sữa dừa', syrup: 'Không đường', topping: 'Trân châu trắng', ice: 'Không đá', color: '#decf9e' },
  { name: 'Hồng trà vani', englishName:'vanilla black tea', productKey:'blackTea', flavorKey:'vanilla', toppingKey:'poppingBoba', tea: 'Hồng trà', milk: 'Không sữa', syrup: 'Vani', topping: 'Trân châu nổ', ice: 'Đá thường', color: '#995f4b' },
  { name: 'Ô long mật ong', englishName:'honey oolong milk tea', productKey:'oolong', flavorKey:'honey', toppingKey:'whitePearls', tea:'Trà ô long', milk:'Sữa yến mạch', syrup:'Mật ong', topping:'Trân châu trắng', ice:'Ít đá', color:'#aa825f' },
];

const people = [
  { name: 'Minh', spriteIndex:1, self:'anh', call:'Em ơi', color:'#e9806c' },
  { name: 'Chị Lan', spriteIndex:2, self:'chị', call:'Em ơi', color:'#678a72' },
  { name: 'Bác Tư', spriteIndex:3, self:'bác', call:'Cháu ơi', color:'#8d76a0' },
  { name: 'Anh Hùng', spriteIndex:4, self:'anh', call:'Em ơi', color:'#d19a52' },
  { name: 'Chị Vy', spriteIndex:5, self:'chị', call:'Em ơi', color:'#b66c82' },
  { name: 'Thảo', spriteIndex:6, self:'em', call:'Anh chị ơi', color:'#63869d' },
  { name: 'Bin', spriteIndex:7, self:'em', call:'Anh chị ơi', color:'#71895e' },
];

// Each customer asks one English question: correct keeps the drink's profit, wrong sells it at cost.
const ENGLISH_QUIZZES = [
  {q:'Từ “wander” nghĩa là gì?',a:'đi lang thang',wrong:['thì thầm','tập trung','cất giữ']},
  {q:'Từ “generous” nghĩa là gì?',a:'hào phóng',wrong:['vội vàng','bí ẩn','keo kiệt']},
  {q:'Từ “curious” nghĩa là gì?',a:'tò mò',wrong:['buồn ngủ','cẩn thận','giận dữ']},
  {q:'Từ “peaceful” nghĩa là gì?',a:'yên bình',wrong:['đông đúc','nguy hiểm','ồn ào']},
  {q:'Từ “borrow” nghĩa là gì?',a:'mượn',wrong:['cho mượn','đánh rơi','trả lại']},
  {q:'Từ “improve” nghĩa là gì?',a:'cải thiện',wrong:['trì hoãn','từ chối','phá hỏng']},
  {q:'Từ “journey” nghĩa là gì?',a:'hành trình',wrong:['bữa tiệc','lời hứa','kỳ nghỉ']},
  {q:'Từ “ancient” nghĩa là gì?',a:'cổ xưa',wrong:['hiện đại','đắt tiền','mới toanh']},
  {q:'Từ “brave” nghĩa là gì?',a:'dũng cảm',wrong:['nhút nhát','ích kỷ','lười biếng']},
  {q:'Từ “discover” nghĩa là gì?',a:'khám phá',wrong:['che giấu','sửa chữa','quên mất']},
  {q:'Từ “gentle” nghĩa là gì?',a:'dịu dàng',wrong:['ồn ào','khổng lồ','thô lỗ']},
  {q:'Từ “grateful” nghĩa là gì?',a:'biết ơn',wrong:['thất vọng','bối rối','ghen tị']},
  {q:'Từ “thirsty” nghĩa là gì?',a:'khát nước',wrong:['đói bụng','mệt mỏi','no nê']},
  {q:'Từ “delicious” nghĩa là gì?',a:'ngon',wrong:['đắng','nhạt nhẽo','hư hỏng']},
  {q:'Từ “receipt” nghĩa là gì?',a:'hóa đơn',wrong:['công thức','thực đơn','tiền thối']},
  {q:'Từ “straw” (trong quán nước) nghĩa là gì?',a:'ống hút',wrong:['cái muỗng','nắp ly','khăn giấy']},
  {q:'Từ “neighbor” nghĩa là gì?',a:'hàng xóm',wrong:['đồng nghiệp','họ hàng','người lạ']},
  {q:'Từ “umbrella” nghĩa là gì?',a:'cái ô (dù)',wrong:['áo mưa','cái nón','đôi ủng']},
  {q:'Từ “schedule” nghĩa là gì?',a:'lịch trình',wrong:['bài tập','hóa đơn','cuộc họp']},
  {q:'Từ “honest” nghĩa là gì?',a:'trung thực',wrong:['nổi tiếng','giàu có','khó tính']},
  {q:'“Quả dưa hấu” tiếng Anh là gì?',a:'watermelon',wrong:['pineapple','papaya','grapefruit']},
  {q:'“Cái gối” tiếng Anh là gì?',a:'pillow',wrong:['blanket','mattress','curtain']},
  {q:'“Nhà bếp” tiếng Anh là gì?',a:'kitchen',wrong:['bedroom','garage','balcony']},
  {q:'“Hiệu thuốc” tiếng Anh là gì?',a:'pharmacy',wrong:['bakery','library','butcher']},
  {q:'“Buổi sáng” tiếng Anh là gì?',a:'morning',wrong:['evening','midnight','afternoon']},
  {q:'“Con bướm” tiếng Anh là gì?',a:'butterfly',wrong:['dragonfly','ladybug','grasshopper']},
  {q:'“Đôi đũa” tiếng Anh là gì?',a:'chopsticks',wrong:['spoons','forks','toothpicks']},
  {q:'“Ngọt” tiếng Anh là gì?',a:'sweet',wrong:['sour','salty','bitter']},
  {q:'Chọn từ đúng: “She ___ to school every day.”',a:'goes',wrong:['go','going','gone']},
  {q:'Chọn từ đúng: “I have lived here ___ 2020.”',a:'since',wrong:['for','from','at']},
  {q:'Chọn từ đúng: “There ___ two cats in the garden.”',a:'are',wrong:['is','be','am']},
  {q:'Chọn từ đúng: “He is good ___ drawing.”',a:'at',wrong:['in','on','with']},
  {q:'Chọn từ đúng: “We went to the beach ___ Sunday.”',a:'on',wrong:['in','at','by']},
  {q:'Chọn từ đúng: “This bag is ___ than that one.”',a:'heavier',wrong:['heavy','heaviest','more heavy']},
  {q:'Chọn từ đúng: “Yesterday I ___ a new book.”',a:'bought',wrong:['buy','buyed','buying']},
  {q:'Chọn từ đúng: “Can you ___ me a favor?”',a:'do',wrong:['make','take','give']},
  {q:'Chọn câu đúng khi muốn mời ai đó ngồi:',a:'Please have a seat.',wrong:['Please take a sit.','Please sit you.','Please have a sit down.']},
  {q:'“How are you?” thường được đáp là:',a:"I'm fine, thanks.",wrong:["I'm 20 years old.","I'm from Hanoi.","I'm a student."]},
  {q:'Trái nghĩa của “cheap” là:',a:'expensive',wrong:['cheerful','empty','easy']},
  {q:'Trái nghĩa của “early” là:',a:'late',wrong:['soon','fast','later']},
];

const STOCK_ITEMS = [
  { id:'teaStock', category:'tea', name:'Lá trà', icon:'🍃', iconX:0,iconY:0, pack:8, cost:18, shelfLife:3, note:'Hồng trà, trà nhài, khoai môn và matcha' },
  { id:'milkStock', category:'tea', name:'Các loại sữa', icon:'🥛', iconX:3,iconY:1, pack:8, cost:22, shelfLife:2, note:'Sữa tươi, yến mạch và sữa dừa' },
  { id:'syrupStock', category:'tea', name:'Đường & siro', icon:'🍯', iconX:1,iconY:2, pack:10, cost:14, shelfLife:5, note:'Đường đen, mật ong và vani' },
  { id:'toppingStock', category:'topping', name:'Trân châu & thạch', icon:'●', iconX:2,iconY:0, pack:8, cost:20, shelfLife:1, note:'Bốn loại topping' },
  { id:'iceStock', category:'tea', name:'Đá viên', icon:'❖', iconX:0,iconY:2, pack:12, cost:6, shelfLife:1, note:'Nhập mới mỗi buổi sáng' },
  { id:'cupStock', category:'cup', name:'Ly & nắp', icon:'🥤', iconX:0,iconY:1, pack:10, cost:12, shelfLife:99, note:'Ly vừa và ly lớn' },
];

const PRODUCT_CATALOG={
  tea:[
    {id:'milkTea',name:'Trà sữa (M)',cost:6,price:25,unlockCost:0,artX:2,artY:0},
    {id:'matcha',name:'Matcha (M)',cost:7.5,price:30,unlockCost:0,artX:5,artY:0},
    {id:'blackTea',name:'Hồng trà',cost:5,price:24,unlockCost:150,artX:2,artY:0},
    {id:'greenTea',name:'Lục trà / Trà nhài',cost:5.5,price:26,unlockCost:150,artX:3,artY:0},
    {id:'oolong',name:'Trà ô long',cost:8,price:32,unlockCost:250,artX:2,artY:0},
    {id:'thaiTea',name:'Trà sữa Thái / Khoai môn',cost:9,price:35,unlockCost:300,artX:4,artY:0},
  ],
  flavor:[
    {id:'brownSugar',name:'Đường đen',cost:1.5,price:4,unlockCost:0,artX:4,artY:1},
    {id:'honey',name:'Mật ong',cost:1.5,price:4,unlockCost:0,artX:5,artY:1},
    {id:'vanilla',name:'Vani',cost:1,price:3,unlockCost:0,artX:0,artY:2},
    {id:'noSugar',name:'Không đường',cost:0,price:0,unlockCost:0,artX:1,artY:2},
    {id:'strawberry',name:'Dâu tây',cost:2,price:5,unlockCost:120,artX:0,artY:2},
    {id:'mango',name:'Xoài',cost:2,price:5,unlockCost:120,artX:5,artY:1},
  ],
  topping:[
    {id:'blackPearls',name:'Trân châu đen',cost:2,price:6,unlockCost:0,artX:2,artY:2},
    {id:'whitePearls',name:'Trân châu trắng',cost:2,price:5,unlockCost:0,artX:3,artY:2},
    {id:'grassJelly',name:'Sương sáo',cost:2,price:5,unlockCost:0,artX:4,artY:2},
    {id:'poppingBoba',name:'Trân châu nổ',cost:3,price:7,unlockCost:0,artX:5,artY:2},
    {id:'pudding',name:'Pudding trứng',cost:3,price:7,unlockCost:160,artX:5,artY:2},
    {id:'redBean',name:'Đậu đỏ',cost:2.5,price:6,unlockCost:160,artX:2,artY:2},
  ],
  size:[
    {id:'mediumSize',name:'Ly vừa (M)',cost:1,price:0,unlockCost:0,artX:0,artY:0},
    {id:'largeSize',name:'Phụ thu ly lớn (L)',cost:1.5,price:7,unlockCost:0,artX:1,artY:0},
  ],
};

const ALL_PRODUCTS=Object.values(PRODUCT_CATALOG).flat();
const defaultProductPrices=()=>Object.fromEntries(ALL_PRODUCTS.map(item=>[item.id,item.price]));
const defaultUnlockedProducts=()=>Object.fromEntries(ALL_PRODUCTS.map(item=>[item.id,item.unlockCost===0]));

const state = {
  started: false, running: false, sound: true, queue: [], orderIndex: 1, currentStep: 0,
  build: {}, money: 0, served: 0, perfect: 0, ratingPoints: [], patience: 100,
  seconds: SHIFT_SECONDS, combo: 0, serving: false, timerId: null, patienceId: null,
  day: 1, cash: 400, dailyCapital: 120, budgetSpent: 0, dailyCost: 0, rent: 25,
  plan: {}, inventory: {}, tutorialSeen: false, dialogueOpen:false, currentDialogue:null, tips:0, quizCorrect:0, quizTotal:0, lostProfit:0, quizBag:[],
  inventoryExpiry: {}, expiredToday: 0, activeManagementTab:'stock', milkTeaPrice:25, matchaPrice:30,
  speedUpgrade:0, cupUpgrade:0, history:[], lastReview:null, pourTimer:null, pourLevel:0,
  activeStockCategory:'tea',activeUpgradeCategory:'tea',activePriceCategory:'tea',productPrices:defaultProductPrices(),unlockedProducts:defaultUnlockedProducts(),serviceUpgrades:{fridge:0,staff:false,marketing:false},
  player: { x: 0, y: 0, targetX: 0, targetY: 0, moving: false },
  particles: [], stationPoints: [], stationRects: [], serveStart: 0,
};

const canvas = $('#game-canvas');
const ctx = canvas.getContext('2d');
const gameArt={counter:new Image(),characters:new Image(),barista:new Image(),inventory:new Image(),sales:new Image()};
gameArt.counter.src='/assets/tea-shop-counter-v2.png';gameArt.characters.src='/assets/tea-shop-characters-v2.png';gameArt.barista.src='/assets/barista-v2.png';gameArt.inventory.src='/assets/tea-shop-inventory-v2.png';gameArt.sales.src='/assets/tea-shop-sales-9router.png';
let width = innerWidth, height = innerHeight, dpr = 1, lastFrame = performance.now();

function resizeCanvas() {
  const bounds=$('#scene-wrap').getBoundingClientRect();if(!bounds.width||!bounds.height)return;width=bounds.width;height=bounds.height;dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const layout = getLayout();
  if (!state.player.x) {
    state.player.x = layout.shopX + layout.shopW * .5;
    state.player.y = layout.counterY + 92;
    state.player.targetX = state.player.x; state.player.targetY = state.player.y;
  }
}

function getLayout() {
  const mobile = width < 700;
  const shopW = mobile ? 640 : 690;
  const shopX = mobile ? -190 : Math.max(205, width * .5 - shopW * .48);
  const shopY = mobile ? 100 : 112;
  return { mobile, shopX, shopY, shopW, shopH: 390, counterY: shopY + 292 };
}

function rr(x, y, w, h, r, fill, stroke = null, line = 1) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}

function ellipse(x, y, rx, ry, fill, stroke = null, line = 1) {
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}

function line(points, stroke, lineWidth = 2) {
  ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
  ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
}

function drawGround(t) {
  ctx.fillStyle = '#adc878'; ctx.fillRect(0, 0, width, height);
  const tile = 56;
  for (let y = -tile; y < height + tile; y += tile) {
    for (let x = -tile; x < width + tile; x += tile) {
      const odd = ((x / tile + y / tile) & 1) === 0;
      ctx.fillStyle = odd ? '#b6ce80' : '#afc97a';
      ctx.fillRect(x, y, tile, tile);
      ctx.strokeStyle = '#96b36322'; ctx.lineWidth = 1;
      ctx.strokeRect(x, y, tile, tile);
      if ((x * 7 + y * 3) % 5 === 0) {
        ctx.fillStyle = '#dce4a4aa'; ctx.fillRect(x + 14, y + 18, 2, 5); ctx.fillRect(x + 11, y + 21, 7, 2);
      }
    }
  }
  // Winding stone path.
  ctx.save(); ctx.translate(width * .5, 0); ctx.rotate(-.055);
  for (let y = 40, row = 0; y < height + 100; y += 46, row++) {
    for (let x = -210; x < 210; x += 63) {
      const xx = x + (row % 2) * 27;
      rr(xx, y, 55, 36, 10, row % 2 ? '#dbc694' : '#e2d1a5', '#b9a676', 2);
      line([[xx + 8, y + 9], [xx + 30, y + 6]], '#f2e5c2', 2);
    }
  }
  ctx.restore();
  // Ambient flowers.
  for (let i = 0; i < 28; i++) {
    const x = (i * 137 + 41) % width, y = 85 + ((i * 83) % Math.max(100, height - 160));
    const sway = Math.sin(t * 1.3 + i) * 1.5;
    line([[x, y + 8], [x + sway, y]], '#607d45', 1.5);
    ellipse(x + sway - 2, y, 2.5, 2, i % 3 ? '#fff4cf' : '#e9a68e');
    ellipse(x + sway + 2, y, 2.5, 2, i % 3 ? '#fff4cf' : '#e9a68e');
  }
}

function drawGarden(layout, t) {
  const x = layout.shopX - 300, y = layout.shopY + 120;
  // Fence behind plots.
  line([[x - 25, y - 20], [x + 280, y - 20]], '#785335', 8);
  for (let px = x - 15; px < x + 290; px += 54) {
    rr(px, y - 45, 12, 54, 3, '#95663e', '#704728', 2);
    ctx.fillStyle = '#b78755'; ctx.beginPath(); ctx.moveTo(px, y - 45); ctx.lineTo(px + 6, y - 54); ctx.lineTo(px + 12, y - 45); ctx.fill();
  }
  for (let row = 0; row < 2; row++) {
    rr(x, y + row * 89, 270, 70, 14, '#a06f46', '#744b2f', 3);
    rr(x + 10, y + 10 + row * 89, 250, 50, 10, '#6d4c35');
    for (let i = 0; i < 7; i++) {
      const px = x + 27 + i * 36, py = y + 34 + row * 89;
      const bob = Math.sin(t * 2 + i + row) * 2;
      line([[px, py + 18], [px, py - 3 + bob]], '#49683c', 3);
      ellipse(px - 7, py + bob, 8, 4, row ? '#71985a' : '#668c50');
      ellipse(px + 7, py - 5 + bob, 8, 4, row ? '#81a763' : '#759d5e');
      if (row === 1) ellipse(px, py + 4 + bob, 4, 4, i % 2 ? '#9c75a5' : '#df8b70');
    }
  }
  rr(x + 78, y + 187, 105, 26, 6, '#8b5c37', '#634027', 2);
  ctx.fillStyle = '#fff1c9'; ctx.font = '700 11px "DM Sans"'; ctx.textAlign = 'center'; ctx.fillText('VƯỜN TRÀ', x + 130, y + 204);
}

function drawShop(layout, t) {
  const { shopX: x, shopY: y, shopW: w } = layout;
  // Soft painted shadow.
  ctx.save(); ctx.globalAlpha = .18; ellipse(x + w * .52, y + 390, w * .56, 80, '#32432c'); ctx.restore();
  // Building.
  rr(x + 20, y + 55, w - 40, 295, 24, '#f4e5c7', '#8b633f', 5);
  for (let px = x + 40; px < x + w - 50; px += 30) line([[px, y + 70], [px, y + 335]], '#dfcba5', 1);
  // Roof.
  ctx.fillStyle = '#6d835e'; ctx.strokeStyle = '#4e663f'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(x - 18, y + 70); ctx.lineTo(x + w * .5, y - 22); ctx.lineTo(x + w + 18, y + 70); ctx.closePath(); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 12; i++) line([[x + 28 + i * 55, y + 60], [x + w * .5, y - 16]], '#89a07566', 5);
  // Sign.
  rr(x + w * .5 - 118, y + 13, 236, 54, 18, '#fff2cf', '#875f3d', 4);
  ctx.fillStyle = '#4f6c42'; ctx.font = '700 18px "Fredoka"'; ctx.textAlign = 'center'; ctx.fillText('BUBBLE & BLOOM', x + w * .5, y + 46);
  // Windows.
  rr(x + 55, y + 105, 120, 100, 13, '#b8d6c3', '#805d3e', 6);
  line([[x + 115, y + 110], [x + 115, y + 200]], '#805d3e', 5); line([[x + 60, y + 155], [x + 170, y + 155]], '#805d3e', 5);
  rr(x + w - 175, y + 105, 120, 100, 13, '#b8d6c3', '#805d3e', 6);
  line([[x + w - 115, y + 110], [x + w - 115, y + 200]], '#805d3e', 5); line([[x + w - 170, y + 155], [x + w - 60, y + 155]], '#805d3e', 5);
  // Awning.
  const awningX = x + 160, awningY = y + 112, awningW = w - 320;
  rr(awningX, awningY, awningW, 58, 8, '#fff2d9', '#815a3c', 4);
  const stripeW = awningW / 8;
  for (let i = 0; i < 8; i += 2) { ctx.fillStyle = '#df806d'; ctx.fillRect(awningX + i * stripeW, awningY + 3, stripeW, 52); }
  for (let i = 0; i < 8; i++) ellipse(awningX + stripeW * i + stripeW / 2, awningY + 57, stripeW / 2, 13, i % 2 ? '#fff2d9' : '#df806d');
  // Open counter.
  rr(x + 177, y + 181, w - 354, 135, 5, '#70513a');
  rr(x + 188, y + 192, w - 376, 106, 3, '#c7d4a0');
  // Shelves and jars.
  line([[x + 210, y + 230], [x + 312, y + 230]], '#8c5f3e', 7);
  ['#8da171','#d9ae68','#9e7fa8'].forEach((color, i) => {
    rr(x + 218 + i * 33, y + 199, 24, 29, 5, color, '#765338', 2); rr(x + 215 + i * 33, y + 195, 30, 6, 2, '#a57a4f');
  });
  // Counter and vertical wood.
  rr(x + 142, y + 302, w - 284, 78, 4, '#9c6c45', '#724b31', 4);
  for (let px = x + 155; px < x + w - 150; px += 24) line([[px, y + 310], [px, y + 372]], '#bd8959', 4);
  rr(x + 126, y + 292, w - 252, 24, 7, '#d2a268', '#7a5235', 4);
  // Lanterns.
  [x + 145, x + w - 145].forEach((lx, i) => {
    line([[lx, y + 44], [lx, y + 94]], '#63452e', 4);
    ellipse(lx, y + 107, 18, 23, '#f4bd59', '#7b5938', 3);
    ctx.save(); ctx.globalAlpha = .12 + Math.sin(t * 2 + i) * .03; ellipse(lx, y + 107, 42, 48, '#ffd978'); ctx.restore();
  });
  drawPlants(x + 32, y + 313, t); drawPlants(x + w - 32, y + 313, t + 2);
}

function drawPlants(x, y, t) {
  rr(x - 19, y + 20, 38, 34, 5, '#bd7652', '#7f4f36', 3);
  for (let i = 0; i < 7; i++) {
    const a = -2.6 + i * .38, sway = Math.sin(t * 1.5 + i) * 2;
    line([[x, y + 25], [x + Math.cos(a) * 30 + sway, y + Math.sin(a) * 28]], '#48653c', 3);
    ellipse(x + Math.cos(a) * 30 + sway, y + Math.sin(a) * 28, 11, 6, i % 2 ? '#76975f' : '#64884f');
  }
}

function drawStation(x, y, index, t) {
  const active = state.currentStep === index;
  if (active) { ctx.save(); ctx.globalAlpha = .22 + Math.sin(t * 4) * .06; ellipse(x, y + 18, 42, 18, '#fff2a5'); ctx.restore(); }
  ctx.save(); ctx.translate(x, y + (active ? Math.sin(t * 4) * 2 : 0));
  ctx.fillStyle = '#5a4834'; ctx.font = '700 9px "DM Sans"'; ctx.textAlign = 'center';
  if (index === 0) {
    rr(-28, -22, 56, 43, 8, '#bc8a5c', '#724d32', 3);
    for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#f5e5cf'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-16 + i * 16, -13); ctx.lineTo(-18 + i * 16, 10); ctx.stroke(); }
  } else if (index === 1) {
    ellipse(0, -2, 25, 25, '#c78058', '#654a35', 3); rr(-18, -37, 36, 19, 7, '#ddd0b8', '#654a35', 3);
    line([[20,-8],[34,-18],[37,-11],[24,2]], '#654a35', 4);
  } else if (index === 2) {
    rr(-22, -32, 44, 54, 9, '#ece5ce', '#70553e', 3); rr(-10, -41, 20, 11, 4, '#a6aaa0', '#70553e', 2);
    ctx.fillStyle = '#789669'; ctx.font = '700 15px serif'; ctx.fillText('✿', 0, 4);
  } else if (index === 3) {
    rr(-32, -25, 64, 47, 7, '#986a44', '#66442e', 3);
    ['#8b4d35','#e2ad42','#e9d9b5'].forEach((c,i)=> { rr(-23+i*18,-19,14,30,4,c,'#6f5139',2); });
  } else if (index === 4) {
    [-18, 18].forEach((bx,i)=> { ellipse(bx, 2, 20, 18, i ? '#de8b70' : '#5b463c', '#68472f', 3); line([[bx-18,-5],[bx+18,-5]],'#c39660',4); });
  } else if (index === 5) {
    rr(-30, -25, 60, 48, 7, '#a9d0d1', '#557477', 4); line([[-25,-13],[25,-13]],'#eaf8f3',3); ctx.fillStyle='#fff';ctx.font='700 18px serif';ctx.fillText('❖',0,7);
  } else {
    rr(-27, -34, 54, 58, 8, '#718a5f', '#42563a', 4); rr(-18, -47, 36, 17, 6, '#e2a35b', '#725035', 3); rr(-16, -17, 32, 22, 4, '#f0dfc1');
  }
  ctx.fillStyle = active ? '#394a32' : '#625b48'; ctx.font = '700 8px "DM Sans"'; ctx.fillText(STEP_DEFS[index].station.toUpperCase(), 0, 38);
  ctx.restore();
}

function drawChibi(x, y, person, scale, t, isPlayer = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  const walking = isPlayer && state.player.moving;
  const bounce = walking ? Math.abs(Math.sin(t * 9)) * 3 : Math.sin(t * 2) * 1.2;
  ctx.translate(0, -bounce);
  ellipse(0, 30, 24, 8, '#4352392e');
  // Legs.
  const stride = walking ? Math.sin(t * 10) * 5 : 0;
  line([[-8,17],[-8-stride,29]],'#53604a',7); line([[8,17],[8+stride,29]],'#53604a',7);
  ellipse(-8-stride,30,8,4,'#f5ead6','#6b5541',1.5); ellipse(8+stride,30,8,4,'#f5ead6','#6b5541',1.5);
  // Body and arms.
  rr(-22,-20,44,47,17,person.color,'#6c503d',2.5);
  line([[-18,-5],[-29,10]],person.skin,8); line([[18,-5],[29,10]],person.skin,8);
  // Head.
  ellipse(0,-39,29,28,person.skin,'#6c503d',2.5);
  ctx.fillStyle=person.hair;ctx.beginPath();ctx.arc(0,-45,29,Math.PI,Math.PI*2);ctx.lineTo(27,-36);ctx.quadraticCurveTo(10,-53,0,-43);ctx.quadraticCurveTo(-12,-55,-27,-35);ctx.closePath();ctx.fill();
  ellipse(-9,-39,2.2,3,'#3e312b'); ellipse(9,-39,2.2,3,'#3e312b');
  ctx.strokeStyle='#a05a52';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,-31,6,0,Math.PI);ctx.stroke();
  if (isPlayer) { rr(-23,-61,46,10,5,'#ece0b8','#7b6546',2); ellipse(0,-61,17,7,'#e6a266','#7b6546',2); }
  ctx.restore();
}

function drawCup(x, y, scale, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  const tea = STEP_DEFS[1].options.find(o => o.id === state.build.tea);
  const topping = STEP_DEFS[4].options.find(o => o.id === state.build.topping);
  const fill = tea?.color || '#efd9b9';
  ctx.globalAlpha = state.build.size ? 1 : .35;
  rr(-17, -36, 34, 49, 5, fill, '#70543f', 2.5);
  ctx.save();ctx.globalAlpha=.35;rr(-12,-30,6,34,3,'#fff');ctx.restore();
  if (topping) for (let i=0;i<9;i++) ellipse(-11+(i%3)*11,4-Math.floor(i/3)*8,3.3,3.3,topping.color,'#ffffff44',1);
  if (state.build.finish) { rr(-20,-40,40,6,3,'#fff0d5','#70543f',2); line([[8,-39],[13,-67]],'#e9846f',5); }
  if (state.currentStep === 6 && state.build.finish) { ctx.save();ctx.globalAlpha=.3+Math.sin(t*5)*.15;ellipse(0,-25,32,43,'#fff9b5');ctx.restore(); }
  ctx.restore();
}

function coverArt(image){
  if(!image.complete||!image.naturalWidth)return null;
  const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight),w=image.naturalWidth*scale,h=image.naturalHeight*scale,x=(width-w)/2,y=(height-h)/2;
  ctx.drawImage(image,x,y,w,h);return{x,y,w,h};
}

function drawSpriteCharacter(spriteIndex,x,bottom,heightPx){
  if(!gameArt.characters.complete||!gameArt.characters.naturalWidth)return;
  const cellW=gameArt.characters.naturalWidth/4,cellH=gameArt.characters.naturalHeight/2,col=spriteIndex%4,row=Math.floor(spriteIndex/4),w=heightPx*(cellW/cellH);
  ctx.drawImage(gameArt.characters,col*cellW,row*cellH,cellW,cellH,x-w/2,bottom-heightPx,w,heightPx);
}

function drawQueueMarker(order,index,x,y){
  const active=index===0,w=active?76:62;
  rr(x-w/2,y,w,active?30:25,10,active?'#fff8e8f2':'#f6ecdbe8','#ffffff',2);
  ctx.fillStyle=active?'#b55f50':'#657454';ctx.font=`700 ${active?10:9}px "DM Sans"`;ctx.textAlign='center';
  ctx.fillText(active?`${order.customerName} · ĐANG GỌI`:`${index+1} · ${order.customerName}`,x,y+(active?19:16));
}

function drawMobileJar(x,y,color,label,locked=false){
  ctx.save();ctx.translate(x,y);
  rr(-22,-2,44,61,9,'#fffaf0aa','#6a503c',2.5);rr(-17,5,34,48,6,color,'#ffffff66',1.5);
  rr(-19,-9,38,13,5,'#eee5d1','#6a503c',2);ellipse(0,-9,17,5,'#faf6e7','#6a503c',1.5);
  line([[0,8],[0,48]],'#ffffff66',2);ctx.fillStyle='#4e4a3e';ctx.font='700 8px "DM Sans"';ctx.textAlign='center';ctx.fillText(label,0,74);
  if(locked){ctx.fillStyle='#f0bb3e';ctx.font='14px serif';ctx.fillText('🔒',0,28);}
  ctx.restore();
}

function drawMobileCupStack(x,y,large=false){
  ctx.save();ctx.translate(x,y);const w=large?31:26;
  for(let i=0;i<6;i++){const yy=i*5;rr(-w/2,-yy,w,34,5,'#fffdf4','#5b5243',1.5);line([[-w/3,-yy+8],[w/3,-yy+8]],'#c6b9a0',1);}
  ctx.fillStyle='#594835';ctx.font='700 10px "Fredoka"';ctx.textAlign='center';ctx.fillText(large?'L':'M',0,49);
  ctx.restore();
}

function drawMobileToppingTray(x,y){
  ctx.save();ctx.translate(x,y);rr(0,0,248,202,10,'#ece9dc','#5b564d',3);
  const colors=['#332824','#eadfc9','#ec9278','#c5b3d5','#704332','#f2bf55','#c85c56','#dbe2d0','#7c9d64','#e8cf8e','#d4b6a8','#b6c879'];
  for(let i=0;i<12;i++){const col=i%4,row=Math.floor(i/4),xx=8+col*60,yy=8+row*63;rr(xx,yy,52,55,7,'#faf7ec','#8d806b',1.5);if(i>3&&i%4!==0){ctx.fillStyle='#f2b942';ctx.font='12px serif';ctx.textAlign='center';ctx.fillText('🔒',xx+26,yy+31);}else{ctx.fillStyle=colors[i];for(let p=0;p<10;p++)ellipse(xx+12+(p%5)*8,yy+19+Math.floor(p/5)*12,4,4,colors[i],'#ffffff44',.6);}}
  ctx.restore();
}

function drawMobileSalesWorld(time){
  const t=time/1000,kx=width/512,ky=height/957;ctx.save();ctx.scale(kx,ky);ctx.clearRect(0,0,512,957);
  if(gameArt.sales.complete&&gameArt.sales.naturalWidth){
    ctx.drawImage(gameArt.sales,0,0,512,957);
    const points=[[70,356],[239,351],[290,351],[341,351],[382,528],[143,555],[466,355]];
    state.stationPoints=points.map(([x,y])=>({x:x*kx,y:y*ky}));
    state.stationPoints.forEach((point,index)=>{const bx=point.x/kx,by=point.y/ky,active=index===state.currentStep;ctx.save();ctx.globalAlpha=active?.18:.05;ctx.fillStyle=active?'#f7d66f':'#fff';ctx.beginPath();ctx.ellipse(bx,by,active?30:20,active?17:11,0,0,Math.PI*2);ctx.fill();ctx.restore();});
    const queue=state.queue.slice(0,3);queue.slice(1).forEach((order,i)=>drawSpriteCharacter(order.spriteIndex??1,226+i*88,772,84-i*8));
    updatePlayer();
    if(Object.keys(state.build).length)drawCup(126,625,.88,t);
    drawParticles(t);ctx.restore();return;
  }
  ctx.fillStyle='#fff2d8';ctx.fillRect(0,0,512,957);
  // Pale shop wall and window behind the counter.
  ctx.fillStyle='#f9e6c7';ctx.fillRect(0,0,512,270);ctx.fillStyle='#f4d6b9';ctx.fillRect(0,135,512,7);
  for(let i=0;i<9;i++){ctx.fillStyle=i%2?'#f1a0a0':'#fff1d4';ctx.fillRect(i*64,58,64,53);ellipse(i*64+32,111,32,18,i%2?'#ef9c9d':'#fff1d4','#d37d7a',1.4);}
  // Decorative shop beams and little hanging leaves.
  line([[20,135],[20,276]],'#9a6a48',5);line([[492,135],[492,276]],'#9a6a48',5);line([[0,275],[512,275]],'#80563c',6);
  for(let i=0;i<13;i++){const x=18+i*41;ellipse(x,155+Math.sin(t+i)*4,5,9,i%2?'#739b63':'#83a56e');}
  // First customer and the waiting line, all represented by the foreign queue.
  const first=state.queue[0], queue=state.queue.slice(0,3); if(first)drawSpriteCharacter(first.spriteIndex??1,93,274,123);
  queue.forEach((order,i)=>{if(i===0)return;drawSpriteCharacter(order.spriteIndex??1,220+i*92,773,91-i*8);});
  // Shelf with cup stacks, teas and sealing machine.
  rr(14,286,484,157,7,'#f4dcaf','#7a573a',3);rr(14,420,484,24,4,'#bb8250','#74492f',3);
  drawMobileCupStack(43,318,false);drawMobileCupStack(84,313,true);
  const jars=[['#c48b56','TRÀ SỮA'],['#80a15b','MATCHA'],['#b65b4d','HỒNG TRÀ'],['#d5bc64','LỤC TRÀ'],['#a87756','Ô LONG'],['#d88955','TRÀ THÁI']];
  jars.forEach((item,i)=>drawMobileJar(137+i*51,325,item[0],item[1]));
  rr(436,300,58,124,8,'#bd8657','#69472f',3);rr(446,314,39,41,5,'#d9b37d','#63472f',2);rr(448,367,35,38,5,'#eee3ca','#63472f',2);ctx.fillStyle='#5f7e4e';ctx.font='700 7px "DM Sans"';ctx.textAlign='center';ctx.fillText('READY',466,339);
  // Lower prep counter with topping tray and a soft empty work area.
  ctx.fillStyle='#f9e8c9';ctx.fillRect(0,444,512,371);line([[0,814],[512,814]],'#9a6845',4);
  drawMobileToppingTray(252,465);rr(44,466,165,203,8,'#ebc891','#7b5537',3);ctx.fillStyle='#8b603f';ctx.font='600 12px "Fredoka"';ctx.textAlign='center';ctx.fillText('LẤY LY',126,550);ctx.fillText('VỪA HOẶC LỚN',126,567);line([[71,642],[179,642]],'#7b5537',5);rr(0,816,512,141,0,'#b98558','#74492f',4);rr(8,827,496,87,0,'#bf9168','#8b5b3d',2);
  // Hit points keep the original step/keyboard logic, but line up with the illustrated stations.
  const points=[[70,356],[239,351],[290,351],[341,351],[382,528],[143,555],[466,355]];
  state.stationPoints=points.map(([x,y])=>({x:x*kx,y:y*ky}));
  state.stationPoints.forEach((point,index)=>{const bx=point.x/kx,by=point.y/ky,active=index===state.currentStep;ctx.save();ctx.globalAlpha=active?.22:.08;ctx.fillStyle=active?'#f7d66f':'#fff';ctx.beginPath();ctx.ellipse(bx,by,active?30:20,active?17:11,0,0,Math.PI*2);ctx.fill();ctx.restore();});
  updatePlayer();
  if(Object.keys(state.build).length)drawCup(126,625,.88,t);
  drawParticles(t);
  ctx.restore();
}

// Counter scene in a 512×400 design space, scaled to fit the sales column.
const SCENE_W=512,SCENE_H=400;
const STATION_RECTS=[[12,14,92,142],[108,14,276,142],[12,180,110,98],[128,180,110,98],[348,180,152,212],[244,180,98,98],[388,14,112,142]];
function sceneTransform(){const s=Math.min(width/SCENE_W,height/SCENE_H);return{s,ox:(width-SCENE_W*s)/2,oy:(height-SCENE_H*s)/2};}
function drawBottle(x,y,color,cap='#e8e1d0'){rr(x-11,y,22,44,7,'#fffdf6','#6a503c',2);rr(x-8,y+14,16,27,4,color);rr(x-6,y-8,12,10,3,cap,'#6a503c',1.5);}
function drawPump(x,y,color){rr(x-12,y+8,24,38,6,color,'#6a503c',2);rr(x-3,y-6,6,15,2,'#d9d1c0','#6a503c',1.5);rr(x-3,y-8,16,5,2,'#d9d1c0','#6a503c',1.5);ctx.save();ctx.globalAlpha=.35;rr(x-8,y+12,5,26,2,'#fff');ctx.restore();}
const SPRITE_NAMES=['cups-m','cups-l','jar-black','jar-jasmine','jar-taro','jar-matcha','jar-oolong','sealer','milk-fresh','milk-oat','milk-coconut','syrup-brown','syrup-honey','syrup-vanilla','ice','board','milk-tea-cup','top-black','top-white','top-jelly','top-popping','top-pudding','top-redbean'];
const sprites=Object.fromEntries(SPRITE_NAMES.map(name=>{const image=new Image();image.src=`/assets/sprites/${name}.png`;return[name,image];}));
// Draws a sprite scaled to fit a box, anchored to the bottom centre.
function drawSprite(name,x,y,w,h){
  const image=sprites[name];if(!image?.complete||!image.naturalWidth)return;
  const k=Math.min(w/image.naturalWidth,h/image.naturalHeight),dw=image.naturalWidth*k,dh=image.naturalHeight*k;
  ctx.drawImage(image,x+(w-dw)/2,y+h-dh,dw,dh);
}
const SPRITE_FOR={
  'Vừa':'cups-m','Lớn':'cups-l','Hồng trà':'jar-black','Trà nhài':'jar-jasmine','Trà khoai môn':'jar-taro','Trà matcha':'jar-matcha','Trà ô long':'jar-oolong',
  'Sữa tươi':'milk-fresh','Sữa yến mạch':'milk-oat','Sữa dừa':'milk-coconut','Đường đen':'syrup-brown','Mật ong':'syrup-honey','Vani':'syrup-vanilla',
  'Trân châu đen':'top-black','Trân châu trắng':'top-white','Sương sáo':'top-jelly','Trân châu nổ':'top-popping','Ít đá':'ice','Đá thường':'ice','Lắc & dán nắp':'milk-tea-cup',
  milkTea:'milk-tea-cup',matcha:'jar-matcha',blackTea:'jar-black',greenTea:'jar-jasmine',oolong:'jar-oolong',thaiTea:'jar-taro',brownSugar:'syrup-brown',honey:'syrup-honey',vanilla:'syrup-vanilla',
  blackPearls:'top-black',whitePearls:'top-white',grassJelly:'top-jelly',poppingBoba:'top-popping',pudding:'top-pudding',redBean:'top-redbean',mediumSize:'cups-m',largeSize:'cups-l',
  teaStock:'jar-black',milkStock:'milk-fresh',syrupStock:'syrup-honey',toppingStock:'top-black',iceStock:'ice',cupStock:'cups-m',
};
const EMOJI_FOR={'Không sữa':'🚫','Không đường':'🚫','Không đá':'🚫',noSugar:'🚫',strawberry:'🍓',mango:'🥭'};
// Generated sprite for an option, product or stock item; falls back to an emoji.
function artHtml(key,cls){
  const name=SPRITE_FOR[key];
  return name?`<img class="${cls} sprite-art" src="/assets/sprites/${name}.png" alt="" draggable="false">`:`<i class="${cls} emoji-art">${EMOJI_FOR[key]||'🧋'}</i>`;
}
const TEA_JARS=['jar-black','jar-jasmine','jar-taro','jar-matcha','jar-oolong'];
const TOPPING_PANS=['top-black','top-white','top-jelly','top-popping','top-pudding','top-redbean'];
function drawCounterScene(time){
  const t=time/1000,{s,ox,oy}=sceneTransform(),day=state.day;
  state.stationRects=STATION_RECTS.map(([x,y,w,h])=>({x:ox+x*s,y:oy+y*s,w:w*s,h:h*s}));
  state.stationPoints=state.stationRects.map(r=>({x:r.x+r.w/2,y:r.y+r.h/2}));
  ctx.fillStyle='#fdf4e6';ctx.fillRect(0,0,width,height);
  ctx.save();ctx.translate(ox,oy);ctx.scale(s,s);
  // Back shelf: cup stacks, tea dispensers and the sealing machine.
  rr(4,6,504,160,12,'#f6e2c0','#b88a60',2);rr(4,150,504,18,5,'#c48a57','#8a5f40',2);
  drawSprite('cups-m',14,34,44,116);drawSprite('cups-l',58,20,46,130);
  [['M',36],['L',81]].forEach(([label,x])=>{ellipse(x,138,10,10,'#fffaf0','#8a5f40',1.5);ctx.fillStyle='#6b4a33';ctx.font='600 12px "Fredoka"';ctx.textAlign='center';ctx.fillText(label,x,142);});
  STEP_DEFS[1].options.forEach((option,i)=>{const x=112+i*54;drawSprite(TEA_JARS[i],x,52,50,98);
    rr(x+1,120,48,16,6,'#fffaf0e8','#8a5f40',1);ctx.fillStyle='#4a3428';ctx.font='700 8.5px "DM Sans"';ctx.fillText(option.label.toUpperCase(),x+25,131);});
  drawSprite('sealer',388,16,112,136);
  // Front counter.
  ctx.fillStyle='#fbe9cf';ctx.fillRect(4,170,504,226);
  [[12,'milk',['milk-fresh','milk-oat','milk-coconut']],[128,'syrup',['syrup-brown','syrup-honey','syrup-vanilla']]].forEach(([x,,names])=>{rr(x,180,110,98,10,'#fff7ea','#e3cdb4',1.2);names.forEach((name,i)=>drawSprite(name,x+4+i*34,188,34,82));});
  rr(244,180,98,98,10,'#fff7ea','#e3cdb4',1.2);drawSprite('ice',250,186,86,86);
  rr(348,180,152,212,12,'#dcd8ce','#8d867a',2);
  TOPPING_PANS.forEach((name,i)=>{const cx=354+(i%2)*72,cy=186+Math.floor(i/2)*68,option=STEP_DEFS[4].options[i];drawSprite(name,cx,cy,68,64);
    if(option){ctx.fillStyle='#4a3428';ctx.font='700 8px "DM Sans"';ctx.textAlign='center';rr(cx+8,cy+52,52,13,6,'#fffaf0e0');ctx.fillStyle='#4a3428';ctx.fillText(option.label,cx+34,cy+62);}
    else{ctx.save();ctx.globalAlpha=.6;rr(cx+2,cy+2,64,60,8,'#f2eee6');ctx.restore();ctx.font='16px serif';ctx.textAlign='center';ctx.fillText('🔒',cx+34,cy+38);}});
  // Work board with the drink being built.
  drawSprite('board',10,286,334,108);
  if(state.build.finish)drawSprite('milk-tea-cup',146,284,60,100);
  else if(Object.keys(state.build).length)drawCup(176,360,1.4,t);
  else{ctx.fillStyle='#8a5f40';ctx.font='600 14px "Fredoka"';ctx.textAlign='center';ctx.fillText('Chạm chồng ly để lấy ly',176,344);}
  // Station highlights and locks.
  STATION_RECTS.forEach(([x,y,w,h],i)=>{const def=STEP_DEFS[i],locked=def.unlockDay&&day<def.unlockDay;
    if(locked){ctx.save();ctx.globalAlpha=.62;rr(x,y,w,h,10,'#fdf4e6');ctx.restore();rr(x+w/2-34,y+h/2-11,68,22,11,'#fff','#e3cdb4',1.2);ctx.fillStyle='#8b6a55';ctx.font='700 11px "DM Sans"';ctx.textAlign='center';ctx.fillText(`🔒 Ngày ${def.unlockDay}`,x+w/2,y+h/2+4);return;}
    if(i===state.currentStep&&state.started){ctx.save();ctx.lineWidth=3.5;ctx.strokeStyle='#ef7691';ctx.setLineDash([9,6]);ctx.lineDashOffset=-t*20;ctx.beginPath();ctx.roundRect(x-3,y-3,w+6,h+6,12);ctx.stroke();ctx.restore();
      const label=def.station;ctx.font='700 11px "DM Sans"';const tw=ctx.measureText(label).width+16;rr(x+w/2-tw/2,y-12+Math.sin(t*4)*2,tw,20,10,'#ef7691');ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(label,x+w/2,y+2+Math.sin(t*4)*2);}
    else if(state.build[def.id]){ellipse(x+w-12,y+12,9,9,'#7cc38a','#fff',2);ctx.fillStyle='#fff';ctx.font='700 11px "DM Sans"';ctx.textAlign='center';ctx.fillText('✓',x+w-12,y+16);}});
  ctx.restore();
  drawParticles(t);
}

function drawBarista(x,bottom,heightPx){
  if(!gameArt.barista.complete||!gameArt.barista.naturalWidth)return;
  const w=heightPx*(gameArt.barista.naturalWidth/gameArt.barista.naturalHeight);
  ctx.drawImage(gameArt.barista,x-w/2,bottom-heightPx,w,heightPx);
}

function drawWorld(time) {
  const t=time/1000;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);ctx.fillStyle='#f3e4c8';ctx.fillRect(0,0,width,height);
  drawCounterScene(time);return;
  const art=coverArt(gameArt.counter);
  if(!art){ctx.fillStyle='#9db877';ctx.fillRect(0,0,width,height);return;}
  const normalizedStations=[[.08,.52],[.35,.47],[.52,.47],[.73,.48],[.49,.77],[.18,.77],[.92,.48]];
  state.stationPoints=normalizedStations.map(([x,y])=>({x:art.x+art.w*x,y:art.y+art.h*y}));
  state.stationPoints.forEach((point,index)=>{
    const active=index===state.currentStep;
    ctx.save();ctx.globalAlpha=active ? .42 : .13;ctx.fillStyle=active?'#fff3a2':'#fff9dc';ctx.beginPath();ctx.ellipse(point.x,point.y,active?46:32,active?25:17,0,0,Math.PI*2);ctx.fill();ctx.restore();
  });

  state.queue.slice(0,3).forEach((order,index)=>{
    const mobile=width<700,x=mobile?width*(.43+index*.18):width*(.54+index*.065),bottom=mobile?height*(.73+index*.025):Math.min(height-186,art.y+art.h*(.76+index*.018)),characterHeight=(mobile?92:148)-index*8;
    drawSpriteCharacter(order.spriteIndex??1,x,bottom,characterHeight);
    drawQueueMarker(order,index,x,bottom-characterHeight-25);
  });
  updatePlayer();
  drawBarista(state.player.x||art.x+art.w*.5,Math.min(height-145,state.player.y+118),178+Math.sin(t*2)*2);

  let cupX=art.x+art.w*.68,cupY=art.y+art.h*.72,cupScale=.85;
  if(state.serving){const p=Math.min(1,(performance.now()-state.serveStart)/650),targetX=art.x+art.w*.60,targetY=art.y+art.h*.68;cupX+=(targetX-cupX)*p;cupY+=(targetY-cupY)*p-Math.sin(p*Math.PI)*70;cupScale-=p*.18;}
  if(Object.keys(state.build).length)drawCup(cupX,cupY,cupScale,t);
  drawParticles(t);
  ctx.save();ctx.fillStyle='#2c251322';ctx.fillRect(0,0,width,4);ctx.restore();
}

function updatePlayer() {
  const p = state.player, dx = p.targetX - p.x, dy = p.targetY - p.y, distance = Math.hypot(dx, dy);
  if (distance > 2) { p.x += dx * .075; p.y += dy * .075; p.moving = true; }
  else p.moving = false;
}

function drawParticles(t) {
  state.particles = state.particles.filter(p => performance.now() - p.birth < 850);
  state.particles.forEach(p => {
    const age = (performance.now() - p.birth) / 850;
    ctx.save();ctx.globalAlpha=1-age;ctx.translate(p.x+p.vx*age*40,p.y-p.vy*age*55);ctx.rotate(age*4);
    ctx.fillStyle=p.color;ctx.font='700 15px serif';ctx.textAlign='center';ctx.fillText(p.symbol,0,0);ctx.restore();
  });
}

function burst(x, y, color = '#f2c858') {
  const symbols = ['✦','•','❋','✦','·'];
  for (let i=0;i<8;i++) state.particles.push({ x, y, color, symbol:symbols[i%symbols.length], vx:Math.cos(i*.8)*1.4, vy:.7+Math.random(), birth:performance.now() });
}

function animate(time) {
  const dt = Math.min(40, time - lastFrame); lastFrame = time;
  drawWorld(time, dt); requestAnimationFrame(animate);
}

function money(value) {
  const amount = Math.max(0, value);
  const text = Number.isInteger(amount) ? String(amount) : amount.toFixed(1).replace('.', ',');
  return `${text}k`;
}
function planCost() { return STOCK_ITEMS.reduce((sum,item)=>sum+(state.plan[item.id]||0)*item.cost,0); }
function missingStock() { return STOCK_ITEMS.filter(item=>(state.inventory[item.id]||0)<1); }

function initDailyPlan() {
  state.plan = Object.fromEntries(STOCK_ITEMS.map(item=>[item.id, state.day===1 ? 1 : 0]));
  state.dailyCapital = Math.min(state.cash, Math.max(60, Math.round(Math.min(140, state.cash*.35)/10)*10));
  state.budgetSpent = 0; state.dailyCost = 0;
}

const stockViewSelectors=['.forecast-pill','.capital-box','.budget-meter','#stock-category-tabs','#prep-inventory','#missing-note','#stock-btn'];
const CATEGORY_LABELS={tea:'🧋 Trà',flavor:'🍓 Hương',topping:'⚪ Topping',size:'↕ Size',equipment:'🛠 Trang bị',staff:'🧑‍🤝‍🧑 Nhân viên',online:'📱 Online'};

function setManagementTab(tab) {
  state.activeManagementTab=tab;
  $$('[data-management-tab]').forEach(button=>button.classList.toggle('active',button.dataset.managementTab===tab));
  const stock=tab==='stock';
  stockViewSelectors.forEach(selector=>$(selector)?.classList.toggle('hidden',!stock));
  $('#management-panel').classList.toggle('hidden',stock);
  renderManagementTab();
  playSound('tap');
}

function setStockCategory(category){state.activeStockCategory=category;$$('[data-stock-category]').forEach(button=>button.classList.toggle('active',button.dataset.stockCategory===category));renderPrep();playSound('tap');}

function upgradeCost(type) {
  const level=type==='speed'?state.speedUpgrade:state.cupUpgrade;
  return (type==='speed'?80:100)+level*(type==='speed'?55:70);
}

function buyUpgrade(type) {
  const key=type==='speed'?'speedUpgrade':'cupUpgrade',cost=upgradeCost(type);
  if(state[key]>=3)return;
  if(state.cash<cost){showPrepToast('Tiền trong két chưa đủ để nâng cấp.');return;}
  state.cash-=cost;state.dailyCost+=cost;state[key]++;renderPrep();renderManagementTab();playSound('good');
}

function buyCatalogProduct(id){
  const item=ALL_PRODUCTS.find(product=>product.id===id);if(!item||state.unlockedProducts[id])return;
  if(state.cash<item.unlockCost){showToast('Tiền trong két chưa đủ để mua mục này.');return;}
  state.cash-=item.unlockCost;state.dailyCost+=item.unlockCost;state.unlockedProducts[id]=true;renderPrep();renderManagementTab();playSound('good');
}

function buyServiceUpgrade(id){
  const services={fridge:{cost:180},staff:{cost:260},marketing:{cost:220}},service=services[id];if(!service)return;
  if(state.cash<service.cost){showToast('Tiền trong két chưa đủ để nâng cấp.');return;}
  if(id==='fridge'){if(state.serviceUpgrades.fridge>=2)return;state.serviceUpgrades.fridge++;}else{if(state.serviceUpgrades[id])return;state.serviceUpgrades[id]=true;}
  state.cash-=service.cost;state.dailyCost+=service.cost;renderPrep();renderManagementTab();playSound('good');
}

function changePrice(id,delta) {
  const item=ALL_PRODUCTS.find(product=>product.id===id);if(!item)return;
  state.productPrices[id]=Math.max(0,Math.min(80,(state.productPrices[id]??item.price)+delta));
  state.milkTeaPrice=state.productPrices.milkTea;state.matchaPrice=state.productPrices.matcha;renderPrep();renderManagementTab();playSound('tap');
}

function managementSubtabs(items,active,attribute){
  return `<div class="subtabs manage-subtabs">${items.map(id=>`<button class="${id===active?'active':''}" data-${attribute}="${id}">${CATEGORY_LABELS[id]}</button>`).join('')}</div>`;
}

function renderProductUpgradeList(category){
  return PRODUCT_CATALOG[category].map(item=>{const owned=state.unlockedProducts[item.id];return `<div class="catalog-row">${artHtml(item.id,'catalog-icon')}<div><strong>${item.name}</strong><small>${owned?`Đang bán · Giá ${money(state.productPrices[item.id])}`:`Mở thêm món mới trong menu`}</small></div><button data-buy-product="${item.id}" ${owned||state.cash<item.unlockCost?'disabled':''}>${owned?'✓ ĐANG CÓ':`${money(item.unlockCost)}<span>MUA</span>`}</button></div>`}).join('');
}

function renderManagementTab() {
  const panel=$('#management-panel');if(!panel||state.activeManagementTab==='stock')return;
  if(state.activeManagementTab==='upgrades'){
    const categories=['tea','flavor','topping','equipment','staff','online'],category=state.activeUpgradeCategory;
    let body='';
    if(['tea','flavor','topping'].includes(category))body=`<div class="catalog-list">${renderProductUpgradeList(category)}</div>`;
    else if(category==='equipment'){
      const speedCost=upgradeCost('speed'),cupCost=upgradeCost('cup');body=`<div class="manage-grid"><article class="manage-card"><strong>⚡ Máy pha nhanh · Cấp ${state.speedUpgrade}/3</strong><small>Giảm tốc độ mất kiên nhẫn ${state.speedUpgrade*18}%.</small><button data-upgrade="speed" ${state.speedUpgrade>=3||state.cash<speedCost?'disabled':''}>${state.speedUpgrade>=3?'ĐÃ TỐI ĐA':`NÂNG CẤP · ${money(speedCost)}`}</button></article><article class="manage-card"><strong>🥤 Ly cao cấp · Cấp ${state.cupUpgrade}/3</strong><small>Tăng ${state.cupUpgrade*2}k doanh thu mỗi đơn.</small><button data-upgrade="cup" ${state.cupUpgrade>=3||state.cash<cupCost?'disabled':''}>${state.cupUpgrade>=3?'ĐÃ TỐI ĐA':`NÂNG CẤP · ${money(cupCost)}`}</button></article><article class="manage-card"><strong>❄️ Tủ lạnh · Cấp ${state.serviceUpgrades.fridge}/2</strong><small>Mỗi cấp cộng thêm 1 ngày hạn dùng cho nguyên liệu mới.</small><button data-buy-service="fridge" ${state.serviceUpgrades.fridge>=2||state.cash<180?'disabled':''}>${state.serviceUpgrades.fridge>=2?'ĐÃ TỐI ĐA':'NÂNG CẤP · 180k'}</button></article><article class="manage-card"><strong>🔒 Đường & đá</strong><small>${state.day>=6?'Đã mở khóa lựa chọn riêng.':'Tự động mở vào ngày 6.'}</small><button disabled>${state.day>=6?'ĐÃ MỞ':'NGÀY 6'}</button></article></div>`;
    }else if(category==='staff')body=`<div class="catalog-list"><div class="catalog-row"><span class="catalog-emoji">🧑‍🍳</span><div><strong>Trợ lý pha chế</strong><small>Khách giảm kiên nhẫn chậm thêm 15%.</small></div><button data-buy-service="staff" ${state.serviceUpgrades.staff||state.cash<260?'disabled':''}>${state.serviceUpgrades.staff?'✓ ĐÃ THUÊ':'260k<span>THUÊ</span>'}</button></div></div>`;
    else body=`<div class="catalog-list"><div class="catalog-row"><span class="catalog-emoji">📣</span><div><strong>Câu lạc bộ tiếng Anh</strong><small>Mỗi câu hỏi trả lời đúng được khách bo thêm 2k.</small></div><button data-buy-service="marketing" ${state.serviceUpgrades.marketing||state.cash<220?'disabled':''}>${state.serviceUpgrades.marketing?'✓ ĐANG CHẠY':'220k<span>MUA</span>'}</button></div></div>`;
    panel.innerHTML=`<div class="manage-heading"><div><h3>Nâng cấp tiệm</h3><p>Mở món mới và phát triển cửa hàng qua từng ngày.</p></div></div>${managementSubtabs(categories,category,'upgrade-category')}${body}`;
    $$('[data-upgrade-category]').forEach(button=>button.addEventListener('click',()=>{state.activeUpgradeCategory=button.dataset.upgradeCategory;renderManagementTab();playSound('tap');}));
    $$('[data-upgrade]').forEach(button=>button.addEventListener('click',()=>buyUpgrade(button.dataset.upgrade)));
    $$('[data-buy-product]').forEach(button=>button.addEventListener('click',()=>buyCatalogProduct(button.dataset.buyProduct)));
    $$('[data-buy-service]').forEach(button=>button.addEventListener('click',()=>buyServiceUpgrade(button.dataset.buyService)));
  } else if(state.activeManagementTab==='prices'){
    const categories=['tea','flavor','topping','size'],category=state.activePriceCategory,items=PRODUCT_CATALOG[category].filter(item=>state.unlockedProducts[item.id]);
    const rows=items.map(item=>{const price=state.productPrices[item.id],profit=price-item.cost;return `<div class="price-row">${artHtml(item.id,'catalog-icon')}<div><strong>${item.name}</strong><small>Vốn ${money(item.cost)} · <span class="${profit<0?'loss':'profit'}">Lãi ${profit<0?'−':''}${money(Math.abs(profit))}</span></small></div><div class="price-stepper"><button data-price-id="${item.id}" data-delta="-1">−</button><b>${money(price)}</b><button data-price-id="${item.id}" data-delta="1">+</button></div></div>`}).join('');
    panel.innerHTML=`<div class="manage-heading"><div><h3>Giá bán & lãi từng món</h3><p>Giá bán trừ giá vốn là lợi nhuận gộp trước chi phí thuê tiệm.</p></div></div>${managementSubtabs(categories,category,'price-category')}<div class="catalog-list">${rows||'<div class="empty-state">Hãy mua món này trong Nâng cấp trước.</div>'}</div>`;
    $$('[data-price-category]').forEach(button=>button.addEventListener('click',()=>{state.activePriceCategory=button.dataset.priceCategory;renderManagementTab();playSound('tap');}));
    $$('[data-price-id]').forEach(button=>button.addEventListener('click',()=>changePrice(button.dataset.priceId,Number(button.dataset.delta))));
  } else if(state.activeManagementTab==='reviews'){
    const review=state.lastReview;
    panel.innerHTML=`<div class="manage-heading"><div><h3>Đánh giá khách hàng</h3><p>Phản hồi gần nhất từ cửa hàng.</p></div></div>${review?`<article class="manage-card"><strong>${review.name} · <span class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5-review.stars)}</span></strong><small>Ngày ${review.day}</small><p>“${review.text}”</p></article>`:'<div class="empty-state">Chưa có đánh giá. Hãy mở cửa và phục vụ vị khách đầu tiên nhé.</div>'}`;
  } else {
    const currentCost=state.dailyCost+state.rent,currentProfit=state.money-currentCost;
    panel.innerHTML=`<div class="manage-heading"><div><h3>Tổng kết lãi lỗ</h3><p>Doanh thu − tiền nhập hàng − thuê tiệm = lợi nhuận ròng.</p></div></div><div class="finance-grid"><div><small>DOANH THU HÔM NAY</small><strong>${money(state.money)}</strong></div><div><small>CHI PHÍ HÔM NAY</small><strong>${money(currentCost)}</strong></div><div class="${currentProfit<0?'loss-box':'profit-box'}"><small>LÃI / LỖ TẠM TÍNH</small><strong>${currentProfit<0?'−':''}${money(Math.abs(currentProfit))}</strong></div></div>${state.history.length?state.history.slice().reverse().map(row=>`<div class="history-row"><div><strong>Ngày ${String(row.day).padStart(2,'0')} · ${row.served} ly</strong><small>Thu ${money(row.revenue)} · Chi ${money(row.cost)} · ${row.rating.toFixed(1).replace('.',',')} sao · bo ${money(row.tips)}</small></div><b style="color:${row.profit<0?'#b65449':'#4f6c42'}">${row.profit<0?'Lỗ ':'Lãi '}${money(Math.abs(row.profit))}</b></div>`).join(''):'<div class="empty-state">Chưa có ngày nào hoàn tất. Số tạm tính phía trên vẫn cập nhật ngay.</div>'}`;
  }
}

function showPrep() {
  clearInterval(state.timerId); clearInterval(state.patienceId); state.running=false;
  $('#start-screen').classList.add('hidden'); $('#game-screen').classList.add('hidden'); $('#result-screen').classList.add('hidden');
  $('#prep-screen').classList.remove('hidden');
  $('#prep-day-label').textContent=`Ngày ${state.day}`;
  $('#capital-input').value=Math.round(state.dailyCapital);
  $('#prep-status').textContent='Chuẩn bị';
  setManagementTab('stock');
  renderPrep();
}

function renderPrep() {
  $('#prep-cash').textContent=money(state.cash);
  $('#menu-milk-price').textContent=money(state.productPrices.milkTea);$('#menu-matcha-price').textContent=money(state.productPrices.matcha);
  $('#menu-black-price').textContent=`+${money(state.productPrices.blackPearls)}`;$('#menu-white-price').textContent=`+${money(state.productPrices.whitePearls)}`;$('#menu-size-price').textContent=`Size L +${money(state.productPrices.largeSize)}`;
  const reviews=state.history.length,avgRating=reviews?state.history.reduce((sum,row)=>sum+row.rating,0)/reviews:5,roundedRating=Math.round(avgRating);
  $('#prep-stars').textContent='★★★★★'.slice(0,roundedRating)+'☆☆☆☆☆'.slice(0,5-roundedRating);$('#prep-rating').textContent=`${avgRating.toFixed(1).replace('.',',')} · ${reviews} đánh giá`;
  $('#open-shop-label').textContent=`Mở cửa ngày ${state.day}`;
  const milkMargin=state.productPrices.milkTea-PRODUCT_CATALOG.tea[0].cost,matchaMargin=state.productPrices.matcha-PRODUCT_CATALOG.tea[1].cost;$('#menu-margin').textContent=`Lãi gộp ${money(milkMargin)}–${money(matchaMargin)} / ly`;
  const expectedMin=10+Math.min(10,state.day),expectedMax=expectedMin+6;
  $('#expected-guests').textContent=`${expectedMin}–${expectedMax}`;
  $$('[data-stock-category]').forEach(button=>button.classList.toggle('active',button.dataset.stockCategory===state.activeStockCategory));
  $('#prep-inventory').innerHTML=STOCK_ITEMS.filter(item=>item.category===state.activeStockCategory).map(item=>{
    const packs=state.plan[item.id]||0,owned=state.inventory[item.id]||0;
    return `<div class="stock-row">${artHtml(item.id,'stock-icon')}<div class="stock-info"><strong>${item.name}</strong><small>+${item.pack} phần · ${money(item.cost)} / lô · hạn ${item.shelfLife===99?'∞':item.shelfLife+' ngày'}</small></div><div class="pack-stepper"><button data-stock="${item.id}" data-delta="-1" aria-label="Bớt">−</button><span>${packs} lô</span><button data-stock="${item.id}" data-delta="1">+</button></div><div class="stock-owned"><b>${owned}</b><small>phần</small></div></div>`;
  }).join('');
  $$('#prep-inventory [data-stock]').forEach(button=>button.addEventListener('click',()=>{
    const id=button.dataset.stock,delta=Number(button.dataset.delta);state.plan[id]=Math.max(0,(state.plan[id]||0)+delta);renderPrep();playSound('tap');
  }));
  const planned=planCost(),remaining=state.dailyCapital-state.budgetSpent-planned,availableBudget=state.dailyCapital-state.budgetSpent;
  $('#planned-cost').textContent=money(planned);$('#stock-cost').textContent=money(planned);
  $('#budget-left').textContent=remaining>=0?`Còn ${money(remaining)}`:`Vượt vốn ${money(-remaining)}`;
  $('#budget-left').style.color=remaining<0?'#b65449':'';
  $('#budget-bar').style.width=`${Math.min(100,availableBudget?planned/availableBudget*100:100)}%`;
  $('#budget-bar').style.background=remaining<0?'#c65f50':'';
  $('#stock-btn').disabled=!planned||planned>availableBudget||planned>state.cash;
  const missing=missingStock(),note=$('#missing-note');
  note.classList.toggle('ready',!missing.length);
  note.textContent=missing.length?`Còn thiếu trước khi mở cửa: ${missing.map(item=>item.name).join(' · ')}`:'Đã nhập đủ hàng. Tiệm sẵn sàng mở cửa!';
  $('#open-shop-btn').disabled=!!missing.length;
  if(state.activeManagementTab!=='stock')renderManagementTab();
}

function buyStock() {
  const cost=planCost(),left=state.dailyCapital-state.budgetSpent;
  if(!cost||cost>left||cost>state.cash){showPrepToast(cost>left?'Hãy tăng vốn hôm nay hoặc giảm số lượng nhập.':'Tiền trong két không đủ.');return;}
  STOCK_ITEMS.forEach(item=>{const packs=state.plan[item.id]||0;state.inventory[item.id]=(state.inventory[item.id]||0)+packs*item.pack;if(packs)state.inventoryExpiry[item.id]=item.shelfLife===99?Infinity:state.day+item.shelfLife-1+state.serviceUpgrades.fridge;state.plan[item.id]=0;});
  state.cash-=cost;state.budgetSpent+=cost;state.dailyCost+=cost;playSound('good');renderPrep();
  $('#prep-status').textContent='Đã nhập kho';
}

function showPrepToast(message) {
  const note=$('#missing-note');note.textContent=message;note.classList.remove('ready');
}

function renderStockStrip() {
  $('#stock-strip').innerHTML=STOCK_ITEMS.map(item=>`<span class="stock-chip ${(state.inventory[item.id]||0)<3?'low':''}">${artHtml(item.id,'mini-asset-icon')}<b>${state.inventory[item.id]||0}</b></span>`).join('');
}

function orderNeeds(order) {
  return ['teaStock','toppingStock','cupStock',
    ...(order.milk==='Không sữa'?[]:['milkStock']),
    ...(order.syrup==='Không đường'?[]:['syrupStock']),
    ...(order.ice==='Không đá'?[]:['iceStock'])];
}

function consumeOrderStock(order) {
  const needs=orderNeeds(order),missing=needs.find(id=>(state.inventory[id]||0)<1);
  if(missing)return STOCK_ITEMS.find(item=>item.id===missing);
  needs.forEach(id=>state.inventory[id]--);renderStockStrip();return null;
}

function orderLine(person, drink, size) {
  const parts=[`${person.call}, cho ${person.self} 1 ly <mark>${drink.name.toLowerCase()}</mark> size <mark>${size==='Lớn'?'L':'M'}</mark>`];
  if(drink.milk!=='Không sữa')parts.push(drink.milk.toLowerCase());
  if(state.day>=6)parts.push(drink.syrup.toLowerCase(),drink.ice.toLowerCase());
  return `${parts.join(', ')} với ${drink.topping.toLowerCase()} nhé!`;
}

function randomOrder() {
  const busy=new Set(state.queue.map(order=>order.customerName)),free=people.filter(person=>!busy.has(person.name)),pool=free.length?free:people;
  const person = pool[Math.floor(Math.random() * pool.length)];
  const availableDrinks=drinkTemplates.filter(drink=>state.unlockedProducts[drink.productKey]),drink=availableDrinks[Math.floor(Math.random()*availableDrinks.length)]||drinkTemplates[0];
  const size=Math.random()>.48?'Lớn':'Vừa';
  return { ...drink, customerName:person.name, customerColor:person.color, spriteIndex:person.spriteIndex,
    quote:orderLine(person,drink,size), size, finish:'Lắc & dán nắp', number:state.orderIndex++, quizDone:false, quizCorrect:false };
}

function resetQueue() {
  state.queue=[];for(let i=0;i<3;i++)state.queue.push(randomOrder());
}
function renderQueue() {
  $('#queue-list').innerHTML = state.queue.slice(1).map(order=>`<span class="queue-chip">Chờ: ${order.customerName}</span>`).join('');
}

const SHORT_RECIPE_LABELS = {
  'Trân châu đen': 'T.châu đen',
  'Trân châu trắng': 'T.châu trắng',
  'Trân châu nổ': 'T.châu nổ',
  'Sữa yến mạch': 'Yến mạch',
  'Không sữa': 'Không sữa',
  'Không đường': 'Không đường',
  'Đá thường': 'Đá thường',
};
function recipeArt(stepId, value) {
  return STEP_DEFS.find(step => step.id === stepId)?.options.find(option => option.id === value) || { artX: 0, artY: 0 };
}
function renderOrder() {
  const order=state.queue[0]; if(!order)return;
  $('#order-number').textContent=`#${String(order.number).padStart(3,'0')}`; const sprite=order.spriteIndex??1;
  $('#customer-avatar').style.setProperty('--sx',sprite%4);$('#customer-avatar').style.setProperty('--sy',Math.floor(sprite/4)); $('#customer-name').textContent=order.customerName; $('#customer-mood').innerHTML=order.quote; renderQuizBadge(order);
  $('#drink-name').textContent=order.name; $('#order-cup').style.setProperty('--cup-color',order.color); $('#order-cup').style.setProperty('--cup-x',order.size==='Lớn'?1:0);
  const recipe=[['Ly','size',order.size],['Trà','tea',order.tea],['Sữa','milk',order.milk],['Ngọt','syrup',order.syrup],['Topping','topping',order.topping],['Đá','ice',order.ice]].filter(([,stepId])=>{const def=STEP_DEFS.find(step=>step.id===stepId);return !(def.unlockDay&&state.day<def.unlockDay);});
  $('#recipe-list').innerHTML=recipe.map(([key,stepId,value])=>{const art=recipeArt(stepId,value);const label=stepId==='size'?`Ly ${value==='Lớn'?'L':'M'}`:SHORT_RECIPE_LABELS[value]||value;return `<div class="recipe-item" title="${key}">${artHtml(value,'recipe-art')}<span><b>${key}</b>${label}</span></div>`;}).join('');
  state.patience=100; updatePatience();
  setTimeout(()=>maybeStartConversation(order),260);
}

function renderControls() {
  $('#steps').innerHTML=STEP_DEFS.map((step,i)=>{const locked=step.unlockDay&&state.day<step.unlockDay;return `<button class="step-btn ${i===state.currentStep?'active':''} ${state.build[step.id]?'complete':''} ${locked?'locked':''}" data-step="${i}" ${locked?'disabled':''}><span>${locked?'🔒':step.icon}</span>${step.label}${locked?'<small>Ngày 6</small>':''}</button>`}).join('');
  $('#step-dots').innerHTML=STEP_DEFS.map((step,i)=>`<i class="${state.build[step.id]?'done':i===state.currentStep?'now':''}"></i>`).join('');
  const step=STEP_DEFS[state.currentStep];
  $('#options').innerHTML=(step.unlockDay&&state.day<step.unlockDay)
    ? `<div class="locked-step-note">🔒 Lựa chọn ${step.label.toLowerCase()} mở từ ngày ${step.unlockDay}. Hôm nay tiệm pha theo công thức chuẩn.</div>`
    : `${step.id==='tea'?'<div class="pour-guide"><span>Giữ nút trà để rót, thả trong vùng xanh</span><i><b id="pour-progress"></b><em></em></i></div>':''}${step.options.map(option=>`<button class="option-btn ${state.build[step.id]===option.id?'selected':''}" data-option="${option.id}">${artHtml(option.id,'option-art')}<span>${option.label}</span></button>`).join('')}`;
  $$('.step-btn').forEach(btn=>btn.addEventListener('click',()=>selectStep(Number(btn.dataset.step))));
  $$('.option-btn').forEach(btn=>{
    if(step.id==='tea'){
      btn.addEventListener('pointerdown',event=>startPour(event,btn.dataset.option));
      btn.addEventListener('pointerup',event=>finishPour(event,btn.dataset.option));
      btn.addEventListener('pointercancel',event=>finishPour(event,btn.dataset.option));
      btn.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){state.pourLevel=75;chooseOption(btn.dataset.option);}});
    }else btn.addEventListener('click',()=>chooseOption(btn.dataset.option));
  });
  const actionable=STEP_DEFS.filter(def=>!def.unlockDay||state.day>=def.unlockDay),picked=actionable.filter(def=>state.build[def.id]).length;
  const nextStep=STEP_DEFS[state.currentStep],done=STEP_DEFS.every(def=>state.build[def.id]);
  $('#making-label').textContent=done?'Xong rồi! Bấm Giao nước':`Bước ${state.currentStep+1}: ${nextStep.station.toLowerCase()} · ${picked}/${actionable.length}`;
  $('#serve-btn').disabled=state.serving||!STEP_DEFS.every(def=>state.build[def.id]);
}

function selectStep(index) {
  const step=STEP_DEFS[index];if(step.unlockDay&&state.day<step.unlockDay){showToast(`${step.label} mở khóa vào ngày ${step.unlockDay}`);return;}
  state.currentStep=index; sendPlayerToStation(index); renderControls(); playSound('tap');
}
function sendPlayerToStation(index) {
  const station=state.stationPoints[index]; if(!station)return;
  state.player.targetX=station.x; state.player.targetY=station.y+74;
}
function chooseOption(value) {
  const step=STEP_DEFS[state.currentStep]; state.build[step.id]=value;
  const station=state.stationPoints[state.currentStep]; if(station) burst(station.x,station.y-30,step.options.find(o=>o.id===value)?.color);
  playSound(step.id==='finish'?'seal':'tap');
  if(state.currentStep<STEP_DEFS.length-1){
    do{state.currentStep++;}while(state.currentStep<STEP_DEFS.length-1&&STEP_DEFS[state.currentStep].unlockDay&&state.day<STEP_DEFS[state.currentStep].unlockDay);
    sendPlayerToStation(state.currentStep);
  }
  renderControls();
}
function startPour(event,value){
  event.preventDefault();clearInterval(state.pourTimer);state.pourLevel=0;
  event.currentTarget.setPointerCapture?.(event.pointerId);
  state.pourTimer=setInterval(()=>{state.pourLevel=Math.min(100,state.pourLevel+2);const bar=$('#pour-progress');if(bar)bar.style.width=`${state.pourLevel}%`;if(state.pourLevel>=100)clearInterval(state.pourTimer);},30);
}
function finishPour(event,value){
  if(!state.pourTimer&&state.pourLevel===0)return;event.preventDefault();clearInterval(state.pourTimer);state.pourTimer=null;
  state.build.pourAccuracy=Math.max(0,1-Math.abs(75-state.pourLevel)/75);
  showToast(state.pourLevel>=65&&state.pourLevel<=85?'Rót trà chuẩn vạch!':state.pourLevel<65?'Rót hơi thiếu trà':'Rót hơi quá tay');
  chooseOption(value);state.pourLevel=0;
}
function resetBuild(){
  clearInterval(state.pourTimer);state.pourTimer=null;state.pourLevel=0;state.build={};
  const order=state.queue[0];STEP_DEFS.filter(step=>step.unlockDay&&state.day<step.unlockDay).forEach(step=>{if(order)state.build[step.id]=order[step.id];});
  state.currentStep=0;state.serving=false;sendPlayerToStation(0);renderControls();
}

function pauseTimers(){
  state.running=false;clearInterval(state.timerId);clearInterval(state.patienceId);
}

function renderQuizBadge(order){
  const badge=$('#quiz-badge');if(!badge||!order)return;
  badge.className=`quiz-badge ${order.quizDone?(order.quizCorrect?'good':'bad'):''}`;
  badge.textContent=order.quizDone?(order.quizCorrect?'✓ Ly này có lời':'✗ Ly này không có lời'):'? Chờ câu hỏi';
}

function nextQuiz(){
  if(!state.quizBag.length)state.quizBag=ENGLISH_QUIZZES.map((_,i)=>i).sort(()=>Math.random()-.5);
  return ENGLISH_QUIZZES[state.quizBag.pop()];
}

function maybeStartConversation(order){
  if(QUERY.get('nodialog')==='1'||!state.started||!order||order.quizDone||state.dialogueOpen||!$('#tutorial').classList.contains('hidden'))return false;
  state.dialogueOpen=true;state.currentDialogue=order;pauseTimers();
  const sprite=order.spriteIndex??1;$('#dialogue-avatar').style.setProperty('--sx',sprite%4);$('#dialogue-avatar').style.setProperty('--sy',Math.floor(sprite/4));
  $('#dialogue-name').textContent=order.customerName;
  $('#dialogue-result').classList.add('hidden');$('#quiz-form').classList.remove('hidden');
  const quiz=nextQuiz();order.quiz=quiz;$('#dialogue-line').textContent=quiz.q;
  const answers=[{text:quiz.a,correct:true},...quiz.wrong.map(text=>({text,correct:false}))].sort(()=>Math.random()-.5);
  $('#quiz-options').innerHTML=answers.map((answer,index)=>`<button type="button" class="quiz-option" data-correct="${answer.correct}"><b>${String.fromCharCode(65+index)}</b><span>${answer.text}</span></button>`).join('');
  $$('#quiz-options .quiz-option').forEach(button=>button.addEventListener('click',()=>answerEnglishQuiz(button.dataset.correct==='true',button)));
  $('#english-modal').classList.remove('hidden');playSound('tap');
  const auto=QUERY.get('quizauto');if(auto==='correct'||auto==='wrong')setTimeout(()=>$$('#quiz-options .quiz-option').find(button=>(button.dataset.correct==='true')===(auto==='correct'))?.click(),180);
  return true;
}

function answerEnglishQuiz(correct,selectedButton){
  const order=state.currentDialogue;if(!order||order.quizDone)return;
  order.quizDone=true;order.quizCorrect=correct;state.quizTotal++;if(correct)state.quizCorrect++;
  $$('#quiz-options .quiz-option').forEach(button=>{button.disabled=true;if(button.dataset.correct==='true')button.classList.add('correct');});
  selectedButton.classList.add(correct?'chosen-correct':'wrong');
  const tip=correct&&state.serviceUpgrades.marketing?2:0;
  if(tip){state.tips+=tip;state.money+=tip;state.cash+=tip;updateStats();}
  $('#dialogue-score').firstChild.textContent=correct?'✓':'×';$('#dialogue-score').querySelector('small').textContent=correct?'ĐÚNG':'SAI';$('#dialogue-score').style.background=correct?'#4f6c42':'#b55f50';
  $('#dialogue-verdict').textContent=correct?'Chính xác! Ly này sẽ có lời.':'Chưa đúng. Ly này chỉ thu đủ tiền vốn.';
  $('#dialogue-feedback').textContent=correct?'Pha đúng công thức để nhận trọn tiền lời nhé.':'Khách vẫn mua nhưng bạn không có lãi từ ly này.';
  $('#dialogue-correction').textContent=order.quiz.a;$('#dialogue-tip').textContent=correct?(tip?`+${money(tip)} tiền bo`:'Giữ nguyên tiền lời'):'Mất tiền lời của ly này';
  $('#dialogue-tip').style.color=correct?'#4f713f':'#a05b4d';$('#quiz-form').classList.add('hidden');$('#dialogue-result').classList.remove('hidden');
  renderQuizBadge(order);playSound(correct?'perfect':'wrong');
}

function finishConversation(){
  state.dialogueOpen=false;state.currentDialogue=null;$('#english-modal').classList.add('hidden');
  if(state.started)beginTimers();playSound('tap');
}

function advanceQueue(){state.queue.shift();state.queue.push(randomOrder());resetBuild();renderQueue();renderOrder();}

function serveDrink() {
  if($('#serve-btn').disabled||!state.running||state.serving)return;
  const order=state.queue[0],out=consumeOrderStock(order);
  if(out){showToast(`Hết ${out.name} — hãy đóng cửa và nhập thêm vào ngày mai.`);playSound('wrong');return;}
  state.serving=true;state.serveStart=performance.now();$('#serve-btn').disabled=true;
  const keys=['size','tea','milk','syrup','topping','ice'];
  const matches=keys.filter(k=>state.build[k]===order[k]).length,recipeAccuracy=matches/keys.length;
  const pourAccuracy=Number.isFinite(state.build.pourAccuracy)?state.build.pourAccuracy:.7,accuracy=recipeAccuracy*.88+pourAccuracy*.12;
  const menuBase=state.productPrices[order.productKey]??25,flavorPrice=state.productPrices[order.flavorKey]??0,toppingPrice=state.productPrices[order.toppingKey]??5,sizePrice=order.size==='Lớn'?(state.productPrices.largeSize??7):0,extras=flavorPrice+toppingPrice+sizePrice;
  const fullPrice=Math.max(5,(menuBase+extras)*(.45+accuracy*.55)+(state.patience/100)*2+state.cupUpgrade*2);
  const catalogCost=id=>ALL_PRODUCTS.find(item=>item.id===id)?.cost||0;
  const costPrice=catalogCost(order.productKey)+catalogCost(order.flavorKey)+catalogCost(order.toppingKey)+catalogCost(order.size==='Lớn'?'largeSize':'mediumSize');
  const profitable=order.quizCorrect||QUERY.get('nodialog')==='1',earned=profitable?fullPrice:Math.min(fullPrice,costPrice);
  if(!profitable)state.lostProfit+=Math.max(0,fullPrice-earned);
  state.money+=earned;state.cash+=earned;state.served++;state.ratingPoints.push(accuracy);
  if(recipeAccuracy===1&&pourAccuracy>=.86){state.perfect++;state.combo++;showToast(`Pha hoàn hảo! +${money(earned)}`);playSound('perfect');}
  else{state.combo=0;showToast(`Đúng ${matches}/6 mục · +${money(earned)}`);playSound(matches>=4?'good':'wrong');}
  if(!profitable)showToast(`Sai câu hỏi · ly này chỉ thu vốn ${money(earned)}`);
  updateStats();$('#combo').classList.toggle('hidden',state.combo<2);$('#combo').innerHTML=`HOÀN HẢO <b>x${state.combo}</b>`;
  setTimeout(()=>{
    state.serving=false;
    advanceQueue();
  },680);
}

function updatePatience(){const v=Math.max(0,state.patience);$('#patience-text').textContent=`${Math.round(v)}%`;$('#patience-bar').style.width=`${v}%`;$('#patience-bar').style.background=v<30?'#e0676b':v<60?'#f0b44c':'#7cc38a';}
function updateStats(){
  $('#money').textContent=money(state.money);
  const avg=state.ratingPoints.length?state.ratingPoints.reduce((a,b)=>a+b,0)/state.ratingPoints.length:1, rating=Math.max(2.5,2.5+avg*2.5), rounded=Math.round(rating);
  $('#rating').textContent=rating.toFixed(1).replace('.',',');$('#stars').textContent='★★★★★'.slice(0,rounded)+'☆☆☆☆☆'.slice(0,5-rounded);
}

function startNewGame(){
  state.day=1;state.cash=400;state.inventory=Object.fromEntries(STOCK_ITEMS.map(item=>[item.id,0]));state.inventoryExpiry={};state.expiredToday=0;
  state.tutorialSeen=false;state.productPrices=defaultProductPrices();state.unlockedProducts=defaultUnlockedProducts();state.milkTeaPrice=25;state.matchaPrice=30;state.speedUpgrade=0;state.cupUpgrade=0;state.serviceUpgrades={fridge:0,staff:false,marketing:false};state.activeStockCategory='tea';state.activeUpgradeCategory='tea';state.activePriceCategory='tea';state.history=[];state.lastReview=null;
  initDailyPlan();showPrep();playSound('open');
}
function openShop(){
  const missing=missingStock();if(missing.length){showPrepToast(`Chưa thể mở cửa, còn thiếu: ${missing.map(item=>item.name).join(' · ')}`);return;}
  $('#prep-screen').classList.add('hidden');$('#result-screen').classList.add('hidden');$('#game-screen').classList.remove('hidden');
  state.started=true;state.running=false;state.serving=false;state.money=0;state.served=0;state.perfect=0;state.combo=0;state.ratingPoints=[];state.seconds=SHIFT_SECONDS;state.orderIndex=1;state.tips=0;state.quizCorrect=0;state.quizTotal=0;state.lostProfit=0;state.dialogueOpen=false;state.currentDialogue=null;
  clearInterval(state.timerId);clearInterval(state.patienceId);resetQueue();renderQueue();renderOrder();updateStats();updateTimer();renderStockStrip();
  $('#game-day-label').textContent=`Ngày ${state.day}`;
  state.player.x=0;resizeCanvas();resetBuild();playSound('open');
  if(!state.tutorialSeen){state.tutorialSeen=true;$('#tutorial').classList.remove('hidden');}else beginTimers();
}
function beginTimers(){
  if(state.running||state.dialogueOpen||!state.started)return;state.running=true;
  state.timerId=setInterval(()=>{state.seconds--;updateTimer();if(state.seconds<=0)endShift();},1000);
  state.patienceId=setInterval(()=>{if(state.running){state.patience-=Math.max(.22,.7-state.speedUpgrade*.13-(state.serviceUpgrades.staff?.1:0));updatePatience();}},500);
}
function updateTimer(){
  const m=Math.floor(state.seconds/60),s=state.seconds%60;$('#timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const elapsed=(SHIFT_SECONDS-state.seconds)/SHIFT_SECONDS,gameMinutes=11*60+Math.floor(elapsed*660/5)*5,hour=Math.min(22,Math.floor(gameMinutes/60)),minute=gameMinutes%60;
  $('#game-phase-label').textContent=`${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
}
function endShift(){
  if(!state.started)return;state.started=false;state.dialogueOpen=false;state.currentDialogue=null;pauseTimers();$('#close-modal').classList.add('hidden');$('#english-modal').classList.add('hidden');$('#game-screen').classList.add('hidden');$('#result-screen').classList.remove('hidden');
  state.cash-=state.rent;
  const avg=state.ratingPoints.length?state.ratingPoints.reduce((a,b)=>a+b,0)/state.ratingPoints.length:0,rating=state.served?Math.max(2.5,2.5+avg*2.5):3,rounded=Math.round(rating);
  $('#result-money').textContent=money(state.money);$('#result-served').textContent=state.served;$('#result-perfect').textContent=state.perfect;$('#result-rating').textContent=rating.toFixed(1).replace('.',',');$('#result-tips').textContent=`${state.quizCorrect}/${state.quizTotal}`;$('#result-conversations').textContent=money(state.lostProfit);
  const totalCost=state.dailyCost+state.rent,profit=state.money-totalCost;
  $('#result-cost').textContent=money(totalCost);$('#result-profit').textContent=`${profit<0?'−':''}${money(Math.abs(profit))}`;$('#result-profit').style.color=profit<0?'#b65449':'#4f6c42';
  $('#result-stars').textContent='★★★★★'.slice(0,rounded)+'☆☆☆☆☆'.slice(0,5-rounded);
  const reviewer=state.queue[0]||people[0],reviewerName=reviewer.customerName||reviewer.name;
  $('#review-name').textContent=`${reviewerName} đã để lại đánh giá`;
  const reviewText=(state.perfect?'Nguyên liệu tươi, vị ngọt vừa phải, ngon lắm!':state.served?'Tiệm nhỏ xinh, lần sau mình sẽ ghé nữa.':'Khu vườn trà hôm nay trông thật đẹp.');
  $('#review-text').textContent=`“${reviewText}”`;
  state.lastReview={name:reviewerName,text:reviewText,stars:rounded,day:state.day};
  state.history.push({day:state.day,served:state.served,rating,tips:state.tips,revenue:state.money,cost:totalCost,profit});
  playSound('close');
}
function expireStockForDay(day){
  state.expiredToday=0;
  STOCK_ITEMS.forEach(item=>{if((state.inventory[item.id]||0)>0&&day>(state.inventoryExpiry[item.id]??Infinity)){state.expiredToday+=state.inventory[item.id];state.inventory[item.id]=0;delete state.inventoryExpiry[item.id];}});
}
function nextDay(){state.day++;expireStockForDay(state.day);initDailyPlan();showPrep();if(state.expiredToday)showPrepToast(`${state.expiredToday} phần nguyên liệu đã hết hạn và được bỏ đi. Hãy nhập hàng tươi cho ngày mới.`);}
function requestClose(){
  if(!state.running)return;pauseTimers();$('#close-modal').classList.remove('hidden');playSound('tap');
}
function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timeout);showToast.timeout=setTimeout(()=>toast.classList.remove('show'),1700);}

let audioContext;
function playSound(type){
  if(!state.sound)return;
  try{audioContext||=new(window.AudioContext||window.webkitAudioContext)();const now=audioContext.currentTime,notes={tap:[520,.055],seal:[330,.09],good:[440,.12],wrong:[170,.16],open:[390,.12],close:[330,.16],perfect:[660,.11]},[frequency,duration]=notes[type]||notes.tap;
    const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type=type==='wrong'?'triangle':'sine';osc.frequency.setValueAtTime(frequency,now);if(type==='perfect')osc.frequency.exponentialRampToValueAtTime(990,now+duration);
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.09,now+.01);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);osc.connect(gain).connect(audioContext.destination);osc.start(now);osc.stop(now+duration+.02);
  }catch{/* Sound is optional. */}
}
function closeTutorial(){$('#tutorial').classList.add('hidden');if(!maybeStartConversation(state.queue[0]))beginTimers();playSound('tap');}

canvas.addEventListener('pointerdown',event=>{
  const rect=canvas.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
  const hit=state.stationRects.findIndex(r=>x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h);if(hit>=0)selectStep(hit);
});
$('#start-btn').addEventListener('click',startNewGame);$('#again-btn').addEventListener('click',nextDay);$('#serve-btn').addEventListener('click',serveDrink);
$('#stock-btn').addEventListener('click',buyStock);$('#open-shop-btn').addEventListener('click',openShop);
$('#capital-input').addEventListener('input',event=>{state.dailyCapital=Math.max(0,Math.min(state.cash,Number(event.target.value)||0));renderPrep();});
$('#close-shop-btn').addEventListener('click',requestClose);$('#confirm-close-btn').addEventListener('click',endShift);$('#keep-open-btn').addEventListener('click',()=>{$('#close-modal').classList.add('hidden');beginTimers();});
$('#clear-btn').addEventListener('click',()=>{resetBuild();playSound('tap');});$('#got-it-btn').addEventListener('click',closeTutorial);$('#close-tutorial').addEventListener('click',closeTutorial);
$('#help-btn').addEventListener('click',()=>{pauseTimers();$('#tutorial').classList.remove('hidden');});
$('#continue-dialogue-btn').addEventListener('click',finishConversation);
$$('[data-management-tab]').forEach(button=>button.addEventListener('click',()=>setManagementTab(button.dataset.managementTab)));
$$('[data-stock-category]').forEach(button=>button.addEventListener('click',()=>setStockCategory(button.dataset.stockCategory)));
$$('[data-sound]').forEach(button=>button.addEventListener('click',()=>{state.sound=!state.sound;$$('[data-sound]').forEach(item=>item.classList.toggle('off',!state.sound));if(state.sound)playSound('tap');}));

window.addEventListener('resize',resizeCanvas);new ResizeObserver(resizeCanvas).observe($('#scene-wrap'));resizeCanvas();requestAnimationFrame(animate);
if(QUERY.get('play')==='1')setTimeout(()=>{startNewGame();STOCK_ITEMS.forEach(item=>state.inventory[item.id]=12);state.cash=300;state.dailyCost=100;openShop();closeTutorial();const previewStep=Number(QUERY.get('step'));if(Number.isInteger(previewStep)&&previewStep>=0&&previewStep<STEP_DEFS.length){state.currentStep=previewStep;renderControls();}},80);
if(QUERY.get('prep')==='1')setTimeout(()=>{startNewGame();const tab=QUERY.get('tab');if(tab&&['stock','upgrades','prices','reviews','summary'].includes(tab))setManagementTab(tab);},80);
