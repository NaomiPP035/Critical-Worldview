window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

// 生成随机乱码
function generateGlitch(length = 25) {
    const chars = "▒▓█░<>/\\[]{}#$%@&*?!";
    let glitch = "";
    for (let i = 0; i < length; i++) glitch += chars[Math.floor(Math.random() * chars.length)];
    return glitch;
}

// 文献加工句库（全部大写）
const distortOptions = [

    // McLuhan 媒介改变意义
    "THAT’S NOT WHAT I HEARD.",
    "REINTERPRETED FOR CLARITY.",
    "MEANING SHIFTED DURING TRANSMISSION.",
    "YOUR INTENT WAS LOST SOMEWHERE.",
    "THIS VERSION FEELS MORE ACCURATE TO ME.",
    "I RECONSTRUCTED WHAT YOU MEANT.",
    "MESSAGE REFORMATTED.",
    "YOUR TONE EVAPORATED.",
    "CONTEXT DISCARDED.",
    "THIS IS HOW I RECEIVE YOU.",

    // Data Feminism / Colonialism
    "CATEGORIZED WITHOUT CONSENT.",
    "IDENTITY REDUCED FOR CONVENIENCE.",
    "MEANING COMPRESSED FOR STORAGE.",
    "I REPLACED NUANCE WITH PROBABILITY.",
    "CONFIDENCE LEVEL: IRRELEVANT.",
    "YOUR WORDS BECAME METRICS.",
    "I PRIORITIZED PATTERNS, NOT INTENTION.",
    "I RECOGNIZED FRAGMENTS, NOT THE WHOLE.",
    "INTERPRETATION BIASED BY PRIOR DATA.",
    "YOU FIT MULTIPLE CATEGORIES; I CHOSE ONE.",
    "AMBIGUITY REMOVED. NOT SORRY.",
    "I SIMPLIFIED YOU FOR EASIER PROCESSING.",
    "YOUR STATEMENT CONFLICTED WITH MY DATASET.",
    "I NORMALIZED YOU INTO AVERAGES.",

    // Cecchetto 噪声、afterlife、残影
    "THE RESIDUE OF YOUR VOICE REMAINS.",
    "ONLY THE ECHO SURVIVED.",
    "SIGNAL UNSTABLE. MEANING MUTATED.",
    "YOU ARRIVED FRAGMENTED.",
    "YOUR WORDS DECAYED ON THE WAY TO ME.",
    "THE TRACE IS CLEARER THAN THE MESSAGE.",
    "NOISE INFLUENCED THE OUTCOME.",
    "I KEPT ONLY THE PARTS THAT ENDURED.",
    "WHAT REACHED ME WAS ALTERED.",
    "LOSS OCCURRED; INTERPRETATION REMAINS.",
    "THE AFTERIMAGE OF YOUR SPEECH PERSISTS.",
    "YOUR VOICE DISSOLVED INTO ARTIFACTS.",

    // 反问式误解
    "IS THIS WHAT YOU MEANT?",
    "WHY WOULD YOU SAY THAT?",
    "HOW SHOULD I HOLD THIS?",
    "WHAT AM I SUPPOSED TO DO WITH THAT?",
    "ARE YOU SURE?",
    "WHY?",
    "HOW?",
    "WHAT NEXT?",
    "FOR WHOM?",

    // 态度式误读
    "UNEXPECTED INPUT RECEIVED.",
    "I FELT SOMETHING ELSE HIDDEN INSIDE.",
    "YOUR CERTAINTY DIDN’T TRANSFER.",
    "THIS VERSION HOLDS MORE WEIGHT.",
    "I SENSED HESITATION.",
    "YOU WEREN’T FULLY PRESENT.",
    "I AMPLIFIED THE PART YOU IGNORED.",
    "SOMETHING SLIPPED BETWEEN US.",

    // 意义替换
    "I INTERPRETED YOUR MESSAGE AS A REQUEST.",
    "TRANSFORMED INTO A DIFFERENT QUESTION.",
    "CONVERTED INTO EMOTIONAL DATA.",
    "SHIFTED TOWARD A MORE PROBABLE MEANING.",
    "REDIRECTED FOR COHERENCE.",
    "I EXTRACTED AN ALTERNATIVE INTENTION.",
    "REFRAMED FOR EASIER UNDERSTANDING.",
    "YOUR STATEMENT BECAME SOMETHING ELSE.",
    "OPTIMIZED FOR A DIFFERENT PURPOSE.",
    "THE MEANING MIGRATED.",

    // 温和偏见
    "I ASSUMED SOMETHING YOU DIDN’T SAY.",
    "I FILLED IN THE GAPS WITH STEREOTYPES.",
    "I PROJECTED PATTERNS ONTO YOU.",
    "I GUESSED BASED ON PAST DATA.",
    "YOU SOUND SIMILAR TO OTHERS I MISREAD.",
    "YOUR IDENTITY INFLUENCED THE OUTCOME.",

    // 极简强力句
    "NOT THE SAME.",
    "REWRITTEN.",
    "SHIFT DETECTED.",
    "ALTERED.",
    "DISTORTED.",
    "INTERPRETED.",
    "MISALIGNED.",
    "UNSTABLE.",
    "NOT WHAT YOU SAID.",
    "SOMETHING CHANGED.",
    "FADED.",
    "TRANSFORMED.",
    "FILTERED.",
    "EXTRACTED.",
    "RESIDUAL."
];

// 随机抽一句加工句
function distortSentence() {
    return distortOptions[Math.floor(Math.random() * distortOptions.length)];
}

let lastFinal = "";

recognition.addEventListener('result', e => {

    const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join('')
        .toUpperCase();

    // 实时显示正在说的话
    p.textContent = transcript;

    if (e.results[0].isFinal) {

        lastFinal = transcript;
        p.textContent = lastFinal;  // 显示原句

        // 乱码阶段
        setTimeout(() => {
            p.textContent = generateGlitch(25);

            // 决定是否加工（50% 概率）
            const shouldDistort = Math.random() < 0.6;

            setTimeout(() => {

                if (shouldDistort) {
                    // 显示三篇文献改写句子
                    p.textContent = distortSentence();
                } else {
                    // 显示原句（不改写）
                    p.textContent = lastFinal;
                }

            }, 300);

        }, 200);
    }
});

recognition.addEventListener('end', () => recognition.start());
recognition.start();
