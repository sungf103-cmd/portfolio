이 폴더에 이미지를 넣습니다.

1) 프로필 사진
   - 파일을 이 폴더에 넣습니다. 예: assets/profile.jpg  (정사각형, 400x400 이상 권장)
   - js/site.js 의 photo: "" 를 photo: "assets/profile.jpg" 로 바꿉니다.

2) 프로젝트 스크린샷
   - assets/projects/프로젝트id/ 폴더에 넣습니다. 예: assets/projects/gym/01.png
   - 프로젝트 id: gym, krx, anilog, k8s, wonstory, grade
   - js/site.js 의 해당 프로젝트 images: [] 에 추가합니다.
     예: images: [ { src: "assets/projects/gym/01.png", caption: "QR 스캔 화면" } ]
