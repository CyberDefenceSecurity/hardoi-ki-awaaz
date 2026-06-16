/* ============================================
   Hardoi ki Awaaz — Hardoi District Villages
   Complete list of all unique villages/areas (Hinglish)
   Organized alphabetically by groups
   ============================================ */

const HARDOI_VILLAGES = [
  // ============ A ============
  { value: 'ahirori', label: 'Ahirori (अहिरोरी)', group: 'A' },
  { value: 'agampur', label: 'Agampur (अगमपुर)', group: 'A' },
  { value: 'ajiamau', label: 'Ajiamau (अजियामऊ)', group: 'A' },
  { value: 'alampur', label: 'Alampur (अलमपुर)', group: 'A' },
  { value: 'alu-thok-madhya', label: 'Alu Thok Madhya (आलू थोक मध्य)', group: 'A' },
  { value: 'alam-nagar', label: 'Alam Nagar (आलम नगर)', group: 'A' },
  { value: 'ahemi', label: 'Ahemi (अहेमी)', group: 'A' },
  { value: 'asalpur', label: 'Asalpur (असलपुर)', group: 'A' },
  { value: 'atrauli', label: 'Atrauli (अतरौली)', group: 'A' },
  { value: 'audari', label: 'Audari (औदारी)', group: 'A' },
  { value: 'alipur-tandava', label: 'Alipur Tandava (अलीपुर तंडवा)', group: 'A' },
  { value: 'atwa-asigaon', label: 'Atwa Asigaon (अटवा असीगाँव)', group: 'A' },
  { value: 'aura-patty', label: 'Aura Patty (औरा पट्टी)', group: 'A' },
  { value: 'amethiya-msinha', label: 'Amethiya Msinha (अमेठिया)', group: 'A' },
  { value: 'aura', label: 'Aura (औरा)', group: 'A' },
  { value: 'ahamadi', label: 'Ahamadi (अहमदी)', group: 'A' },
  { value: 'ashraf-tola', label: 'Ashraf Tola (अशरफ टोला)', group: 'A' },
  { value: 'adampur', label: 'Adampur (आदमपुर)', group: 'A' },
  { value: 'aripur', label: 'Aripur (अरीपुर)', group: 'A' },
  { value: 'aulapur', label: 'Aulapur (औलापुर)', group: 'A' },
  { value: 'arjunpur', label: 'Arjunpur (अर्जुनपुर)', group: 'A' },
  { value: 'asa', label: 'Asa (आसा)', group: 'A' },

  // ============ B ============
  { value: 'bhadasi', label: 'Bhadasi (भदासी)', group: 'B' },
  { value: 'babatmau', label: 'Babatmau (बबतमऊ)', group: 'B' },
  { value: 'baipur-naktaura', label: 'Baipur Naktaura (बैपुर नकतौरा)', group: 'B' },
  { value: 'bausara', label: 'Bausara (बौसरा)', group: 'B' },
  { value: 'bahar', label: 'Bahar (बहार)', group: 'B' },
  { value: 'bhandar', label: 'Bhandar (भंडार)', group: 'B' },
  { value: 'beria-nazirpur', label: 'Beria Nazirpur (बेरिया नजीरपुर)', group: 'B' },
  { value: 'behandar-kasimpur', label: 'Behandar-Kasimpur (बेहंदर-कासिमपुर)', group: 'B' },
  { value: 'behandar-khurd', label: 'Behandar Khurd (बेहंदर खुर्द)', group: 'B' },
  { value: 'bhatta-purwa', label: 'Bhatta Purwa (भट्टा पुरवा)', group: 'B' },
  { value: 'bilgram', label: 'Bilgram (बिलग्राम)', group: 'B' },
  { value: 'bararpur', label: 'Bararpur (बरारपुर)', group: 'B' },
  { value: 'bawan', label: 'Bawan (बावन)', group: 'B' },
  { value: 'beniganj', label: 'Beniganj (बेनीगंज)', group: 'B' },
  { value: 'bikapur', label: 'Bikapur (बीकापुर)', group: 'B' },
  { value: 'barauli', label: 'Barauli (बरौली)', group: 'B' },
  { value: 'bharkhani', label: 'Bharkhani (भरखनी)', group: 'B' },
  { value: 'basen', label: 'Basen (बसेन)', group: 'B' },
  { value: 'bhadhar-nagar', label: 'Bhadhar Nagar (भाधर नगर)', group: 'B' },
  { value: 'behta-dhira', label: 'Behta Dhira (बेहटा धीरा)', group: 'B' },
  { value: 'bhagwant-nagar', label: 'Bhagwant Nagar (भगवंत नगर)', group: 'B' },
  { value: 'baifaria', label: 'Baifaria (बैफरिया)', group: 'B' },
  { value: 'bansa', label: 'Bansa (बांसा)', group: 'B' },
  { value: 'bhawani-kheda', label: 'Bhawani Kheda (भवानी खेड़ा)', group: 'B' },
  { value: 'begamganj', label: 'Begamganj (बेगमगंज)', group: 'B' },
  { value: 'bhadeicha', label: 'Bhadeicha (भदेइचा)', group: 'B' },
  { value: 'behta-bujurg', label: 'Behta Bujurg (बेहटा बुजुर्ग)', group: 'B' },
  { value: 'bhethua', label: 'Bhethua (भेथुआ)', group: 'B' },
  { value: 'beruwa', label: 'Beruwa (बेरुवा)', group: 'B' },
  { value: 'bansi', label: 'Bansi (बांसी)', group: 'B' },
  { value: 'bara-sainin', label: 'Bara Sainin (बड़ा सैनिन)', group: 'B' },
  { value: 'bhajehata', label: 'Bhajehata (भाजेहता)', group: 'B' },
  { value: 'barauna', label: 'Barauna (बरौना)', group: 'B' },
  { value: 'behandar', label: 'Behandar (बेहंदर)', group: 'B' },
  { value: 'bahorwa', label: 'Bahorwa (बहोरवा)', group: 'B' },
  { value: 'bakariya', label: 'Bakariya (बकरिया)', group: 'B' },
  { value: 'bhita-dan', label: 'Bhita Dan (भीटा दान)', group: 'B' },
  { value: 'baghaurha', label: 'Baghaurha (बघौरहा)', group: 'B' },
  { value: 'bharawan', label: 'Bharawan (भरवां)', group: 'B' },
  { value: 'bhagvantpur', label: 'Bhagvantpur (भगवंतपुर)', group: 'B' },
  { value: 'bhaisari', label: 'Bhaisari (भैसारी)', group: 'B' },
  { value: 'bhatatli-nandauli', label: 'Bhatatli Nandauli (भटतली नंदौली)', group: 'B' },
  { value: 'baralia-tiganwan', label: 'Baralia Tiganwan (बरालिया तिगनवां)', group: 'B' },
  { value: 'babarpur', label: 'Babarpur (बाबरपुर)', group: 'B' },
  { value: 'bahloli', label: 'Bahloli (बहलोली)', group: 'B' },
  { value: 'bilhar', label: 'Bilhar (बिल्हार)', group: 'B' },

  // ============ C & D ============
  { value: 'chhavan', label: 'Chhavan (छवन)', group: 'C & D' },
  { value: 'chauraha-tamsil', label: 'Chauraha Tamsil (चौराहा तमसिल)', group: 'C & D' },
  { value: 'chaunsar', label: 'Chaunsar (चौंसर)', group: 'C & D' },
  { value: 'chandeli', label: 'Chandeli (चंदेली)', group: 'C & D' },
  { value: 'chauhan-thok-hardoi', label: 'Chauhan Thok Hardoi (चौहान थोक हरदोई)', group: 'C & D' },
  { value: 'chandauli', label: 'Chandauli (चांदौली)', group: 'C & D' },
  { value: 'chhataiya', label: 'Chhataiya (छटैया)', group: 'C & D' },
  { value: 'dalarinagar', label: 'Dalarinagar (दलारीनगर)', group: 'C & D' },
  { value: 'dilerganj', label: 'Dilerganj (दिलेरगंज)', group: 'C & D' },
  { value: 'daroo-kuniya', label: 'Daroo Kuniya (दरू कुइया)', group: 'C & D' },
  { value: 'dhikunny', label: 'Dhikunny (धिकुन्नी)', group: 'C & D' },
  { value: 'dabha', label: 'Dabha (डाभा)', group: 'C & D' },
  { value: 'dahigawan', label: 'Dahigawan (दहिगवां)', group: 'C & D' },
  { value: 'daulatlapur', label: 'Daulatlapur (दौलतलापुर)', group: 'C & D' },
  { value: 'dalelpur', label: 'Dalelpur (दलेलपुर)', group: 'C & D' },
  { value: 'dhatankhera', label: 'Dhatankhera (धतनखेड़ा)', group: 'C & D' },
  { value: 'dakauli', label: 'Dakauli (डकौली)', group: 'C & D' },
  { value: 'dulanagar', label: 'Dulanagar (दुलानगर)', group: 'C & D' },
  { value: 'dhigasar', label: 'Dhigasar (धिगासर)', group: 'C & D' },

  // ============ F & G ============
  { value: 'fardapur', label: 'Fardapur (फरदापुर)', group: 'F & G' },
  { value: 'fattepur-gayand', label: 'Fattepur Gayand (फतेहपुर गयांद)', group: 'F & G' },
  { value: 'gadhi', label: 'Gadhi (गढ़ी)', group: 'F & G' },
  { value: 'gola-gokaran-nath', label: 'Gola Gokaran Nath (गोला गोकरननाथ)', group: 'F & G' },
  { value: 'gaurav', label: 'Gaurav (गौरव)', group: 'F & G' },
  { value: 'gadeura-dhaneura', label: 'Gadeura Dhaneura (गदेउरा धनेउरा)', group: 'F & G' },
  { value: 'gaus-ganj', label: 'Gaus Ganj (गौस गंज)', group: 'F & G' },
  { value: 'gopamau', label: 'Gopamau (गोपामऊ)', group: 'F & G' },
  { value: 'gauny', label: 'Gauny Hardoi (गौनी हरदोई)', group: 'F & G' },
  { value: 'gaura', label: 'Gaura (गौरा)', group: 'F & G' },
  { value: 'gogavan-jot', label: 'Gogavan Jot (गोगावन जोत)', group: 'F & G' },
  { value: 'gursanda', label: 'Gursanda (गुरसांडा)', group: 'F & G' },
  { value: 'ganj-jalalabad', label: 'Ganj Jalalabad (गंज जलालाबाद)', group: 'F & G' },
  { value: 'godvakhera', label: 'Godvakhera (गोदवाखेड़ा)', group: 'F & G' },
  { value: 'gherwa-chauraha', label: 'Gherwa Chauraha (घेरवा चौराहा)', group: 'F & G' },
  { value: 'gharalichak', label: 'Gharalichak (घरालीचक)', group: 'F & G' },
  { value: 'gaju', label: 'Gaju (गाजू)', group: 'F & G' },
  { value: 'goswa', label: 'Goswa (गोसवा)', group: 'F & G' },

  // ============ H ============
  { value: 'hardoi', label: 'Hardoi (हरदोई)', group: 'H' },
  { value: 'hariyawan', label: 'Hariyawan (हरियावां)', group: 'H' },
  { value: 'hariharpur', label: 'Hariharpur (हरिहरपुर)', group: 'H' },
  { value: 'harpalpur', label: 'Harpalpur (हरपालपुर)', group: 'H' },
  { value: 'hathipur', label: 'Hathipur (हठीपुर)', group: 'H' },
  { value: 'hunsepur', label: 'Hunsepur (हुंसपुर)', group: 'H' },

  // ============ I & J ============
  { value: 'islam-nagar', label: 'Islam Nagar (इस्लाम नगर)', group: 'I & J' },
  { value: 'itara', label: 'Itara (इटारा)', group: 'I & J' },
  { value: 'jigani-chaugwan', label: 'Jigani Chaugwan (जिगनी चौगवां)', group: 'I & J' },
  { value: 'jalpur-phatak', label: 'Jalpur Phatak (जलपुर फाटक)', group: 'I & J' },
  { value: 'jamkura', label: 'Jamkura (जमकुरा)', group: 'I & J' },
  { value: 'jaihoipur', label: 'Jaihoipur (जयहोईपुर)', group: 'I & J' },
  { value: 'juva', label: 'Juva (जुवा)', group: 'I & J' },
  { value: 'jaurara', label: 'Jaurara (जौरारा)', group: 'I & J' },

  // ============ K ============
  { value: 'kakrali', label: 'Kakrali (ककराली)', group: 'K' },
  { value: 'kasrawan', label: 'Kasrawan (कसरावां)', group: 'K' },
  { value: 'kherwa-kamalpur', label: 'Kherwa Kamalpur (खैरवा कमालपुर)', group: 'K' },
  { value: 'khanoopur', label: 'Khanoopur (खानूपुर)', group: 'K' },
  { value: 'kachona', label: 'Kachona (कछौना)', group: 'K' },
  { value: 'kheriya', label: 'Kheriya (खैरिया)', group: 'K' },
  { value: 'korraiya', label: 'Korraiya (कोरइया)', group: 'K' },
  { value: 'khatethiya', label: 'Khatethiya (खटेठिया)', group: 'K' },
  { value: 'khetui', label: 'Khetui (खेटुई)', group: 'K' },
  { value: 'kurari', label: 'Kurari (कुरारी)', group: 'K' },
  { value: 'kazi-tola', label: 'Kazi Tola (काजी टोला)', group: 'K' },
  { value: 'kothawan', label: 'Kothawan (कोथावान)', group: 'K' },
  { value: 'kakra', label: 'Kakra (ककरा)', group: 'K' },
  { value: 'kaimi', label: 'Kaimi (कैमी)', group: 'K' },
  { value: 'khanupur', label: 'Khanupur (खानपुर)', group: 'K' },
  { value: 'khasaura', label: 'Khasaura (खसौरा)', group: 'K' },
  { value: 'kot-kalan', label: 'Kot Kalan (कोट कलां)', group: 'K' },
  { value: 'karawan', label: 'Karawan (करावां)', group: 'K' },
  { value: 'kirtiyapor-choidaraj', label: 'Kirtiyapor Choidaraj (कीर्तियापुर)', group: 'K' },
  { value: 'kamalpur', label: 'Kamalpur (कमालपुर)', group: 'K' },
  { value: 'katri-parsola', label: 'Katri Parsola (कटरी परसोला)', group: 'K' },
  { value: 'kamolia', label: 'Kamolia (कमोलिया)', group: 'K' },
  { value: 'kakerhi', label: 'Kakerhi (ककेरही)', group: 'K' },
  { value: 'karhar-pur', label: 'Karhar Pur (करहरपुर)', group: 'K' },
  { value: 'khandakhera', label: 'Khandakhera (खांडाखेड़ा)', group: 'K' },
  { value: 'kukhi-dehat', label: 'Kukhi Dehat (कुखी देहात)', group: 'K' },
  { value: 'kinhoti', label: 'Kinhoti (किन्होती)', group: 'K' },
  { value: 'kusmaudi', label: 'Kusmaudi (कुसमौदी)', group: 'K' },
  { value: 'kakara', label: 'Kakara (ककरा)', group: 'K' },
  { value: 'maheen-kund', label: 'Maheen Kund (महीन कुंड)', group: 'K' },
  { value: 'kasimpur', label: 'Kasimpur (कासिमपुर)', group: 'K' },
  { value: 'kunyapeur-baghela', label: 'Kunyapeur Baghela (कुंयापुर बघेला)', group: 'K' },
  { value: 'kayanath-tola', label: 'Kayanath Tola (कायनाथ टोला)', group: 'K' },
  { value: 'katara', label: 'Katara (कटरा)', group: 'K' },
  { value: 'kalyan', label: 'Kalyan (कल्यान)', group: 'K' },

  // ============ L ============
  { value: 'lakhnaur', label: 'Lakhnaur (लखनौर)', group: 'L' },
  { value: 'lucknow', label: 'Lucknow (लखनऊ)', group: 'L' },
  { value: 'lalamau', label: 'Lalamau (लालामऊ)', group: 'L' },
  { value: 'lala-ki-bazar', label: 'Lala Ki Bazar (लाला की बाज़ार)', group: 'L' },
  { value: 'lodhi', label: 'Lodhi (लोधी)', group: 'L' },
  { value: 'lonar', label: 'Lonar (लोनार)', group: 'L' },

  // ============ M ============
  { value: 'madhoganj', label: 'Madhoganj (माधौगंज)', group: 'M' },
  { value: 'madhopur', label: 'Madhopur (माधोपुर)', group: 'M' },
  { value: 'maholiya-shivpar', label: 'Maholiya Shivpar (महोलिया शिवपार)', group: 'M' },
  { value: 'mandal', label: 'Mandal (मंडल)', group: 'M' },
  { value: 'mallaun', label: 'Mallaun (मल्लावां)', group: 'M' },
  { value: 'mallawan', label: 'Mallawan (मल्लावां)', group: 'M' },
  { value: 'majiya-jafarpur', label: 'Majiya Jafarpur (मजिया जाफरपुर)', group: 'M' },
  { value: 'mandai', label: 'Mandai (मंडई)', group: 'M' },
  { value: 'moosepur', label: 'Moosepur (मूसपुर)', group: 'M' },
  { value: 'malautha', label: 'Malautha (मलौथा)', group: 'M' },
  { value: 'mahella-khera', label: 'Mahella Khera (महेल्ला खेड़ा)', group: 'M' },
  { value: 'manjhgaon', label: 'Manjhgaon (मंझगाँव)', group: 'M' },
  { value: 'mithnapur', label: 'Mithnapur (मिथनापुर)', group: 'M' },
  { value: 'murligani', label: 'Murligani (मुरलीगंज)', group: 'M' },
  { value: 'mushi-ganj', label: 'Mushi Ganj (मुशीगंज)', group: 'M' },
  { value: 'malkanth', label: 'Malkanth (मालकंठ)', group: 'M' },
  { value: 'malkapur', label: 'Malkapur (मालकापुर)', group: 'M' },
  { value: 'mavai', label: 'Mavai (मवई)', group: 'M' },
  { value: 'mangali-purwa', label: 'Mangali Purwa (मंगली पुरवा)', group: 'M' },
  { value: 'mishrana', label: 'Mishrana (मिश्राना)', group: 'M' },
  { value: 'maihera', label: 'Maihera (मइहेरा)', group: 'M' },
  { value: 'majh-gaon', label: 'Majh Gaon (मझ गाँव)', group: 'M' },
  { value: 'madara-da0', label: 'Madara Da0 (मदारा)', group: 'M' },
  { value: 'mahari', label: 'Mahari (महरी)', group: 'M' },
  { value: 'mahmodpur', label: 'Mahmodpur (महमूदपुर)', group: 'M' },
  { value: 'madrawan', label: 'Madrawan (मदरावन)', group: 'M' },
  { value: 'mo-bajariya', label: 'Mo Bajariya (मो बजरिया)', group: 'M' },
  { value: 'mohalla-kashupet', label: 'Mohalla Kashupet (मोहल्ला काशूपेट)', group: 'M' },
  { value: 'makhdoom-shah-darga', label: 'Makhdoom Shah Darga (मखदूम शाह दरगा)', group: 'M' },
  { value: 'mado-dani', label: 'Mado Dani (मादो दानी)', group: 'M' },
  { value: 'matiyamau', label: 'Matiyamau (मटियामऊ)', group: 'M' },
  { value: 'mamrejpur', label: 'Mamrejpur (ममरेजपुर)', group: 'M' },
  { value: 'manghgaon', label: 'Manghgaon (मंघगाँव)', group: 'M' },
  { value: 'muneer-khani', label: 'Muneer Khani (मुनीर खानी)', group: 'M' },
  { value: 'munee-miyan-chauraha', label: 'Munee Miyan Chauraha (मुनी मियाँ चौराहा)', group: 'M' },
  { value: 'mahui-puri', label: 'Mahui Puri (महुई पुरी)', group: 'M' },
  { value: 'majhiya', label: 'Majhiya (मझिया)', group: 'M' },

  // ============ N ============
  { value: 'nedura', label: 'Nedura (नेदुरा)', group: 'N' },
  { value: 'nanak-ganj', label: 'Nanak Ganj (नानक गंज)', group: 'N' },
  { value: 'nabla-kallu', label: 'Nabla Kallu (नबला कल्लू)', group: 'N' },
  { value: 'nagal-kallu', label: 'Nagal Kallu (नागल कल्लू)', group: 'N' },
  { value: 'nayagaon', label: 'Nayagaon (नयागाँव)', group: 'N' },
  { value: 'nawabganj', label: 'Nawabganj (नवाबगंज)', group: 'N' },
  { value: 'nasauli-gopal', label: 'Nasauli Gopal (नसौली गोपाल)', group: 'N' },
  { value: 'nihal-ganj', label: 'Nihal Ganj (निहाल गंज)', group: 'N' },
  { value: 'nanak-gang-grant', label: 'Nanak Gang Grant (नानक गंग ग्रांट)', group: 'N' },
  { value: 'nagla-ganesh', label: 'Nagla Ganesh (नगला गणेश)', group: 'N' },
  { value: 'nuri', label: 'Nuri (नूरी)', group: 'N' },
  { value: 'nabubganj', label: 'Nabubganj (नबूबगंज)', group: 'N' },
  { value: 'nagwa', label: 'Nagwa (नगवा)', group: 'N' },
  { value: 'nikari-dhigasar', label: 'Nikari-Dhigasar (निकारी-धिगासर)', group: 'N' },

  // ============ O & P ============
  { value: 'oudha-pattee', label: 'Oudha Pattee (औधा पट्टी)', group: 'O & P' },
  { value: 'pihani', label: 'Pihani (पिहानी)', group: 'O & P' },
  { value: 'palpur-naktaury', label: 'Palpur Naktaury (पालपुर नकतौरी)', group: 'O & P' },
  { value: 'parsani', label: 'Parsani (परसानी)', group: 'O & P' },
  { value: 'padri', label: 'Padri (पादरी)', group: 'O & P' },
  { value: 'pandarwa', label: 'Pandarwa (पांडरवा)', group: 'O & P' },
  { value: 'purwa-man', label: 'Purwa Man (पुरवा मान)', group: 'O & P' },
  { value: 'pachkohara', label: 'Pachkohara (पचकोहरा)', group: 'O & P' },
  { value: 'pahani', label: 'Pahani (पहानी)', group: 'O & P' },
  { value: 'pigri', label: 'Pigri (पिगरी)', group: 'O & P' },
  { value: 'pala', label: 'Pala (पाला)', group: 'O & P' },
  { value: 'pipal-chauraha', label: 'Pipal Chauraha (पीपल चौराहा)', group: 'O & P' },
  { value: 'purbawan', label: 'Purbawan (पुरबावां)', group: 'O & P' },
  { value: 'pahra-lakhanpur', label: 'Pahra Lakhanpur (पहरा लखनपुर)', group: 'O & P' },
  { value: 'purwawan-raunsa', label: 'Purwawan Raunsa (पुरवावां रौंसा)', group: 'O & P' },
  { value: 'pawayan', label: 'Pawayan (पवायाँ)', group: 'O & P' },
  { value: 'parchaudi', label: 'Parchaudi (परचौड़ी)', group: 'O & P' },
  { value: 'pokaari-pihani', label: 'Pokaari Pihani (पोकारी पिहानी)', group: 'O & P' },
  { value: 'purwa-devariya', label: 'Purwa Devariya (पुरवा देवरिया)', group: 'O & P' },
  { value: 'phityapur', label: 'Phityapur (फिटयापुर)', group: 'O & P' },
  { value: 'parsola', label: 'Parsola (परसोला)', group: 'O & P' },

  // ============ Q & R ============
  { value: 'qazipur-nai-basti', label: 'Qazipur Nai Basti (काजीपुर नई बस्ती)', group: 'Q & R' },
  { value: 'qazi-pura-west', label: 'Qazi Pura West (काजी पुरा पश्चिम)', group: 'Q & R' },
  { value: 'rabha', label: 'Rabha (राभा)', group: 'Q & R' },
  { value: 'raison', label: 'Raison (रैसोन)', group: 'Q & R' },
  { value: 'raingai', label: 'Raingai (रैनगई)', group: 'Q & R' },
  { value: 'rebha-muradpur', label: 'Rebha Muradpur (रेभा मुरादपुर)', group: 'Q & R' },
  { value: 'rura', label: 'Rura (रूरा)', group: 'Q & R' },
  { value: 'rusalii', label: 'Rusalii (रुसली)', group: 'Q & R' },
  { value: 'railway-ganj', label: 'Railway Ganj (रेलवे गंज)', group: 'Q & R' },
  { value: 'ripari', label: 'Ripari (रिपारी)', group: 'Q & R' },
  { value: 'rajgawan', label: 'Rajgawan (राजगवां)', group: 'Q & R' },
  { value: 'ranga-peepal', label: 'Ranga Peepal (रंगा पीपल)', group: 'Q & R' },
  { value: 'ramgarh', label: 'Ramgarh (रामगढ़)', group: 'Q & R' },
  { value: 'ruknapur', label: 'Ruknapur (रुकनापुर)', group: 'Q & R' },
  { value: 'ramleela-maidan', label: 'Ramleela Maidan (रामलीला मैदान)', group: 'Q & R' },

  // ============ S ============
  { value: 'sandila', label: 'Sandila (संडीला)', group: 'S' },
  { value: 'sursa', label: 'Sursa (सुरसा)', group: 'S' },
  { value: 'shahabad', label: 'Shahabad (शाहाबाद)', group: 'S' },
  { value: 'sikanderpur-kailu', label: 'Sikanderpur Kailu (सिकंदरपुर कैलू)', group: 'S' },
  { value: 'sawajpur', label: 'Sawajpur (सवायजपुर)', group: 'S' },
  { value: 'sawayajpur', label: 'Sawayajpur (सवायजपुर)', group: 'S' },
  { value: 'sandi', label: 'Sandi (सांडी)', group: 'S' },
  { value: 'sank', label: 'Sank (सांक)', group: 'S' },
  { value: 'sanda', label: 'Sanda (सांडा)', group: 'S' },
  { value: 'suri', label: 'Suri (सुरी)', group: 'S' },
  { value: 'sahadat-nagar', label: 'Sahadat Nagar (सहादत नगर)', group: 'S' },
  { value: 'salempur', label: 'Salempur (सलेमपुर)', group: 'S' },
  { value: 'saray-thok-west', label: 'Saray Thok West (सराय थोक पश्चिम)', group: 'S' },
  { value: 'sadam', label: 'Sadam (सदम)', group: 'S' },
  { value: 'sikrori', label: 'Sikrori (सिकरोरी)', group: 'S' },
  { value: 'shiroman-nagar', label: 'Shiroman Nagar (शिरोमणि नगर)', group: 'S' },
  { value: 'saidapur', label: 'Saidapur (सैदापुर)', group: 'S' },
  { value: 'sataudha', label: 'Sataudha (सतौधा)', group: 'S' },
  { value: 'sandi-rural', label: 'Sandi Rural (सांडी ग्रामीण)', group: 'S' },
  { value: 'sultaura', label: 'Sultaura (सुल्तौरा)', group: 'S' },
  { value: 'sulhara', label: 'Sulhara (सुलहरा)', group: 'S' },
  { value: 'sadar', label: 'Sadar (सदर)', group: 'S' },
  { value: 'sultanpur-kot', label: 'Sultanpur Kot (सुल्तानपुर कोट)', group: 'S' },
  { value: 'sainchamau', label: 'Sainchamau (सैंचमऊ)', group: 'S' },
  { value: 'shankarpur', label: 'Shankarpur (शंकरपुर)', group: 'S' },
  { value: 'sukhdev-prasad-kashyap', label: 'Sukhdev Prasad Kashyap (सुखदेव प्रसाद कश्यप)', group: 'S' },
  { value: 'sarehari', label: 'Sarehari (सरेहरी)', group: 'S' },
  { value: 'sugwa', label: 'Sugwa (सुगवा)', group: 'S' },
  { value: 'selapur', label: 'Selapur (सेलापुर)', group: 'S' },
  { value: 'shiv-kumar-tiwari', label: 'Shiv Kumar Tiwari (शिव कुमार तिवारी)', group: 'S' },
  { value: 'shahpur-ganga', label: 'Shahpur Ganga (शाहपुर गंगा)', group: 'S' },
  { value: 'sarai-thok-east', label: 'Sarai Thok East (सराय थोक पूर्व)', group: 'S' },
  { value: 'sanai', label: 'Sanai (सनई)', group: 'S' },
  { value: 'saripur-hiralal', label: 'Saripur Hiralal (सरीपुर हीरालाल)', group: 'S' },
  { value: 'sejhariya', label: 'Sejhariya (सेझरिया)', group: 'S' },
  { value: 'salamulla-ganj-west', label: 'Salamulla Ganj West (सलामुल्ला गंज पश्चिम)', group: 'S' },
  { value: 'semara-chauraha', label: 'Semara Chauraha (सेमरा चौराहा)', group: 'S' },
  { value: 'sakti-singh-somvanshi', label: 'Sakti Singh Somvanshi (शक्ति सिंह सोमवंशी)', group: 'S' },
  { value: 'seundhai', label: 'Seundhai (सेंधई)', group: 'S' },
  { value: 'sikander-pur', label: 'Sikander Pur (सिकंदरपुर)', group: 'S' },
  { value: 'sakaha', label: 'Sakaha (सकहा)', group: 'S' },

  // ============ T & U ============
  { value: 'tandiyawan', label: 'Tandiyawan (टँडियावां)', group: 'T & U' },
  { value: 'terwa-kulli', label: 'Terwa Kulli (तेरवा कुल्ली)', group: 'T & U' },
  { value: 'teria', label: 'Teria (तेरिया)', group: 'T & U' },
  { value: 'todarpur', label: 'Todarpur (टोडरपुर)', group: 'T & U' },
  { value: 'tedarpur', label: 'Tedarpur (तेदरपुर)', group: 'T & U' },
  { value: 'tikka', label: 'Tikka (टिक्का)', group: 'T & U' },
  { value: 'tyona', label: 'Tyona (तियोना)', group: 'T & U' },
  { value: 'tiloeya-kalan', label: 'Tiloeya Kalan (तिलोइया कलां)', group: 'T & U' },
  { value: 'tejpur', label: 'Tejpur (तेजपुर)', group: 'T & U' },
  { value: 'turtupur', label: 'Turtupur (तुरतुपुर)', group: 'T & U' },
  { value: 'tendua', label: 'Tendua (तेन्दुआ)', group: 'T & U' },
  { value: 'udhranpur', label: 'Udhranpur (उधरणपुर)', group: 'T & U' },
  { value: 'umar-seda', label: 'Umar Seda (उमरा सेडा)', group: 'T & U' },
  { value: 'unchagaon', label: 'Unchagaon (ऊंचागाँव)', group: 'T & U' },
  { value: 'usharaha', label: 'Usharaha (उषराहा)', group: 'T & U' },
  { value: 'unnauti', label: 'Unnauti (उन्नौती)', group: 'T & U' },

  // ============ V, W & Z ============
  { value: 'vanya', label: 'Vanya (वन्या)', group: 'V, W & Z' },
  { value: 'virahimpur', label: 'Virahimpur (विराहिमपुर)', group: 'V, W & Z' },
  { value: 'virani', label: 'Virani (विरानी)', group: 'V, W & Z' },
  { value: 'victoriya-ganj', label: 'Victoriya Ganj (विक्टोरिया गंज)', group: 'V, W & Z' },
  { value: 'vazidpur', label: 'Vazidpur (वज़ीदपुर)', group: 'V, W & Z' },
  { value: 'vikas-tripathi-nabipur', label: 'Vikas Tripathi Nabipur (विकास त्रिपाठी नबीपुर)', group: 'V, W & Z' },
  { value: 'white-gan', label: 'White Gan (व्हाइट गंज)', group: 'V, W & Z' },
  { value: 'zehdipur', label: 'Zehdipur (ज़ेहदीपुर)', group: 'V, W & Z' },

  // ============ Others ============
  { value: 'others', label: 'अन्य — Others (खुद लिखें)', group: 'Others' }
];

// Function to populate any select element with villages
function populateVillageSelect(selectId, placeholderText) {
  const select = document.getElementById(selectId);
  if (!select) return;

  // Clear existing options
  select.innerHTML = '';

  // Add placeholder
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderText || '— अपना गाँव/इलाका चुनें —';
  select.appendChild(placeholder);

  // Get unique groups in order
  const groups = getVillageGroups();

  // Group order from the data
  const groupOrder = ['A','B','C & D','F & G','H','I & J','K','L','M','N','O & P','Q & R','S','T & U','V, W & Z','Others'];

  groups.sort((a, b) => {
    const ai = groupOrder.indexOf(a);
    const bi = groupOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  groups.forEach(group => {
    const villages = getVillagesByGroup(group);
    if (villages.length === 0) return;

    const optgroup = document.createElement('optgroup');
    optgroup.label = group;

    villages.forEach(v => {
      const option = document.createElement('option');
      option.value = v.value;
      option.textContent = v.label;
      optgroup.appendChild(option);
    });

    select.appendChild(optgroup);
  });
}

// Get unique groups in order
function getVillageGroups() {
  const groups = [];
  HARDOI_VILLAGES.forEach(v => {
    if (!groups.includes(v.group)) groups.push(v.group);
  });
  return groups;
}

// Get villages by group
function getVillagesByGroup(group) {
  return HARDOI_VILLAGES.filter(v => v.group === group);
}

// Get village label by value
function getVillageLabel(value) {
  const v = HARDOI_VILLAGES.find(v => v.value === value);
  return v ? v.label : value;
}

// ========== Location Share Feature ==========
// Get user's current location via GPS
function shareCurrentLocation(callback) {
  if (!navigator.geolocation) {
    showToast('आपके ब्राउज़र में GPS की सुविधा नहीं है। कृपया खुद से लोकेशन लिखें।', 'error');
    return;
  }

  showToast('📍 लोकेशन पाई जा रही है...', 'info');

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Try reverse geocoding using OpenStreetMap Nominatim
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=hi`,
          { headers: { 'User-Agent': 'HardoiKiAwaaz/1.0' } }
        );
        const data = await resp.json();

        let locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        if (data && data.display_name) {
          const parts = data.display_name.split(',');
          // Take first 2-3 meaningful parts
          locationName = parts.slice(0, 3).join(',').trim();
        }

        if (typeof callback === 'function') {
          callback(locationName, latitude, longitude);
        }
      } catch (err) {
        // Fallback: just use coordinates
        const locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        if (typeof callback === 'function') {
          callback(locationName, latitude, longitude);
        }
      }
    },
    (error) => {
      let msg = 'लोकेशन नहीं मिल पाई। कृपया GPS चालू करें या खुद लिखें।';
      if (error.code === error.PERMISSION_DENIED) {
        msg = '📍 लोकेशन की अनुमति नहीं दी गई। कृपया ब्राउज़र सेटिंग में अनुमति दें या खुद लिखें।';
      } else if (error.code === error.TIMEOUT) {
        msg = '📍 GPS टाइमआउट। कृपया पुनः प्रयास करें या खुद लिखें।';
      }
      showToast(msg, 'error');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}
