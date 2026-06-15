/* ============================================
   Hardoi ki Awaaz — Hardoi District Villages
   Comprehensive village/area list for selection dropdowns
   ============================================ */

const HARDOI_VILLAGES = [
  // ===== Hardoi City / Nagar Areas =====
  { value: 'city-civil-lines', label: 'Civil Lines, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-model-town', label: 'Model Town, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-subhash-nagar', label: 'Subhash Nagar, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-gandhi-nagar', label: 'Gandhi Nagar, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-nehru-nagar', label: 'Nehru Nagar, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-jawahar-nagar', label: 'Jawahar Nagar, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-station-road', label: 'Station Road, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-sadar-bazaar', label: 'Sadar Bazaar, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-mall-road', label: 'Mall Road, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-ram-nagar', label: 'Ram Nagar, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-katra', label: 'Katra, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-ismailganj', label: 'Ismailganj, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-azimabad', label: 'Azimabad, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-shivpuri', label: 'Shivpuri, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-kotwali', label: 'Kotwali, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-bypass', label: 'Hardoi Bypass', group: 'हरदोई शहर' },
  { value: 'city-kachhauna', label: 'Kachhauna, Hardoi', group: 'हरदोई शहर' },
  { value: 'city-pachdevra', label: 'Pachdevra, Hardoi', group: 'हरदोई शहर' },

  // ===== Bilgram Tehsil =====
  { value: 'bilgram', label: 'Bilgram', group: 'बिलग्राम तहसील' },
  { value: 'balamau', label: 'Balamau', group: 'बिलग्राम तहसील' },
  { value: 'kachhla', label: 'Kachhla', group: 'बिलग्राम तहसील' },
  { value: 'gopamau', label: 'Gopamau', group: 'बिलग्राम तहसील' },
  { value: 'sarai-ayaz', label: 'Sarai Ayaz', group: 'बिलग्राम तहसील' },
  { value: 'umarpur', label: 'Umarpur', group: 'बिलग्राम तहसील' },
  { value: 'paigamberpur', label: 'Paigamberpur', group: 'बिलग्राम तहसील' },
  { value: 'rohniya', label: 'Rohniya', group: 'बिलग्राम तहसील' },
  { value: 'behenda', label: 'Behenda', group: 'बिलग्राम तहसील' },
  { value: 'bangla', label: 'Bangla', group: 'बिलग्राम तहसील' },

  // ===== Sandi Tehsil =====
  { value: 'sandi', label: 'Sandi', group: 'सांडी तहसील' },
  { value: 'madhoganj', label: 'Madhoganj', group: 'सांडी तहसील' },
  { value: 'pali', label: 'Pali', group: 'सांडी तहसील' },
  { value: 'rania', label: 'Rania', group: 'सांडी तहसील' },
  { value: 'kursath', label: 'Kursath', group: 'सांडी तहसील' },
  { value: 'hargaon', label: 'Hargaon', group: 'सांडी तहसील' },
  { value: 'pachdeora', label: 'Pachdeora', group: 'सांडी तहसील' },
  { value: 'karmasan', label: 'Karmasan', group: 'सांडी तहसील' },

  // ===== Shahabad Tehsil =====
  { value: 'shahabad', label: 'Shahabad', group: 'शाहाबाद तहसील' },
  { value: 'pihani', label: 'Pihani', group: 'शाहाबाद तहसील' },
  { value: 'katiyari', label: 'Katiyari', group: 'शाहाबाद तहसील' },
  { value: 'baran', label: 'Baran', group: 'शाहाबाद तहसील' },
  { value: 'hamidpur', label: 'Hamidpur', group: 'शाहाबाद तहसील' },
  { value: 'sawayajpur', label: 'Sawayajpur', group: 'शाहाबाद तहसील' },
  { value: 'bharawan', label: 'Bharawan', group: 'शाहाबाद तहसील' },
  { value: 'maudarpur', label: 'Maudarpur', group: 'शाहाबाद तहसील' },
  { value: 'pasnoli', label: 'Pasnoli', group: 'शाहाबाद तहसील' },

  // ===== Other Major Villages =====
  { value: 'ahirori', label: 'Ahirori', group: 'अन्य गाँव' },
  { value: 'bawan', label: 'Bawan', group: 'अन्य गाँव' },
  { value: 'hariyawan', label: 'Hariyawan', group: 'अन्य गाँव' },
  { value: 'todarpur', label: 'Todarpur', group: 'अन्य गाँव' },
  { value: 'kampil', label: 'Kampil', group: 'अन्य गाँव' },
  { value: 'bisauli', label: 'Bisauli', group: 'अन्य गाँव' },
  { value: 'purwa-bazar', label: 'Purwa Bazar', group: 'अन्य गाँव' },
  { value: 'chattamau', label: 'Chattamau', group: 'अन्य गाँव' },
  { value: 'gulariya', label: 'Gulariya', group: 'अन्य गाँव' },
  { value: 'lawesingh-nagar', label: 'Lawesingh Nagar', group: 'अन्य गाँव' },
  { value: 'naraini', label: 'Naraini', group: 'अन्य गाँव' },
  { value: 'pachpora', label: 'Pachpora', group: 'अन्य गाँव' },
  { value: 'rasdhan', label: 'Rasdhan', group: 'अन्य गाँव' },
  { value: 'aurangabad', label: 'Aurangabad', group: 'अन्य गाँव' },
  { value: 'bahorwa', label: 'Bahorwa', group: 'अन्य गाँव' },
  { value: 'majhila', label: 'Majhila', group: 'अन्य गाँव' },
  { value: 'dhadhera', label: 'Dhadhera', group: 'अन्य गाँव' },
  { value: 'sikrora', label: 'Sikrora', group: 'अन्य गाँव' },
  { value: 'barauli', label: 'Barauli', group: 'अन्य गाँव' },
  { value: 'umrauli', label: 'Umrauli', group: 'अन्य गाँव' },
  { value: 'mahila', label: 'Mahila', group: 'अन्य गाँव' },
  { value: 'thiri', label: 'Thiri', group: 'अन्य गाँव' },
  { value: 'shuklapur', label: 'Shuklapur', group: 'अन्य गाँव' },
  { value: 'makhi', label: 'Makhi', group: 'अन्य गाँव' },
  { value: 'atwa', label: 'Atwa', group: 'अन्य गाँव' },
  { value: 'ajgain', label: 'Ajgain', group: 'अन्य गाँव' },
  { value: 'malhipur', label: 'Malhipur', group: 'अन्य गाँव' },
  { value: 'maholi', label: 'Maholi', group: 'अन्य गाँव' },
  { value: 'nasratpur', label: 'Nasratpur', group: 'अन्य गाँव' },
  { value: 'patan', label: 'Patan', group: 'अन्य गाँव' },
  { value: 'teliyani', label: 'Teliyani', group: 'अन्य गाँव' },
  { value: 'binauli', label: 'Binauli', group: 'अन्य गाँव' },
  { value: 'atrauli', label: 'Atrauli', group: 'अन्य गाँव' },
  { value: 'kaimah', label: 'Kaimah', group: 'अन्य गाँव' },
  { value: 'pirit', label: 'Pirit', group: 'अन्य गाँव' },
  { value: 'beniganj', label: 'Beniganj', group: 'अन्य गाँव' },

  // ===== Others =====
  { value: 'Others', label: 'इसके अलावा — Others', group: 'अन्य' }
];

// Optimized: Get unique groups
function getVillageGroups() {
  const groups = [];
  HARDOI_VILLAGES.forEach(v => {
    if (!groups.includes(v.group)) groups.push(v.group);
  });
  return groups;
}

// Optimized: Get villages by group
function getVillagesByGroup(group) {
  return HARDOI_VILLAGES.filter(v => v.group === group);
}
