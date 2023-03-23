# TIE 

> Today I Exercise 매일 운동을 인증하는 앱 입니다.

- URL : [TIE 🏠](http://tieproject.s3-website.ap-northeast-2.amazonaws.com/)

<br/>

### 📆 프로젝트 기간

- 2023/03/16 ~ 2023/03/23 (7일)

<br/>

### 💻 프론트엔드 기술 스택

<center>
<br/>
<div style="display: inline;">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/axios-6236FF?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"></div>
</center>
<br>

### 🔧 주요 기능
<img width="297" alt="image" src="https://user-images.githubusercontent.com/105100315/227180134-d4880885-ef24-4ac1-b85c-4530c8da9cca.png"><img width="222" alt="image" src="https://user-images.githubusercontent.com/105100315/227180341-e94dfb30-1853-4bd1-9d71-9b11d6029221.png">

<img width="209" alt="image" src="https://user-images.githubusercontent.com/105100315/227209800-380ec896-d14a-4034-9980-16e438ab2a85.png"><img width="200" alt="image" src="https://user-images.githubusercontent.com/105100315/227209897-c5f14075-8191-4f21-ac5c-dd530b828054.png">


자신의 운동 사진을 올리면서 운동 인증.
운동사진에 댓글기능.
게시글 CRUD
댓글 CRD


## 📝 기능 구현

### 1. 회원가입
회원가입 시 유효성 검사를 진행한 값을 서버에 전송

### 2. 로그인

- 로그인 & 로그아웃 기능
- 쿠키 저장 및 로그인 상태 유지


### 게시글 CRUD

### 1. [CREATE]


### 2. [READ]


### 3. [UPDATE & DELETE]


<hr/>

### 💖 About Front-end

#### 👪 &nbsp; 팀원

|   이름    |          깃허브 주소          |                            역할 분담                             |
| :-------: | :---------------------------: | :--------------------------------------------------------------: |
| 👦 백승호 |https://github.com/seunghowhite |로그인, 토큰값 활용, |
| 👧 이주희 |https://github.com/2ggg |CRUD  |

<hr/>

## 트러블 슈팅

## input type =”file” 을이용한 formData


하고 싶은구현. 수정 페이지로 들어가면 기존에 가지고있는 파일 명이 들어가 있으면 좋은데. input type에 file로 설정되어 있으면 자바스크립트 보안상 기존값 value에 접근 할 수 없다고 한다. 

그래서 백엔드에서 바이너리 값을 blob을 이용해서 받고 넣어주고 싶었지만 불가능 했다.




그리고 그렇게 이용한다면 메모리를 많이 사용하여 비효율 적이다.  그렇기 때문에 

백엔드 쪽에서 사진 값이 바뀐게 없으면 기존 사진을 유지하는 방법을 쓰고 해결했지만

저렇게 선택된 파일이 없음이 뜨는것은 조금 찜찜하다. 

💡사진 명을 받아서 그냥 넣어두고 백앤드 쪽에서 처리하는 방법으로 처리하면 좋을것 같다.

## formdata로 값보내기.

## 🤔formdata에 append하면 data가 어떤 형식으로 바뀔까??

**`append`**
 메소드를 사용하여 키/값 쌍을 추가한다.

formdata의 예시.

```jsx
let formData = new FormData();
formData.append('name', 'John');
formData.append('file', fileInput.files[0]);
```


file 받는값.

이점을 이용해서 header에 토큰을 넣어서 보내야 했다.  (명세서에는 그렇게 작성)

이렇게  만들어서 header에 토큰을 넣어서 보내야 하는 상황인데… 문제 해결이 어려웠다.

💡알고보니 백엔드 쪽에서 header로받는게 아니라  쿠키로 받으시고 있었다…(?) 잘 모르지만 해더로 넣는 방법은 알맞게 전달했기 때문에 

```jsx
 //* 제출하기.
  const submitPost = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('img', img)
    try {
      const result = await apis.post('api/posts', formdata, {
        headers: { authorization: `Bearer ${token}` }
      })
      console.log(result.data.message);
      alert('게시글 작성완료')
      navigator("/")
    } catch (e) {
      console.log(e);
      alert(e.response.data.errorMessage)
    }
  }
```

이런식으로 헤더 로 토큰을 보내니 문제가 해결이 되었다.

명세서… 잘 쓰고 잘 확인하자.

## catch 문안에 에러메시지 다 받아놓고 data 확인 미스..

catch문안에 에러메시지 다 받아놓고 data값 잘 안까보고 해결 못해서 오후를 버렸다

```jsx
//*아이디 중복확인
  const checkID = async () => {
    const checkinpo = {
      userId: userID,
    }
    try {
      const result = await apis.post('/api/signup/check', checkinpo)
      console.log("받은데이터", result.data);
      setCheckId(result.duplicationResult)
    }
    catch (e) {
      // console.error(e.response.data.errorMessage)
      alert(e.response.data.errorMessage)
    }
  }
```

저기 e에 모든게 잘 담겨있는데 네트워크 창을 보는 법을 잘 몰라서 response 값이 어떻게 들어오는지 확인을 못했다. 그것도 모르고 백앤드 분들이랑 상의를 진행 했다… 내가 조금더 네트워크 탭을 잘 볼수 있더라면.,ㅠㅠㅠ

✅진짜 개발자 도구 열심히 공부해서 잘 써먹도록 하자.


## 🤔아직 해결 못한것.
### update 부분.

<img width="343" alt="image" src="https://user-images.githubusercontent.com/105100315/227181484-ca9e0fdb-531c-45c5-9031-2e40bdd9300f.png">

랜더링이 선 진행으로 undefined가 먼저 뜨는것 같은데 undefined 예외 처리를 작성 해야 할 듯하다.

```
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const [postList, setPostList] = useState();
  const { posts } = useSelector((state) => {
    return state.postsSlice;
  });
  console.log('posts', posts);
  let decodetoken = null;
  if (token) {
    decodetoken = jwtDecode(token);
  }
  const navigator = useNavigate();
  const param = useParams();
  const id = param.postId
  const foudData = posts?.find((data) => data.postId === Number(id));
  console.log(foudData, 'fondData');
  let foundimg = null
  if (foudData.img && !foudData.img && foudData.img !== 'false') {
    foundimg = `${process.env.REACT_APP_IMAGE_URL}` + foudData.img
  }
  ```


