<p align="center">
  <img src="./docs/npkill-text-clean.svg" width="380" alt="flutterkill logo" />
</p>
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/dy/flutterkill.svg">
<img alt="npm version" src="https://img.shields.io/npm/v/flutterkill.svg">
<img alt="NPM" src="https://img.shields.io/npm/l/flutterkill.svg">
</p>

### Flutter/Dart 프로젝트의 오래된 빌드 파일과 캐시를 쉽게 찾아 **삭제**하세요 :sparkles:

디스크 공간을 잡아먹는 `build`, `.dart_tool`, `.gradle`, `Pods` 등 Flutter 빌드 산출물을 시스템 전체에서 스캔하고, 크기와 마지막 수정일을 보여주어 어떤 폴더를 정리할지 쉽게 판단할 수 있습니다.

> **npkill** 기반으로 제작되었습니다 ([github.com/voidcosmos/npkill](https://github.com/voidcosmos/npkill))

## 목차

- [특징](#특징)
- [설치](#설치)
- [사용법](#사용법)
  - [멀티 선택 모드](#멀티-선택-모드)
  - [옵션](#옵션)
  - [사용 예시](#사용-예시)
  - [JSON 출력](#json-출력)
- [로컬 개발 환경 설정](#로컬-개발-환경-설정)
- [로드맵](#로드맵)
- [알려진 버그](#알려진-버그)
- [라이선스](#라이선스)

<a name="특징"></a>

# :heavy_check_mark: 특징

- **Flutter 전용 스캔:** `pubspec.yaml`이 있는 Flutter 프로젝트만 정확히 탐지합니다. Android 전용 Gradle 프로젝트나 Flutter SDK 내부 폴더는 자동으로 제외됩니다.

- **다양한 타겟 지원:** `build`, `.dart_tool`, `.fvm`, `ephemeral`, `.gradle`, `Pods` 등 Flutter 빌드 관련 폴더를 한 번에 탐색합니다.

- **마지막 사용 시간 표시:** 각 프로젝트를 마지막으로 수정한 시점을 **last_mod** 컬럼에서 확인할 수 있어, 오래된 프로젝트를 쉽게 식별할 수 있습니다.

- **빠른 속도:** TypeScript로 작성되었지만, 탐색은 저수준에서 수행되어 높은 성능을 발휘합니다.

- **간편한 사용:** 목록에서 방향키로 이동하고 `Del` 키로 삭제. 더 이상 긴 명령어는 필요 없습니다.

- **경량:** 최소한의 의존성만 사용합니다.

<a name="설치"></a>

# :cloud: 설치

설치 없이 바로 사용할 수 있습니다:

```bash
$ npx flutterkill
```

전역 설치를 원한다면:

```bash
$ npm i -g flutterkill
# Unix 사용자는 sudo가 필요할 수 있습니다
```

<a name="사용법"></a>

# :clipboard: 사용법

```bash
$ npx flutterkill
# 전역 설치한 경우
$ flutterkill
```

기본적으로 `flutterkill` 명령어를 실행한 경로부터 Flutter 빌드 폴더를 탐색합니다.

<kbd>↓</kbd> <kbd>↑</kbd> 키로 목록을 이동하고, <kbd>Space</kbd> 또는 <kbd>Del</kbd>로 선택한 폴더를 삭제합니다.
<kbd>j</kbd> / <kbd>k</kbd>로도 이동할 수 있습니다.

<kbd>o</kbd>를 누르면 선택한 폴더가 있는 디렉토리를 파일 탐색기로 엽니다.

종료하려면 <kbd>Q</kbd> 또는 <kbd>Ctrl</kbd> + <kbd>c</kbd>.

**중요!** 현재 활성 프로젝트의 `build` 폴더를 삭제하면 다음 빌드 시 `flutter pub get` 및 재빌드가 필요합니다. 민감한 경로는 :warning: 표시로 강조됩니다.

## 검색 모드

<kbd>/</kbd>를 눌러 검색 모드로 진입합니다. 정규식 패턴으로 결과를 필터링할 수 있습니다.

예: `/work/.*/my_app` — `work` 디렉토리 아래 `my_app`이 포함된 경로만 표시

<kbd>Enter</kbd>로 검색 확정, <kbd>Esc</kbd>로 초기화 및 종료.

## 멀티 선택 모드

<a name="멀티-선택-모드"></a>

여러 폴더를 한 번에 선택하고 삭제할 수 있습니다.

### 진입 방법

<kbd>T</kbd>를 눌러 멀티 선택 모드를 켜고 끕니다. 활성화되면 상단에 선택 카운터와 추가 안내가 표시됩니다.

### 단축키

- **<kbd>Space</kbd>**: 현재 폴더 선택/해제
- **<kbd>V</kbd>**: 범위 선택 모드 시작/종료
- **<kbd>A</kbd>**: 전체 선택/해제 토글
- **<kbd>Enter</kbd>**: 선택된 폴더 전체 삭제
- **<kbd>T</kbd>**: 선택 초기화 후 일반 모드로 복귀

### 범위 선택

<kbd>V</kbd>로 범위 선택 모드 진입 후 커서를 이동하면, 시작 위치와 현재 위치 사이의 모든 폴더가 선택/해제됩니다. <kbd>V</kbd>를 다시 눌러 범위 선택 종료.

<a name="옵션"></a>

## 옵션

| 인수                    | 설명                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| -p, --profiles          | 탐색할 [프로필](./docs/profiles.md) (폴더 타겟 세트)을 지정합니다. 값 없이 사용하면 사용 가능한 프로필 목록을 표시합니다. _(**flutter** 기본값)_ |
| --config                | 커스텀 `.flutterkillrc` 설정 파일 경로. 기본적으로 `./.flutterkillrc` → `~/.flutterkillrc` 순서로 탐색합니다.                                    |
| -d, --directory         | 탐색을 시작할 디렉토리를 지정합니다. 기본값은 현재 경로(`.`)입니다.                                                                              |
| -D, --delete-all        | 발견된 모든 폴더를 자동으로 삭제합니다. `-x` 옵션과 함께 사용하는 것을 권장합니다.                                                               |
| -e, --hide-errors       | 오류 메시지를 숨깁니다.                                                                                                                          |
| -E, --exclude           | 탐색에서 제외할 디렉토리를 지정합니다. (쌍따옴표로 감싸고 쉼표로 구분) 예: `"ignore1, ignore2"`                                                  |
| -f, --full              | 사용자 홈 디렉토리부터 탐색을 시작합니다. (예: Linux의 `/home/user`)                                                                             |
| --size-unit             | 폴더 크기 표시 단위를 설정합니다. _(**auto**, mb, gb 중 선택)_ auto의 경우 1024MB 미만은 MB, 이상은 GB로 표시합니다.                             |
| -h, --help, ?           | 도움말 페이지를 표시합니다.                                                                                                                      |
| -nu, --no-check-update  | 시작 시 업데이트 확인을 건너뜁니다.                                                                                                              |
| -s, --sort              | 결과를 정렬합니다: `size`, `path`, `age` 중 선택                                                                                                 |
| -t, --targets           | 프로필 기능을 비활성화하고 탐색할 폴더 이름을 직접 지정합니다. 쉼표로 여러 개 지정 가능. 예: `-t build,.dart_tool`                               |
| -x, --exclude-sensitive | 민감한 디렉토리를 탐색에서 제외합니다.                                                                                                           |
| -y                      | `--delete-all` 실행 시 경고 표시를 생략합니다.                                                                                                   |
| --dry-run               | 실제로 삭제하지 않고 시뮬레이션만 수행합니다.                                                                                                    |
| --json                  | 스캔 완료 후 결과를 JSON 형식으로 출력합니다. 자동화 및 스크립팅에 유용합니다.                                                                   |
| --json-stream           | 결과를 실시간으로 JSON 스트리밍 형식으로 출력합니다 (결과 발견 시마다 한 줄씩). 실시간 처리에 유용합니다.                                        |
| -v, --version           | flutterkill 버전을 표시합니다.                                                                                                                   |

<a name="사용-예시"></a>

## 사용 예시

- `~/projects` 디렉토리에서 Flutter 빌드 폴더 탐색:

```bash
flutterkill -d ~/projects

# 또는
cd ~/projects
flutterkill
```

- 특정 폴더를 제외하고 탐색:

```bash
flutterkill -d ~/projects --exclude "flutter_sdk, ignore-this"
```

- 홈 디렉토리 전체에서 모든 Flutter 빌드 폴더 자동 삭제:

```bash
flutterkill -f --delete-all -t build,.dart_tool
```

- Flutter 프로필과 함께 Python 캐시도 함께 탐색:

```bash
flutterkill -p flutter,python
```

- 결과를 JSON으로 저장:

```bash
flutterkill --json > results.json
```

- 실시간 JSON 스트리밍으로 결과 처리:

```bash
flutterkill --json-stream | jq '.result.path'
```

<a name="json-출력"></a>

## JSON 출력

자동화 및 다른 도구와의 통합을 위해 두 가지 JSON 출력 모드를 지원합니다:

- **`--json`**: 스캔 완료 후 모든 결과를 단일 JSON 객체로 출력
- **`--json-stream`**: 각 결과를 발견 즉시 별도의 JSON 객체로 실시간 출력

```bash
# 전체 결과를 JSON으로 저장
flutterkill --json > results.json

# 실시간으로 경로만 출력
flutterkill --json-stream | jq '.result.path'

# 100MB 이상인 폴더만 필터링
flutterkill --json | jq '.results[] | select(.size > 104857600)'
```

<a name="로컬-개발-환경-설정"></a>

# :pager: 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/tangible-idea/npkill.git

# 디렉토리 이동
cd npkill

# 의존성 설치
npm install

# 실행
npm run start

# 파라미터와 함께 실행할 경우 "--"를 추가
npm run start -- -f -e
```

<a name="로드맵"></a>

# :crystal_ball: 로드맵

- [x] Flutter 프로필 추가 (`build`, `.dart_tool`, `.fvm`, `ephemeral`, `.gradle`, `Pods`)
- [x] `pubspec.yaml` 기반 Flutter 프로젝트 자동 감지
- [x] Flutter SDK 자동 제외 (`bin/flutter` 존재 여부로 판단)
- [x] 크기 및 경로별 결과 정렬
- [x] JSON 출력 모드 (`--json`, `--json-stream`)
- [ ] 일정 기간 동안 사용하지 않은 프로젝트 필터링
- [ ] 트리 형태로 디렉토리 표시
- [ ] 주기적 자동 정리 (?)

<a name="알려진-버그"></a>

# :bug: 알려진 버그

- 폴더 삭제 중 CLI가 잠시 멈추는 경우가 있습니다.
- 결과가 많을 때 경로 기준 정렬이 터미널 속도를 저하시킬 수 있습니다.
- 간혹 크기 계산값이 실제보다 크게 표시될 수 있습니다.

> 버그를 발견하시면 이슈를 등록해 주세요 :)

<a name="라이선스"></a>

# :scroll: 라이선스

MIT © [Mark Choi](https://github.com/tangible-idea)

> 원본 npkill: MIT © [Nya García Gallardo](https://github.com/NyaGarcia) and [Juan Torres Gómez](https://github.com/zaldih)

---
