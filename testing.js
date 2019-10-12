Fingerprint2.prototype = {
    extend : function(a, o) {
      if (null == a) {
        return o;
      }
      var k;
      for (k in a) {
        if (null != a[k] && o[k] !== a[k]) {
          o[k] = a[k];
        }
      }
      return o;
    },
    get : function(dispatch) {
      var that = this;
      var keys = {
        data : [],
        addPreprocessedComponent : function($scope) {
          var id = $scope.value;
          if ("function" == typeof that.options.preprocessor) {
            id = that.options.preprocessor($scope.key, id);
          }
          keys.data.push({
            key : $scope.key,
            value : id
          });
        }
      };
      keys = this.userAgentKey(keys);
      keys = this.languageKey(keys);
      keys = this.colorDepthKey(keys);
      keys = this.deviceMemoryKey(keys);
      keys = this.pixelRatioKey(keys);
      keys = this.hardwareConcurrencyKey(keys);
      keys = this.screenResolutionKey(keys);
      keys = this.availableScreenResolutionKey(keys);
      keys = this.timezoneOffsetKey(keys);
      keys = this.sessionStorageKey(keys);
      keys = this.localStorageKey(keys);
      keys = this.indexedDbKey(keys);
      keys = this.addBehaviorKey(keys);
      keys = this.openDatabaseKey(keys);
      keys = this.cpuClassKey(keys);
      keys = this.platformKey(keys);
      keys = this.doNotTrackKey(keys);
      keys = this.pluginsKey(keys);
      keys = this.canvasKey(keys);
      keys = this.webglKey(keys);
      keys = this.webglVendorAndRendererKey(keys);
      keys = this.adBlockKey(keys);
      keys = this.hasLiedLanguagesKey(keys);
      keys = this.hasLiedResolutionKey(keys);
      keys = this.hasLiedOsKey(keys);
      keys = this.hasLiedBrowserKey(keys);
      keys = this.touchSupportKey(keys);
      keys = this.customEntropyFunction(keys);
      this.fontsKey(keys, function(data) {
        /** @type {!Array} */
        var _newBet = [];
        that.each(data.data, function(htmlTokens) {
          var n = htmlTokens.value;
          if (n && "function" == typeof n.join) {
            n = n.join(";");
          }
          _newBet.push(n);
        });
        var updateComments = that.x64hash128(_newBet.join("~~~"), 31);
        return dispatch(updateComments, data.data);
      });
    },
    customEntropyFunction : function(keys) {
      return "function" == typeof this.options.customFunction && keys.addPreprocessedComponent({
        key : "custom",
        value : this.options.customFunction()
      }), keys;
    },
    userAgentKey : function(keys) {
      return this.options.excludeUserAgent || keys.addPreprocessedComponent({
        key : "user_agent",
        value : this.getUserAgent()
      }), keys;
    },
    getUserAgent : function() {
      return navigator.userAgent;
    },
    languageKey : function(keys) {
      return this.options.excludeLanguage || keys.addPreprocessedComponent({
        key : "language",
        value : navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
      }), keys;
    },
    colorDepthKey : function(keys) {
      return this.options.excludeColorDepth || keys.addPreprocessedComponent({
        key : "color_depth",
        value : window.screen.colorDepth || -1
      }), keys;
    },
    deviceMemoryKey : function(choices) {
      return this.options.excludeDeviceMemory || choices.addPreprocessedComponent({
        key : "device_memory",
        value : this.getDeviceMemory()
      }), choices;
    },
    getDeviceMemory : function() {
      return navigator.deviceMemory || -1;
    },
    pixelRatioKey : function(keys) {
      return this.options.excludePixelRatio || keys.addPreprocessedComponent({
        key : "pixel_ratio",
        value : this.getPixelRatio()
      }), keys;
    },
    getPixelRatio : function() {
      return window.devicePixelRatio || "";
    },
    screenResolutionKey : function(keys) {
      return this.options.excludeScreenResolution ? keys : this.getScreenResolution(keys);
    },
    getScreenResolution : function(keys) {
      var command_module_id;
      return command_module_id = this.options.detectScreenOrientation && window.screen.height > window.screen.width ? [window.screen.height, window.screen.width] : [window.screen.width, window.screen.height], keys.addPreprocessedComponent({
        key : "resolution",
        value : command_module_id
      }), keys;
    },
    availableScreenResolutionKey : function(keys) {
      return this.options.excludeAvailableScreenResolution ? keys : this.getAvailableScreenResolution(keys);
    },
    getAvailableScreenResolution : function(keys) {
      var command_module_id;
      return window.screen.availWidth && window.screen.availHeight && (command_module_id = this.options.detectScreenOrientation ? window.screen.availHeight > window.screen.availWidth ? [window.screen.availHeight, window.screen.availWidth] : [window.screen.availWidth, window.screen.availHeight] : [window.screen.availHeight, window.screen.availWidth]), void 0 !== command_module_id && keys.addPreprocessedComponent({
        key : "available_resolution",
        value : command_module_id
      }), keys;
    },
    timezoneOffsetKey : function(keys) {
      return this.options.excludeTimezoneOffset || keys.addPreprocessedComponent({
        key : "timezone_offset",
        value : (new Date).getTimezoneOffset()
      }), keys;
    },
    sessionStorageKey : function(keys) {
      return !this.options.excludeSessionStorage && this.hasSessionStorage() && keys.addPreprocessedComponent({
        key : "session_storage",
        value : 1
      }), keys;
    },
    localStorageKey : function(keys) {
      return !this.options.excludeSessionStorage && this.hasLocalStorage() && keys.addPreprocessedComponent({
        key : "local_storage",
        value : 1
      }), keys;
    },
    indexedDbKey : function(keys) {
      return !this.options.excludeIndexedDB && this.hasIndexedDB() && keys.addPreprocessedComponent({
        key : "indexed_db",
        value : 1
      }), keys;
    },
    addBehaviorKey : function(keys) {
      return !this.options.excludeAddBehavior && document.body && document.body.addBehavior && keys.addPreprocessedComponent({
        key : "add_behavior",
        value : 1
      }), keys;
    },
    openDatabaseKey : function(keys) {
      return !this.options.excludeOpenDatabase && window.openDatabase && keys.addPreprocessedComponent({
        key : "open_database",
        value : 1
      }), keys;
    },
    cpuClassKey : function(keys) {
      return this.options.excludeCpuClass || keys.addPreprocessedComponent({
        key : "cpu_class",
        value : this.getNavigatorCpuClass()
      }), keys;
    },
    platformKey : function(keys) {
      return this.options.excludePlatform || keys.addPreprocessedComponent({
        key : "navigator_platform",
        value : this.getNavigatorPlatform()
      }), keys;
    },
    doNotTrackKey : function(keys) {
      return this.options.excludeDoNotTrack || keys.addPreprocessedComponent({
        key : "do_not_track",
        value : this.getDoNotTrack()
      }), keys;
    },
    canvasKey : function(keys) {
      return !this.options.excludeCanvas && this.isCanvasSupported() && keys.addPreprocessedComponent({
        key : "canvas",
        value : this.getCanvasFp()
      }), keys;
    },
    webglKey : function(keys) {
      return !this.options.excludeWebGL && this.isWebGlSupported() && keys.addPreprocessedComponent({
        key : "webgl",
        value : this.getWebglFp()
      }), keys;
    },
    webglVendorAndRendererKey : function(choices) {
      return !this.options.excludeWebGLVendorAndRenderer && this.isWebGlSupported() && choices.addPreprocessedComponent({
        key : "webgl_vendor",
        value : this.getWebglVendorAndRenderer()
      }), choices;
    },
    adBlockKey : function(keys) {
      return this.options.excludeAdBlock || keys.addPreprocessedComponent({
        key : "adblock",
        value : this.getAdBlock()
      }), keys;
    },
    hasLiedLanguagesKey : function(keys) {
      return this.options.excludeHasLiedLanguages || keys.addPreprocessedComponent({
        key : "has_lied_languages",
        value : this.getHasLiedLanguages()
      }), keys;
    },
    hasLiedResolutionKey : function(keys) {
      return this.options.excludeHasLiedResolution || keys.addPreprocessedComponent({
        key : "has_lied_resolution",
        value : this.getHasLiedResolution()
      }), keys;
    },
    hasLiedOsKey : function(keys) {
      return this.options.excludeHasLiedOs || keys.addPreprocessedComponent({
        key : "has_lied_os",
        value : this.getHasLiedOs()
      }), keys;
    },
    hasLiedBrowserKey : function(keys) {
      return this.options.excludeHasLiedBrowser || keys.addPreprocessedComponent({
        key : "has_lied_browser",
        value : this.getHasLiedBrowser()
      }), keys;
    },
    fontsKey : function(keys, done) {
      return this.options.excludeJsFonts ? this.flashFontsKey(keys, done) : this.jsFontsKey(keys, done);
    },
    flashFontsKey : function(keys, done) {
      return this.options.excludeFlashFonts ? done(keys) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? void 0 === this.options.swfPath ? done(keys) : void this.loadSwfAndDetectFonts(function(n) {
        keys.addPreprocessedComponent({
          key : "swf_fonts",
          value : n.join(";")
        });
        done(keys);
      }) : done(keys);
    },
    jsFontsKey : function(keys, done) {
      var that = this;
      return setTimeout(function() {
        /** @type {!Array} */
        var baseFonts = ["monospace", "sans-serif", "serif"];
        /** @type {!Array} */
        var fontList = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", 
        "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", 
        "Wingdings", "Wingdings 2", "Wingdings 3"];
        if (that.options.extendedJsFonts) {
          /** @type {!Array<?>} */
          fontList = fontList.concat(["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", 
          "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", 
          "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", 
          "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", 
          "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", 
          "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", 
          "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", 
          "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", 
          "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", 
          "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", 
          "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", 
          "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", 
          "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", 
          "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"]);
        }
        /** @type {!Array<?>} */
        fontList = (fontList = fontList.concat(that.options.userDefinedFonts)).filter(function(name, originName) {
          return fontList.indexOf(name) === originName;
        });
        /** @type {!Element} */
        var a = document.getElementsByTagName("body")[0];
        /** @type {!Element} */
        var o = document.createElement("div");
        /** @type {!Element} */
        var d = document.createElement("div");
        var defaultWidth = {};
        var defaultHeight = {};
        /**
         * @return {?}
         */
        var init = function() {
          /** @type {!Element} */
          var node = document.createElement("span");
          return node.style.position = "absolute", node.style.left = "-9999px", node.style.fontSize = "72px", node.style.fontStyle = "normal", node.style.fontWeight = "normal", node.style.letterSpacing = "normal", node.style.lineBreak = "auto", node.style.lineHeight = "normal", node.style.texTransform = "none", node.style.textAlign = "left", node.style.textDecoration = "none", node.style.textShadow = "none", node.style.whiteSpace = "normal", node.style.wordBreak = "normal", node.style.wordSpacing = 
          "normal", node.innerHTML = "mmmmmmmmmmlli", node;
        };
        /**
         * @param {string} fontToDetect
         * @param {string} baseFont
         * @return {?}
         */
        var createSpanWithFonts = function(fontToDetect, baseFont) {
          var container = init();
          return container.style.fontFamily = "'" + fontToDetect + "'," + baseFont, container;
        };
        /**
         * @param {!NodeList} fontSpans
         * @return {?}
         */
        var isFontAvailable = function(fontSpans) {
          /** @type {boolean} */
          var detected = false;
          /** @type {number} */
          var i = 0;
          for (; i < baseFonts.length; i++) {
            if (detected = fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]]) {
              return detected;
            }
          }
          return detected;
        };
        var baseFontsSpans = function() {
          /** @type {!Array} */
          var transactionIDList = [];
          /** @type {number} */
          var j = 0;
          /** @type {number} */
          var numDefaultFonts = baseFonts.length;
          for (; j < numDefaultFonts; j++) {
            var data = init();
            data.style.fontFamily = baseFonts[j];
            o.appendChild(data);
            transactionIDList.push(data);
          }
          return transactionIDList;
        }();
        a.appendChild(o);
        /** @type {number} */
        var index = 0;
        /** @type {number} */
        var length = baseFonts.length;
        for (; index < length; index++) {
          defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth;
          defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight;
        }
        var fontsSpans = function() {
          var fontsSpans = {};
          /** @type {number} */
          var i = 0;
          var l = fontList.length;
          for (; i < l; i++) {
            /** @type {!Array} */
            var jisps = [];
            /** @type {number} */
            var j = 0;
            /** @type {number} */
            var numDefaultFonts = baseFonts.length;
            for (; j < numDefaultFonts; j++) {
              var s = createSpanWithFonts(fontList[i], baseFonts[j]);
              d.appendChild(s);
              jisps.push(s);
            }
            /** @type {!Array} */
            fontsSpans[fontList[i]] = jisps;
          }
          return fontsSpans;
        }();
        a.appendChild(d);
        /** @type {!Array} */
        var available = [];
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = fontList.length;
        for (; i < l; i++) {
          if (isFontAvailable(fontsSpans[fontList[i]])) {
            available.push(fontList[i]);
          }
        }
        a.removeChild(d);
        a.removeChild(o);
        keys.addPreprocessedComponent({
          key : "js_fonts",
          value : available
        });
        done(keys);
      }, 1);
    },
    pluginsKey : function(keys) {
      return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || keys.addPreprocessedComponent({
        key : "ie_plugins",
        value : this.getIEPlugins()
      }) : keys.addPreprocessedComponent({
        key : "regular_plugins",
        value : this.getRegularPlugins()
      })), keys;
    },
    getRegularPlugins : function() {
      /** @type {!Array} */
      var plugins = [];
      if (navigator.plugins) {
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var inputsSize = navigator.plugins.length;
        for (; i < inputsSize; i++) {
          if (navigator.plugins[i]) {
            plugins.push(navigator.plugins[i]);
          }
        }
      }
      return this.pluginsShouldBeSorted() && (plugins = plugins.sort(function(a, b) {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      })), this.map(plugins, function(fn) {
        var CredentialScope = this.map(fn, function(facility) {
          return [facility.type, facility.suffixes].join("~");
        }).join(",");
        return [fn.name, fn.description, CredentialScope].join("::");
      }, this);
    },
    getIEPlugins : function() {
      /** @type {!Array} */
      var result = [];
      if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
        result = this.map(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", 
        "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function(appName) {
          try {
            return new window.ActiveXObject(appName), appName;
          } catch (e) {
            return null;
          }
        });
      }
      return navigator.plugins && (result = result.concat(this.getRegularPlugins())), result;
    },
    pluginsShouldBeSorted : function() {
      /** @type {boolean} */
      var should = false;
      /** @type {number} */
      var i = 0;
      var patchLen = this.options.sortPluginsFor.length;
      for (; i < patchLen; i++) {
        var r = this.options.sortPluginsFor[i];
        if (navigator.userAgent.match(r)) {
          /** @type {boolean} */
          should = true;
          break;
        }
      }
      return should;
    },
    touchSupportKey : function(keys) {
      return this.options.excludeTouchSupport || keys.addPreprocessedComponent({
        key : "touch_support",
        value : this.getTouchSupport()
      }), keys;
    },
    hardwareConcurrencyKey : function(keys) {
      return this.options.excludeHardwareConcurrency || keys.addPreprocessedComponent({
        key : "hardware_concurrency",
        value : this.getHardwareConcurrency()
      }), keys;
    },
    hasSessionStorage : function() {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return true;
      }
    },
    hasLocalStorage : function() {
      try {
        return !!window.localStorage;
      } catch (e) {
        return true;
      }
    },
    hasIndexedDB : function() {
      try {
        return !!window.indexedDB;
      } catch (e) {
        return true;
      }
    },
    getHardwareConcurrency : function() {
      return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown";
    },
    getNavigatorCpuClass : function() {
      return navigator.cpuClass ? navigator.cpuClass : "unknown";
    },
    getNavigatorPlatform : function() {
      return navigator.platform ? navigator.platform : "unknown";
    },
    getDoNotTrack : function() {
      return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown";
    },
    getTouchSupport : function() {
      /** @type {number} */
      var maxTouchPoints = 0;
      /** @type {boolean} */
      var t = false;
      if (void 0 !== navigator.maxTouchPoints) {
        /** @type {number} */
        maxTouchPoints = navigator.maxTouchPoints;
      } else {
        if (void 0 !== navigator.msMaxTouchPoints) {
          /** @type {number} */
          maxTouchPoints = navigator.msMaxTouchPoints;
        }
      }
      try {
        document.createEvent("TouchEvent");
        /** @type {boolean} */
        t = true;
      } catch (e) {
      }
      return [maxTouchPoints, t, "ontouchstart" in window];
    },
    getCanvasFp : function() {
      /** @type {!Array} */
      var drilldownLevelLabels = [];
      /** @type {!Element} */
      var canvasElement = document.createElement("canvas");
      /** @type {number} */
      canvasElement.width = 2e3;
      /** @type {number} */
      canvasElement.height = 200;
      /** @type {string} */
      canvasElement.style.display = "inline";
      var ctx = canvasElement.getContext("2d");
      return ctx.rect(0, 0, 10, 10), ctx.rect(2, 2, 6, 6), drilldownLevelLabels.push("canvas winding:" + (false === ctx.isPointInPath(5, 5, "evenodd") ? "yes" : "no")), ctx.textBaseline = "alphabetic", ctx.fillStyle = "#f60", ctx.fillRect(125, 1, 62, 20), ctx.fillStyle = "#069", this.options.dontUseFakeFontInCanvas ? ctx.font = "11pt Arial" : ctx.font = "11pt no-real-font-123", ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15), ctx.fillStyle = "rgba(102, 204, 0, 0.2)", ctx.font = 
      "18pt Arial", ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45), ctx.globalCompositeOperation = "multiply", ctx.fillStyle = "rgb(255,0,255)", ctx.beginPath(), ctx.arc(50, 50, 50, 0, 2 * Math.PI, true), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgb(0,255,255)", ctx.beginPath(), ctx.arc(100, 50, 50, 0, 2 * Math.PI, true), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgb(255,255,0)", ctx.beginPath(), ctx.arc(75, 100, 50, 0, 2 * Math.PI, true), ctx.closePath(), ctx.fill(), 
      ctx.fillStyle = "rgb(255,0,255)", ctx.arc(75, 75, 75, 0, 2 * Math.PI, true), ctx.arc(75, 75, 25, 0, 2 * Math.PI, true), ctx.fill("evenodd"), canvasElement.toDataURL && drilldownLevelLabels.push("canvas fp:" + canvasElement.toDataURL()), drilldownLevelLabels.join("~");
    },
    getWebglFp : function() {
      var gl;
      /**
       * @param {!Object} fa
       * @return {?}
       */
      var fa2s = function(fa) {
        return gl.clearColor(0, 0, 0, 1), gl.enable(gl.DEPTH_TEST), gl.depthFunc(gl.LEQUAL), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT), "[" + fa[0] + ", " + fa[1] + "]";
      };
      if (!(gl = this.getWebglCanvas())) {
        return null;
      }
      /** @type {!Array} */
      var drilldownLevelLabels = [];
      var glBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
      /** @type {!Float32Array} */
      var textureRectangle = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
      gl.bufferData(gl.ARRAY_BUFFER, textureRectangle, gl.STATIC_DRAW);
      /** @type {number} */
      glBuffer.itemSize = 3;
      /** @type {number} */
      glBuffer.numItems = 3;
      var program = gl.createProgram();
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
      gl.compileShader(vertexShader);
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
      gl.compileShader(fragmentShader);
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);
      program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
      program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
      gl.enableVertexAttribArray(program.vertexPosArray);
      gl.vertexAttribPointer(program.vertexPosAttrib, glBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.uniform2f(program.offsetUniform, 1, 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, glBuffer.numItems);
      try {
        drilldownLevelLabels.push(gl.canvas.toDataURL());
      } catch (e) {
      }
      drilldownLevelLabels.push("extensions:" + (gl.getSupportedExtensions() || []).join(";"));
      drilldownLevelLabels.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
      drilldownLevelLabels.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
      drilldownLevelLabels.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
      drilldownLevelLabels.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
      drilldownLevelLabels.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
      drilldownLevelLabels.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
      drilldownLevelLabels.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
      drilldownLevelLabels.push("webgl max anisotropy:" + function(gl) {
        var ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (ext) {
          var n = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          return 0 === n && (n = 2), n;
        }
        return null;
      }(gl));
      drilldownLevelLabels.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
      drilldownLevelLabels.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
      drilldownLevelLabels.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
      drilldownLevelLabels.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
      drilldownLevelLabels.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
      drilldownLevelLabels.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
      drilldownLevelLabels.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
      drilldownLevelLabels.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
      drilldownLevelLabels.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
      drilldownLevelLabels.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
      drilldownLevelLabels.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
      drilldownLevelLabels.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
      drilldownLevelLabels.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
      drilldownLevelLabels.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
      drilldownLevelLabels.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
      drilldownLevelLabels.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
      drilldownLevelLabels.push("webgl version:" + gl.getParameter(gl.VERSION));
      try {
        var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (extensionDebugRendererInfo) {
          drilldownLevelLabels.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
          drilldownLevelLabels.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
        }
      } catch (e) {
      }
      return gl.getShaderPrecisionFormat ? (drilldownLevelLabels.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision), drilldownLevelLabels.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin), drilldownLevelLabels.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax), drilldownLevelLabels.push("webgl vertex shader medium float precision:" + 
      gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision), drilldownLevelLabels.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMin), drilldownLevelLabels.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMax), drilldownLevelLabels.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, 
      gl.LOW_FLOAT).precision), drilldownLevelLabels.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin), drilldownLevelLabels.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax), drilldownLevelLabels.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision), drilldownLevelLabels.push("webgl fragment shader high float precision rangeMin:" + 
      gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMin), drilldownLevelLabels.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMax), drilldownLevelLabels.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision), drilldownLevelLabels.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, 
      gl.MEDIUM_FLOAT).rangeMin), drilldownLevelLabels.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMax), drilldownLevelLabels.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).precision), drilldownLevelLabels.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMin), drilldownLevelLabels.push("webgl fragment shader low float precision rangeMax:" + 
      gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMax), drilldownLevelLabels.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision), drilldownLevelLabels.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin), drilldownLevelLabels.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax), 
      drilldownLevelLabels.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).precision), drilldownLevelLabels.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin), drilldownLevelLabels.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax), drilldownLevelLabels.push("webgl vertex shader low int precision:" + 
      gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision), drilldownLevelLabels.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin), drilldownLevelLabels.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax), drilldownLevelLabels.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).precision), 
      drilldownLevelLabels.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin), drilldownLevelLabels.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax), drilldownLevelLabels.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).precision), drilldownLevelLabels.push("webgl fragment shader medium int precision rangeMin:" + 
      gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMin), drilldownLevelLabels.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMax), drilldownLevelLabels.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision), drilldownLevelLabels.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, 
      gl.LOW_INT).rangeMin), drilldownLevelLabels.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax), drilldownLevelLabels.join("~")) : drilldownLevelLabels.join("~");
    },
    getWebglVendorAndRenderer : function() {
      try {
        var gl = this.getWebglCanvas();
        var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
        return gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + "~" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
      } catch (e) {
        return null;
      }
    },
    getAdBlock : function() {
      /** @type {!Element} */
      var ads = document.createElement("div");
      /** @type {string} */
      ads.innerHTML = "&nbsp;";
      /** @type {string} */
      ads.className = "adsbox";
      /** @type {boolean} */
      var result = false;
      try {
        document.body.appendChild(ads);
        /** @type {boolean} */
        result = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight;
        document.body.removeChild(ads);
      } catch (e) {
        /** @type {boolean} */
        result = false;
      }
      return result;
    },
    getHasLiedLanguages : function() {
      if (void 0 !== navigator.languages) {
        try {
          if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) {
            return true;
          }
        } catch (e) {
          return true;
        }
      }
      return false;
    },
    getHasLiedResolution : function() {
      return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
    },
    getHasLiedOs : function() {
      var e;
      /** @type {string} */
      var ua = navigator.userAgent.toLowerCase();
      /** @type {string} */
      var oscpu = navigator.oscpu;
      /** @type {string} */
      var platform = navigator.platform.toLowerCase();
      /** @type {string} */
      e = ua.indexOf("windows phone") >= 0 ? "Windows Phone" : ua.indexOf("win") >= 0 ? "Windows" : ua.indexOf("android") >= 0 ? "Android" : ua.indexOf("linux") >= 0 ? "Linux" : ua.indexOf("iphone") >= 0 || ua.indexOf("ipad") >= 0 ? "iOS" : ua.indexOf("mac") >= 0 ? "Mac" : "Other";
      if (("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) {
        return true;
      }
      if (void 0 !== oscpu) {
        if ((oscpu = oscpu.toLowerCase()).indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e) {
          return true;
        }
        if (oscpu.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e) {
          return true;
        }
        if (oscpu.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e) {
          return true;
        }
        if ((-1 === oscpu.indexOf("win") && -1 === oscpu.indexOf("linux") && -1 === oscpu.indexOf("mac")) != ("Other" === e)) {
          return true;
        }
      }
      return platform.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e || ((platform.indexOf("linux") >= 0 || platform.indexOf("android") >= 0 || platform.indexOf("pike") >= 0) && "Linux" !== e && "Android" !== e || ((platform.indexOf("mac") >= 0 || platform.indexOf("ipad") >= 0 || platform.indexOf("ipod") >= 0 || platform.indexOf("iphone") >= 0) && "Mac" !== e && "iOS" !== e || ((-1 === platform.indexOf("win") && -1 === platform.indexOf("linux") && -1 === platform.indexOf("mac")) != 
      ("Other" === e) || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e)));
    },
    getHasLiedBrowser : function() {
      var end;
      /** @type {string} */
      var userAgent = navigator.userAgent.toLowerCase();
      /** @type {string} */
      var buildid = navigator.productSub;
      if (("Chrome" === (end = userAgent.indexOf("firefox") >= 0 ? "Firefox" : userAgent.indexOf("opera") >= 0 || userAgent.indexOf("opr") >= 0 ? "Opera" : userAgent.indexOf("chrome") >= 0 ? "Chrome" : userAgent.indexOf("safari") >= 0 ? "Safari" : userAgent.indexOf("trident") >= 0 ? "Internet Explorer" : "Other") || "Safari" === end || "Opera" === end) && "20030107" !== buildid) {
        return true;
      }
      /** @type {number} */
      var nEnd = eval.toString().length;
      if (37 === nEnd && "Safari" !== end && "Firefox" !== end && "Other" !== end) {
        return true;
      }
      if (39 === nEnd && "Internet Explorer" !== end && "Other" !== end) {
        return true;
      }
      if (33 === nEnd && "Chrome" !== end && "Opera" !== end && "Other" !== end) {
        return true;
      }
      var containsEnd;
      try {
        throw "a";
      } catch (e) {
        try {
          e.toSource();
          /** @type {boolean} */
          containsEnd = true;
        } catch (e) {
          /** @type {boolean} */
          containsEnd = false;
        }
      }
      return !(!containsEnd || "Firefox" === end || "Other" === end);
    },
    isCanvasSupported : function() {
      /** @type {!Element} */
      var textedCanvas = document.createElement("canvas");
      return !(!textedCanvas.getContext || !textedCanvas.getContext("2d"));
    },
    isWebGlSupported : function() {
      if (!this.isCanvasSupported()) {
        return false;
      }
      var e = this.getWebglCanvas();
      return !!window.WebGLRenderingContext && !!e;
    },
    isIE : function() {
      return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent));
    },
    hasSwfObjectLoaded : function() {
      return void 0 !== window.swfobject;
    },
    hasMinFlashInstalled : function() {
      return window.swfobject.hasFlashPlayerVersion("9.0.0");
    },
    addFlashDivNode : function() {
      /** @type {!Element} */
      var node = document.createElement("div");
      node.setAttribute("id", this.options.swfContainerId);
      document.body.appendChild(node);
    },
    loadSwfAndDetectFonts : function(done) {
      /** @type {string} */
      var hiddenCallback = "___fp_swf_loaded";
      /**
       * @param {?} passwordUpdateErr
       * @return {undefined}
       */
      window[hiddenCallback] = function(passwordUpdateErr) {
        done(passwordUpdateErr);
      };
      var id = this.options.swfContainerId;
      this.addFlashDivNode();
      var flashvars = {
        onReady : hiddenCallback
      };
      window.swfobject.embedSWF(this.options.swfPath, id, "1", "1", "9.0.0", false, flashvars, {
        allowScriptAccess : "always",
        menu : "false"
      }, {});
    },
    getWebglCanvas : function() {
      /** @type {!Element} */
      var canvas = document.createElement("canvas");
      /** @type {null} */
      var t = null;
      try {
        t = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      } catch (e) {
      }
      return t || (t = null), t;
    },
    each : function(obj, self, callback) {
      if (null !== obj) {
        if (this.nativeForEach && obj.forEach === this.nativeForEach) {
          obj.forEach(self, callback);
        } else {
          if (obj.length === +obj.length) {
            /** @type {number} */
            var k = 0;
            var r = obj.length;
            for (; k < r; k++) {
              if (self.call(callback, obj[k], k, obj) === {}) {
                return;
              }
            }
          } else {
            var name;
            for (name in obj) {
              if (obj.hasOwnProperty(name) && self.call(callback, obj[name], name, obj) === {}) {
                return;
              }
            }
          }
        }
      }
    },
    map : function(array, t, n) {
      /** @type {!Array} */
      var r = [];
      return null == array ? r : this.nativeMap && array.map === this.nativeMap ? array.map(t, n) : (this.each(array, function(month, expected, i) {
        r[r.length] = t.call(n, month, expected, i);
      }), r);
    },
    x64Add : function(m, n) {
      /** @type {!Array} */
      m = [m[0] >>> 16, 65535 & m[0], m[1] >>> 16, 65535 & m[1]];
      /** @type {!Array} */
      n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
      /** @type {!Array} */
      var e = [0, 0, 0, 0];
      return e[3] += m[3] + n[3], e[2] += e[3] >>> 16, e[3] &= 65535, e[2] += m[2] + n[2], e[1] += e[2] >>> 16, e[2] &= 65535, e[1] += m[1] + n[1], e[0] += e[1] >>> 16, e[1] &= 65535, e[0] += m[0] + n[0], e[0] &= 65535, [e[0] << 16 | e[1], e[2] << 16 | e[3]];
    },
    x64Multiply : function(m, n) {
      /** @type {!Array} */
      m = [m[0] >>> 16, 65535 & m[0], m[1] >>> 16, 65535 & m[1]];
      /** @type {!Array} */
      n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
      /** @type {!Array} */
      var v = [0, 0, 0, 0];
      return v[3] += m[3] * n[3], v[2] += v[3] >>> 16, v[3] &= 65535, v[2] += m[2] * n[3], v[1] += v[2] >>> 16, v[2] &= 65535, v[2] += m[3] * n[2], v[1] += v[2] >>> 16, v[2] &= 65535, v[1] += m[1] * n[3], v[0] += v[1] >>> 16, v[1] &= 65535, v[1] += m[2] * n[2], v[0] += v[1] >>> 16, v[1] &= 65535, v[1] += m[3] * n[1], v[0] += v[1] >>> 16, v[1] &= 65535, v[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0], v[0] &= 65535, [v[0] << 16 | v[1], v[2] << 16 | v[3]];
    },
    x64Rotl : function(m, n) {
      return 32 === (n = n % 64) ? [m[1], m[0]] : n < 32 ? [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n] : (n = n - 32, [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n]);
    },
    x64LeftShift : function(m, n) {
      return 0 === (n = n % 64) ? m : n < 32 ? [m[0] << n | m[1] >>> 32 - n, m[1] << n] : [m[1] << n - 32, 0];
    },
    x64Xor : function(m, n) {
      return [m[0] ^ n[0], m[1] ^ n[1]];
    },
    x64Fmix : function(h) {
      return h = this.x64Xor(h, [0, h[0] >>> 1]), h = this.x64Multiply(h, [4283543511, 3981806797]), h = this.x64Xor(h, [0, h[0] >>> 1]), h = this.x64Multiply(h, [3301882366, 444984403]), h = this.x64Xor(h, [0, h[0] >>> 1]);
    },
    x64hash128 : function(key, seed) {
      key = key || "";
      seed = seed || 0;
      /** @type {number} */
      var remainder = key.length % 16;
      /** @type {number} */
      var difference = key.length - remainder;
      /** @type {!Array} */
      var h1 = [0, seed];
      /** @type {!Array} */
      var h2 = [0, seed];
      /** @type {!Array} */
      var k1 = [0, 0];
      /** @type {!Array} */
      var k2 = [0, 0];
      /** @type {!Array} */
      var c1 = [2277735313, 289559509];
      /** @type {!Array} */
      var c2 = [1291169091, 658871167];
      /** @type {number} */
      var i = 0;
      for (; i < difference; i = i + 16) {
        /** @type {!Array} */
        k1 = [255 & key.charCodeAt(i + 4) | (255 & key.charCodeAt(i + 5)) << 8 | (255 & key.charCodeAt(i + 6)) << 16 | (255 & key.charCodeAt(i + 7)) << 24, 255 & key.charCodeAt(i) | (255 & key.charCodeAt(i + 1)) << 8 | (255 & key.charCodeAt(i + 2)) << 16 | (255 & key.charCodeAt(i + 3)) << 24];
        /** @type {!Array} */
        k2 = [255 & key.charCodeAt(i + 12) | (255 & key.charCodeAt(i + 13)) << 8 | (255 & key.charCodeAt(i + 14)) << 16 | (255 & key.charCodeAt(i + 15)) << 24, 255 & key.charCodeAt(i + 8) | (255 & key.charCodeAt(i + 9)) << 8 | (255 & key.charCodeAt(i + 10)) << 16 | (255 & key.charCodeAt(i + 11)) << 24];
        k1 = this.x64Multiply(k1, c1);
        k1 = this.x64Rotl(k1, 31);
        k1 = this.x64Multiply(k1, c2);
        h1 = this.x64Xor(h1, k1);
        h1 = this.x64Rotl(h1, 27);
        h1 = this.x64Add(h1, h2);
        h1 = this.x64Add(this.x64Multiply(h1, [0, 5]), [0, 1390208809]);
        k2 = this.x64Multiply(k2, c2);
        k2 = this.x64Rotl(k2, 33);
        k2 = this.x64Multiply(k2, c1);
        h2 = this.x64Xor(h2, k2);
        h2 = this.x64Rotl(h2, 31);
        h2 = this.x64Add(h2, h1);
        h2 = this.x64Add(this.x64Multiply(h2, [0, 5]), [0, 944331445]);
      }
      switch(k1 = [0, 0], k2 = [0, 0], remainder) {
        case 15:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 14)], 48));
        case 14:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 13)], 40));
        case 13:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 12)], 32));
        case 12:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 11)], 24));
        case 11:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 10)], 16));
        case 10:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 9)], 8));
        case 9:
          k2 = this.x64Xor(k2, [0, key.charCodeAt(i + 8)]);
          k2 = this.x64Multiply(k2, c2);
          k2 = this.x64Rotl(k2, 33);
          k2 = this.x64Multiply(k2, c1);
          h2 = this.x64Xor(h2, k2);
        case 8:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 7)], 56));
        case 7:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 6)], 48));
        case 6:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 5)], 40));
        case 5:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 4)], 32));
        case 4:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 3)], 24));
        case 3:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 2)], 16));
        case 2:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 1)], 8));
        case 1:
          k1 = this.x64Xor(k1, [0, key.charCodeAt(i)]);
          k1 = this.x64Multiply(k1, c1);
          k1 = this.x64Rotl(k1, 31);
          k1 = this.x64Multiply(k1, c2);
          h1 = this.x64Xor(h1, k1);
      }
      return h1 = this.x64Xor(h1, [0, key.length]), h2 = this.x64Xor(h2, [0, key.length]), h1 = this.x64Add(h1, h2), h2 = this.x64Add(h2, h1), h1 = this.x64Fmix(h1), h2 = this.x64Fmix(h2), h1 = this.x64Add(h1, h2), h2 = this.x64Add(h2, h1), ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
    }
  };