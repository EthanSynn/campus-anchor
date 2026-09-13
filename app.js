const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const PROFILE_KEY = 'campus-anchor.profile';
const defaultProfile = { persona: 'male', expectation: '', growthEntry: false };
let profile = { ...defaultProfile, ...JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}') };

const showToast = (message) => { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); };
const saveProfile = () => localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

const syncPersona = (persona = profile.persona) => {
  profile.persona = persona === 'female' ? 'female' : 'male';
  saveProfile();
  const avatar = $('#ai-avatar');
  if (avatar && window.AssetRegistry) { avatar.dataset.persona = profile.persona; window.AssetRegistry.renderAvatar(avatar); }
  $$('.persona-button').forEach((button) => button.classList.toggle('active', button.dataset.personaSwitch === profile.persona));
};

const switchView = (view) => {
  $$('.view').forEach((item) => item.classList.remove('active-view'));
  $(`#view-${view}`).classList.add('active-view');
  $$('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === view));
  $('.main-content').classList.toggle('ai-mode', view === 'ai');
  $('#page-title').textContent = view === 'home' ? '你好，林夏' : view === 'ai' ? '大智能体' : '日记';
  if (view === 'ai') syncPersona();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openProfileModal = (settings = false) => {
  $('#profile-modal').classList.add('open');
  $('#profile-answer').value = profile.expectation || '';
  const eyebrow = $('#profile-modal-eyebrow');
  const title = $('#profile-modal-title');
  const description = $('#profile-modal-description');
  if (eyebrow) eyebrow.textContent = settings ? '个人设置 · 专属 AI' : '你的大学起点 · 01 / 05';
  if (title) title.textContent = settings ? '更换你的专属 AI' : '先从一个真实问题开始。';
  if (description) description.textContent = settings ? '选择后，大智能体空间会立即切换到对应形象。' : '你对大学最期待的是什么？不用想得很完整，写下第一反应就好。';
  if (!$('.persona-choice')) {
    const choice = document.createElement('div');
    choice.className = 'persona-choice';
    choice.innerHTML = '<span class="choice-label">选择你的专属 AI</span><div class="persona-choice-buttons" role="group" aria-label="选择你的专属 AI"><button type="button" class="persona-choice-button" data-persona-choice="male">男 AI</button><button type="button" class="persona-choice-button" data-persona-choice="female">女 AI</button></div>';
    $('#save-profile').before(choice);
    choice.querySelectorAll('[data-persona-choice]').forEach((button) => button.addEventListener('click', () => { profile.persona = button.dataset.personaChoice; choice.querySelectorAll('.persona-choice-button').forEach((item) => item.classList.toggle('active', item === button)); }));
  }
  $$('.persona-choice-button').forEach((button) => button.classList.toggle('active', button.dataset.personaChoice === profile.persona));
};

if (window.AssetRegistry) $$('[data-visual-asset="ai-avatar"]').forEach((element) => window.AssetRegistry.renderAvatar(element));
syncPersona();
$$('.nav-item').forEach((item) => item.addEventListener('click', () => switchView(item.dataset.view)));
$$('[data-persona-switch]').forEach((button) => button.addEventListener('click', () => { syncPersona(button.dataset.personaSwitch); showToast(profile.persona === 'female' ? '已切换为女 AI 形象' : '已切换为男 AI 形象'); }));
$$('[data-persona-choice]').forEach((button) => button.addEventListener('click', () => { profile.persona = button.dataset.personaChoice; $$('.persona-choice-button').forEach((item) => item.classList.toggle('active', item === button)); }));
$('#settings-button').addEventListener('click', () => openProfileModal(true));
$('#theme-toggle').addEventListener('click', () => { document.body.classList.toggle('dark'); showToast(document.body.classList.contains('dark') ? '已切换到深色模式' : '已切换到浅色模式'); });
$('#start-profile').addEventListener('click', () => openProfileModal(false));
$$('[data-close]').forEach((item) => item.addEventListener('click', () => $('#profile-modal').classList.remove('open')));
$('#profile-modal').addEventListener('click', (event) => { if (event.target.id === 'profile-modal') event.currentTarget.classList.remove('open'); });
$('#save-profile').addEventListener('click', () => { if (!$('#profile-answer').value.trim() && !profile.expectation) { showToast('写下一句话，就从这里开始'); return; } profile.expectation = $('#profile-answer').value.trim(); saveProfile(); syncPersona(); $('#profile-modal').classList.remove('open'); showToast('个人 Profile 已更新'); });
$('#open-radar').addEventListener('click', () => { switchView('ai'); addMessage('user', '帮我找适合我的机会'); respond('我先按你的年级、信息管理专业和“想获得实践经历”来筛选。现在最适合你的不是报名最多的比赛，而是准备周期足够、能让你和队友一起做出作品的机会。'); });
$('#open-diary').addEventListener('click', () => switchView('diary'));
$('#add-diary').addEventListener('click', () => { const text = prompt('想记录哪一件大学里的事？'); if (text && text.trim()) showToast('已生成成长记录草稿，请确认后保存'); });
$$('[data-opportunity]').forEach((button) => button.addEventListener('click', () => { switchView('ai'); addMessage('user', '为什么推荐这个机会给我？'); respond('因为你现在处于新生适应期，又明确想获得实践经历。这个机会的准备周期约 3 周，足够让你先了解规则、找队友，再决定是否投入。下一步：先打开官方介绍，记下你感兴趣的方向。'); }));
const addMessage = (type, text) => { const message = document.createElement('div'); message.className = `message ${type}`; message.innerHTML = type === 'ai' ? `<div class="message-mark">•</div><div>${text}</div>` : `<div>${text}</div>`; $('#chat-log').appendChild(message); $('#chat-log').scrollTop = $('#chat-log').scrollHeight; };
const respond = (text) => setTimeout(() => addMessage('ai', text), 450);
const addChoice = (label, action) => { const wrap = document.createElement('div'); wrap.className = 'choice-row'; wrap.innerHTML = `<button data-choice="${action}">${label}</button>`; $('#chat-log').appendChild(wrap); };
const showScenario = () => { addMessage('ai', '场景：你第一次走到校园 AI 社团的招新摊位前。学长问：“你之前做过什么项目吗？”没有唯一正确的回答，你想怎么开始？'); addChoice('A 直接说：我还没有，但我想试试', 'honest'); addChoice('B 先询问社团最近在做什么', 'observe'); addChoice('C 介绍暑假做过的 Agent', 'share'); };
const saveGrowthRecord = () => { if ($('#growth-entry')) return; const entry = document.createElement('div'); entry.className = 'diary-entry'; entry.id = 'growth-entry'; entry.innerHTML = '<span class="timeline-date">刚刚<br /><b>09.12</b></span><div class="entry-card"><span class="tag green">场景复盘</span><h3>第一次主动介绍自己的 Agent</h3><p>我把暑假做过的事情带进了新的关系里，也迈出了第一次主动尝试。</p><span class="entry-meta">AI 复盘 · 用户已确认</span></div>'; $('#diary-timeline').prepend(entry); profile.growthEntry = true; saveProfile(); showToast('已确认，成长事件已加入档案'); };
$('#chat-log').addEventListener('click', (event) => { const button = event.target.closest('[data-choice]'); if (!button) return; const choice = button.dataset.choice; if (choice === 'save-growth') { saveGrowthRecord(); setTimeout(() => { addMessage('ai', '已经保存好了。它现在会出现在你的成长时间线里。'); addChoice('查看成长档案', 'open-diary'); }, 300); return; } if (choice === 'open-diary') { switchView('diary'); return; } if (choice === 'skip-growth') { showToast('好的，这次经历不会被保存'); addMessage('ai', '好的，我不会把这次经历保存到你的长期档案。'); return; } const text = { honest:'我还没有，但我想试试', observe:'我先问问社团最近在做什么', share:'我暑假独立做过一个 Agent' }[choice]; addMessage('user', text); const review = { honest:'这是一个诚实又开放的开始。它把“我还不会”变成了“我愿意参与”，对第一次加入社团来说很有效。', observe:'这是一个低压力的探索方式。你先获取上下文，再判断这个社团是否适合你，适合还不确定方向的阶段。', share:'你把已经做过的事情带进了新的关系里。它不只是展示能力，也给了对方一个可以继续追问的具体入口。' }[choice]; setTimeout(() => { addMessage('ai', review + ' 这次选择要记录进你的成长档案吗？'); addChoice('确认记录这次尝试', 'save-growth'); addChoice('先不记录', 'skip-growth'); }, 450); });
$$('[data-prompt]').forEach((button) => button.addEventListener('click', () => { const promptText = button.dataset.prompt; addMessage('user', promptText); if (promptText === '模拟第一次参加社团') { showScenario(); return; } const replies = { '我大一现在最应该做什么？':'结合你现在的新生阶段和想获得实践经历的目标，我建议先完成一次低成本尝试：选一个准备周期合适的机会，和一个同学聊聊，再决定要不要参加。', '帮我找适合我的机会':'我筛到了 2 个机会。最匹配的是创新创业训练计划：它不要求你马上有成熟想法，适合先从观察问题、寻找队友开始。', '记录我今天的一个小变化':'我注意到你今天开始认真想象自己的大学了。这可能是一个值得留下的起点，要把它记录进你的成长档案吗？' }; respond(replies[promptText] || '我会结合你的大学阶段、当前目标和最近经历，帮你找到更具体的下一步。'); }));
$('#chat-form').addEventListener('submit', (event) => { event.preventDefault(); const input = $('#chat-input'); const text = input.value.trim(); if (!text) return; addMessage('user', text); input.value = ''; respond('我会先理解你现在所处的阶段，再给出可行动的建议。这个 Demo 当前连接的是可控演示模式，正式版会接入你的学校资料和真实机会库。'); });
