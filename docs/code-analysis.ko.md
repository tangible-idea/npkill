# flutterkill 코드 분석 (한국어)

## 1) 프로젝트 한 줄 요약

`flutterkill`은 시스템 내에서 Flutter 빌드 산출물(`build`, `.dart_tool` 등 프로필로 지정한 대상 폴더)를 빠르게 탐색하고, 크기/수정시각/민감도 정보를 바탕으로 CLI UI 또는 JSON 형태로 정리해 주며, 필요 시 안전하게 삭제까지 수행하는 TypeScript 기반 도구입니다.

> **npkill** 기반으로 제작되었습니다 ([github.com/voidcosmos/npkill](https://github.com/voidcosmos/npkill))

- CLI 진입점: `src/index.ts` → `src/main.ts`[@src/index.ts#1-14](../src/index.ts#L1-L14) [@src/main.ts#17-45](../src/main.ts#L17-L45)
- 코어 엔진: `src/core/npkill.ts`[@src/core/npkill.ts#34-161](../src/core/npkill.ts#L34-L161)
- 오케스트레이션: `src/cli/cli.controller.ts`[@src/cli/cli.controller.ts#50-909](../src/cli/cli.controller.ts#L50-L909)

---

## 2) 실행 구조 (부트스트랩)

### 2.1 진입점

1. `src/index.ts`에서 직접 실행 여부를 확인한 뒤 `main()` 호출
2. `main()`에서 서비스들을 생성/주입하고 `CliController.init()` 수행

핵심은 **의존성 주입 형태**로 컨트롤러를 구성해 모듈 간 결합을 낮춘 점입니다. [@src/main.ts#17-45](../src/main.ts#L17-L45)

### 2.2 Controller 초기화 흐름

`CliController.init()`의 큰 흐름:

1. 설정 파일 로딩 (`loadConfigFile`)
2. CLI 인자 파싱 (`parseArguments`)
3. JSON 모드 여부 분기
   - `--json-stream` 또는 `--json`이면 JSON 경로로 스캔
   - 아니면 인터랙티브 TUI 초기화 후 스캔

[@src/cli/cli.controller.ts#81-130](../src/cli/cli.controller.ts#L81-L130)

---

## 3) 스캔/분석 파이프라인

## 3.1 고수준 파이프라인

- `CliController.scan()`에서 UI/JSON 모드를 결정 [@src/cli/cli.controller.ts#704-714](../src/cli/cli.controller.ts#L704-L714)
- `ScanService.scan()`이 `Npkill.startScan$()`를 사용해 대상 폴더 스트림 생성 [@src/cli/services/scan.service.ts#31-61](../src/cli/services/scan.service.ts#L31-L61)
- 이후 `calculateFolderStats()`로 크기/수정시각 보강 [@src/cli/services/scan.service.ts#63-128](../src/cli/services/scan.service.ts#L63-L128)

## 3.2 Npkill 코어 동작

`Npkill.startScan$()`는 파일 서비스의 디렉터리 스트림을 받아 결과를 분해하고(`splitData`), 필요 시 민감도(`riskAnalysis`)를 붙여 방출합니다. [@src/core/npkill.ts#49-86](../src/core/npkill.ts#L49-L86)

추가 API:

- `getSize$()` 폴더 크기 계산 [@src/core/npkill.ts#88-96](../src/core/npkill.ts#L88-L96)
- `getNewestFile$()` 최근 수정 파일 시각 계산 [@src/core/npkill.ts#98-112](../src/core/npkill.ts#L98-L112)
- `delete$()` 실제/드라이런 삭제 [@src/core/npkill.ts#114-136](../src/core/npkill.ts#L114-L136)

## 3.3 Worker 기반 성능 설계

실제 탐색/크기계산은 `FileWorkerService` + worker thread(`files.worker.ts`) 구조로 처리합니다.

- CPU 코어 기반 worker 수 산정 (`cores - 1`, 최대 상수 제한) [@src/core/services/files/files.worker.service.ts#309-315](../src/core/services/files/files.worker.service.ts#L309-L315)
- 라운드로빈으로 작업 분배 [@src/core/services/files/files.worker.service.ts#215-228](../src/core/services/files/files.worker.service.ts#L215-L228)
- worker 내부에서 탐색 작업과 폴더 크기 작업을 큐 기반 처리 [@src/core/services/files/files.worker.ts#318-363](../src/core/services/files/files.worker.ts#L318-L363)

즉, 구조적으로 **I/O + 병렬 처리**를 적극 활용해 스캔 속도를 확보한 형태입니다.

---

## 4) 삭제 안전장치와 리스크 처리

## 4.1 민감 경로 판별

`FileService.isDangerous()`에서 홈 디렉터리 숨김 경로, macOS `.app`, Windows `AppData`, UNC 숨김 경로 등을 민감도로 판정합니다. [@src/core/services/files/files.service.ts#75-197](../src/core/services/files/files.service.ts#L75-L197)

## 4.2 삭제 전 검사

`CliController.deleteFolder()`는 아래 순서로 안전 처리:

1. 이미 삭제/삭제중 상태 방지
2. `isSafeToDelete()`로 타겟 경로 안전성 검사
3. 상태값 갱신(`deleting` → `deleted/error-deleting`) 및 UI 반영

[@src/cli/cli.controller.ts#870-903](../src/cli/cli.controller.ts#L870-L903)

## 4.3 드라이런

`--dry-run` 시 실제 삭제 대신 fake delete를 수행합니다. [@src/core/npkill.ts#119-121](../src/core/npkill.ts#L119-L121) [@src/core/services/files/files.service.ts#41-46](../src/core/services/files/files.service.ts#L41-L46)

---

## 5) 설정(.flutterkillrc) 및 프로필

## 5.1 설정 파일 우선순위

`ConfigService.loadConfig()`/`resolveConfigPath()` 기준:

1. `--config` 지정 경로
2. 현재 디렉터리 `./.flutterkillrc`
3. 홈 디렉터리 `~/.flutterkillrc`

[@src/core/services/config.service.ts#18-35](../src/core/services/config.service.ts#L18-L35) [@src/core/services/config.service.ts#72-86](../src/core/services/config.service.ts#L72-L86)

## 5.2 컨트롤러 반영 방식

`CliController.loadConfigFile()`에서 설정을 읽어 런타임 config에 병합하고, 사용자 프로필을 `ProfilesService`에 주입합니다. [@src/cli/cli.controller.ts#265-345](../src/cli/cli.controller.ts#L265-L345)

## 5.3 프로필 시스템

- 기본 + 사용자 정의 프로필 병합 조회
- 프로필명 검증
- 여러 프로필의 targets 유니크 병합

[@src/core/services/profiles.service.ts#29-89](../src/core/services/profiles.service.ts#L29-L89)

## 5.4 내장 프로필 목록

`profiles.constants.ts`에 정의된 내장 프로필:

| 프로필             | 대상 폴더 예시                                                |
| ------------------ | ------------------------------------------------------------- |
| **flutter** (기본) | `build`, `.dart_tool`, `.fvm`, `ephemeral`, `.gradle`, `Pods` |
| **python**         | `__pycache__`, `.venv`, `.pytest_cache` 등                    |
| **java**           | `target`, `.gradle`, `out`                                    |
| **node**           | `node_modules`, `.next`, `.nuxt`, `coverage` 등               |
| **android**        | `.cxx`, `externalNativeBuild`                                 |
| **swift**          | `DerivedData`, `.swiftpm`                                     |
| **rust**           | `target`                                                      |
| **unity**          | `Library`, `Temp`, `Obj`                                      |
| **infra**          | `.serverless`, `.vercel`, `.terraform` 등                     |
| **all**            | 위 모든 프로필의 targets 합집합                               |

[@src/core/constants/profiles.constants.ts#6-161](../src/core/constants/profiles.constants.ts#L6-L161)

---

## 6) 출력 모드

## 6.1 인터랙티브 TUI 모드

- `UiService` + 여러 UI 컴포넌트(`ResultsUi`, `StatsUi`, `StatusUi` 등)로 화면 구성
- 키입력/리사이즈/에러 이벤트를 컨트롤러가 중앙 처리

[@src/cli/cli.controller.ts#137-173](../src/cli/cli.controller.ts#L137-L173) [@src/cli/cli.controller.ts#666-687](../src/cli/cli.controller.ts#L666-L687)

## 6.2 JSON 모드

- `--json-stream`: 결과 1건당 1줄 JSON 즉시 출력
- `--json`: 전체 결과 누적 후 종료 시 단일 JSON 출력

구현: `JsonOutputService` [@src/cli/services/json-output.service.ts#21-104](../src/cli/services/json-output.service.ts#L21-L104)

컨트롤러 분기: [@src/cli/cli.controller.ts#722-745](../src/cli/cli.controller.ts#L722-L745)

---

## 7) CLI 인자 처리 규칙

인자 파싱은 `ConsoleService.getParameters()`가 담당하며, `--opt=value` 형태를 정규화한 뒤 옵션 사전(`OPTIONS`) 기준으로 매핑합니다. [@src/cli/services/console.service.ts#9-34](../src/cli/services/console.service.ts#L9-L34) [@src/cli/services/console.service.ts#85-87](../src/cli/services/console.service.ts#L85-L87)

주요 옵션 사전은 `src/constants/cli.constants.ts`에 정의되어 있습니다. [@src/constants/cli.constants.ts#4-104](../src/constants/cli.constants.ts#L4-L104)

기본 실행 설정은 `DEFAULT_CONFIG`를 통해 초기화됩니다. [@src/constants/main.constants.ts#11-27](../src/constants/main.constants.ts#L11-L27)

---

## 8) 테스트/빌드 체계

## 8.1 빌드/실행

- 빌드: `tsc` (`src` → `lib`)
- 실행(개발): ts-node ESM loader 기반 `src/index.ts`

[@package.json#37-48](../package.json#L37-L48) [@tsconfig.json#9-10](../tsconfig.json#L9-L10)

## 8.2 테스트

- Jest + ts-jest(ESM preset)
- 테스트 경로: `tests/` 중심
- 컨트롤러/코어/서비스 단위 테스트 존재

[@jest.config.ts#3-24](../jest.config.ts#L3-L24) [@tests/cli/cli.controller.test.ts#94-431](../tests/cli/cli.controller.test.ts#L94-L431)

---

## 9) 코드베이스 특징 요약

### 장점

1. **명확한 계층 분리**: CLI 오케스트레이션 / 코어 로직 / 파일 접근 레이어가 분리되어 있음.
2. **병렬 처리 설계**: worker thread + 큐 기반으로 대규모 파일시스템 탐색 성능 고려.
3. **운영 안정성 고려**: 타임아웃, 에러 fallback, 민감 경로 판별, 드라이런 지원.
4. **자동화 친화성**: 인터랙티브 UI 외 JSON/JSON-stream 모드 제공.

### 참고할 점

1. `CliController`가 매우 큰 클래스(900+ lines)라 유지보수 시 역할 분리 여지가 큼.
2. 일부 문서/코드의 timestamp 단위 표현이 섞여 보이는 구간이 있어(JSON 문서 vs 구현) 규약 점검이 유용.
3. 테스트 중 `xdescribe`로 비활성화된 구간(`tests/main.test.ts`)이 있어 필요 시 재활성화 검토 가능.

[@src/cli/cli.controller.ts#50-909](../src/cli/cli.controller.ts#L50-L909) [@tests/main.test.ts#39-87](../tests/main.test.ts#L39-L87)

---

## 10) 빠른 이해를 위한 실행 시퀀스

1. 사용자가 `flutterkill` 실행
2. `src/index.ts`가 direct 실행 감지 후 `main()` 호출
3. `main()`이 서비스 인스턴스 생성 및 `CliController` 주입
4. `init()`에서 설정/인자 파싱
5. JSON 모드면 스트림/배치 JSON 출력, 아니면 TUI 렌더링
6. `ScanService` → `Npkill` → `FileWorkerService`/worker thread로 스캔 진행
7. 결과별 크기/수정시각 계산 후 정렬·표시·삭제 처리

[@src/index.ts#1-14](../src/index.ts#L1-L14) [@src/main.ts#17-45](../src/main.ts#L17-L45) [@src/cli/cli.controller.ts#704-773](../src/cli/cli.controller.ts#L704-L773)
