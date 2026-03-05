<p align="center">
  <img src="./docs/npkill-text-clean.svg" width="380" alt="flutterkill logo" />
</p>
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/dy/flutterkill.svg">
<img alt="npm version" src="https://img.shields.io/npm/v/flutterkill.svg">
<img alt="NPM" src="https://img.shields.io/npm/l/flutterkill.svg">
</p>

### Mudah menemukan dan **menghapus** artefak build Flutter yang lama dan berat :sparkles:

Alat ini memungkinkan Anda untuk mencantumkan semua direktori build Flutter/Dart (`build`, `.dart_tool`, `.gradle`, `Pods`, dll.) di sistem Anda, serta ruang yang mereka gunakan. Anda kemudian dapat memilih mana yang ingin Anda hapus untuk mengosongkan ruang penyimpanan.

> Berdasarkan **npkill** ([github.com/voidcosmos/npkill](https://github.com/voidcosmos/npkill))

## i18n

Kami berusaha untuk menerjemahkan dokumen Flutterkill ke berbagai bahasa. Berikut daftar terjemahan yang tersedia:

- [Español](./README.es.md)
- [Indonesian](./README.id.md)
- [한국어](./README.ko.md)
- [Portugis](./README.pt.md)
- [Turki](./README.tr.md)

## Daftar Isi

- [Fitur](#features)
- [Instalasi](#installation)
- [Penggunaan](#usage)
  - [Opsi](#options)
  - [Contoh](#examples)
- [Pengaturan Lokal](#setup-locally)
- [Peta Jalan](#roadmap)
- [Bug yang Diketahui](#known-bugs)
- [Kontribusi](#contributing)
- [Buy us a coffee](#donations)
- [Lisensi](#license)

<a name="features"></a>

# :heavy_check_mark: Fitur

- **Bersihkan Ruang:** Hapus artefak build Flutter lama yang tidak digunakan yang memenuhi mesin Anda.

- **Pemindaian Flutter Cerdas:** Hanya memindai direktori dengan `pubspec.yaml` (proyek Flutter nyata). Secara otomatis mengecualikan Flutter SDK.

- **Penggunaan Terakhir Workspace:** Cek kapan terakhir kali Anda mengubah file di workspace (ditunjukkan di kolom **last_mod**).

- **Sangat Cepat:** Flutterkill ditulis dalam TypeScript, tetapi pencarian dilakukan di tingkat rendah, sehingga performanya sangat baik.

- **Mudah Digunakan:** Tidak perlu perintah panjang. Menggunakan flutterkill semudah membaca daftar folder build Anda, dan menekan tombol Del untuk menghapusnya. Bisa lebih mudah dari itu?

- **Ringkas:** Hampir tidak memiliki dependensi.

<a name="installation"></a>

# :cloud: Instalasi

Anda tidak perlu menginstal untuk menggunakannya! Cukup gunakan perintah berikut:

```bash
$ npx flutterkill
```

Atau jika Anda benar-benar ingin menginstalnya:

```bash
$ npm i -g flutterkill
# Pengguna Unix mungkin perlu menjalankan perintah dengan sudo. Gunakan dengan hati-hati
```

<a name="usage"></a>

# :clipboard: Penggunaan

```bash
$ npx flutterkill
# atau cukup flutterkill jika telah diinstal secara global
```

Secara default, flutterkill akan memindai artefak build Flutter mulai dari jalur tempat perintah `flutterkill` dijalankan.

Pindah di antara folder yang terdaftar menggunakan <kbd>↓</kbd> <kbd>↑</kbd>, dan gunakan <kbd>Space</kbd> atau <kbd>Del</kbd> untuk menghapus folder yang dipilih. Anda juga dapat menggunakan <kbd>j</kbd> dan <kbd>k</kbd> untuk bergerak di antara hasil.

Anda dapat membuka direktori tempat hasil yang dipilih berada dengan menekan <kbd>o</kbd>.

Untuk keluar, tekan <kbd>Q</kbd> atau <kbd>Ctrl</kbd> + <kbd>c</kbd> jika Anda pemberani.

**Penting!** Menghapus folder `build` atau `.dart_tool` berarti build berikutnya memerlukan `flutter pub get` dan rebuild penuh. Flutterkill akan menandai direktori sensitif dengan :warning: agar berhati-hati.

<a name="options"></a>

## Opsi

| ARGUMEN                          | DESKRIPSI                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| -c, --bg-color                   | Ubah warna sorotan baris. _(Tersedia: **blue**, cyan, magenta, white, red, dan yellow)_                       |
| -d, --directory                  | Tetapkan direktori awal pencarian. Secara default, mulai dari .                                               |
| -D, --delete-all                 | Secara otomatis hapus semua folder _node_modules_ yang ditemukan. Disarankan digunakan bersama `-x`.          |
| -e, --hide-errors                | Sembunyikan kesalahan (jika ada)                                                                              |
| -E, --exclude                    | Kecualikan direktori dari pencarian. Daftar direktori harus dalam tanda kutip ganda "", dipisahkan dengan ',' |
| -f, --full                       | Mulai pencarian dari direktori home pengguna (contoh: "/home/user" di Linux)                                  |
| -gb                              | Tampilkan folder dalam Gigabyte daripada Megabyte.                                                            |
| -h, --help, ?                    | Tampilkan halaman bantuan ini dan keluar                                                                      |
| -nu, --no-check-update           | Jangan memeriksa pembaruan saat startup                                                                       |
| -s, --sort                       | Urutkan hasil berdasarkan: `size`, `path`, atau `last-mod`                                                    |
| -t, --target                     | Tentukan nama direktori yang ingin Anda cari (default: node_modules)                                          |
| -x, --exclude-hidden-directories | Kecualikan direktori tersembunyi dari pencarian.                                                              |
| --dry-run                        | Tidak menghapus apa pun (hanya simulasi dengan delay acak).                                                   |
| -v, --version                    | Tampilkan versi flutterkill                                                                                   |

**Peringatan:** _Di versi mendatang, beberapa perintah mungkin berubah._

<a name="examples"></a>

## Contoh

- Cari artefak build Flutter di direktori _projects_ Anda:

```bash
flutterkill -d ~/projects

# alternatif lain:
cd ~/projects
flutterkill
```

- Kecualikan direktori tertentu dari pencarian:

```bash
flutterkill -d ~/projects --exclude "flutter_sdk, ignore-this"
```

- Secara otomatis hapus semua artefak build Flutter di folder cadangan Anda:

```bash
flutterkill -d ~/backups/ --delete-all
```

<a name="setup-locally"></a>

# :pager: Pengaturan Lokal

```bash
# -- Pertama, kloning repositori
git clone https://github.com/tangible-idea/npkill.git

# -- Masuk ke direktori
cd npkill

# -- Instal dependensi
npm install

# -- Dan jalankan!
npm run start

# -- Jika ingin menjalankannya dengan parameter, tambahkan "--" seperti contoh berikut:
npm run start -- -f -e
```

<a name="roadmap"></a>

# :crystal_ball: Peta Jalan

- [x] Rilis versi 0.1.0!
- [x] Tingkatkan kode
  - [x] Tingkatkan performa
  - [ ] Tingkatkan performa lebih lanjut!
- [x] Urutkan hasil berdasarkan ukuran dan jalur
- [x] Izinkan pencarian untuk jenis direktori (target) lainnya
- [ ] Kurangi dependensi agar minimalis
- [ ] Filter berdasarkan waktu terakhir penggunaan
- [ ] Tampilkan direktori dalam format tree
- [x] Tambahkan beberapa menu
- [x] Tambahkan log
- [ ] Pembersihan otomatis berkala (?)

<a name="known-bugs"></a>

# :bug: Bug yang Diketahui :bug:

- CLI terkadang berhenti saat menghapus folder.
- Beberapa terminal tanpa TTY (seperti Git Bash di Windows) tidak bekerja.
- Mengurutkan berdasarkan jalur dapat memperlambat terminal dengan banyak hasil.
- Perhitungan ukuran kadang lebih besar dari seharusnya.
- (TERPECAHKAN) Masalah performa pada direktori tingkat tinggi (seperti / di Linux).
- (TERPECAHKAN) Teks terkadang kacau saat CLI diperbarui.
- (TERPECAHKAN) Analisis ukuran direktori memakan waktu lebih lama dari seharusnya.

> Jika menemukan bug, jangan ragu untuk membuka issue. :)

<a name="contributing"></a>

# :revolving_hearts: Kontribusi

Jika ingin berkontribusi, cek [CONTRIBUTING.md](.github/CONTRIBUTING.md).

<a name="donations"></a>

# :coffee: Buy us a coffee

<img align="right" width="300" src="https://npkill.js.org/img/cat-donation-cup.png">
npkill asli dikembangkan oleh [Nya García Gallardo](https://github.com/NyaGarcia) dan [Juan Torres Gómez](https://github.com/zaldih). Flutterkill adalah fork fokus Flutter oleh [Mark Choi](https://github.com/tangible-idea).

<a name="license"></a>

# :scroll: Lisensi

MIT © [Mark Choi](https://github.com/tangible-idea)

> npkill asli: MIT © [Nya García Gallardo](https://github.com/NyaGarcia) dan [Juan Torres Gómez](https://github.com/zaldih)

---
