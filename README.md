# 🔍 Pencari Surat Al-Qur'an (Terminal)

Sebuah alat sederhana berbasis command-line (CLI) untuk mencari dan menampilkan informasi Surat Al-Qur'an (beserta ayat-ayatnya) langsung dari terminal, menggunakan API Al-Qur'an online.

---

## ✅ Fitur

- Mencari Surat Al-Qur'an berdasarkan **nomor** atau **nama surat** (contoh: `1`, `Al-Fatihah`, `Yasin`).
- Menampilkan **nama surat**, **arti**, **jumlah ayat**, **tempat turun**, dan **beberapa ayat pertama**.
- Dapat digunakan secara **online** — tidak perlu menyimpan data besar secara lokal.
- Responsif dan mudah digunakan di terminal.

---

## 🧰 Teknologi yang Digunakan

- JavaScript (Node.js)
- API Al-Qur'an: [https://api.quran.gading.dev/](https://api.quran.gading.dev/)
- Modul bawaan Node.js: `readline`, `fetch`

---

## 📋 Prasyarat

Pastikan kamu telah menginstal [Node.js](https://nodejs.org/) di komputer kamu.

---

## 🚀 Cara Menjalankan

1. Clone atau unduh repositori ini (jika ada), atau buat folder baru dan simpan file `index.js` di dalamnya.
2. Buka terminal dan arahkan ke folder tempat `index.js` berada.
3. Jalankan perintah berikut:

```bash
node index.js
