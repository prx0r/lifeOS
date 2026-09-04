const MS_HOUR = 60 * 60 * 1000;
const MS_DAY = 24 * MS_HOUR;
const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
const fmt1 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

const stages = [
  {
    min: 13, max: 17, label: "Teens", title: "Rapid calibration", summary: "A period of fast biological, social and identity development. Reward sensitivity and peer context can carry unusual weight while self-regulation is still improving.",
    brain: "Executive functions improve rapidly across adolescence; large datasets show especially fast development from roughly 10–15, with adult-level performance on many executive tasks emerging by about 18–20.",
    mind: "Identity exploration is normal. Values, relationships, education and possible futures are being tested rather than permanently settled.",
    body: "Growth, bone accumulation and hormonal maturation dominate. Sleep need is higher than in adulthood: adolescents are generally advised to get 8–10 hours.",
    focus: "Protect sleep, movement, relationships and learning. Avoid turning temporary experimentation into irreversible harm."
  },
  {
    min: 18, max: 24, label: "18–24", title: "Exploration with increasing control", summary: "Adult independence expands faster than certainty. This is a high-optionality period: exploration can be useful, but habits and commitments start compounding.",
    brain: "Many executive functions are at adult-like levels by late adolescence, while learning, connectivity and experience-dependent brain change continue.",
    mind: "Identity research describes adolescence and early adulthood as an ongoing mix of exploration and commitment. Different domains—work, relationships, worldview—often settle at different speeds.",
    body: "Peak bone mass is largely being consolidated in the 20s. Physical capacity is high, but sleep loss, inactivity, smoking and heavy alcohol still carry cumulative costs.",
    focus: "Explore deliberately, build skill capital, strengthen your body, learn money basics, and notice which experiments repeatedly make life better."
  },
  {
    min: 25, max: 34, label: "25–34", title: "Selection starts to matter", summary: "The problem increasingly shifts from discovering that many lives are possible to deciding which life deserves sustained investment.",
    brain: "There is no scientific cliff at 25. Cognitive abilities follow different curves; experience and knowledge continue accumulating even as some speed-based abilities eventually soften.",
    mind: "On average, personality becomes more stable in young adulthood, while longitudinal studies still find meaningful change—especially gains in emotional stability and other maturity-related traits.",
    body: "Muscle mass and strength commonly peak around 30–35. Bone mass is near its lifetime peak. This is an unusually good window to build strength, aerobic capacity and movement habits as future reserve.",
    focus: "Convert insight into commitments. Build a body you can maintain, choose work worth compounding, and make your desired future concrete enough to schedule."
  },
  {
    min: 35, max: 44, label: "35–44", title: "Compounding and constraint", summary: "Time, family, work and health constraints often become more visible. The upside is increasing skill, self-knowledge and the ability to say no.",
    brain: "Knowledge and domain expertise can keep growing. Some aspects of processing speed may decline gradually, while vocabulary and accumulated knowledge often remain strong or improve.",
    mind: "Personality remains changeable. Many adults become more selective about roles and commitments, though there is no universal psychological 'midlife crisis.'",
    body: "Age-related losses are usually gradual, not sudden. Strength training, aerobic work, healthy weight, sleep and blood-pressure control increasingly function as maintenance of future capacity.",
    focus: "Audit what is actually compounding. Preserve muscle and cardio fitness, reduce chronic stressors, and stop funding goals you no longer believe in."
  },
  {
    min: 45, max: 54, label: "45–54", title: "Protect the machine", summary: "Differences in accumulated habits become easier to see. Prevention and maintenance produce larger dividends because recovery and redundancy matter more.",
    brain: "Normal aging can bring subtle changes in speed and multitasking, but learning remains possible and knowledge can offset slower processing in familiar domains.",
    mind: "Research on wellbeing is mixed on a universal midlife low. Individual trajectories vary substantially with health, work, relationships and context.",
    body: "Muscle, bone, metabolic and cardiovascular risks deserve more active management. For women, the menopausal transition can materially affect bone, sleep and other health domains.",
    focus: "Treat prevention as infrastructure: strength, aerobic fitness, sleep, clinical screening, mobility where needed, and relationships that reduce rather than create chronic strain."
  },
  {
    min: 55, max: 64, label: "55–64", title: "Selectivity becomes a feature", summary: "The value of time often becomes more salient. Experience can improve judgment about what deserves attention, even as physical reserve becomes more important to defend.",
    brain: "Word-finding and divided attention may become slower for some people, while vocabulary, semantic knowledge and expertise can remain strong.",
    mind: "Lifespan motivation research predicts increasing preference for emotionally meaningful goals as future time feels more limited—not because curiosity disappears, but because priorities sharpen.",
    body: "Sarcopenia and bone loss become more relevant risks. Resistance training and sufficient activity help preserve function and independence.",
    focus: "Design the next decades rather than merely retire from the previous ones. Maintain strength, challenge the brain, protect close relationships and simplify low-value obligations."
  },
  {
    min: 65, max: 74, label: "65–74", title: "Function is the asset", summary: "Chronological age becomes a weaker description of actual capacity. People of the same age can differ dramatically in fitness, cognition, disease burden and independence.",
    brain: "Normal aging can mean slower recall, attention or multitasking without implying dementia. Neuroplasticity and the ability to learn remain present.",
    mind: "Older adults often report more selective social networks and greater emphasis on emotionally meaningful interactions. Emotional regulation may improve on average.",
    body: "Strength, balance and aerobic activity directly support mobility and fall prevention. Sleep timing often shifts earlier, but sleep need remains substantial.",
    focus: "Train for independence: legs, balance, carrying capacity, walking endurance, cognition, hearing/vision care and a social life with real contact."
  },
  {
    min: 75, max: 90, label: "75–90", title: "Preserve agency and meaning", summary: "Variation is enormous. The central question increasingly becomes how to preserve function, autonomy, social connection and meaning despite rising biological vulnerability.",
    brain: "Some cognitive slowing is common, but dementia is not a normal or inevitable consequence of aging. Many older adults continue learning and forming new memories.",
    mind: "When time horizons narrow, people often prioritize meaningful present experience and close relationships over broad future-oriented exploration.",
    body: "Frailty risk rises, so maintaining muscle, balance, nutrition, medication safety and fall prevention becomes disproportionately valuable.",
    focus: "Optimize for agency: movement, strength at an appropriate level, social contact, purpose, practical support, and environments that make good choices easy."
  }
];

const sources = [
  ["When Does Cognitive Functioning Peak? Different abilities peak at different ages (Psychological Science, 2015)", "https://pubmed.ncbi.nlm.nih.gov/25770099/"],
  ["A canonical trajectory of executive function maturation from adolescence to adulthood (Nature Communications, 2023)", "https://pubmed.ncbi.nlm.nih.gov/37903830/"],
  ["Personality stability and change: meta-analysis of longitudinal studies (Psychological Bulletin, 2022)", "https://pubmed.ncbi.nlm.nih.gov/35834197/"],
  ["National Institute on Aging — How the Aging Brain Affects Thinking", "https://www.nia.nih.gov/health/how-aging-brain-affects-thinking"],
  ["National Institute on Aging — Strength training and healthier bodies as we age", "https://www.nia.nih.gov/news/how-can-strength-training-build-healthier-bodies-we-age"],
  ["CDC — Adult physical activity guidelines", "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"],
  ["CDC — Sleep duration recommendations", "https://www.cdc.gov/sleep/about/"],
  ["NIAMS — Bone health and peak bone mass", "https://www.niams.nih.gov/health-topics/kids-and-their-bones"],
  ["Socioemotional Selectivity Theory: perceived endings and human motivation (2021)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8599276/"],
  ["Identity development in adolescence and early adulthood: decade review", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9298910/"],
  ["Physical Activity Guidelines for Americans — flexibility section", "https://odphp.health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf"],
  ["WHO — Healthy diet", "https://www.who.int/news-room/fact-sheets/detail/healthy-diet"],
  ["National Institute on Aging — Sleep and Older Adults", "https://www.nia.nih.gov/health/sleep/sleep-and-older-adults"],
  ["Reddit / AskOldPeople — health activities people wish they had started earlier", "https://www.reddit.com/r/AskOldPeople/comments/yu6mrx/any_health_related_activity_that_you_wished_you/"],
  ["Reddit / AskOldPeople — questions people wish they had asked their parents", "https://www.reddit.com/r/AskOldPeople/comments/18pygvh/what_questions_do_you_wish_you_had_asked_your/"],
  ["Reddit / AskOldPeople — reflections on home ownership", "https://www.reddit.com/r/AskOldPeople/comments/t45n4m/"],
  ["Reddit / GenX — what people would do differently", "https://www.reddit.com/r/GenX/comments/16rvkp0/genx_if_you_could_do_it_all_over_again_what_would/"],
  ["Reddit / AskOldPeople — work, overwork and hindsight", "https://www.reddit.com/r/AskOldPeople/comments/wxjzwx/"],
  ["Reddit / AskOldPeople — regrets and delayed experiences", "https://www.reddit.com/r/AskOldPeople/comments/r8f4cp/older_people_of_reddit_what_regrets_do_you_have/"],
  ["Reddit / AskOldPeople — travel and age-sensitive experiences", "https://www.reddit.com/r/AskOldPeople/comments/tyhcy0/"],
  ["Reddit / AskOldPeopleAdvice — advice for your 30s", "https://www.reddit.com/r/AskOldPeopleAdvice/comments/1elmlro/what_do_you_wish_you_knewdid_in_your_30s/"],
  ["Reddit / AskOldPeopleAdvice — decluttering and possessions", "https://www.reddit.com/r/AskOldPeopleAdvice/comments/1cwzfea/"],
  ["Reddit / AskOldPeople — preparing for later-life career fragility", "https://www.reddit.com/r/AskOldPeople/comments/11m9x2x/"],
  ["Reddit / AskOldPeople — yoga and mobility hindsight", "https://www.reddit.com/r/AskOldPeople/comments/lf2w5i/"],
  ["Reddit / AskOldPeople — balance, falls and physical limitations", "https://www.reddit.com/r/AskOldPeople/comments/1kx39hm/"],
  ["Reddit / AskOldPeopleAdvice — building social life before/after retirement", "https://www.reddit.com/r/AskOldPeopleAdvice/comments/1o0xf8k/"],
  ["Reddit / AskOldPeople — loneliness, volunteering and groups", "https://www.reddit.com/r/AskOldPeople/comments/omb2li/"],
  ["Reddit / over60 — relationship patterns and hindsight", "https://www.reddit.com/r/over60/comments/1l0qo0z/"],
  ["Reddit / AskOldPeople — long friendships and friendship change", "https://www.reddit.com/r/AskOldPeople/comments/1iraiic/"],
  ["Reddit / AskOldPeople — learning to cook", "https://www.reddit.com/r/AskOldPeople/comments/1jvmkay/"],
  ["Reddit / AskOldPeople — wills and life administration", "https://www.reddit.com/r/AskOldPeople/comments/1l9july/"],
  ["Reddit / AskOldPeople — what people over 60 wish they had done", "https://www.reddit.com/r/AskOldPeople/comments/1clk3ss/"],
  ["Reddit / Life — what becomes better with age", "https://www.reddit.com/r/Life/comments/1ij0m4v/"],
  ["Reddit / AskReddit — older people on waiting to feel ready", "https://www.reddit.com/r/AskReddit/comments/1rkqkm9/older_folks_of_reddit_what_do_you_regret_not/"],
  ["Reddit / AskOldPeopleAdvice — older-adult meaning-of-life discussion", "https://www.reddit.com/r/AskOldPeopleAdvice/comments/1uz9xkq/"]
];

const universalActions = [
  ["Train aerobic capacity", "Aim for at least 150 min/week of moderate activity (or 75 min vigorous, or a mix). More can add benefit if appropriate for you."],
  ["Lift twice a week", "Work all major muscle groups on at least 2 days/week. Preserve the ability to squat, hinge, push, pull, carry and get off the floor."],
  ["Use your range", "Include regular mobility or stretching if range of motion is limiting you. Stretching improves flexibility; it is not a substitute for strength or aerobic training."],
  ["Protect sleep", "Most adults need at least 7 hours; older adults generally still need roughly 7–9. Persistent sleep problems deserve attention."],
  ["Eat mostly minimally processed food", "Prioritize vegetables, fruit, legumes, whole grains, nuts and adequate protein; WHO advises at least 400 g fruit and vegetables/day for people over 10."],
  ["Do not outsource meaning", "Keep one long-horizon project, craft or relationship that you would still value if status metrics disappeared. This is a planning principle, not a medical claim."]
];

const principleCategories = [
  {
    id: "life", label: "Life principles", intro: "The repeated meta-lessons: protect optionality, act before certainty arrives, and distinguish compounding assets from closing windows.",
    items: [
      ["Do not wait to feel ready", "Confidence is often an output of action, not an entry requirement. Older adults repeatedly regret postponing moves, projects and experiences until a mythical future self felt prepared.", "Especially valuable: teens–30s"],
      ["Preserve optionality", "Health, savings, portable skills, low fixed costs and good relationships preserve the ability to change direction. Debt, chronic ill-health and destructive entanglements reduce it.", "All adulthood"],
      ["Care less about the ambient audience", "Later-life respondents often describe reduced concern with social judgment as liberating. Take criticism from people with wisdom or consequences; ignore imaginary spectators.", "20s onward"],
      ["Do not use the present as a waiting room", "Invest in the future without postponing every meaningful experience until retirement. Some opportunities become physically or socially harder later.", "All adulthood"],
      ["Choose what deserves compounding", "In the late 20s and 30s, the high-leverage shift is from sampling possibilities to sustained investment in a few things that actually matter.", "25–40"]
    ]
  },
  {
    id: "material", label: "Material", intro: "Money is most valuable as freedom and resilience, not as a scoreboard.",
    items: [
      ["Automate compounding early", "Regular saving and investing reduce dependence on heroic later catch-up. The amount can rise with income; the habit should begin before income feels abundant.", "20s onward"],
      ["Keep fixed costs below your freedom threshold", "A lifestyle that requires constant high income can trap you even when headline earnings are impressive.", "20s–50s"],
      ["Prefer enabling assets over maintenance-heavy status objects", "Older adults often value what money let them do—leave, retire, travel, help family—more than the objects accumulated along the way.", "All adulthood"],
      ["Housing should support the life", "Property can create security and equity, but it is not a universal commandment. Avoid allowing housing to consume the flexibility it was meant to create.", "Late 20s onward"],
      ["Build income that is portable", "Career fragility and age discrimination make ownership, specialist reputation, investments and portable skills more valuable with age.", "30s–50s"]
    ]
  },
  {
    id: "body", label: "Body", intro: "The body advice is boring because the fundamentals work: strength, aerobic capacity, mobility, sleep, nutrition, teeth and prevention.",
    items: [
      ["Train for the 80-year-old version of you", "Build the capacity to walk, carry, climb stairs, get off the floor and catch yourself. Aesthetic goals are optional; functional reserve is not.", "Start now"],
      ["Make strength a lifelong habit", "Muscle and strength are reserve. Resistance training remains useful well into later life.", "20s onward"],
      ["Protect aerobic capacity", "Cardiorespiratory fitness supports health, travel, work capacity and later independence.", "All adulthood"],
      ["Use full ranges of motion", "Mobility and stretching can improve range of motion. Pair them with strength through usable ranges rather than treating stretching as magic injury prevention.", "All adulthood"],
      ["Take teeth seriously", "Dental care is one of the most repetitive mundane regrets in older-person hindsight threads. Brush, floss and get preventive care.", "Immediately"],
      ["Prevention has delayed feedback", "Sleep, blood pressure, weight, hearing, vision and clinical screening feel low-drama until the consequences of neglect are expensive or irreversible.", "Increasingly with age"]
    ]
  },
  {
    id: "relationships", label: "Relationships", intro: "The recurring lesson is not 'marry' or 'have children.' It is to choose relationships deliberately and build social infrastructure before you need it.",
    items: [
      ["Choose partners by character and compatibility", "Attraction matters, but values, emotional stability, reliability and conflict style have far larger long-term consequences.", "Dating years"],
      ["Believe repeated behavior", "Do not let fear of being alone keep you in patterns of chronic betrayal, abuse, addiction or irresponsibility.", "Whenever relevant"],
      ["Build recurring friendship infrastructure", "Clubs, classes, volunteering, regular meals, religious communities and activity groups survive life transitions better than passive contact lists.", "20s onward"],
      ["Let some friendships end cleanly", "Not every relationship must last forever. Longevity is not the same as quality.", "All adulthood"],
      ["Interview your parents and elders", "Family history and ordinary memories become unrecoverable after people die. Record stories before urgency arrives.", "Do this earlier than feels necessary"]
    ]
  },
  {
    id: "practical", label: "Practical", intro: "Later-life autonomy rests on mundane competence built long before it becomes urgent.",
    items: [
      ["Learn to cook", "Cooking improves cost control, nutrition, independence and hospitality simultaneously.", "Teens–20s"],
      ["Understand personal finance and contracts", "Know taxes, insurance, debt, investing, basic legal obligations and how to read what you sign.", "20s"],
      ["Know basic first aid and maintenance", "Small practical capabilities prevent unnecessary dependence and make unfamiliar environments easier to navigate.", "20s onward"],
      ["Keep your admin legible", "Passwords, beneficiaries, insurance, documents and eventually wills/health directives should be organized so another human can understand them.", "Build gradually"],
      ["Acquire skills before buying systems", "Practical knowledge remains useful when tools, jobs, platforms and living arrangements change.", "All adulthood"]
    ]
  },
  {
    id: "spiritual", label: "Spiritual", intro: "Older adults disagree metaphysically, but the language of meaning clusters around love, usefulness, curiosity, service, presence and fewer unnecessary dramas.",
    items: [
      ["Build meaning that survives status loss", "Keep practices, people and projects that would matter even if nobody was impressed by them.", "All adulthood"],
      ["Learn to tolerate stillness", "A life that only feels alive under novelty, stimulation or achievement becomes fragile when circumstances narrow.", "20s onward"],
      ["Peace can become more valuable than intensity", "Many older respondents describe increasing preference for calm, close relationships and emotionally meaningful activity.", "Often rises with age"],
      ["Acceptance is compatible with agency", "Good decisions cannot remove luck, illness, death or loss. Act deliberately without demanding that life validate every decision.", "All adulthood"],
      ["Be useful", "Service and contribution repeatedly appear in older adults' descriptions of a meaningful life, even when their metaphysical beliefs differ.", "All adulthood"]
    ]
  }
];

const age27Priorities = [
  ["01", "Create a reliable income floor", "The first requirement for a chosen life is not wealth but non-fragile cash flow. Build work that is portable and can survive geography, employers and market shifts.", "Freedom"],
  ["02", "Automate saving and investing", "Even small automatic contributions buy future optionality. Increase the percentage as income rises rather than waiting for a perfect salary.", "Money"],
  ["03", "Build physical reserve", "2+ strength sessions, 150+ aerobic minutes, regular walking and usable mobility. You are near a strong biological window for building muscle, bone and work capacity.", "Body"],
  ["04", "Make Hindi daily, not aspirational", "A language compounds through exposure. A modest daily floor plus real conversations creates far more future integration than occasional bursts.", "Language"],
  ["05", "Prototype the life before buying it", "Spend time in the places and rhythms you think you want. Learn what rural living, heat, monsoon, bureaucracy, isolation, maintenance and animal care actually feel like.", "Reality testing"],
  ["06", "Accumulate practical rural competence", "Gardening, soil, basic repairs, water systems, animal husbandry, cooking, first aid and maintenance all reduce the gap between fantasy and viable autonomy.", "Practical"],
  ["07", "Keep fixed costs low", "Low burn converts volatile income into runway and makes experimentation safer. Lifestyle inflation is an optionality tax.", "Freedom"],
  ["08", "Deepen a few relationships", "You do not need a conventional family structure, but you do need people. Maintain a handful of durable friendships and learn to participate in recurring communities.", "Relationships"],
  ["09", "Record family history", "Talk to parents and older relatives now. This is a classic closing-window task: the information cannot be reconstructed later.", "Closing window"],
  ["10", "Protect teeth, sleep and basic prevention", "The boring maintenance category is where hindsight is unusually consistent. Make it automatic while nothing is wrong.", "Maintenance"],
  ["11", "Choose one craft worth a decade", "Exploration has value, but by the late 20s some identity should come from sustained mastery rather than perpetual sampling.", "Skill"],
  ["12", "Practice enough stillness to know what you actually want", "A daily contemplative practice makes it easier to distinguish a durable preference from stimulation, social imitation or a temporary mood.", "Meaning"]
];

const weeklyHabits = [
  ["strength", "2+ strength sessions", "Body reserve"],
  ["cardio", "150+ min aerobic movement", "Cardio reserve"],
  ["mobility", "3 mobility / full-range sessions", "Movement"],
  ["hindi", "5+ Hindi sessions", "Integration"],
  ["income", "5 focused income / skill blocks", "Freedom"],
  ["practical", "1 practical land / food / repair skill block", "Future competence"],
  ["people", "1 deliberate friend/family/community touchpoint", "Relationships"],
  ["stillness", "5 contemplative sessions", "Meaning"]
];

const stageHindsight = {
  "Teens": {
    valuable: "Exploration, friendships, learning how to learn, sleep, movement and avoiding irreversible damage.",
    do: "Try many domains. Build basic fitness and study habits. Learn to cook and manage money. Keep curiosity wider than status competition.",
    closing: "Unstructured time with family, childhood friendships and the unusually forgiving window for low-stakes experimentation."
  },
  "18–24": {
    valuable: "Optionality: portable skills, low debt, travel, independence, friendship networks and a body that recovers quickly.",
    do: "Explore broadly but keep receipts: notice which environments repeatedly make you stronger, calmer and more useful. Begin automatic saving even if small.",
    closing: "Cheap/high-energy travel, easy relocation and years where experimentation has relatively low opportunity cost."
  },
  "25–34": {
    valuable: "Direction, physical reserve, compoundable work, savings, language/community roots, partner quality and practical competence.",
    do: "Choose a few things worth a decade. Lift, build aerobic capacity, keep fixed costs low, automate investing, deepen important relationships and prototype your desired way of living before committing heavily.",
    closing: "Time with healthy parents, peak recovery capacity, some forms of physically demanding travel, and fertility timelines if biological children are desired."
  },
  "35–44": {
    valuable: "Compounding systems: health maintenance, career resilience, stable relationships, financial runway and control over obligations.",
    do: "Protect muscle/cardio fitness, build income beyond one employer, actively maintain friendships and audit whether work/family commitments still match your values.",
    closing: "Parents may age quickly; young children if present change fast; career pivots remain possible but become more expensive when fixed obligations are high."
  },
  "45–54": {
    valuable: "Prevention, autonomy, employability, marriage/friendship maintenance, sleep and identity outside work.",
    do: "Take screening and risk factors seriously. Keep training. Reduce chronic relationship/work stress. Build the social and financial infrastructure for life after peak career years.",
    closing: "Some high-impact travel and physically demanding goals become less predictable; time with parents and older mentors may be limited."
  },
  "55–64": {
    valuable: "Health span, freedom from debt, purposeful retirement design, durable friendships and simplifying possessions/obligations.",
    do: "Retire toward something, not merely away from employment. Strengthen community before leaving workplace social structure. Do important travel while capacity is high.",
    closing: "The window for physically demanding bucket-list goals can narrow quickly after illness or injury, even in otherwise healthy people."
  },
  "65–74": {
    valuable: "Mobility, balance, purpose, close relationships, usable savings and environments that support independence.",
    do: "Treat legs, balance, hearing, vision, walking endurance and social contact as infrastructure. Spend money deliberately on time and experiences you can still use.",
    closing: "Do not assume the current level of mobility will persist for another decade; schedule meaningful physical experiences sooner."
  },
  "75–90": {
    valuable: "Agency, comfort, close people, meaningful activity, practical support, simplicity and passing on knowledge.",
    do: "Preserve movement and social contact at an appropriate level, simplify administration and possessions, record stories, ask for support early enough to retain choice.",
    closing: "Time itself is the dominant closing window. Optimize less for future status and more for present meaning, dignity and connection."
  }
};

const pathTo35 = [
  {age:"27", title:"Foundation", text:"Stabilize income. Automate saving. Train consistently. Make Hindi daily. Write the target lifestyle in concrete operational terms—cost, location, climate, land needs, animals, connectivity, healthcare and access."},
  {age:"28–29", title:"Prototype", text:"Spend meaningful time in northern India rather than only visiting. Test rural routines. Learn gardening, repairs, cooking, water/solar basics and animal care. Build local relationships and get Hindi into real conversation."},
  {age:"30–31", title:"Make work location-independent", text:"Push income away from a single employer or geography. Build specialist reputation, recurring clients/products, investments or other portable cash flows. Keep burn low enough that rural life is an option, not a financial emergency."},
  {age:"32–33", title:"Select the environment", text:"Know the region well enough to distinguish romantic image from lived preference. Trial longer rentals. Learn local property/lease realities, monsoon/water issues, veterinary access, markets, transport and community dynamics."},
  {age:"34–35", title:"Commit without trapping yourself", text:"Establish the place when income, local knowledge and practical competence make it robust. Preserve a cash runway and exit options. Add animals incrementally. A partner or children can fit the system if wanted; they are not required to make the system meaningful."}
];

const antiGoals = [
  ["Do not make the dream depend on one lucky payout", "Build it from recurring cash flow, savings and competence."],
  ["Do not buy complexity before learning the work", "Rent, volunteer, apprentice and prototype before acquiring land, livestock or expensive infrastructure."],
  ["Do not sacrifice the body to finance the future body", "The point of autonomy is less valuable if the route there destroys health."],
  ["Do not become socially isolated by accident", "Solitude can be chosen; isolation is different. Build community infrastructure alongside independence."],
  ["Do not confuse aesthetics with requirements", "Prioritize water, access, legal clarity, connectivity, climate resilience and maintenance before visual romance."],
  ["Do not postpone all joy until 35", "The route should already contain pieces of the destination: nature, language, animals, learning, autonomy and stillness."]
];

const form = document.querySelector('#birth-form');
const dateInput = document.querySelector('#birth-date');
const timeInput = document.querySelector('#birth-time');
const lifespanInput = document.querySelector('#lifespan');
const lifespanOutput = document.querySelector('#lifespan-output');
const dashboard = document.querySelector('#dashboard');
const nowSection = document.querySelector('#now');

lifespanInput.addEventListener('input', () => lifespanOutput.textContent = `${lifespanInput.value} years`);

function clampBirthDateInput() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.max = `${yyyy}-${mm}-${dd}`;
}
clampBirthDateInput();

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function anniversaryAtAge(birth, age) {
  const year = birth.getFullYear() + age;
  const month = birth.getMonth();
  const day = Math.min(birth.getDate(), daysInMonth(year, month));
  return new Date(year, month, day, birth.getHours(), birth.getMinutes(), birth.getSeconds(), birth.getMilliseconds());
}

function fullYearsBetween(birth, now) {
  let age = now.getFullYear() - birth.getFullYear();
  if (now < anniversaryAtAge(birth, age)) age--;
  return age;
}

function decimalAge(birth, now) {
  const age = fullYearsBetween(birth, now);
  const start = anniversaryAtAge(birth, age);
  const end = anniversaryAtAge(birth, age + 1);
  return age + Math.max(0, Math.min(1, (now - start) / (end - start)));
}

function readBirth() {
  if (!dateInput.value) return null;
  const [y, m, d] = dateInput.value.split('-').map(Number);
  const [hh, mm] = (timeInput.value || '12:00').split(':').map(Number);
  return new Date(y, m - 1, d, hh || 0, mm || 0, 0, 0);
}

function formatDate(d) {
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
function formatDateTime(d) {
  return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getStage(age) {
  if (age < 13) return stages[0];
  return stages.find(s => age >= s.min && age <= s.max) || stages[stages.length - 1];
}

function nextMilestones(birth, now, horizonAge) {
  const age = fullYearsBetween(birth, now);
  const special = [18, 20, 21, 25, 30, 35, 40, 50, 60, 65, 70, 75, 80, 85, 90, 100];
  const nextBirthdayAge = age + 1;
  const ages = [...new Set([nextBirthdayAge, ...special, horizonAge])]
    .filter(a => a > age && a <= Math.max(horizonAge, age + 1))
    .sort((a,b) => a-b);
  return ages.map(a => {
    const date = anniversaryAtAge(birth, a);
    return { age: a, date, days: Math.max(0, Math.ceil((date - now) / MS_DAY)) };
  });
}

function chapterCopy(decadeStart) {
  const map = {
    0: "Foundation: attachment, language, play and basic regulation are being built around you.",
    10: "Expansion: identity, peers, autonomy and experimentation accelerate while self-regulation is still developing.",
    20: "Option-rich adulthood: explore, then increasingly choose what deserves compounding effort.",
    30: "Compounding: skills, relationships, health and financial choices start showing their accumulated effects.",
    40: "Maintenance plus meaning: protect the systems that carry you while pruning obligations that no longer fit.",
    50: "Selectivity: experience can make priorities clearer; physical reserve deserves deliberate maintenance.",
    60: "Function and freedom: design for capability, relationships and purposeful use of time rather than age stereotypes.",
    70: "Agency: preserve strength, balance, cognition, social contact and environments that support independence.",
    80: "Presence and support: variability is huge; optimize for autonomy, connection, comfort and meaningful activity.",
    90: "Beyond the default horizon: longevity is individual. The model remains a planning aid, not a forecast."
  };
  return map[Math.min(90, Math.max(0, decadeStart))] || "A life stage with wide individual variation. Track function, values and context rather than age alone.";
}

function renderDashboard(birth) {
  const now = new Date();
  const horizonAge = Number(lifespanInput.value);
  const horizon = anniversaryAtAge(birth, horizonAge);
  const age = fullYearsBetween(birth, now);
  const ageDecimal = decimalAge(birth, now);
  const remainingMs = Math.max(0, horizon - now);
  const hoursLeft = remainingMs / MS_HOUR;
  const daysLeft = remainingMs / MS_DAY;
  const totalSpan = horizon - birth;
  const elapsed = Math.max(0, Math.min(totalSpan, now - birth));
  const percent = totalSpan > 0 ? (elapsed / totalSpan) * 100 : 100;

  const decadeStart = Math.floor(Math.max(0, age) / 10) * 10;
  const decadeEnd = decadeStart + 10;
  const decadeEndDate = anniversaryAtAge(birth, decadeEnd);
  const decadeStartDate = anniversaryAtAge(birth, decadeStart);
  const decadeRemaining = Math.max(0, decadeEndDate - now);
  const decadePct = Math.max(0, Math.min(100, ((now - decadeStartDate) / (decadeEndDate - decadeStartDate)) * 100));
  const milestones = nextMilestones(birth, now, horizonAge);
  const nextDecadeAge = Math.ceil((age + .00001) / 10) * 10;
  const nextMajor = milestones.find(m => m.age === nextDecadeAge) || milestones[0];

  document.querySelector('#age-title').textContent = age >= 0 ? `You are ${age} years old` : 'Birthday is in the future';
  document.querySelector('#as-of').textContent = `As of ${formatDateTime(now)} · browser local time`;
  document.querySelector('#hours-left').textContent = fmt.format(hoursLeft);
  document.querySelector('#days-left').textContent = fmt.format(daysLeft);
  document.querySelector('#decade-label').textContent = age >= 0 ? `Your ${decadeStart}s` : 'Current decade';
  document.querySelector('#decade-hours').textContent = fmt.format(decadeRemaining / MS_HOUR);
  document.querySelector('#milestone-days').textContent = nextMajor ? fmt.format(nextMajor.days) : '—';
  document.querySelector('#milestone-label').textContent = nextMajor ? `days until age ${nextMajor.age}` : 'days';
  document.querySelector('#saturdays-left').textContent = fmt.format(daysLeft / 7);
  document.querySelector('#life-percent').textContent = `${fmt1.format(percent)}%`;
  document.querySelector('#birth-caption').textContent = `Born ${formatDate(birth)}`;
  document.querySelector('#horizon-caption').textContent = `${horizonAge}-year horizon: ${formatDate(horizon)}`;

  const yearGrid = document.querySelector('#year-grid');
  yearGrid.innerHTML = '';
  for (let i = 0; i < horizonAge; i++) {
    const cell = document.createElement('div');
    cell.className = 'year-cell';
    cell.dataset.age = i + 1;
    cell.title = `Age ${i}–${i+1}`;
    if (ageDecimal >= i + 1) cell.classList.add('lived');
    else if (ageDecimal >= i) cell.classList.add('current');
    yearGrid.appendChild(cell);
  }

  document.querySelector('#chapter-title').textContent = age >= 0 ? `Your ${decadeStart}s` : 'Not started';
  document.querySelector('#chapter-summary').textContent = chapterCopy(decadeStart);
  document.querySelector('#decade-start-label').textContent = `Age ${decadeStart}`;
  document.querySelector('#decade-end-label').textContent = `Age ${decadeEnd}`;
  document.querySelector('#decade-progress').style.width = `${decadePct}%`;
  document.querySelector('#decade-progress-copy').textContent = `${fmt1.format(decadePct)}% through this decade · ${fmt.format(decadeRemaining / MS_DAY)} days until ${decadeEnd}`;

  const list = document.querySelector('#milestone-list');
  list.innerHTML = '';
  milestones.slice(0,5).forEach(m => {
    const row = document.createElement('div');
    row.className = 'milestone-row';
    row.innerHTML = `<strong>Age ${m.age}</strong><span>${fmt.format(m.days)} days · ${formatDate(m.date)}</span>`;
    list.appendChild(row);
  });

  renderNow(age);
  renderStageTabs(age);
  dashboard.classList.remove('hidden');
  nowSection.classList.remove('hidden');
}

function renderNow(age) {
  const stage = getStage(age);
  document.querySelector('#now-title').textContent = `${stage.label}: ${stage.title}`;
  document.querySelector('#brain-heading').textContent = age >= 25 && age <= 34 ? 'Adult control, continued plasticity' : 'Change continues across life';
  document.querySelector('#brain-copy').textContent = stage.brain;
  document.querySelector('#mind-heading').textContent = age >= 25 && age <= 34 ? 'From possibility toward commitment' : 'Motivation follows context and time';
  document.querySelector('#mind-copy').textContent = stage.mind;
  document.querySelector('#body-heading').textContent = age >= 25 && age <= 34 ? 'Build reserve before decline matters' : 'Function is trainable';
  document.querySelector('#body-copy').textContent = stage.body;

  fillTags('#brain-tags', age >= 25 && age <= 34 ? ['no “25 cliff”', 'experience matters', 'skills stay plastic'] : ['learning persists', 'aging varies', 'dementia ≠ normal aging']);
  fillTags('#mind-tags', age >= 25 && age <= 34 ? ['identity refinement', 'trait stability rises', 'commitment compounds'] : ['meaning', 'selectivity', 'individual variation']);
  fillTags('#body-tags', age >= 25 && age <= 34 ? ['strength peak ~30–35', 'bone near peak', 'habits compound'] : ['strength matters', 'aerobic capacity', 'mobility']);

  document.querySelector('#action-summary').textContent = stage.focus;
  const actionList = document.querySelector('#action-list');
  actionList.innerHTML = '';
  const actions = [...universalActions];
  if (age >= 65) actions.splice(2, 0, ["Train balance deliberately", "Older-adult activity guidance adds balance-focused, multicomponent work because falls become a major threat to independence."]);
  actions.slice(0, 6).forEach((a, i) => {
    const el = document.createElement('div');
    el.className = 'action-item';
    el.innerHTML = `<div class="action-num">${String(i+1).padStart(2,'0')}</div><div><strong>${a[0]}</strong><p>${a[1]}</p></div>`;
    actionList.appendChild(el);
  });
  renderOperatingSystem(age);
}

function fillTags(selector, tags) {
  const box = document.querySelector(selector);
  box.innerHTML = '';
  tags.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t;
    box.appendChild(span);
  });
}

function renderStageTabs(currentAge) {
  const tabs = document.querySelector('#stage-tabs');
  tabs.innerHTML = '';
  const selected = getStage(currentAge);
  stages.forEach(stage => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `stage-tab ${stage === selected ? 'active' : ''}`;
    button.textContent = stage.label;
    button.setAttribute('role', 'tab');
    button.addEventListener('click', () => {
      tabs.querySelectorAll('.stage-tab').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      renderStageDetail(stage);
    });
    tabs.appendChild(button);
  });
  renderStageDetail(selected);
}

function renderStageDetail(stage) {
  const detail = document.querySelector('#stage-detail');
  const hindsight = stageHindsight[stage.label] || { valuable: stage.focus, do: stage.focus, closing: "Individual circumstances matter more than chronology alone." };
  detail.innerHTML = `
    <div class="stage-top">
      <div class="stage-age">${stage.min}–${stage.max}</div>
      <div><p class="eyebrow">${stage.label}</p><h3>${stage.title}</h3><p>${stage.summary}</p></div>
    </div>
    <div class="stage-columns">
      <div class="stage-col"><h4>Brain</h4><p>${stage.brain}</p></div>
      <div class="stage-col"><h4>Mindset</h4><p>${stage.mind}</p></div>
      <div class="stage-col"><h4>Body</h4><p>${stage.body}</p></div>
      <div class="stage-col"><h4>Useful focus</h4><p>${stage.focus}</p></div>
    </div>
    <div class="hindsight-strip">
      <article><p class="eyebrow">What becomes valuable</p><p>${hindsight.valuable}</p></article>
      <article><p class="eyebrow">Do during this stage</p><p>${hindsight.do}</p></article>
      <article><p class="eyebrow">Closing windows</p><p>${hindsight.closing}</p></article>
    </div>`;
}

function renderOperatingSystem(age) {
  const title = document.querySelector('#operating-age-title');
  if (!title) return;
  title.textContent = age >= 25 && age <= 34 ? `Age ${age}: convert freedom into foundations` : `Age ${age}: highest-leverage foundations`;
  const grid = document.querySelector('#priority-grid');
  grid.innerHTML = '';
  const priorities = age >= 25 && age <= 34 ? age27Priorities : age27Priorities.slice(0, 8);
  priorities.forEach(([num, name, why, category]) => {
    const card = document.createElement('article');
    card.className = 'priority-card';
    card.innerHTML = `<div class="priority-meta"><span>${num}</span><em>${category}</em></div><h3>${name}</h3><p>${why}</p>`;
    grid.appendChild(card);
  });
}

function renderPrinciples() {
  const tabs = document.querySelector('#principle-tabs');
  const content = document.querySelector('#principle-content');
  if (!tabs || !content) return;
  const render = (category) => {
    content.innerHTML = `<div class="principle-intro"><p>${category.intro}</p></div><div class="principle-list">${category.items.map(([title, copy, window], i) => `<article class="principle-item"><div class="principle-number">${String(i+1).padStart(2,'0')}</div><div><h3>${title}</h3><p>${copy}</p><span>${window}</span></div></article>`).join('')}</div>`;
  };
  tabs.innerHTML = '';
  principleCategories.forEach((cat, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = `principle-tab ${i===0?'active':''}`; b.textContent = cat.label;
    b.addEventListener('click', () => {
      tabs.querySelectorAll('.principle-tab').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(cat);
    });
    tabs.appendChild(b);
  });
  render(principleCategories[0]);
}

function renderPath() {
  const timeline = document.querySelector('#path-timeline');
  const anti = document.querySelector('#anti-goal-grid');
  if (!timeline || !anti) return;
  timeline.innerHTML = pathTo35.map((step, i) => `<article class="path-step"><div class="path-age">${step.age}</div><div><p class="eyebrow">Step ${i+1}</p><h3>${step.title}</h3><p>${step.text}</p></div></article>`).join('');
  anti.innerHTML = antiGoals.map(([t,c]) => `<article><h3>${t}</h3><p>${c}</p></article>`).join('');
}

function getISOWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2,'0')}`;
}

function renderHabits() {
  const box = document.querySelector('#habit-list');
  if (!box) return;
  const weekKey = getISOWeekKey();
  const storageKey = `life90_habits_${weekKey}`;
  let state = {};
  try { state = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (_) {}
  box.innerHTML = '';
  weeklyHabits.forEach(([id, label, asset]) => {
    const row = document.createElement('label');
    row.className = 'habit-row';
    row.innerHTML = `<input type="checkbox" data-habit="${id}" ${state[id]?'checked':''}><span><strong>${label}</strong><em>${asset}</em></span>`;
    box.appendChild(row);
  });
  const update = () => {
    const checks = [...box.querySelectorAll('input[type="checkbox"]')];
    const next = {}; checks.forEach(c => next[c.dataset.habit] = c.checked);
    localStorage.setItem(storageKey, JSON.stringify(next));
    const done = checks.filter(c => c.checked).length;
    const pct = checks.length ? (done / checks.length) * 100 : 0;
    document.querySelector('#habit-progress').style.width = `${pct}%`;
    document.querySelector('#habit-score').textContent = `${done}/${checks.length} weekly compounding systems completed · ${weekKey}`;
  };
  box.querySelectorAll('input').forEach(c => c.addEventListener('change', update));
  update();
}

function initReview() {
  const q = document.querySelector('#quarter-focus');
  const w = document.querySelector('#weekly-review');
  const save = document.querySelector('#save-review');
  if (!q || !w || !save) return;
  q.value = localStorage.getItem('life90_quarter_focus') || '';
  w.value = localStorage.getItem('life90_weekly_review') || '';
  save.addEventListener('click', () => {
    localStorage.setItem('life90_quarter_focus', q.value.trim());
    localStorage.setItem('life90_weekly_review', w.value.trim());
    const st = document.querySelector('#review-status'); st.textContent = 'Saved locally in this browser.';
    setTimeout(() => st.textContent = '', 2200);
  });
}

function initAppTabs() {
  const buttons = [...document.querySelectorAll('.app-tab')];
  const views = [...document.querySelectorAll('.app-view')];
  const activate = (target) => {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.target === target));
    views.forEach(v => v.classList.toggle('active', v.dataset.view === target));
    localStorage.setItem('life90_active_tab', target);
  };
  buttons.forEach(b => b.addEventListener('click', () => activate(b.dataset.target)));
  const saved = localStorage.getItem('life90_active_tab');
  if (saved && buttons.some(b => b.dataset.target === saved)) activate(saved);
}

function renderSources() {
  const ol = document.querySelector('#source-list');
  sources.forEach(([name, url]) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = name;
    li.appendChild(a); ol.appendChild(li);
  });
}
renderSources();
renderStageTabs(27);
renderPrinciples();
renderPath();
renderHabits();
initReview();
initAppTabs();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const birth = readBirth();
  if (!birth || birth > new Date()) return;
  localStorage.setItem('life90_birth', dateInput.value);
  localStorage.setItem('life90_time', timeInput.value);
  localStorage.setItem('life90_horizon', lifespanInput.value);
  renderDashboard(birth);
  const clockTab = document.querySelector('.app-tab[data-target="clock"]');
  if (clockTab) clockTab.click();
  dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const northStarInput = document.querySelector('#north-star-input');
const savedNorthStar = localStorage.getItem('life90_north_star');
if (savedNorthStar) northStarInput.value = savedNorthStar;
document.querySelector('#save-north-star').addEventListener('click', () => {
  localStorage.setItem('life90_north_star', northStarInput.value.trim());
  const status = document.querySelector('#north-star-status');
  status.textContent = northStarInput.value.trim() ? 'Saved locally in this browser.' : 'Cleared.';
  setTimeout(() => status.textContent = '', 2500);
});

const savedBirth = localStorage.getItem('life90_birth');
const savedTime = localStorage.getItem('life90_time');
const savedHorizon = localStorage.getItem('life90_horizon');
if (savedBirth) dateInput.value = savedBirth;
if (savedTime) timeInput.value = savedTime;
if (savedHorizon) {
  lifespanInput.value = savedHorizon;
  lifespanOutput.textContent = `${savedHorizon} years`;
}
if (savedBirth) {
  const birth = readBirth();
  if (birth && birth <= new Date()) renderDashboard(birth);
}

// ─── AI ASSISTANT (opencode-go + mimo-v2.5) ──────────────────────
const API_KEY = 'sk-fv9GAkxq7nRiVTX0l8gLEUoPc79spJGqU9HkSjswVLnoQfTuWz5HY1R8hA44g8ZU';
const API_URL = 'https://opencode.ai/zen/go/v1/chat/completions';
const MODEL = 'mimo-v2.5';

async function aiCall(prompt) {
    const output = document.getElementById('ai-output');
    output.style.display = 'block';
    output.innerHTML += `<div class="log-line"><span class="log-ts">[${new Date().toISOString().slice(11,19)}]</span> <span class="log-info">[thinking]</span> ${prompt.slice(0,100)}...</div>`;
    
    try {
        const resp = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{role: 'user', content: prompt}],
                max_tokens: 1500,
                temperature: 0.7,
            }),
        });
        const data = await resp.json();
        const reply = data.choices?.[0]?.message?.content || 'No response';
        output.innerHTML += `<div class="log-line"><span class="log-ok">[mimo-v2.5]</span> ${reply.replace(/\n/g, '<br>')}</div>`;
        output.scrollTop = output.scrollHeight;
        return reply;
    } catch(e) {
        output.innerHTML += `<div class="log-line"><span class="log-err">[error]</span> ${e.message}</div>`;
        return '';
    }
}

async function aiAnalyze() {
    const data = JSON.parse(localStorage.getItem('lifeOS') || '{}');
    const age = data.age || 27;
    const habits = (data.habits || []).map(h => h.name).join(', ');
    const focus = data.focusGoal || 'not set';
    const reviews = Object.values(data.reviews || {}).length;
    
    await aiCall(`Analyze my life patterns. Age: ${age}. Habits: ${habits || 'none'}. Focus: ${focus}. Weekly reviews completed: ${reviews}. Give me 3 patterns you notice and 1 specific recommendation for this week. Be concise and actionable.`);
}

async function aiCoach() {
    const data = JSON.parse(localStorage.getItem('lifeOS') || '{}');
    const habits = data.habits || [];
    if (habits.length === 0) {
        document.getElementById('ai-output').innerHTML += `<div class="log-line"><span class="log-err">[error]</span> Add some habits first</div>`;
        return;
    }
    
    const habit = habits[0];
    const history = Object.entries(data.habitLog || {})
        .filter(([k]) => k.startsWith(habits.indexOf(habit) + '_'))
        .map(([k,v]) => v ? '✓' : '✗')
        .join(' ');
    
    await aiCall(`Habit coaching. Habit: ${habit.name}. Last 7 days: ${history || 'no data'}. What pattern do you see? Give one specific suggestion to improve consistency.`);
}

async function aiReview() {
    const data = JSON.parse(localStorage.getItem('lifeOS') || '{}');
    const reviews = Object.values(data.reviews || {});
    const lastReview = reviews[reviews.length - 1];
    
    if (!lastReview) {
        document.getElementById('ai-output').innerHTML += `<div class="log-line"><span class="log-err">[error]</span> Complete a weekly review first</div>`;
        return;
    }
    
    await aiCall(`Review my weekly reflection. Wins: ${lastReview.wins || 'none'}. Lessons: ${lastReview.lessons || 'none'}. Focus: ${lastReview.focus || 'none'}. What patterns do you see? What should I focus on next week?`);
}
