/* Kakao API */
Kakao.init('66eaf07dd60f07a94d95be5d0657e07d');

Kakao.Link.createCustomButton({
				container: '#kakao-link-btn',
				templateId: 35064,
});

/* Teacheable machine */
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
//const URL = 'https://teachablemachine.withgoogle.com/models/59WPBJwsK/'; // 07-25 ~ 08-09/ 첫번째 data set
//const URL = 'https://teachablemachine.withgoogle.com/models/tSYJ_WCBU/'; /*08-10-data update*/
// const URL = 'https://teachablemachine.withgoogle.com/models/d9n7_Dic3/'; //*08-11-data 분류별data 테스트update*//
//const URL = 'https://teachablemachine.withgoogle.com/models/WUHK03fdB/'; //08-16 카테고리추가, 데이터 value 1000개 이상 //
//const URL = 'https://teachablemachine.withgoogle.com/models/gWluuh37C/';
const URL = 'https://teachablemachine.withgoogle.com/models/fKDLDB2O7/';

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
	const modelURL = URL + 'model.json';
	const metadataURL = URL + 'metadata.json';

	// load the model and metadata
	// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
	// or files from your local hard drive
	// Note: the pose library adds "tmImage" object to your window (window.tmImage)
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();

	labelContainer = document.getElementById('label-container');
	for (let i = 0; i < maxPredictions; i++) {
		// 라벨링 순차적으로 div 추가
		labelContainer.appendChild(document.createElement('div'));
	    }
	}

// run the webcam image through the image model
async function predict() {
	// predict can take in an image, video or canvas html element
	var image = document.getElementById('sns-image');
	var uploaded = document.getElementById('.file-upload-content');
	var loading = document.getElementById('pg__loading');
	var result = document.getElementById('pg__result');
	const prediction = await model.predict(image, false);

	for (let i = 0; i < maxPredictions; i++) {
		const classPrediction =	prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
		labelContainer.childNodes[i].innerHTML = classPrediction;
	}
    loading.style.display = "none"
    result.style.display = "block";
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var loading = document.getElementById('pg__loading');

        reader.onload = function (e) { /*이미지 업로드시*/
            $('.image-upload-wrap').hide(); /*기존 camera img 가려짐*/

            $('.file-upload-image').attr('src', e.target.result);
            /* ↓ 랜덤으로 이미지 돌려서 gif 보여줘야함 */
            loading.style.display = "block"; // 일단 하나만 보여주기 20200830
            $('.file-upload-content').show(); /*User 업로드 사진이 덮음*/

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
        init().then(()=>{
            console.log("hello");
            predict();
        })
    } else {
        removeUpload();
    }
}

function removeUpload() {
    var result = document.getElementById('pg__result');
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    result.style.display = "none";
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});


$(window).scroll(function(){ 
    if ($(window).scrollTop() >= 60) { 
        $('header').addClass('fixed'); 
    } else {
        $('header').removeClass('fixed'); 
    } 
});