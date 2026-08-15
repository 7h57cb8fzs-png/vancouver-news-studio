const stories = [
  {
    title: "کنسرت Shinedown در ونکوور", type: "رویداد امروز", score: 94,
    time: "شنبه ۱۵ آگست · ساعت ۷ شب", meta: "Pacific Coliseum · PNE / Hastings Park",
    summary: "یک اجرای بزرگ و تصویری برای آخرهفته؛ مناسب مخاطبی که دنبال برنامهٔ فوری و هیجان‌انگیز در ونکوور است.",
    source: "https://www.pne.ca/events/", photo: "عکس رسمی گروه یا نمای پرانرژی از اجرای زنده"
  },
  {
    title: "Playland تا ساعت ۹ شب باز است", type: "راهنمای آخرهفته", score: 82,
    time: "شنبه ۱۵ آگست · تا ساعت ۹ شب", meta: "PNE / Hastings Park",
    summary: "یک انتخاب خانوادگی و ساده برای پست کوتاه؛ امکان ترکیب با یک برنامهٔ عصرانه در نزدیکی محل.",
    source: "https://www.pne.ca/playland/", photo: "نمای رنگی از چرخ‌وفلک یا بازی‌های شبانهٔ Playland"
  },
  {
    title: "آخرهفتهٔ ونکوور: انتخاب‌های محلی", type: "فهرست رویداد", score: 76,
    time: "آخرهفته", meta: "ونکوور",
    summary: "یک گزینهٔ منعطف برای روزهایی که یک خبر واحد به‌اندازهٔ کافی قوی نیست؛ نیازمند انتخاب نهایی توسط ادیتور.",
    source: "https://dailyhive.com/vancouver", photo: "یک کلاژ تمیز از فضای شهری، بازار یا اجرای محلی ونکوور"
  }
];

let selected = 0;
const $ = id => document.getElementById(id);
const persianDate = () => new Intl.DateTimeFormat("fa-IR", { weekday:"long", day:"numeric", month:"long", timeZone:"America/Vancouver" }).format(new Date());

function copyFor(story) {
  return {
    slideOne: `${story.title}\n${story.time}${story.meta ? " | " + story.meta : ""}`,
    slideTwo: `• ${story.title}\n• زمان: ${story.time}\n• محل: ${story.meta}\n• برای جزئیات و تغییرات احتمالی، منبع رسمی را بررسی کنید.\n• این پست را برای دوست‌تان که دنبال برنامه در ونکوور است بفرستید.`
  };
}

function render() {
  const story = stories[selected];
  const copy = copyFor(story);
  $("storyList").innerHTML = stories.map((item, index) => `
    <button class="story ${index === selected ? "active" : ""}" data-index="${index}">
      <span class="story-top"><span>${item.type}</span><span class="hot">${item.score}/100</span></span>
      <strong>${item.title}</strong><span class="story-top"><span>${item.time}</span></span>
    </button>`).join("");

  $("storyTitle").textContent = story.title;
  $("score").textContent = story.score + "/100";
  $("storyMeta").textContent = story.time + " · " + story.meta;
  $("storySummary").textContent = story.summary;
  $("sourceLink").href = story.source || "#";
  $("photoSuggestion").textContent = story.photo;
  $("slideOne").value = copy.slideOne;
  $("slideTwo").value = copy.slideTwo;

  document.querySelectorAll(".story").forEach(button => button.addEventListener("click", () => {
    selected = Number(button.dataset.index); render();
  }));
}

function toast(message) {
  const el = $("toast"); el.textContent = message; el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2300);
}

document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
  const target = $(button.dataset.copy);
  await navigator.clipboard.writeText(target.value);
  toast("متن کپی شد — آمادهٔ قرار دادن در قالب اینستاگرام");
}));

$("createStory").addEventListener("click", () => {
  const title = $("customTitle").value.trim();
  if (!title) return toast("اول عنوان خبر را وارد کنید.");
  const story = {
    title,
    type: $("customType").value.trim() || "سوژهٔ جدید",
    score: 70,
    time: $("customTime").value.trim() || persianDate(),
    meta: $("customPlace").value.trim() || "ونکوور",
    source: $("customSource").value.trim() || "#",
    photo: $("customPhoto").value.trim() || "عکس رسمی خبر یا نمای محل",
    summary: "سوژهٔ افزوده‌شده توسط ادیتور. قبل از انتشار، اطلاعات را با منبع اصلی بررسی کنید."
  };
  stories.unshift(story); selected = 0; render(); toast("سوژه و متن دو اسلاید ساخته شد.");
});

$("today").textContent = persianDate();
render();
