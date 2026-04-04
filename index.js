const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi untuk mencari surat berdasarkan nama
async function searchSurahByName(name) {
  try {
    const response = await fetch('https://api.quran.gading.dev/surah');
    const data = await response.json();

    if (data.code === 200) {
      const surah = data.data.find(
        s =>
          s.name.transliteration.id.toLowerCase().includes(name.toLowerCase()) ||
          s.name.short.toLowerCase().includes(name.toLowerCase())
      );

      if (surah) {
        return await fetchSurah(surah.number);
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Gagal mengambil daftar surat:", error);
    return null;
  }
}

// Ambil detail surat berdasarkan nomor
async function fetchSurah(number) {
  try {
    const response = await fetch(`https://api.quran.gading.dev/surah/${number}`);
    const data = await response.json();

    if (data.code === 200) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Gagal mengambil data surat:", error);
    return null;
  }
}

function showSurah(surah) {
  if (!surah) {
    console.log("Surah tidak ditemukan.\n");
    return;
  }

  console.log(`\n--- Surah ${surah.name.transliteration.id} (${surah.number}) ---`);
  console.log(`Arti: ${surah.name.translation.id}`);
  console.log(`Jumlah Ayat: ${surah.numberOfVerses}`);
  console.log(`Tempat Turun: ${surah.revelation.id}\n`);

  // Tampilkan 5 ayat pertama saja agar tidak terlalu panjang
  const limitAyah = surah.verses.slice(0, 5);
  limitAyah.forEach(ayat => {
    console.log(`${ayat.number.inSurah}. ${ayat.text.arab}`);
    console.log(`  Arti: ${ayat.translation.id}\n`);
  });

  if (surah.verses.length > 5) {
    console.log(`... Dan ${surah.verses.length - 5} ayat lainnya.`);
  }

  console.log("---\n");
}

console.log("Pencari Surat Al-Qur'an (Dengan Nama & Nomor)\n");

async function ask() {
  rl.question("Masukkan nama atau nomor surat (misal: Al-Fatihah / 1): ", async (input) => {
    if (input.toLowerCase() === 'keluar') {
      console.log("Sampai jumpa!");
      rl.close();
      return;
    }

    let result;

    // input adalah angka
    if (/^\d+$/.test(input)) {
      const number = parseInt(input);
      if (number < 1 || number > 114) {
        console.log("Silakan masukkan nomor antara 1-114.\n");
        ask();
        return;
      }
      result = await fetchSurah(number);
    } else {
      // Jika bukan angka, cari berdasarkan nama
      result = await searchSurahByName(input);
    }

    showSurah(result);

    ask();
  });
}

ask();
