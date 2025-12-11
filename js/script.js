$(function () {
  // =================================================================
  // 1. SELECTORS & VARIABLES
  // =================================================================
  const $body = $('body');
  const pageId = $body.attr('id'); // "page-home", "page-gallery", "page-community", "page-pricing"

  // Main UI
  const $generateBtn = $('#generateBtn');
  const $promptInput = $('#prompt');
  const $loading = $('#loading');
  const $grid = $('#imageGrid');
  const $loadMoreBtn = $('#loadMoreBtn');
  const $loadMoreContainer = $('#loadMoreContainer');
  const $enhanceBtn = $('#enhanceBtn');
  const $enhanceStatus = $('#enhanceStatus');
  const $toastContainer = $('#toastContainer');
  const $emptyState = $('#emptyState');

  // Modal UI
  const $imageModal = $('#imageModal');
  const $modalImage = $('#modalImage');
  const $modalDownloadBtn = $('#modalDownloadBtn');
  const $closeModalBtn = $('#closeModalBtn');

  // Cookie Popup UI
  const $cookiePopup = $('#cookiePopup');
  const $cookieLoading = $('#cookieLoading');
  const $cookieContent = $('#cookieContent');
  const $acceptCookies = $('#acceptCookies');
  const $declineCookies = $('#declineCookies');

  // State
  let currentIndex = 0;
  const initialLoadCount = 8;
  const LS_KEY = 'ai_vision_creations_v1';

  // =================================================================
  // 2. DATA SOURCE (Inspiration)
  // =================================================================
  const showcaseLibrary = [
    { badge: "Cyberpunk", prompt: "A futuristic cyborg with glowing neon circuits, cinematic lighting, 8k resolution, hyperrealistic, night city background" },
    { badge: "3D Art", prompt: "A cute isometric tiny tropical island inside a glass bottle, 3d render, unreal engine 5, vibrant colors, claymation style" },
    { badge: "Abstract", prompt: "A majestic lion made of swirling galaxy stars and nebula dust, deep space background, digital art, cosmic energy" },
    { badge: "Portrait", prompt: "Close up portrait of an old fisherman, highly detailed wrinkles, photorealistic, cinematic lighting, national geographic style" },
    { badge: "Fantasy", prompt: "A floating castle in the sky, waterfalls cascading into clouds, studio ghibli style, soft lighting, dreamy atmosphere" },
    { badge: "Automotive", prompt: "A matte black sports car driving in the rain, neon reflections on wet asphalt, cyberpunk city, 8k, ray tracing" },
    { badge: "Nature", prompt: "Bioluminescent forest at night, glowing mushrooms and plants, avatar movie style, mystical atmosphere, 8k" },
    { badge: "Architecture", prompt: "A modern glass mansion on a cliff overlooking the ocean, sunset golden hour, architectural photography, sleek lines" },
    { badge: "Sci-Fi", prompt: "An astronaut walking on Mars, red dust storm, futuristic rover in background, cinematic wide shot, detailed spacesuit" },
    { badge: "Anime", prompt: "Anime girl with pink hair standing on a rooftop at sunset, lo-fi aesthetic, emotional atmosphere, makoto shinkai style" },
    { badge: "Horror", prompt: "A haunted victorian house in the fog, spooky silhouette, dark atmosphere, cinematic horror movie poster style" },
    { badge: "Product", prompt: "Professional product photography of a luxury perfume bottle, water splash, studio lighting, bokeh background, elegant" },
    { badge: "Fashion", prompt: "Avant-garde fashion model wearing a dress made of liquid metal, futuristic runway, high fashion photography, vogue style" },
    { badge: "Origami", prompt: "A complex origami dragon made of gold paper, black background, studio lighting, sharp edges, 3d render" },
    { badge: "Minimalist", prompt: "Minimalist landscape of a single tree in a snowy field, high contrast black and white photography, fine art" },
    { badge: "Retro", prompt: "Synthwave sunset over a grid landscape, 1980s retro style, purple and orange gradient, vhs glitch effect" },
    { badge: "Food", prompt: "Delicious gourmet burger with melting cheese, steam rising, professional food photography, dark moody background" },
    { badge: "Surreal", prompt: "A giant whale flying through the clouds above a city, dreamlike surrealism, salvador dali style, oil painting" },
    { badge: "Steampunk", prompt: "A steampunk owl made of brass gears and leather, vintage clockwork style, intricate mechanical details" },
    { badge: "Interior", prompt: "Cozy scandinavian living room, fireplace, rain on window, warm lighting, hygge atmosphere, interior design photography" },
    { badge: "Character", prompt: "A warrior princess in golden armor, epic fantasy character design, blizzard background, glowing sword" },
    { badge: "Pixel Art", prompt: "Pixel art city street at night, rain reflections, cyberpunk aesthetic, 16-bit style, detailed" },
    { badge: "Watercolor", prompt: "Watercolor painting of a rainy street in Paris, eiffel tower in background, soft artistic strokes, pastel colors" },
    { badge: "Low Poly", prompt: "Low poly 3d render of a fox in a forest, geometric shapes, flat shading, vibrant colors, mobile game asset style" },
    { badge: "Neon", prompt: "A neon tiger running through a dark city, glowing fur, motion blur, cinematic action shot, cyberpunk" },
    { badge: "Vintage", prompt: "1950s vintage diner, classic cars outside, chrome details, nostalgic atmosphere, kodachrome film style" },
    { badge: "Space", prompt: "A black hole consuming a star, accretion disk, cinematic space scene, interstellar movie style, 8k" },
    { badge: "Floral", prompt: "Explosion of colorful flowers and petals, studio lighting, high speed photography, vibrant colors, detailed textures" },
    { badge: "Ceramic", prompt: "Cute ceramic ghost figurine, glossy texture, studio lighting, simple background, 3d render style" },
    { badge: "Isometric", prompt: "Isometric view of a high-tech computer lab, servers, cables, scientists, detailed 3d render, clean style" },
    { badge: "Glass", prompt: "A chess piece made of crystal glass, refraction of light, caustics, realistic 3d render, macro shot" },
    { badge: "Sketch", prompt: "Pencil sketch of a human eye, realistic shading, graphite texture, sketchbook paper background" },
    { badge: "Cybernetic", prompt: "A futuristic motorcycle with hubless wheels, akira style, red and black color scheme, speed lines" },
    { badge: "Mythology", prompt: "Zeus holding a lightning bolt, storm clouds, epic greek mythology style, dramatic lighting, marble statue texture" },
    { badge: "Graffiti", prompt: "Colorful graffiti art on a brick wall, street art style, spray paint texture, urban vibe, banksy style" },
    { badge: "Papercut", prompt: "Layered papercut art of a mountain landscape, depth of field, shadowbox effect, soft lighting, craft style" },
    { badge: "Viking", prompt: "Viking longship in a storm, crashing waves, lightning, epic cinematic shot, assassin's creed valhalla style" },
    { badge: "Robot", prompt: "Cute rusted robot holding a flower, wall-e style, post-apocalyptic nature taking over, emotional" },
    { badge: "Glitch", prompt: "Portrait of a person with digital glitch effects, datamoshing, cyber error style, rgb shift" },
    { badge: "Marble", prompt: "Classical marble sculpture of an angel, museum lighting, smooth texture, renaissance art style" },
    { badge: "Smoke", prompt: "Shape of a dancer made of colored smoke, black background, swirling wisps, fluid motion, high contrast" },
    { badge: "Knolling", prompt: "Knolling photography of vintage camera gear, organized neatly, overhead shot, clean background" },
    { badge: "Candy", prompt: "A landscape made entirely of candy and sweets, chocolate river, lollipop trees, vibrant colors, 3d render" },
    { badge: "Noir", prompt: "Film noir detective standing in the rain, fedora, trench coat, black and white, dramatic shadows, moody" },
    { badge: "Mosaic", prompt: "Mosaic tile portrait of a cat, intricate patterns, vibrant ceramic tiles, ancient roman style" },
    { badge: "Lego", prompt: "A grand castle made of lego bricks, depth of field, macro photography, plastic texture, vibrant" },
    { badge: "Double Exp", prompt: "Double exposure photography of a woman's silhouette and a forest, artistic, surreal, nature blend" },
    { badge: "Vaporwave", prompt: "Vaporwave aesthetic statue bust, glitches, pink and teal colors, grid background, 90s internet vibe" },
    { badge: "Zodiac", prompt: "Personification of the Scorpio zodiac sign, dark mystery, scorpion tail, dramatic lighting, fantasy art" }
  ];

  // =================================================================
  // 3. INITIALIZATION ROUTER
  // =================================================================
  
  if (pageId === 'page-home') {
    // 1. Show saved content
    $loadMoreContainer.removeClass('hidden');
    loadUserCreations(false);
    loadImages(0, initialLoadCount);
    currentIndex = initialLoadCount;

    // 2. Cookie Checks
    checkCookieConsent();
    const lastPrompt = getCookie('last_prompt');
    
    if (lastPrompt && $promptInput.length) {
      $promptInput.val(lastPrompt);
      // Optional: Flash toast
      // showToast("Restored your last prompt", "success");
    }
  } 
  else if (pageId === 'page-gallery') {
    const hasImages = loadUserCreations(true); 
    if(!hasImages) $emptyState.removeClass('hidden').addClass('flex');
  } 
  else if (pageId === 'page-community') {
    loadImages(0, 12);
    currentIndex = 12;
  }

  // =================================================================
  // 4. EVENT LISTENERS
  // =================================================================

  // --- Generation ---
  $generateBtn.on('click', startGeneration);
  $promptInput.on('keypress', function(e) { if(e.which == 13) startGeneration(); });
  
  // Save prompt to cookie on typing (7 days)
  $promptInput.on('input change', function() {
    setCookie('last_prompt', $(this).val(), 7); 
  });

  // --- Load More ---
  $loadMoreBtn.on('click', loadNextBatch);

  // --- Trending Chips ---
  $('.style-chip').on('click', function() {
    const stylePrompt = $(this).data('prompt');
    $promptInput.val(stylePrompt).focus();
    setCookie('last_prompt', stylePrompt, 7);
    
    // Visual Feedback
    $promptInput.parent().parent().addClass('ring-1 ring-accent-primary');
    setTimeout(() => { $promptInput.parent().parent().removeClass('ring-1 ring-accent-primary'); }, 500);
  });

  // --- Auto Enhancer ---
  $enhanceBtn.on('click', function() {
    let currentText = $promptInput.val().trim();
    const styles = ["cinematic lighting", "cyberpunk style", "unreal engine 5", "digital art masterpiece", "dramatic lighting 8k", "hyperrealistic"];
    
    if (!currentText) {
      const starters = ["A futuristic cat", "A floating island", "An astronaut in a flower field"];
      currentText = starters[Math.floor(Math.random() * starters.length)];
    }
    
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const newText = `${currentText}, ${randomStyle}`;
    
    $promptInput.val(newText);
    setCookie('last_prompt', newText, 7);

    // Visual Feedback
    $enhanceStatus.removeClass('opacity-0');
    setTimeout(() => $enhanceStatus.addClass('opacity-0'), 1500);
  });

  // --- Modal Logic (Event Delegation) ---
  $(document).on('click', '.view-btn', function(e) {
    e.preventDefault();
    const imageUrl = $(this).data('url');
    $modalImage.attr('src', imageUrl);
    $modalDownloadBtn.attr('href', imageUrl);
    
    $imageModal.removeClass('hidden');
    setTimeout(() => $imageModal.removeClass('opacity-0'), 10);
    $('body').addClass('overflow-hidden');
  });

  function closeModal() {
    $imageModal.addClass('opacity-0');
    setTimeout(() => {
      $imageModal.addClass('hidden');
      $('body').removeClass('overflow-hidden');
      $modalImage.attr('src', '');
    }, 300);
  }
  $closeModalBtn.on('click', closeModal);
  $imageModal.on('click', function(e) { if (e.target === this) closeModal(); });
  $(document).on('keydown', function(e) { if (e.key === "Escape") closeModal(); });

  // --- Delete Logic ---
  $(document).on('click', '.delete-btn', function(e) {
    e.stopPropagation();
    const $card = $(this).closest('.image-card');
    const idToDelete = $(this).data('id');
    removeFromLocalStorage(idToDelete);
    $card.css('transform', 'scale(0.9)').fadeOut(300, function() { $(this).remove(); });
    showToast("Image Deleted", "error");
  });

  // --- Cookie Popup Logic ---
  $acceptCookies.on('click', function() {
    setCookie('ai_vision_consent', 'accepted', 30);
    $cookiePopup.addClass('translate-y-10 opacity-0');
    setTimeout(() => $cookiePopup.addClass('hidden'), 500);
    showToast("Preferences Saved", "success");
  });

  $declineCookies.on('click', function() {
    $cookiePopup.addClass('translate-y-10 opacity-0');
    setTimeout(() => $cookiePopup.addClass('hidden'), 500);
  });

  // =================================================================
  // 5. CORE FUNCTIONS
  // =================================================================

  function startGeneration() {
    const promptText = $promptInput.val().trim();
    if (!promptText) {
      $promptInput.parent().parent().addClass('ring-2 ring-red-500');
      setTimeout(() => $promptInput.parent().parent().removeClass('ring-2 ring-red-500'), 500);
      return;
    }

    $generateBtn.prop('disabled', true).addClass('opacity-50 cursor-not-allowed');
    $loading.removeClass('hidden').addClass('flex');

    // Simulate Network Delay for UX
    setTimeout(() => {
      const seed = Math.floor(Math.random() * 1000000);
      const uniqueId = Date.now();
      
      renderCard(promptText, "New", "prepend", true, uniqueId, seed);
      saveToLocalStorage(uniqueId, promptText, seed);

      $generateBtn.prop('disabled', false).removeClass('opacity-50 cursor-not-allowed');
      $loading.addClass('hidden').removeClass('flex');
      $promptInput.val('');
      setCookie('last_prompt', '', -1); // Clear cookie
      
      showToast("Image Generated Successfully!", "success");
    }, 1500);
  }

  function renderCard(promptText, badgeText, method = 'prepend', isUserGenerated = false, id = null, seed = null) {
    if (!seed) seed = promptText.length + 12345;
    
    // Pollinations URL
    const width = 800;
    const height = 1066;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?seed=${seed}&width=${width}&height=${height}&nologin=true`;
    
    // Title Logic
    const words = promptText.split(' ');
    const title = words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');

    const badgeClass = isUserGenerated 
      ? 'bg-accent-primary shadow-accent-primary/20' 
      : 'bg-white/10 backdrop-blur-md border border-white/20';
    
    const deleteBtnHTML = isUserGenerated 
      ? `<button class="delete-btn w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 transition-all" title="Delete" data-id="${id}"><i class="fa-solid fa-trash text-xs"></i></button>` 
      : ``;

    const cardHTML = `
      <div class="image-card group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#111] border border-white/5 ring-1 ring-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.3)] cursor-pointer animate-[fadeIn_0.6s_ease-out]">
        <img src="${imageUrl}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" alt="${promptText}" loading="lazy">
        <div class="absolute top-4 right-4 ${badgeClass} text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg z-10 uppercase tracking-wider">${badgeText}</div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div class="transform translate-y-4 group-hover:translate-y-0 transition duration-500 ease-out">
            <h3 class="font-heading text-2xl text-white mb-1 leading-none capitalize truncate tracking-wide">${title}</h3>
            <p class="text-gray-300 text-xs font-light line-clamp-2 mb-4 leading-relaxed opacity-80">${promptText}</p>
            <div class="flex gap-2">
              <button class="view-btn flex-1 bg-white text-black text-center text-xs py-2.5 rounded-lg font-bold hover:bg-gray-200 transition-colors tracking-wide flex items-center justify-center gap-2" data-url="${imageUrl}">
                <span>${isUserGenerated ? 'Download' : 'View'}</span> <i class="fa-solid ${isUserGenerated ? 'fa-download' : 'fa-expand'}"></i>
              </button>
              ${deleteBtnHTML}
            </div>
          </div>
        </div>
      </div>
    `;

    if (method === 'prepend') $grid.prepend(cardHTML);
    else $grid.append(cardHTML);
  }

  // --- Helpers ---

  function checkCookieConsent() {
    const consent = getCookie('ai_vision_consent');
    if (!consent && $cookiePopup.length) {
        $cookiePopup.removeClass('hidden');
        setTimeout(() => { $cookiePopup.removeClass('translate-y-10 opacity-0'); }, 100);
        setTimeout(() => {
            $cookieLoading.hide();
            $cookieContent.removeClass('hidden').addClass('animate-fade-in');
        }, 1500);
    }
  }

  function loadUserCreations(checkEmpty = false) {
    const savedCreations = getLocalStorageData();
    if (savedCreations.length > 0) {
      savedCreations.forEach(item => {
        renderCard(item.prompt, "Saved", "append", true, item.id, item.seed);
      });
      return true;
    }
    return false;
  }

  function loadNextBatch() {
    let nextIndex = currentIndex + 8;
    if (nextIndex >= showcaseLibrary.length) {
      nextIndex = showcaseLibrary.length;
      $loadMoreContainer.fadeOut();
    }
    loadImages(currentIndex, nextIndex);
    currentIndex = nextIndex;
  }

  function loadImages(start, end) {
    const batch = showcaseLibrary.slice(start, end);
    batch.forEach((item, index) => {
      setTimeout(() => {
        renderCard(item.prompt, item.badge, 'append', false);
      }, index * 100); 
    });
  }

  // --- Storage Functions ---

  function getLocalStorageData() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch (e) { return []; }
  }

  function saveToLocalStorage(id, prompt, seed) {
    const data = getLocalStorageData();
    data.unshift({ id, prompt, seed });
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }

  function removeFromLocalStorage(id) {
    const data = getLocalStorageData();
    const newData = data.filter(item => item.id != id);
    localStorage.setItem(LS_KEY, JSON.stringify(newData));
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function showToast(message, type = "success") {
    const color = type === "error" ? "border-red-500 text-red-400" : "border-accent-primary text-accent-glow";
    const icon = type === "error" ? "fa-circle-xmark" : "fa-circle-check";
    const toast = $(`
      <div class="glass-panel border-l-4 ${color} px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-[fadeIn_0.3s_ease-out] min-w-[250px] bg-black/80 backdrop-blur-xl">
        <i class="fa-solid ${icon}"></i>
        <span class="text-sm font-medium text-white">${message}</span>
      </div>
    `);
    $toastContainer.append(toast);
    setTimeout(() => { toast.fadeOut(300, function () { $(this).remove(); }); }, 3000);
  }
});