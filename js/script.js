$(function () {
  // --- Selectors ---
  const $generateBtn = $('#generateBtn');
  const $promptInput = $('#prompt');
  const $loading = $('#loading');
  const $grid = $('#imageGrid');
  const $loadMoreBtn = $('#loadMoreBtn');
  const $loadMoreContainer = $('#loadMoreContainer');
  const $enhanceBtn = $('#enhanceBtn');
  const $enhanceStatus = $('#enhanceStatus');
  
  // Modal Selectors
  const $imageModal = $('#imageModal');
  const $modalImage = $('#modalImage');
  const $modalDownloadBtn = $('#modalDownloadBtn');
  const $closeModalBtn = $('#closeModalBtn');

  // --- State ---
  let currentIndex = 0;
  const initialLoadCount = 10;

const showcaseLibrary = [
    { badge: "Cyberpunk", prompt: "A futuristic cyborg with glowing neon circuits, cinematic lighting, 8k resolution, hyperrealistic, night city background" },
    { badge: "3D Art", prompt: "A cute isometric tiny tropical island inside a glass bottle, 3d render, unreal engine 5, vibrant colors, claymation style" },
    { badge: "Abstract", prompt: "A majestic lion made of swirling galaxy stars and nebula dust, deep space background, digital art, cosmic energy" },
    { badge: "Portrait", prompt: "Close up portrait of an old fisherman, highly detailed wrinkles, photorealistic, cinematic lighting, national geographic style" },
    { badge: "Fantasy", prompt: "A floating castle in the sky, waterfalls cascading into clouds, studio ghibli style, soft lighting, dreamy atmosphere" },
    { badge: "Automotive", prompt: "A matte black sports car driving in the rain, neon reflections on wet asphalt, cyberpunk city, 8k, ray tracing" },
    { badge: "Macro", prompt: "Macro shot of a mechanical eye, gears and clockwork inside iris, steampunk style, intricate details, sharp focus" },
    { badge: "Nature", prompt: "Bioluminescent forest at night, glowing mushrooms and plants, avatar movie style, mystical atmosphere, 8k" },
    { badge: "Architecture", prompt: "A modern glass mansion on a cliff overlooking the ocean, sunset golden hour, architectural photography, sleek lines" },
    { badge: "Sci-Fi", prompt: "An astronaut walking on Mars, red dust storm, futuristic rover in background, cinematic wide shot, detailed spacesuit" },
    // 11-20
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
    // 21-30
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
    // 31-40
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
    // 41-50
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

  // --- Initial Execution ---
  initGallery();

  // --- Event Listeners ---
  $loadMoreBtn.on('click', loadNextBatch);
  $generateBtn.on('click', startGeneration);
  $promptInput.on('keypress', function(e) { if(e.which == 13) startGeneration(); });

  $enhanceBtn.on('click', function() {
    let currentText = $promptInput.val().trim();
    const styles = ["cyberpunk", "cinematic lighting", "8k resolution", "unreal engine 5", "hyperrealistic"];
    if (!currentText) currentText = "A futuristic city";
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    $promptInput.val(`${currentText}, ${randomStyle}`);
    $enhanceStatus.removeClass('opacity-0');
    setTimeout(() => $enhanceStatus.addClass('opacity-0'), 1500);
  });

  // Delete Card Logic
  $(document).on('click', '.delete-btn', function(e) {
    e.stopPropagation();
    $(this).closest('.image-card').fadeOut(300, function() { $(this).remove(); });
  });

  // ---------------------------------------------------------
  // NEW: MODAL LOGIC
  // ---------------------------------------------------------
  
  // 1. Open Modal (Event Delegation for .view-btn)
  $(document).on('click', '.view-btn', function(e) {
    e.preventDefault();
    const imageUrl = $(this).data('url'); // Get URL from data attribute
    
    // Set content
    $modalImage.attr('src', imageUrl);
    $modalDownloadBtn.attr('href', imageUrl);
    
    // Show Modal with Fade In
    $imageModal.removeClass('hidden');
    // Small timeout to allow display:block to apply before changing opacity
    setTimeout(() => {
      $imageModal.removeClass('opacity-0');
    }, 10);
    
    // Disable body scroll
    $('body').addClass('overflow-hidden');
  });

  // 2. Close Modal Function
  function closeModal() {
    $imageModal.addClass('opacity-0');
    setTimeout(() => {
      $imageModal.addClass('hidden');
      $('body').removeClass('overflow-hidden');
      $modalImage.attr('src', ''); // Clear src to stop memory leaks
    }, 300);
  }

  // 3. Trigger Close
  $closeModalBtn.on('click', closeModal);
  
  // Close when clicking outside image
  $imageModal.on('click', function(e) {
    if (e.target === this || $(e.target).parent()[0] === this) {
      closeModal();
    }
  });
  
  // Close on Escape Key
  $(document).on('keydown', function(e) {
    if (e.key === "Escape" && !$imageModal.hasClass('hidden')) {
      closeModal();
    }
  });

  // --- Core Functions ---

  function initGallery() {
    $loadMoreContainer.removeClass('hidden');
    loadImages(0, initialLoadCount);
    currentIndex = initialLoadCount;
  }

  function loadNextBatch() {
    const min = 5;
    const max = 10;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    let nextIndex = currentIndex + count;
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
        renderCard(item.prompt, item.badge, 'append');
      }, index * 100); 
    });
  }

  // ---------------------------------------------------------
  // UPDATED: RENDER CARD FUNCTION
  // ---------------------------------------------------------
  function renderCard(promptText, badgeText, method = 'prepend', isUserGenerated = false) {
    const seed = isUserGenerated ? Math.floor(Math.random() * 100000) : promptText.length + 12345;
    const width = 800;
    const height = 1066;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?seed=${seed}&width=${width}&height=${height}&nologin=true`;

    const words = promptText.split(' ');
    const title = words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');

    const badgeHTML = `<div class="absolute top-4 right-4 ${isUserGenerated ? 'bg-accent-primary' : 'bg-white/10 backdrop-blur-md border border-white/20'} text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg z-10 uppercase tracking-wider">${badgeText}</div>`;
    
    const deleteBtnHTML = isUserGenerated 
      ? `<button class="delete-btn w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 transition-all" title="Delete"><i class="fa-solid fa-trash text-xs"></i></button>`
      : ``;

    // CHANGED: Use <button class="view-btn"> instead of direct <a> link
    const viewBtnHTML = `
      <button class="view-btn flex-1 bg-white text-black text-center text-xs py-2.5 rounded-lg font-bold hover:bg-gray-200 transition-colors tracking-wide flex items-center justify-center gap-2" 
        data-url="${imageUrl}">
        <span>${isUserGenerated ? 'Download' : 'View'}</span> 
        <i class="fa-solid ${isUserGenerated ? 'fa-download' : 'fa-expand'}"></i>
      </button>
    `;

    const cardHTML = `
      <div class="image-card group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10 ring-1 ring-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.3)] cursor-pointer animate-[fadeIn_0.6s_ease-out]">
        
        <img src="${imageUrl}" 
             class="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
             alt="${promptText}" loading="lazy">
        
        ${badgeHTML}

        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div class="transform translate-y-4 group-hover:translate-y-0 transition duration-500 ease-out">
            <h3 class="font-heading text-2xl text-white mb-1 leading-none capitalize truncate">${title}</h3>
            <p class="text-gray-300 text-xs font-light line-clamp-2 mb-4 leading-relaxed">${promptText}</p>
            
            <div class="flex gap-2">
              ${viewBtnHTML}
              ${deleteBtnHTML}
            </div>
          </div>
        </div>
      </div>
    `;

    if (method === 'prepend') $grid.prepend(cardHTML);
    else $grid.append(cardHTML);
  }

  // Generation Logic
  function startGeneration() {
    const promptText = $promptInput.val().trim();
    if (!promptText) {
      $promptInput.parent().parent().addClass('ring-2 ring-red-500');
      setTimeout(() => $promptInput.parent().parent().removeClass('ring-2 ring-red-500'), 500);
      return;
    }

    $generateBtn.prop('disabled', true).addClass('opacity-50 cursor-not-allowed');
    $loading.removeClass('hidden').addClass('flex');

    // Artificial delay for UX
    setTimeout(() => {
      // Pass isUserGenerated = true
      renderCard(promptText, "Generated", "prepend", true);
      $generateBtn.prop('disabled', false).removeClass('opacity-50 cursor-not-allowed');
      $loading.addClass('hidden').removeClass('flex');
      $promptInput.val('');
    }, 1500);
  }
});