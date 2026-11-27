/* =========================================================
   리믹스 성수 · LOOK AND ME — 데모 데이터 (11/27)
   - 이름 30개 = v3 그대로
   - 룩마다 옷 4벌: 표기 '브랜드 - 옷 이름' (기부 의류는 브랜드 자리에 '기부 의류')
   - tags = 참가자가 고른 분위기 해시태그 2개, 소재 태그는 옷(material)에서 자동
   - person · pose · en = 이미지 생성용 영어 설명 (화면에는 안 씀)
   - 사진: look = assets/img/looks/look_NN.jpg, 옷 = assets/img/items/SNN-K.jpg
     (사진 파일이 없으면 화면은 번호만 적힌 회색 칸)
   ========================================================= */
window.LAM_DATA = {
  event: {
    name: 'LOOK AND ME',
    date: '2027.10.9(토) 18:00–20:00',
    place: '성동구민종합체육센터 대체육관',
    hashtag: '#룩앤미성수',
    creativeUrl: 'https://www.creativexseongsu.co.kr/'
  },

  /* 참가자가 옷 스캔 화면에서 고르는 분위기 해시태그 */
  moodTags: ['미니멀', '시크', '클래식', '젠더리스', '빈티지', '로맨틱', '프레피', '레이어드', '스트리트', '스포티', 'Y2K', '컬러풀', '워크웨어', '고프코어', '내추럴', '보헤미안'],

  /* 투표 완료 — 이어서 즐기는 크리에이티브X성수 (프로그램 · 시간 · 장소는 예시, 2027 프로그램표가 나오면 바꿈) */
  programs: [
    { id: 'music', series: '뮤직성수', title: '뮤직성수 스트리트 라이브', when: '10.9(토) 20:30', where: '성수 야외 스테이지', how: '모바일 예매 후 입장', tags: ['스트리트', '스포티', 'Y2K', '컬러풀'] },
    { id: 'art', series: '아트페어', title: '성수 아트페어 야간 관람', when: '10.9(토) 20:00–22:00', where: '성수 아트페어 전시장', how: '현장 입장', tags: ['미니멀', '시크', '클래식', '젠더리스'] },
    { id: 'film', series: '필름성수', title: '필름성수 심야 상영', when: '10.9(토) 21:00', where: '성수 야외 상영장', how: '모바일 예매 후 입장', tags: ['빈티지', '로맨틱', '프레피', '레이어드'] },
    { id: 'market', series: '성수 공방 마켓', title: '성수 공방 마켓', when: '10.10(일) 12:00–18:00', where: '성수 공방 거리', how: '자유 입장', tags: ['워크웨어', '고프코어', '내추럴', '보헤미안'] }
  ],

  /* 참가자 모드 시연 계정 — 처음엔 옷이 없고, QR로 스캔해서 등록 */
  demoStyler: 7,

  /* 프로필이 열리는 사람 = 미리 받은 사진 · 런웨이 사진 · 옷 사진까지 다 있는 7명 (11/27 사용자 결정)
     나머지는 스타일러 목록(미리 받은 사진) · 투표(런웨이 사진)에만 나오고 눌러도 프로필이 안 열림 */
  fullProfiles: [1, 2, 3, 4, 5, 6, 7],

  stylers: [
    { no: 1, name: '김서윤', insta: 'seoyun.kim', tags: ['빈티지', '레이어드'],
      person: 'Korean woman, mid-20s, long dark wavy hair, slim', pose: 'walking toward the camera mid-stride, hands in jacket pockets, relaxed confident face',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '버건디 레더 재킷', material: '레더', en: 'cropped oversized burgundy (oxblood) leather biker jacket, slightly worn and creased, silver zippers' },
        { cat: '상의', brand: '기부 의류', name: '크림 오버셔츠', material: '코튼', en: 'oversized cream cotton button-up shirt, collar open, long shirt tails' },
        { cat: '하의', brand: '협찬 브랜드', name: '차콜 플리츠 스커트', material: '울', en: 'charcoal-gray asymmetric pleated wool midi skirt with a sheer layered hem' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 더비 슈즈', material: '레더', en: 'black polished leather derby shoes with chunky lug soles and cream laces' }
      ] },
    { no: 2, name: '박지우', insta: 'jiwoo_park', tags: ['시크', '로맨틱'],
      person: 'Korean woman, late 20s, tall, black hair in a low sleek bun', pose: 'standing at the end of the runway, weight on one leg, looking slightly off-camera',
      items: [
        { cat: '아우터', brand: '협찬 브랜드', name: '블랙 테일러드 재킷', material: '울', en: 'sharp black single-breasted tailored blazer with 3/4 sleeves' },
        { cat: '하의', brand: '협찬 브랜드', name: '시어 레이어드 스커트', material: '시어', en: 'black sheer tulle layered midi skirt, black shorts visible underneath' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 앵클 부츠', material: '레더', en: 'black leather ankle boots with a block heel' },
        { cat: '가방', brand: '성수 가죽 공방', name: '블랙 미니 숄더백', material: '레더', en: 'small black leather shoulder bag, handmade look, no logo' }
      ] },
    { no: 3, name: '이하린', insta: 'harin.lee', tags: ['컬러풀', '스트리트'],
      person: 'Korean woman, early 20s, short bob with bangs, petite', pose: 'walking with a playful stride, one hand on the jacket collar, smiling',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '오렌지 나일론 바람막이', material: '나일론', en: 'vintage bright-orange nylon windbreaker, half-zip, slightly oversized, no logo' },
        { cat: '하의', brand: '기부 의류', name: '라이트 데님 와이드 팬츠', material: '데님', en: 'light-wash wide-leg denim jeans, slightly long, cuffed once' },
        { cat: '신발', brand: '협찬 브랜드', name: '화이트 캔버스 스니커즈', material: '코튼', en: 'white low-top canvas sneakers, a little scuffed, no logo' },
        { cat: '소품', brand: '성수 금속 공방', name: '실버 체인 목걸이', material: '실버', en: 'chunky handmade silver chain necklace' }
      ] },
    { no: 4, name: '최도윤', insta: 'doyun_choi', tags: ['워크웨어', '스트리트'],
      person: 'Korean man, early 30s, short black hair, medium build, light stubble', pose: 'walking toward the camera, one hand holding the jacket front, natural half-smile',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '브라운 덕 워크 재킷', material: '코튼', en: 'faded brown cotton-duck work (chore) jacket with a corduroy collar' },
        { cat: '상의', brand: '기부 의류', name: '그레이 후드 티셔츠', material: '코튼', en: 'heather-gray cotton hoodie' },
        { cat: '하의', brand: '협찬 브랜드', name: '올리브 카고 팬츠', material: '코튼', en: 'wide olive cotton cargo pants' },
        { cat: '신발', brand: '성수 슈메이커', name: '브라운 워크 부츠', material: '레더', en: 'brown leather lace-up work boots' }
      ] },
    { no: 5, name: '정민서', insta: 'minseo.jung', tags: ['로맨틱', '빈티지'],
      person: 'Korean woman, mid-20s, long straight hair half-up', pose: 'walking softly, one hand on the bag strap, gentle smile',
      items: [
        { cat: '원피스', brand: '기부 의류', name: '플로럴 티어드 원피스', material: '코튼', en: 'vintage cream midi dress with a small faded red floral print and a tiered skirt' },
        { cat: '아우터', brand: '성수 빈티지 숍', name: '아이보리 케이블 가디건', material: '니트', en: 'chunky ivory cable-knit cardigan, worn draped over the shoulders' },
        { cat: '신발', brand: '성수 슈메이커', name: '버건디 메리제인 슈즈', material: '레더', en: 'burgundy leather Mary Jane shoes, worn with white ankle socks' },
        { cat: '가방', brand: '성수 가죽 공방', name: '탄 레더 버킷백', material: '레더', en: 'tan leather bucket bag with a drawstring' }
      ] },
    { no: 6, name: '윤지안', insta: 'jian.yoon', tags: ['컬러풀', '클래식'],
      person: 'Korean woman, late 20s, shoulder-length hair tucked behind the ears', pose: 'mid-stride, long coat open and moving',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '코발트 울 롱코트', material: '울', en: 'cobalt-blue wool long coat' },
        { cat: '상의', brand: '기부 의류', name: '핑크 보우 블라우스', material: '새틴', en: 'pale pink satin blouse with a soft bow at the neck' },
        { cat: '하의', brand: '협찬 브랜드', name: '크림 와이드 슬랙스', material: '울', en: 'cream wide-leg pleated trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '레드 페니 로퍼', material: '레더', en: 'glossy red leather penny loafers' }
      ] },
    { no: 7, name: '한유진', insta: 'yujin.han', tags: ['스포티', '스트리트'],
      person: 'Korean woman, early 20s, high ponytail, athletic', pose: 'walking fast with energy, arms swinging, big grin',
      items: [
        { cat: '아우터', brand: '기부 의류', name: '네이비 트랙 재킷', material: '나일론', en: 'vintage navy nylon track jacket with white side stripes, no logo' },
        { cat: '하의', brand: '협찬 브랜드', name: '그레이 스웨트 팬츠', material: '코튼', en: 'heather-gray wide sweatpants' },
        { cat: '신발', brand: '협찬 브랜드', name: '실버 러닝 스니커즈', material: '메시', en: 'retro silver-and-white running sneakers, no logo' },
        { cat: '가방', brand: '성수 가죽 공방', name: '블랙 레더 크로스백', material: '레더', en: 'small black leather crossbody bag' }
      ] },
    { no: 8, name: '오시온', insta: 'sion_oh', tags: ['프레피', '미니멀'],
      person: 'Korean man, mid-20s, medium-length wavy hair, slim', pose: 'walking with hands relaxed at the sides, calm serious face',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '그레이 헤링본 블레이저', material: '트위드', en: 'gray herringbone tweed blazer, slightly oversized' },
        { cat: '상의', brand: '기부 의류', name: '화이트 옥스퍼드 셔츠', material: '코튼', en: 'white cotton oxford button-down shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '블랙 와이드 슬랙스', material: '울', en: 'black wide pleated wool trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 첼시 부츠', material: '레더', en: 'black leather Chelsea boots' }
      ] },
    { no: 9, name: '강다은', insta: 'daeun.kang', tags: ['내추럴', '레이어드'],
      person: 'Korean woman, mid-20s, long hair in a low braid', pose: 'walking slowly, tote bag on the shoulder, soft smile',
      items: [
        { cat: '아우터', brand: '협찬 브랜드', name: '베이지 린넨 재킷', material: '린넨', en: 'beige linen chore jacket' },
        { cat: '원피스', brand: '기부 의류', name: '화이트 코튼 원피스', material: '코튼', en: 'simple white cotton midi slip dress' },
        { cat: '신발', brand: '성수 슈메이커', name: '탄 스웨이드 로퍼', material: '스웨이드', en: 'tan suede loafers' },
        { cat: '가방', brand: '성수 가죽 공방', name: '캔버스 레더 토트백', material: '캔버스', en: 'natural canvas tote bag with brown leather handles' }
      ] },
    { no: 10, name: '임하준', insta: 'hajun_lim', tags: ['스트리트', '프레피'],
      person: 'Korean man, late 20s, buzz cut, broad shoulders', pose: 'swaggering walk toward the camera, chin slightly up',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '그린 바시티 재킷', material: '울', en: 'vintage forest-green wool varsity jacket with cream leather sleeves, no letters or patches' },
        { cat: '상의', brand: '기부 의류', name: '화이트 크루넥 티셔츠', material: '코튼', en: 'plain white crew-neck T-shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '블랙 스트레이트 데님', material: '데님', en: 'black straight-leg denim jeans' },
        { cat: '신발', brand: '협찬 브랜드', name: '화이트 하이탑 스니커즈', material: '레더', en: 'white leather high-top sneakers, no logo' }
      ] },
    { no: 11, name: '조아린', insta: 'arin.jo', tags: ['빈티지', '프레피'],
      person: 'Korean woman, early 20s, long hair with curtain bangs', pose: 'walking with one hand in the jacket pocket, looking at the camera',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '머스터드 코듀로이 재킷', material: '코듀로이', en: 'mustard-yellow corduroy jacket' },
        { cat: '상의', brand: '기부 의류', name: '크림 터틀넥 니트', material: '니트', en: 'cream ribbed turtleneck knit' },
        { cat: '하의', brand: '협찬 브랜드', name: '브라운 체크 스커트', material: '울', en: 'brown plaid wool A-line knee-length skirt' },
        { cat: '신발', brand: '성수 슈메이커', name: '브라운 니하이 부츠', material: '레더', en: 'brown leather knee-high boots' }
      ] },
    { no: 12, name: '신도현', insta: 'dohyun.shin', tags: ['미니멀', '시크'],
      person: 'Korean man, about 30, neat side-parted hair, thin metal glasses', pose: 'walking evenly, hands in coat pockets',
      items: [
        { cat: '아우터', brand: '협찬 브랜드', name: '차콜 맥 코트', material: '코튼', en: 'charcoal cotton mac (trench-style) coat, single-breasted' },
        { cat: '상의', brand: '기부 의류', name: '블랙 터틀넥 니트', material: '니트', en: 'black fine-knit turtleneck' },
        { cat: '하의', brand: '성수 빈티지 숍', name: '그레이 울 슬랙스', material: '울', en: 'mid-gray wool straight trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 플레인토 더비', material: '레더', en: 'black leather plain-toe derby shoes with a slim sole' }
      ] },
    { no: 13, name: '문채원', insta: 'chaewon_moon', tags: ['클래식', '미니멀'],
      person: 'Korean woman, late 20s, sleek long straight hair', pose: 'standing at the end of the runway, one hand holding the coat lapel',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '카멜 울 롱코트', material: '울', en: 'camel wool long coat' },
        { cat: '상의', brand: '기부 의류', name: '아이보리 니트 톱', material: '니트', en: 'ivory fine-knit crew-neck top' },
        { cat: '하의', brand: '협찬 브랜드', name: '블랙 펜슬 스커트', material: '울', en: 'black wool midi pencil skirt' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 슬링백 힐', material: '레더', en: 'black leather slingback low heels' }
      ] },
    { no: 14, name: '백지호', insta: 'jiho.baek', tags: ['고프코어', '스포티'],
      person: 'Korean man, mid-20s, messy dyed-brown hair, lean', pose: 'walking with a light bounce, thumb on the bag strap',
      items: [
        { cat: '아우터', brand: '기부 의류', name: '블랙 화이트 플리스 재킷', material: '플리스', en: 'black-and-white color-block fleece zip jacket, no logo' },
        { cat: '하의', brand: '협찬 브랜드', name: '네이비 나일론 트랙 팬츠', material: '나일론', en: 'navy nylon track pants' },
        { cat: '신발', brand: '협찬 브랜드', name: '그레이 청키 스니커즈', material: '메시', en: 'chunky gray mesh sneakers, no logo' },
        { cat: '가방', brand: '성수 가죽 공방', name: '블랙 슬링백', material: '나일론', en: 'small black nylon sling bag with a leather tab' }
      ] },
    { no: 15, name: '서유나', insta: 'yuna.seo', tags: ['내추럴', '미니멀'],
      person: 'Korean woman, mid-20s, chin-length bob', pose: 'walking calmly, arms relaxed, soft expression',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '오트밀 니트 가디건', material: '니트', en: 'long oatmeal knit cardigan' },
        { cat: '상의', brand: '기부 의류', name: '화이트 코튼 티셔츠', material: '코튼', en: 'plain white cotton T-shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '에크루 린넨 와이드 팬츠', material: '린넨', en: 'ecru wide-leg linen trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '베이지 레더 뮬', material: '레더', en: 'beige leather flat mules' }
      ] },
    { no: 16, name: '남시우', insta: 'siwoo_nam', tags: ['빈티지', '워크웨어'],
      person: 'Korean man, late 20s, short curly hair', pose: 'walking with a relaxed smile, jacket collar popped',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '빈티지 데님 재킷', material: '데님', en: 'faded mid-blue denim trucker jacket' },
        { cat: '상의', brand: '기부 의류', name: '레드 체크 플란넬 셔츠', material: '코튼', en: 'red-and-black checked flannel shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '베이지 치노 팬츠', material: '코튼', en: 'beige cotton chino trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '브라운 스웨이드 데저트 부츠', material: '스웨이드', en: 'brown suede desert boots' }
      ] },
    { no: 17, name: '배하은', insta: 'haeun.bae', tags: ['Y2K', '스트리트'],
      person: 'Korean woman, early 20s, long hair with small hair clips', pose: 'walking with attitude, one hand on the hip',
      items: [
        { cat: '아우터', brand: '기부 의류', name: '옐로 패딩 조끼', material: '나일론', en: 'bright-yellow puffer vest' },
        { cat: '상의', brand: '성수 빈티지 숍', name: '네이비 스트라이프 티셔츠', material: '코튼', en: 'navy-and-white striped long-sleeve T-shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '블랙 카고 미니스커트', material: '코튼', en: 'black cotton cargo mini skirt worn over black tights' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 플랫폼 부츠', material: '레더', en: 'black leather chunky platform boots' }
      ] },
    { no: 18, name: '유건우', insta: 'gunwoo.yu', tags: ['워크웨어', '클래식'],
      person: 'Korean man, early 30s, short hair, short neat beard, sturdy build', pose: 'walking steadily, sleeves pushed up',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '네이비 프렌치 워크 재킷', material: '코튼', en: 'faded navy French work (chore) jacket' },
        { cat: '상의', brand: '기부 의류', name: '에크루 헨리넥 티셔츠', material: '코튼', en: 'ecru long-sleeve henley' },
        { cat: '하의', brand: '협찬 브랜드', name: '인디고 생지 데님', material: '데님', en: 'dark indigo raw selvedge denim jeans, cuffed' },
        { cat: '신발', brand: '성수 슈메이커', name: '탄 목토 워크 부츠', material: '레더', en: 'tan leather moc-toe work boots' }
      ] },
    { no: 19, name: '장예린', insta: 'yerin_jang', tags: ['보헤미안', '로맨틱'],
      person: 'Korean woman, late 20s, long wavy hair', pose: 'walking gracefully, skirt moving',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '더스티 로즈 가디건', material: '니트', en: 'dusty-rose knit cardigan' },
        { cat: '상의', brand: '기부 의류', name: '화이트 레이스 블라우스', material: '코튼', en: 'white cotton blouse with lace trim at the collar' },
        { cat: '하의', brand: '협찬 브랜드', name: '베이지 티어드 롱스커트', material: '코튼', en: 'long beige tiered cotton skirt' },
        { cat: '신발', brand: '성수 슈메이커', name: '브라운 발레 플랫', material: '레더', en: 'brown leather ballet flats' }
      ] },
    { no: 20, name: '안태오', insta: 'taeo.an', tags: ['미니멀', '젠더리스'],
      person: 'Korean man, mid-20s, tall and slim, two-block haircut', pose: 'long confident stride, coat open',
      items: [
        { cat: '아우터', brand: '협찬 브랜드', name: '블랙 오버사이즈 울 코트', material: '울', en: 'black oversized wool coat' },
        { cat: '상의', brand: '기부 의류', name: '화이트 크루넥 니트', material: '니트', en: 'white crew-neck knit sweater' },
        { cat: '하의', brand: '성수 빈티지 숍', name: '블랙 와이드 트라우저', material: '울', en: 'black wide wool trousers' },
        { cat: '소품', brand: '성수 금속 공방', name: '실버 체인 목걸이', material: '실버', en: 'handmade silver chain necklace worn over the knit' }
      ] },
    { no: 21, name: '송나연', insta: 'nayeon.song', tags: ['프레피', '클래식'],
      person: 'Korean woman, about 30, chin-length bob', pose: 'walking with a slight smile, one hand in the trouser pocket',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '네이비 더블 블레이저', material: '울', en: 'navy double-breasted wool blazer with gold buttons' },
        { cat: '상의', brand: '기부 의류', name: '블루 스트라이프 셔츠', material: '코튼', en: 'blue-and-white striped button-down shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '베이지 와이드 트라우저', material: '울', en: 'beige wide-leg trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '브라운 레더 로퍼', material: '레더', en: 'brown leather loafers' }
      ] },
    { no: 22, name: '전이안', insta: 'ian_jeon', tags: ['스트리트', '빈티지'],
      person: 'Korean man, early 20s, bleached blond short hair, skinny', pose: 'loose easy walk, hands in pockets',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '레드 체크 셔츠 재킷', material: '울', en: 'oversized vintage red-and-black plaid wool shirt jacket' },
        { cat: '상의', brand: '기부 의류', name: '블랙 티셔츠', material: '코튼', en: 'plain black T-shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '배기 라이트 데님', material: '데님', en: 'baggy light-wash jeans' },
        { cat: '신발', brand: '협찬 브랜드', name: '블랙 스케이트 슈즈', material: '스웨이드', en: 'black-and-white suede skate shoes, no logo' }
      ] },
    { no: 23, name: '홍수빈', insta: 'subin.hong', tags: ['워크웨어', '미니멀'],
      person: 'Korean woman, mid-20s, low ponytail', pose: 'walking with purpose, one hand on the belt',
      items: [
        { cat: '원피스', brand: '협찬 브랜드', name: '카키 유틸리티 점프수트', material: '코튼', en: 'khaki cotton utility jumpsuit with chest pockets' },
        { cat: '소품', brand: '성수 가죽 공방', name: '블랙 레더 벨트', material: '레더', en: 'black leather belt with a silver buckle' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 컴뱃 부츠', material: '레더', en: 'black leather lace-up combat boots' },
        { cat: '가방', brand: '기부 의류', name: '블랙 나일론 크로스백', material: '나일론', en: 'black nylon crossbody bag' }
      ] },
    { no: 24, name: '차은우', insta: 'eunwoo.cha', tags: ['빈티지', '클래식'],
      person: 'Korean man, late 20s, short neat hair', pose: 'walking with a gentle smile, one hand adjusting the blazer button',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '브라운 코듀로이 블레이저', material: '코듀로이', en: 'brown corduroy blazer' },
        { cat: '상의', brand: '기부 의류', name: '크림 니트 베스트', material: '니트', en: 'cream cable-knit sweater vest over a white shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '베이지 울 트라우저', material: '울', en: 'beige wool trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '버건디 레더 로퍼', material: '레더', en: 'burgundy leather loafers' }
      ] },
    { no: 25, name: '권민지', insta: 'minji.kwon', tags: ['스포티', 'Y2K'],
      person: 'Korean woman, mid-20s, long straight black hair', pose: 'walking with a bright smile, ponytail swinging',
      items: [
        { cat: '아우터', brand: '기부 의류', name: '레드 트랙 재킷', material: '나일론', en: 'red nylon track jacket with white piping, no logo' },
        { cat: '하의', brand: '협찬 브랜드', name: '화이트 플리츠 테니스 스커트', material: '코튼', en: 'white pleated tennis skirt' },
        { cat: '신발', brand: '협찬 브랜드', name: '화이트 청키 스니커즈', material: '레더', en: 'white chunky leather sneakers, no logo' },
        { cat: '가방', brand: '성수 가죽 공방', name: '화이트 레더 숄더백', material: '레더', en: 'small white leather shoulder bag' }
      ] },
    { no: 26, name: '노재윤', insta: 'jaeyun_noh', tags: ['고프코어', '시크'],
      person: 'Korean man, early 30s, short hair, black-rim glasses', pose: 'walking steadily, hands on the jacket pockets',
      items: [
        { cat: '아우터', brand: '협찬 브랜드', name: '블랙 나일론 필드 재킷', material: '나일론', en: 'black nylon field jacket with four front pockets' },
        { cat: '상의', brand: '기부 의류', name: '그레이 스웨트셔츠', material: '코튼', en: 'gray crew-neck sweatshirt' },
        { cat: '하의', brand: '성수 빈티지 숍', name: '블랙 카고 팬츠', material: '코튼', en: 'black cotton cargo pants' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 하이킹 부츠', material: '레더', en: 'black leather hiking-style boots' }
      ] },
    { no: 27, name: '심가은', insta: 'gaeun.sim', tags: ['보헤미안', '컬러풀'],
      person: 'Korean woman, late 20s, voluminous curly perm hair', pose: 'walking with a playful smile, jacket slipping off one shoulder',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '에메랄드 스웨이드 재킷', material: '스웨이드', en: 'emerald-green suede jacket' },
        { cat: '상의', brand: '기부 의류', name: '크림 러플 블라우스', material: '코튼', en: 'cream ruffled blouse' },
        { cat: '하의', brand: '협찬 브랜드', name: '브라운 코듀로이 플레어 팬츠', material: '코듀로이', en: 'brown corduroy flared pants' },
        { cat: '신발', brand: '성수 슈메이커', name: '탄 플랫폼 클로그', material: '레더', en: 'tan leather platform clogs' }
      ] },
    { no: 28, name: '양준서', insta: 'junseo.yang', tags: ['내추럴', '클래식'],
      person: 'Korean man, late 20s, medium-length straight hair', pose: 'walking relaxed, trench coat belt hanging loose',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '베이지 트렌치코트', material: '코튼', en: 'beige cotton trench coat' },
        { cat: '상의', brand: '기부 의류', name: '화이트 티셔츠', material: '코튼', en: 'plain white T-shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '에크루 와이드 팬츠', material: '코튼', en: 'ecru wide cotton trousers' },
        { cat: '신발', brand: '성수 슈메이커', name: '화이트 레더 스니커즈', material: '레더', en: 'minimal white leather sneakers, no logo' }
      ] },
    { no: 29, name: '고은채', insta: 'eunchae.go', tags: ['레이어드', '프레피'],
      person: 'Korean woman, early 20s, two low braids', pose: 'walking with a shy smile, sweater sleeves over the hands',
      items: [
        { cat: '상의', brand: '기부 의류', name: '그레이 오버사이즈 니트', material: '니트', en: 'oversized heather-gray knit sweater' },
        { cat: '상의', brand: '성수 빈티지 숍', name: '화이트 롱 셔츠', material: '코튼', en: 'long white shirt layered under the sweater, hem showing' },
        { cat: '하의', brand: '협찬 브랜드', name: '블랙 레더 미니스커트', material: '레더', en: 'black leather mini skirt' },
        { cat: '신발', brand: '성수 슈메이커', name: '블랙 플랫폼 로퍼', material: '레더', en: 'black leather platform loafers worn with white knee socks' }
      ] },
    { no: 30, name: '황지민', insta: 'jimin.hwang', tags: ['시크', '젠더리스'],
      person: 'Korean woman, early 30s, short pixie cut', pose: 'standing at the end of the runway, chin up, hands in coat pockets',
      items: [
        { cat: '아우터', brand: '성수 빈티지 숍', name: '블랙 레더 트렌치코트', material: '레더', en: 'black leather trench coat' },
        { cat: '상의', brand: '기부 의류', name: '화이트 코튼 셔츠', material: '코튼', en: 'crisp white cotton shirt' },
        { cat: '하의', brand: '협찬 브랜드', name: '블랙 와이드 슬랙스', material: '울', en: 'black wide-leg wool trousers' },
        { cat: '소품', brand: '성수 금속 공방', name: '실버 커프 팔찌', material: '실버', en: 'wide handmade silver cuff bracelet' }
      ] }
  ]
};
