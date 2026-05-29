### 💻 Frontend-Only (No Backend Required)
These tools rely on pure mathematics, string manipulation, client-side APIs, or standard browser features. 

**General Tools & Converters**
*   **Subnet Calculator** (Pure math)
*   **Base64 Encode/Decode** (Native JS `btoa()` and `atob()`)
*   **Hash (MD5/SHA)** (Web Crypto API)
*   **URL Encode/Decode** (Native JS `encodeURIComponent()`)
*   **Password Generator** (Native JS `crypto.getRandomValues()`)
*   **UUID Generator** (Native JS `crypto.randomUUID()`)
*   **JSON Formatter** (Native JS `JSON.parse()` and `JSON.stringify()`)
*   **Timestamp Converter** (Native JS `Date` object)
*   **Cron Translator** (Can be parsed using client-side JS libraries)
*   **Unit Converter** (Pure math)
*   **Random (Dice)** (Math/Crypto libraries)
*   **Timezone & Calendar** (JS `Intl` API and date math)
*   **GeoJSON** (Parsing and rendering on a map like Leaflet/Mapbox can be done client-side)

**QR & PDF Manipulation**
*   **WiFi QR & Branded QR** (Can be generated via HTML Canvas and JS libraries)
*   **QR Code Scanner** (Uses the HTML5 WebRTC camera API and a JS decoder)
*   **Images to PDF & Merge PDF** (Can use client-side libraries like `pdf-lib` or `jsPDF`)

**Media Manipulation (Frontend Possible, but heavy)**
*   **Compressor** (Images/PDFs can be compressed client-side using HTML Canvas or WebAssembly, though it is resource-intensive for the user's device)

---

### 🖧 Requires Backend
These tools need a server for one of four reasons: **1)** Browsers block raw network/TCP/ICMP requests, **2)** You need to bypass CORS restrictions, **3)** You need to hide secret API keys, or **4)** You need a database/storage.

**Network, Security & Server Tools**
*   **Ping, Traceroute, Port Check, Port Scan** (Browsers cannot make raw ICMP, TCP, or UDP requests).
*   **DNS Lookup, Whois, Blacklist Check** (Requires server-side tools or APIs).
*   **What is My IP, IP Lookup, VPN Leak Check** (You need a server to detect the incoming client IP address).
*   **HTTP Headers, SSL Check, SSL Certificate, Email Headers** (Browsers hide raw cross-origin headers and SSL data for security).
*   **Speed Test** (Requires a backend server to act as the download/upload node).
*   **Site Status** (Making frontend requests to other websites will be blocked by CORS).

**Media & Downloading (Scraping / Bypassing CORS)**
*   **YouTube, SoundCloud, Spotify, TikTok, X/Twitter, Music/Movie Databases** (Require backend scripts like `yt-dlp`, scraping, or API proxying. Direct frontend requests to these sites will be blocked by CORS).
*   **Format/Media Converter & Media Optimizer** (Video/Audio conversion is usually too heavy for the browser and requires backend tools like FFmpeg).

**Third-Party APIs (Hiding Secret Keys)**
*   **Weather, Air Quality, Earthquakes, Sunrise/Sunset** (Require API keys that shouldn't be exposed in frontend code).
*   **Market Overview, Crypto, Gold, Oil, Precious Metals, Iran Rial, Currency Converter** (Require live data APIs, which cost money and require hidden API keys).
*   **Extract Info from Images** (AI processing usually requires backend compute or secret API keys to services like OpenAI/Google Vision).

**Storage & Databases**
*   **Link Shortener** (Needs a database to map short IDs to long URLs).
*   **File Uploader** (Needs cloud storage/server disk space).
*   **Telegram News** (Requires a bot or MTProto client running on a server to fetch channel data).