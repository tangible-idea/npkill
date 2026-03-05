<p align="center">
  <img src="./docs/npkill-text-clean.svg" width="380" alt="flutterkill logo" />
</p>
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/dy/flutterkill.svg">
<img alt="npm version" src="https://img.shields.io/npm/v/flutterkill.svg">
<img alt="NPM" src="https://img.shields.io/npm/l/flutterkill.svg">
</p>

### Eski ve büyük Flutter derleme artefaktlarını kolayca bulun ve **silin** :sparkles:

Bu araç, sisteminizdeki tüm Flutter/Dart derleme dizinlerini (`build`, `.dart_tool`, `.gradle`, `Pods`, vb.) ve kapladıkları alanı listelemenizi sağlar. Daha sonra, hangilerini silmek istediğinizi seçerek yer açabilirsiniz.

> **npkill** temel alınarak geliştirilmiştir ([github.com/voidcosmos/npkill](https://github.com/voidcosmos/npkill))

## i18n

Flutterkill dokümantasyonunu uluslararası hale getirmek için çaba gösteriyoruz. İşte mevcut çevirilerin listesi:

- [Endonezce](./README.id.md)
- [İspanyolca](./README.es.md)
- [한국어](./README.ko.md)
- [Portekizce](./README.pt.md)
- [Türkçe](./README.tr.md)

## İçindekiler

- [Özellikler](#features)
- [Kurulum](#installation)
- [Kullanım](#usage)
  - [Seçenekler](#options)
  - [Örnekler](#examples)
- [Yerel Kurulum](#setup-locally)
- [Yol Haritası](#roadmap)
- [Bilinen Hatalar](#known-bugs)
- [Katkıda Bulunma](#contributing)
- [Kahve Ismarlayın](#donations)
- [Lisans](#license)

<a name="features"></a>

# :heavy_check_mark: Özellikler

- **Alan Açın:** Makinenizde birikmiş, eski ve tozlu Flutter derleme artefaktlarından kurtulun.

- **Akıllı Flutter Taraması:** Yalnızca `pubspec.yaml` içeren dizinleri (gerçek Flutter projeleri) tarar. Flutter SDK'yı otomatik olarak hariç tutar.

- **Son Çalışma Alanı Kullanımı**: Çalışma alanındaki bir dosyayı en son ne zaman değiştirdiğinizi kontrol edin (bu, **last_mod** sütununda gösterilir).

- **Çok Hızlı:** Flutterkill TypeScript ile yazılmıştır, ancak aramalar düşük seviyede gerçekleştirilerek performans büyük ölçüde artırılır.

- **Kullanımı Kolay:** Uzun komutlara elveda deyin. Flutterkill kullanmak, build klasörlerinizi okumak ve silmek için Del tuşuna basmak kadar basittir. Daha kolay olabilir mi? ;)

- **Düşük Bağımlılık:** Hiçbir bağımlılığı yok denecek kadar az.

<a name="installation"></a>

# :cloud: Kurulum

Kullanmak için gerçekten yüklemenize gerek yok!
Basitçe aşağıdaki komutu kullanabilirsiniz:

```bash
$ npx flutterkill
```

Ya da herhangi bir nedenle gerçekten yüklemek isterseniz:

```bash
$ npm i -g flutterkill
# Unix kullanıcılarının komutu sudo ile çalıştırması gerekebilir. Dikkatli olun.
```

> Flutterkill, Node 14’ten düşük sürümleri desteklemiyor. Eğer bu durum sizi etkiliyorsa, `flutterkill@0.8.3` sürümünü kullanabilirsiniz.

<a name="usage"></a>

# :clipboard: Kullanım

```bash
$ npx flutterkill
# Ya da global olarak yüklüyse sadece flutterkill kullanabilirsiniz.
```

Varsayılan olarak, flutterkill `flutterkill` komutunun çalıştırıldığı dizinden başlayarak Flutter derleme artefaktlarını tarar.

Listelenen klasörler arasında <kbd>↓</kbd> ve <kbd>↑</kbd> tuşlarıyla gezinebilir, seçili klasörü silmek için <kbd>Space</kbd> veya <kbd>Del</kbd> tuşlarını kullanabilirsiniz.
Ayrıca sonuçlar arasında gezinmek için <kbd>j</kbd> ve <kbd>k</kbd> tuşlarını da kullanabilirsiniz.

Seçili sonucun bulunduğu klasörü açmak için <kbd>o</kbd> tuşuna basabilirsiniz.

Çıkmak için, <kbd>Q</kbd> ya da <kbd>Ctrl</kbd> + <kbd>C</kbd>.

**Önemli!** `build` veya `.dart_tool` klasörlerini silmek, bir sonraki derleme için `flutter pub get` ve tam yeniden derleme gerektirecektir. Flutterkill, hassas dizinleri :warning: simgesiyle vurgulayacaktır.

<a name="options"></a>

## Seçenekler

| ARGÜMAN                          | AÇIKLAMA                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| -c, --bg-color                   | Satır vurgulama rengini değiştirin. _(Mevcut seçenekler: **mavi**, cam göbeği, eflatun, beyaz, kırmızı ve sarı)_                                 |
| -d, --directory                  | Aramaya başlanacak dizini ayarlayın. Varsayılan başlangıç noktası . olarak belirlenmiştir.                                                       |
| -D, --delete-all                 | Bulunan tüm node_modules klasörlerini otomatik olarak siler. `-x` ile birlikte kullanılması önerilir.                                            |
| -e, --hide-errors                | Varsa hataları gizler                                                                                                                            |
| -E, --exclude                    | Aramadan hariç tutulacak dizinleri belirtin (dizin listesi çift tırnak içinde "", dizinler virgülle ',' ayrılmalıdır). Örnek: "ignore1, ignore2" |
| -f, --full                       | Aramaya kullanıcının ev dizininden başlayın (örneğin Linux'ta "/home/user").                                                                     |
| -gb                              | Klasörleri Megabytes yerine Gigabytes olarak göster.                                                                                             |
| -h, --help, ?                    | Bu yardım sayfasını göster ve çık.                                                                                                               |
| -nu, --no-check-update           | Başlangıçta güncellemeleri kontrol etme.                                                                                                         |
| -s, --sort                       | Sonuçları şu kriterlere göre sırala: `size`, `path` veya `last-mod`                                                                              |
| -t, --target                     | Aramak istediğiniz dizinlerin adını belirtin (varsayılan olarak node_modules).                                                                   |
| -x, --exclude-hidden-directories | Gizli dizinleri ("nokta" dizinleri) arama kapsamı dışında bırak.                                                                                 |
| --dry-run                        | Hiçbir şeyi silmez (rastgele bir gecikme ile simüle eder).                                                                                       |
| -v, --version                    | flutterkill sürümünü gösterir.                                                                                                                   |

**Uyarı:** _Gelecek sürümlerde bazı komutlar değişebilir_

<a name="examples"></a>

## Örnekler

- _projects_ dizininizdeki Flutter derleme artefaktlarını arayın:

```bash
flutterkill -d ~/projects

# diğer alternatif:
cd ~/projects
flutterkill
```

- Belirli dizinleri aramadan hariç tutun:

```bash
flutterkill -d ~/projects --exclude "flutter_sdk, ignore-this"
```

- Yedeklerinizdeki tüm Flutter derleme artefaktlarını otomatik olarak silin:

```bash
flutterkill -d ~/backups/ --delete-all
```

<a name="setup-locally"></a>

# :pager: Yerel Kurulum

```bash
# -- Öncelikle, repoyu klonlayın.
git clone https://github.com/tangible-idea/flutterkill.git

# -- Dizin içine gidin
cd flutterkill

# -- Bağımlılıkları yükleyin
npm install

# -- Ve çalıştırın!
npm run start


# -- Eğer bazı parametrelerle çalıştırmak istiyorsanız, aşağıdaki örnekte olduğu gibi "--" eklemeniz gerekir:
npm run start -- -f -e
```

<a name="roadmap"></a>

# :crystal_ball: Yol Haritası

- [x] 0.1.0 yayınla!
- [x] Kodu geliştir
  - [x] Performansı iyileştir
  - [ ] Performansı daha da iyileştir!
- [x] Sonuçları boyuta ve yola göre sırala
- [x] Diğer türde dizinlerin (hedeflerin) aranmasına izin ver
- [ ] Daha minimalist bir modül olması için bağımlılıkları azalt
- [ ] Belirli bir süredir kullanılmayan dizinlere göre filtreleme yapmaya izin ver
- [ ] Dizinleri ağaç biçiminde göstermek için bir seçenek oluştur
- [x] Bazı menüler ekle
- [x] Log servisi ekle
- [ ] Periyodik ve otomatik temizlik (?)

<a name="known-bugs"></a>

# :bug: Bilinen Hatalar :bug:

- Bazen klasör silinirken CLI kilitlenebilir.
- TTY kullanmayan bazı terminaller (örneğin Windows’taki Git Bash) çalışmaz.
- Özellikle yol (path) bazında sıralama, çok sayıda olduğunda terminali yavaşlatabilir.
- Bazen, boyut hesaplamaları olması gerekenden daha yüksek çıkabilir.
- (ÇÖZÜLDÜ) Yüksek seviyeli dizinlerden (örneğin Linux'taki / dizini) arama yaparken performans sorunları yaşanabilir.
- (ÇÖZÜLDÜ) Bazen CLI güncellenirken metinler bozuluyor.
- (ÇÖZÜLDÜ) Dizinlerin boyutunu analiz etmek olması gerekenden daha uzun sürüyor.

> Eğer herhangi bir hata bulursanız, çekinmeden bir issue açın :)

<a name="contributing"></a>

# :revolving_hearts: Katkıda Bulunma

Katkıda bulunmak isterseniz [CONTRIBUTING.md](.github/CONTRIBUTING.md) dosyasını inceleyin.

<a name="donations"></a>

# :coffee: Bize bir kahve ısmarlayın

<img align="right" width="300" src="https://npkill.js.org/img/cat-donation-cup.png">
Orijinal npkill, [Nya García Gallardo](https://github.com/NyaGarcia) ve [Juan Torres Gömez](https://github.com/zaldih) tarafından geliştirilmiştir. Flutterkill, [Mark Choi](https://github.com/tangible-idea) tarafından Flutter odaklı bir fork'tur.

<a name="license"></a>

# :scroll: Lisans

MIT © [Mark Choi](https://github.com/tangible-idea)

> Orijinal npkill: MIT © [Nya García Gallardo](https://github.com/NyaGarcia) ve [Juan Torres Gömez](https://github.com/zaldih)

---
