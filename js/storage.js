/* ============================================
   Hardoi ki Awaaz - Local Storage Manager
   ============================================ */

// === ID CARD STORAGE ===
class IDStorage {
  constructor() {
    this.key = 'hka_id_cards';
  }

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch { return []; }
  }

  save(card) {
    const cards = this.getAll();
    cards.unshift(card);
    localStorage.setItem(this.key, JSON.stringify(cards));
  }

  get(id) {
    return this.getAll().find(c => c.id === id);
  }

  remove(id) {
    const cards = this.getAll().filter(c => c.id !== id);
    localStorage.setItem(this.key, JSON.stringify(cards));
  }

  getCount() {
    return this.getAll().length;
  }
}

// === ISSUE STORAGE ===
class IssueStorage {
  constructor() {
    this.issuesKey = 'hka_user_issues';
    this.supportedKey = 'hka_supported_issues';
    this.supportCountsKey = 'hka_support_counts';
  }

  // User-submitted issues
  getAllIssues() {
    try {
      return JSON.parse(localStorage.getItem(this.issuesKey)) || [];
    } catch { return []; }
  }

  addIssue(issue) {
    const issues = this.getAllIssues();
    issues.unshift(issue);
    localStorage.setItem(this.issuesKey, JSON.stringify(issues));
  }

  getIssueById(id) {
    return this.getAllIssues().find(i => i.id === id);
  }

  // Support tracking
  isIssueSupported(issueId) {
    const supported = this.getSupportedList();
    return supported.includes(issueId);
  }

  supportIssue(issueId) {
    const supported = this.getSupportedList();
    if (!supported.includes(issueId)) {
      supported.push(issueId);
      localStorage.setItem(this.supportedKey, JSON.stringify(supported));
    }
    // Increment count
    const counts = this.getSupportCounts();
    counts[issueId] = (counts[issueId] || 0) + 1;
    localStorage.setItem(this.supportCountsKey, JSON.stringify(counts));
  }

  getSupportedList() {
    try {
      return JSON.parse(localStorage.getItem(this.supportedKey)) || [];
    } catch { return []; }
  }

  getSupportCounts() {
    try {
      return JSON.parse(localStorage.getItem(this.supportCountsKey)) || {};
    } catch { return {}; }
  }

  getSupportCount(issueId) {
    const counts = this.getSupportCounts();
    return counts[issueId] || 0;
  }
}
