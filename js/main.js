//分類的代碼表
var categorys = {人體: 1, 稱謂: 2, 人際: 3, 飲食: 4, 服飾美容: 5,
    居處: 6, 交通: 7, 器物用品: 8, 休閒娛樂: 9, 代詞: 10,
    時間空間: 11, 疾病醫療: 12, 動作: 13, 歲時節慶: 14, 婚喪喜慶: 15,
    植物: 16, 動物: 17, 數詞量詞: 18, 品貌: 19, 宗教信仰: 20,
    虛詞: 21, 形容性狀: 22, 天文地理: 23, 思維心態: 24, 行業生產: 25,
    財政金融: 26, 教育文化: 27, 法政軍事: 28, 礦物: 29, 新聞新用語: 30};

//詞彙
var words = [];

//目前顯示哪一個字的索引
var currIndex = -1;

//上下句的紀錄
var wordHistory = [];

//從檔案讀取詞彙資料
d3.tsv('si_words.tsv', function (error, data) {
    data.forEach(function (d) {
        d['categoryCode'] = categorys[d['類別']];
        if (d['categoryCode'] < 10) {
            d['categoryCode'] = '0' + d['categoryCode'];
        }
    });
    words = data;
    $('#totalWordsCount').html(words.length);
    randomPick();
    //console.log(data); 
});

//隨機選句
function randomPick() {
    //隨機產生句子索引
    var index = Math.round(Math.random() * words.length);
    //顯示句子
    showWordByIndex(index);
}
;

//顯示指定索引的句子
function showWordByIndex(index) {
    //將索引紀錄起來
    currIndex = index;
    //將索引顯示在網頁中
    $('#currIndex').html(currIndex);
    //下一題
    showWord(words[currIndex]);
}

//將文字顯示到網頁中
function showWord(word) {
    if (word) {
        $('#hakkeaWord').html(word['客家語言']);
        $('#mandarinWord').html(word['華語辭義']);
        $('#englishWord').html(word['英語詞義']);
        $('#hakkeaAlphabet').html(word['客語音標']);
        $('#hakkaSentence').html(word['客語例句']);
        $('#mandarinSentence').html(word['華語翻譯']);
        var wordUrl = 'http://wiki.hakka.gov.tw/file/102/si/SI-' + word['categoryCode'] + '_' + word['序號'] + '.mp3';
        $('#wordPlayer source').attr('src', wordUrl);
        $('#wordPlayer').load();
        var sentenceUrl = 'http://wiki.hakka.gov.tw/file/102/si/SI-' + word['categoryCode'] + '_' + word['序號'] + 's.mp3';
        $('#sentencePlayer source').attr('src', sentenceUrl);
        $('#sentencePlayer').load();
        ScrollToBottom();
    }
}

//控制網頁捲軸到按鈕區域
function ScrollToBottom() {
    //window.scrollTo(0,100000);
}

//按下"上一句"
function clickPrev() {
    if (wordHistory.length) {
        var index = wordHistory.pop();
        showWordByIndex(index);
    } else {
        console.log("沒有上一句");
    }
}
;

//按下"下一句"
function clickNext() {
    //將索引紀錄起來
    wordHistory.push(currIndex);
    //隨機下一句
    randomPick();
}
;

//初始化
$(function () {
    $('#prevWord').on('click', clickPrev);
    $('#nextWord').on('click', clickNext);
    //設定按下鍵盤時的動作
    $(document).on('keydown', null, 'up', clickPrev);
    $(document).on('keydown', null, 'left', clickPrev);
    $(document).on('keydown', null, 'right', clickNext);
    $(document).on('keydown', null, 'down', clickNext);
});