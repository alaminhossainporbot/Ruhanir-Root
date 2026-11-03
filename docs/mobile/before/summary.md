# Mobile Layout Verification Report

**Target Directory**: `docs/mobile/before`  
**Total Defects Found**: **2054**  

### Defects by Category:
- **horizontal-scroll**: 22
- **element-overflow**: 66
- **header-layout**: 440
- **hero-logo**: 14
- **typography**: 440
- **tap-target**: 1072

### Sample Defects:
- **[horizontal-scroll]** `/en/` @ 320px: document.documentElement.scrollWidth (329px) > window.innerWidth (320px)
- **[element-overflow]** `/en/` @ 320px: <div class="flex items-center gap-6"> extends to 329px (viewport: 320px) [Text: "Store↗|IT Services↗বাংলাEN"]
- **[element-overflow]** `/en/` @ 320px: <div class="inline-flex items-center rounded-full border borde"> extends to 329px (viewport: 320px) [Text: "বাংলাEN"]
- **[element-overflow]** `/en/` @ 320px: <a class="rounded-full px-3 py-1 transition-all duration-150"> extends to 326px (viewport: 320px) [Text: "EN"]
- **[header-layout]** `/en/` @ 320px: Menu button is missing or hidden below 1100px (at 320px)
- **[hero-logo]** `/en/` @ 320px: Hero logo width 269px exceeds 220px on phone (320px)
- **[typography]** `/en/` @ 320px: Text below 14px (12px): "↗" in <span>
- **[tap-target]** `/en/` @ 320px: Tap target < 44px (1x1px): <a> "Skip to main content"
- **[tap-target]** `/en/` @ 320px: Tap target < 44px (196x43px): <a> "Ruhanir Engine"
- **[tap-target]** `/en/` @ 320px: Tap target < 44px (58x25px): <a> "বাংলা"
- **[header-layout]** `/en/` @ 360px: Menu button is missing or hidden below 1100px (at 360px)
- **[hero-logo]** `/en/` @ 360px: Hero logo width 272px exceeds 220px on phone (360px)
- **[typography]** `/en/` @ 360px: Text below 14px (12px): "↗" in <span>
- **[tap-target]** `/en/` @ 360px: Tap target < 44px (1x1px): <a> "Skip to main content"
- **[tap-target]** `/en/` @ 360px: Tap target < 44px (196x43px): <a> "Ruhanir Engine"
- **[tap-target]** `/en/` @ 360px: Tap target < 44px (58x25px): <a> "বাংলা"
- **[header-layout]** `/en/` @ 375px: Menu button is missing or hidden below 1100px (at 375px)
- **[hero-logo]** `/en/` @ 375px: Hero logo width 272px exceeds 220px on phone (375px)
- **[typography]** `/en/` @ 375px: Text below 14px (12px): "↗" in <span>
- **[tap-target]** `/en/` @ 375px: Tap target < 44px (1x1px): <a> "Skip to main content"
- **[tap-target]** `/en/` @ 375px: Tap target < 44px (196x43px): <a> "Ruhanir Engine"
- **[tap-target]** `/en/` @ 375px: Tap target < 44px (58x25px): <a> "বাংলা"
- **[header-layout]** `/en/` @ 390px: Menu button is missing or hidden below 1100px (at 390px)
- **[hero-logo]** `/en/` @ 390px: Hero logo width 272px exceeds 220px on phone (390px)
- **[typography]** `/en/` @ 390px: Text below 14px (12px): "↗" in <span>
- **[tap-target]** `/en/` @ 390px: Tap target < 44px (1x1px): <a> "Skip to main content"
- **[tap-target]** `/en/` @ 390px: Tap target < 44px (196x43px): <a> "Ruhanir Engine"
- **[tap-target]** `/en/` @ 390px: Tap target < 44px (58x25px): <a> "বাংলা"
- **[header-layout]** `/en/` @ 414px: Menu button is missing or hidden below 1100px (at 414px)
- **[hero-logo]** `/en/` @ 414px: Hero logo width 272px exceeds 220px on phone (414px)
