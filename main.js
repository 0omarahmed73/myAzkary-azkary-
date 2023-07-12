//Solve Last 2 Ayahs of Baqarah Problem

window.onload = function() {
  document.querySelectorAll('.lastAyah')[0].remove();
}

let date = new Date();
let morningHours = [4,5,6,7,8,9,10,11,12,13,14,15]
let nightHours = [16,17,18,19,20,21,22,23,0,1,2,3];
let morningOrNight = Array.from(document.querySelectorAll('.zikrName'));
//Current Azkar Functions

//Check for old Azkar choice 
if (sessionStorage.currentAzkar){
  if (sessionStorage.currentAzkar === 'morning'){
    morning();
    changeZikrText();
  }
  else if (sessionStorage.currentAzkar === 'night'){
    night();
    changeZikrText();
  }
}
else {
  if (morningHours.includes(date.getHours())){
    morning();
    changeZikrText();
  }
  else if (nightHours.includes(date.getHours())){
    night();
    changeZikrText()
  }
}
//Toggle Between Night and Morning



morningOrNight.forEach(el => {
  el.addEventListener('click' , function(e){
    if (e.target === morningOrNight[0] || e.target === morningOrNight[0].children[0] ){
      console.log(e.target);
      morning();
      sessionStorage.clear();
      sessionStorage.currentAzkar = 'morning'
    }
    else if (e.target === morningOrNight[1] || e.target === morningOrNight[1].children[0]){
      console.log(e.target);
      night();
      sessionStorage.clear();
      sessionStorage.currentAzkar = 'night';
    }
  })
})
let zikrs = ['3 قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ. ' ,
'3 قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ (1) مِن شَرِّ مَا خَلَقَ (2) وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ (3) وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ (4) وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ (5)',
'3 قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ. ',
'1 ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُۚ لَا تَأۡخُذُهُۥ سِنَةٞ وَلَا نَوۡمٞۚ لَّهُۥ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ مَن ذَا ٱلَّذِي يَشۡفَعُ عِندَهُۥٓ إِلَّا بِإِذۡنِهِۦۚ يَعۡلَمُ مَا بَيۡنَ أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡۖ وَلَا يُحِيطُونَ بِشَيۡءٖ مِّنۡ عِلۡمِهِۦٓ إِلَّا بِمَا شَآءَۚ وَسِعَ كُرۡسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَۖ وَلَا يَـُٔودُهُۥ حِفۡظُهُمَاۚ وَهُوَ ٱلۡعَلِيُّ ٱلۡعَظِيمُ' , 
'1 أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر. ' 
, '1 اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ . ' , 
'3 رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً. ' ,
'4 اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك. ',
'1 اللّهُـمَّ ما أَصْبَـَحَ بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر. '
,'7 حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم. ' ,
'3 بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم. ' ,
'1 اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور. ' , 
'1 أَصْبَـحْـنا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ. ' ,
'3 سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه. ',
'3 اللّهُـمَّ عافِـني في بَدَنـي ، اللّهُـمَّ عافِـني في سَمْـعي ، اللّهُـمَّ عافِـني في بَصَـري ، لا إلهَ إلاّ أَنْـتَ. ' ,
'3 اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ. ' ,
'1 اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي ، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي ، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِن خَلْفـي وَعَن يَمـيني وَعَن شِمـالي ، وَمِن فَوْقـي ، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـي. ' ,
'3 يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ. ' , '1 أَصْبَـحْـنا وَأَصْبَـحْ المُـلكُ للهِ رَبِّ العـالَمـين ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ خَـيْرَ هـذا الـيَوْم ، فَـتْحَهُ ، وَنَصْـرَهُ ، وَنـورَهُ وَبَـرَكَتَـهُ ، وَهُـداهُ ، وَأَعـوذُ بِـكَ مِـنْ شَـرِّ ما فـيهِ وَشَـرِّ ما بَعْـدَه. ' , '1 اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه ، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت ، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِرْكِهِ ، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم. '
,'1 أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق. ' ,
'10 اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد. ' ,
'3 اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ. ' ,
'3 اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ. ',
'3 أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ. ' ,
'3 يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ. ' ,
'1 اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا. ' ,
'3 اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ ، عَلَيْكَ تَوَكَّلْتُ ، وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ , مَا شَاءَ اللَّهُ كَانَ ، وَمَا لَمْ يَشَأْ لَمْ يَكُنْ ، وَلا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ , أَعْلَمُ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، وَأَنَّ اللَّهَ قَدْ أَحَاطَ بِكُلِّ شَيْءٍ عِلْمًا , اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي ، وَمِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا ، إِنَّ رَبِّي عَلَى صِرَاطٍ مُسْتَقِيمٍ. ' , 
'100 لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ. ' , '100 سُبْحـانَ اللهِ وَبِحَمْـدِهِ. ' , '100 استغفر الله العظيم واتوب اليه'];
zikrs.forEach(el => {
  let count = parseInt(el)
  el = el.replace(/\d{0,}/g, '')
  let zikr = document.createElement('div');
  zikr.className = 'allCard';
  zikr.innerHTML = `  
  <div class="zikr text-white p-5 bg-slate-600 w-60 rounded-t-lg text-center">
  <div class="removeZikr rounded-md">X</div>
  <p>${el}</p>
</div>
<div class="count mb-4 rounded-b-lg flex flex-row-reverse text-white space-x-6 space-x-reverse justify-center bg-black py-2">
  <p>عدد التكرارات</p>
  <p>|</p>
  <p class="circle flex justify-center items-center">${count}</p>
`
  document.querySelector('.container').append(zikr)
})

//Check LocalStorage for Zikrs

if (window.localStorage.allZikrs) {
  document.querySelector('.container').innerHTML = window.localStorage.allZikrs;
}
else {
  window.localStorage.allZikrs = document.querySelector('.container').innerHTML
}

//Adding New Zikr

let buttonAddZikr = document.querySelector('.buttonAddZikr');
let addZikrPage = document.querySelector('.addZikrPage');
let overlayLayer = document.querySelector('.overlay')

addZikrPage.children[0].addEventListener('click', function () {
  addZikrPage.classList.add('hideAdd');
  overlayLayer.style.opacity = 0
  overlayLayer.style.zIndex = -1;
  addZikrPage.classList.remove('showAdd');
})

//Show Add Azkar Page
function addNewZikrs() {
  buttonAddZikr.addEventListener('click', () => {
    addZikrPage.classList.remove('hideAdd');
    addZikrPage.classList.add('showAdd');
    overlayLayer.style.opacity = 1;
    overlayLayer.style.zIndex = 500;
  })
}
addZikrPage.addEventListener('click', function (e) {
  e.stopPropagation();
})

//Hide Zikr Add Page when press anywhere
document.addEventListener('click', function (e) {
  if (e.target !== document.querySelector('.addZikrPage') && e.target !== document.querySelector('.buttonAddZikr')) {
    if (addZikrPage.classList.contains('showAdd')) {
      addZikrPage.classList.add('hideAdd');
      overlayLayer.style.opacity = 0
      overlayLayer.style.zIndex = -1;
      addZikrPage.classList.remove('showAdd');
    }
  }
})

//Add New Zikr
document.querySelector('[type="submit"]').addEventListener('click', function () {
  let zikr = document.createElement('div');
  zikr.className = 'allCard';
  zikr.innerHTML = `  
  <div class='allCard'>
  <div class="zikr text-white p-5 bg-slate-600 w-60 rounded-t-lg text-center">
  <div class="removeZikr rounded-md">X</div>
  <p>${document.querySelector('[type="text"]').value}</p>
</div>
<div class="count mb-4 rounded-b-lg flex flex-row-reverse text-white space-x-6 space-x-reverse justify-center bg-black py-2">
  <p>عدد التكرارات</p>
  <p>|</p>
  <p class="circle flex justify-center items-center">${document.querySelector('[type="number"]').value}</p>
</div>`;
  document.querySelector('.container').append(zikr);
  addZikrPage.classList.add('hideAdd');
  overlayLayer.style.opacity = 0
  overlayLayer.style.zIndex = -1;
  addZikrPage.classList.remove('showAdd');
  window.localStorage.allZikrs += zikr.innerHTML;
  countZikrs();
  removeZikr();
  changeZikrText();
}
)
//Count Down Zikrs

function countZikrs() {
  let allZikrs = document.querySelectorAll('.allCard');
  allZikrs.forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.children[1].children[2].innerHTML == 1 && !Array.from(document.querySelectorAll('.removeZikr')).includes(e.target)) {
        el.children[1].children[2].innerHTML = 0;
        el.style.opacity = 0;
        setTimeout(() => {
          el.style.display = 'none'
        }, 500);
      }
      else if (el.children[1].children[2].innerHTML != 1 && !Array.from(document.querySelectorAll('.removeZikr')).includes(e.target)) {
        el.children[1].children[2].innerHTML = parseInt(el.children[1].children[2].innerHTML) - 1
        console.log(el.children[1].children[2].innerHTML = parseInt(el.children[1].children[2].innerHTML))

      }
      else '';
    })
  })

}

//Remove Zikrs Function 

let result;
function removeZikr() {

  document.addEventListener('click' , function(e){
    if (Array.from(document.querySelectorAll('.removeZikr')).includes(e.target)){
      document.querySelector('.deleteZikrMessage').removeAttribute('style');
      document.querySelector('.deleteZikrMessage').classList.add('showIt')
      document.querySelector('.deleteZikrMessage').classList.remove('hideIt')
      result = e.target
    }
  })}
let oldInner;
function areYouSure2() {
  document.querySelector('.areYouSure').addEventListener('click', function (e) {
    if (e.target.innerHTML === 'نعم') {
      document.querySelector('.deleteZikrMessage').classList.add('hideIt');
      document.querySelector('.deleteZikrMessage').classList.remove('showIt');
      result.parentElement.parentElement.style.opacity = 0;
      setTimeout(() => {
        result.parentElement.parentElement.style.zIndex = -1;
        oldInner = document.querySelector('.container').innerHTML;
        oldInner = oldInner.replace('<div class="allCard" style="opacity: 0; z-index: -1;">' + result.parentElement.parentElement.innerHTML +'</div>' ,'');
        document.querySelector('.container').innerHTML = localStorage.allZikrs
        localStorage.allZikrs = localStorage.allZikrs.replace( `<div class="allCard">${result.parentElement.parentElement.innerHTML}</div>`,'');
        document.querySelector('.container').innerHTML = oldInner;
        removeZikr();
        areYouSure2();
        addNewZikrs();
        countZikrs();
      }, 500);
      
    }
    else {
    document.querySelector('.deleteZikrMessage').classList.add('hideIt')
    document.querySelector('.deleteZikrMessage').classList.remove('showIt')
  }
  })
}


removeZikr();
areYouSure2();
addNewZikrs();
countZikrs();

//Empty Text Fields when Submit
document.querySelector('.addZikrPage input[type="submit"]').addEventListener('click', function (e) {
  document.querySelectorAll('.addZikrPage input:not([type="submit"])').forEach(el => {
    el.value = '';
  })
})

//Show Add Azkar Page
buttonAddZikr.addEventListener('click', () => {
  addZikrPage.classList.remove('hideAdd');
  addZikrPage.classList.add('showAdd');
  overlayLayer.style.opacity = 1;
  overlayLayer.style.zIndex = 500;

})

document.addEventListener('click' , function(e){
  if (e.target === document.querySelector('.buttonAddZikr')){
    addZikrPage.classList.remove('hideAdd');
    addZikrPage.classList.add('showAdd');
    overlayLayer.style.opacity = 1;
    overlayLayer.style.zIndex = 500;
  
  }
})

function changeZikrText() {
  if (morningOrNight[1].style.display === 'block'){
    document.querySelectorAll('.zikr p').forEach(el => {
      el.innerText = el.innerText.replaceAll('أمسينا وأمسى الملك لله', 'أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله' )
      el.innerText = el.innerText.replaceAll('هذه الليلة' , 'هـذا اليوم' )
      el.innerText = el.innerText.replaceAll('بعدها' , 'بَعْـدَه' )
      el.innerText = el.innerText.replaceAll('امسيت' , 'أَصْبَـحْتُ' )
      el.innerText = el.innerText.replaceAll('امسى' , 'أَصْبَـَحَ' )
      el.innerText = el.innerText.replaceAll('الْمَصِيرُ' , 'النُّـشُور' )
      el.innerText = el.innerText.replaceAll('امسينا عَلَى فِطْرَةِ الإسْلاَمِ' , 'أَصْبَـحْـنا عَلَى فِطْرَةِ الإسْلاَمِ' )
      el.innerText = el.innerText.replaceAll('أَمْسَيْنا وَأَمْسَى الْمُلْكُ للهِ رَبِّ الْعَالَمَيْنِ' , 'أَصْبَـحْـنا وَأَصْبَـحْ المُـلكُ للهِ رَبِّ العـالَمـين' )
      el.innerText = el.innerText.replaceAll('اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا' , 'اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا' )
    if (el.parentElement.parentElement === document.querySelector('.lastAyah')){
      document.querySelector('.lastAyah').remove();
    }
  })
}
  else if (morningOrNight[0].style.display === 'block'){
    document.querySelectorAll('.zikr p').forEach(el => {  
      el.innerText = el.innerText.replaceAll( 'أَصْبَـحْتُ' , 'امسيت' )
      el.innerText = el.innerText.replaceAll( 'أَصْبَـَحَ' , 'امسى' )
      el.innerText = el.innerText.replaceAll('أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله' , 'أمسينا وأمسى الملك لله')
      el.innerText = el.innerText.replaceAll( 'هـذا اليوم' , 'هذه الليلة' )
      el.innerText = el.innerText.replaceAll( 'بَعْـدَه' , 'بعدها' )
      el.innerText = el.innerText.replaceAll('النُّـشُور' , 'الْمَصِيرُ' )
      el.innerText = el.innerText.replaceAll('أَصْبَـحْـنا وَأَصْبَـحْ المُـلكُ للهِ رَبِّ العـالَمـين' , 'أَمْسَيْنا وَأَمْسَى الْمُلْكُ للهِ رَبِّ الْعَالَمَيْنِ' )
      el.innerText = el.innerText.replaceAll('أَصْبَـحْـنا عَلَى فِطْرَةِ الإسْلاَمِ' , 'امسينا عَلَى فِطْرَةِ الإسْلاَمِ' )
      el.innerText = el.innerText.replaceAll('اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا' , 'اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا' )
    }
    )
    let zikr = document.createElement('div');
    zikr.setAttribute('class' , 'allCard lastAyah');
    zikr.innerHTML = `  
    <div class="zikr text-white p-5 bg-slate-600 w-60 rounded-t-lg text-center">
    <div class="removeZikr rounded-md">X</div>
    <p>آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ (285) لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ (286)</p>
  </div>
  <div class="count mb-4 rounded-b-lg flex flex-row-reverse text-white space-x-6 space-x-reverse justify-center bg-black py-2">
    <p>عدد التكرارات</p>
    <p>|</p>
    <p class="circle flex justify-center items-center">1</p>
  `
    document.querySelector('.container').prepend(zikr) 
  }
}

changeZikrText();

//Set Year
let i = 0;
let text = ''
let nextText =`All rights reserved for © Omar Ahmed ${date.getFullYear()}`
function setLetters(){
  'use strict';
let setIt = setInterval(function() {
if (i < nextText.length){
  text += nextText[i++];
  document.querySelector('footer').innerHTML = text;
}
  else {
    text = '';
    i = 0;
  }
},200)
}

setLetters();

document.querySelector('.fa-github-square').addEventListener('click' , function(){
  window.open("https://github.com/0omarahmed73" , '?blank');
}
)
document.querySelector('.fa-linkedin-square').addEventListener('click' , function(){
  window.open("https://www.linkedin.com/in/0omarahmed73" , '?blank');
}
)

//Zikr Type Functions 

function morning(){
  morningOrNight[0].style.display = 'none';
  morningOrNight[1].style.display = 'block';
  document.querySelector(':root').setAttribute('style' , '--azkarBG : rgb(11, 159, 213) ; --zikrBG : rgb(0, 50, 78)');
  console.log(morningOrNight[1].style.display);
  changeZikrText();
}
function night() {
  morningOrNight[1].style.display = 'none';
  morningOrNight[0].style.display = 'block';
  document.querySelector(':root').setAttribute('style' , '--azkarBG : #151141 ; --zikrBG : #462ec7')
  console.log(morningOrNight[1].style.display);
  changeZikrText();
}

document.addEventListener('click' , function(e){
  if (e.target === document.querySelector('.lastAyah') || e.target === document.querySelector('.lastAyah .zikr') || e.target === document.querySelector('.lastAyah .zikr p')){
    document.querySelector('.lastAyah .circle').innerText = 0
    document.querySelector('.lastAyah').style.opacity = 0;
    setInterval(function() {
      document.querySelector('.lastAyah ').remove();
    }, 500)
  }
})