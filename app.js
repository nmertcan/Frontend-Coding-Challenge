const konteyner = document.getElementById("urunler-konteyner");
const yenileButon = document.getElementById("yenile-buton");

async function uygulamaBaslat() {
  try {
    konteyner.innerHTML = "Veriler yükleniyor...";

    const response = await axios.get("https://cataas.com/api/cats?limit=5");
    const urunlerListesi = response.data;

    konteyner.innerHTML = "";

    if (urunlerListesi.length === 0) {
      konteyner.innerHTML = "<p>Gösterilecek kedi bulunamadı.</p>";
      return;
    }

    urunlerListesi.forEach((urun) => {
      const urunElement = UrunKartiComponent(urun);
      konteyner.appendChild(urunElement);
    });
  } catch (error) {
    console.error("Arayüz güncellenirken hata oluştu:", error);

    konteyner.innerHTML = `
      <p style="color: #e53e3e;">
        Veriler yüklenirken teknik bir hata oluştu.
      </p>
    `;
  }
}

function UrunKartiComponent(urun) {
  const urunKarti = document.createElement("div");

  const img = document.createElement("img");

  const catId = urun._id || urun.id;

  img.src = `https://cataas.com/cat/${catId}`;
  img.alt = "Kedi görseli";
  img.style.width = "200px";
  img.style.display = "block";

  urunKarti.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent =
    urun.tags && urun.tags.length > 0
      ? `Etiketler: ${urun.tags.join(", ")}`
      : "Sevimli Kedi";

  urunKarti.appendChild(h3);

  return urunKarti;
}

yenileButon.addEventListener("click", uygulamaBaslat);

uygulamaBaslat();