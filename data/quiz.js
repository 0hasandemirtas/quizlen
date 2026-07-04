// QUIZ SORULARI
// Yeni soru eklemek için:
// {
//   q: "Soru metni",
//   options: ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"],
//   answer: 0,                 // doğru şıkkın sıra numarası (0 = ilk şık)
//   explain: "Açıklama (opsiyonel)"
// },
window.DATA = window.DATA || {};
window.DATA.quiz = [
  {
    q: "'elma' kelimesinin İngilizcesi nedir?",
    options: ["apple", "orange", "banana", "grape"],
    answer: 0,
    explain: "apple = elma"
  },
  {
    q: "She ___ at a bank. (Present Simple)",
    options: ["work", "works", "working", "worked"],
    answer: 1,
    explain: "Özne 'she' olduğu için fiile -s eklenir: works."
  },
  {
    q: "'Nasılsın?' nasıl söylenir?",
    options: ["What is your name?", "How old are you?", "How are you?", "Where are you?"],
    answer: 2,
    explain: "How are you? = Nasılsın?"
  },
];
