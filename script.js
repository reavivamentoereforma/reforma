const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".material-card");
const categories = document.querySelectorAll(".category");
const noResults = document.getElementById("noResults");
const resultCount = document.getElementById("resultCount");

let selectedCategory = "Todos";

function filterMaterials() {
  const search = searchInput.value.toLowerCase().trim();
  let visible = 0;

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category.toLowerCase();

    const matchesSearch =
      title.includes(search) ||
      category.includes(search) ||
      card.textContent.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "Todos" ||
      card.dataset.category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  resultCount.textContent =
    visible === 1
      ? "1 material encontrado"
      : `${visible} materiais encontrados`;

  noResults.classList.toggle("hidden", visible !== 0);
}

searchInput.addEventListener("input", filterMaterials);

categories.forEach(category => {
  category.addEventListener("click", () => {
    categories.forEach(item => item.classList.remove("active"));
    category.classList.add("active");
    selectedCategory = category.dataset.category;
    filterMaterials();
  });
});

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

filterMaterials();
