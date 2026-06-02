const navItems = [
  { page: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: '📊' },
  { page: 'users', label: 'Users', href: 'users.html', icon: '👥' },
  { page: 'cases', label: 'Cases', href: 'cases.html', icon: '⚖️' },
  { page: 'upload', label: 'Upload', href: 'upload.html', icon: '📤' },
  { page: 'reports', label: 'Reports', href: 'reports.html', icon: '📈' },
  { page: 'monitoring', label: 'Monitoring', href: 'monitoring.html', icon: '🖥️' },
  { page: 'notifications', label: 'Notifications', href: 'notifications.html', icon: '🔔' },
  { page: 'logs', label: 'Audit Logs', href: 'logs.html', icon: '🧾' },
  { page: 'settings', label: 'Settings', href: 'settings.html', icon: '⚙️' }
];

function renderSidebar(activePage = '') {
  const target = document.querySelector('#app-sidebar');
  if (!target) return;
  const links = navItems.map(item => `
    <a class="nav-link ${item.page === activePage ? 'active' : ''}" href="${item.href}">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
    </a>`).join('');

  target.innerHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="logo">JR</div>
        <div>
          <h2>JusticeRollOn</h2>
          <small>Admin Control Panel</small>
        </div>
      </div>
      <div class="nav-section">Main Menu</div>
      <nav>${links}</nav>
      <div class="sidebar-footer">
        <strong>Secure Workspace</strong>
        <span>Professional connected pages with static HTML, CSS and JS.</span>
      </div>
    </aside>`;
}

function initPage() {
  const page = document.body.dataset.page || '';
  renderSidebar(page);

  document.querySelectorAll('[data-mobile-menu]').forEach(btn => {
    btn.addEventListener('click', () => document.querySelector('#sidebar')?.classList.toggle('open'));
  });

  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const message = form.dataset.message || 'Demo action completed successfully.';
      showToast(message);
    });
  });
}

function showToast(message) {
  const oldToast = document.querySelector('.toast-message');
  if (oldToast) oldToast.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed', right: '24px', bottom: '24px', padding: '14px 18px',
    background: '#0f172a', color: '#fff', borderRadius: '14px', zIndex: 99,
    boxShadow: '0 15px 40px rgba(15,23,42,.25)', fontWeight: 700
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

document.addEventListener('DOMContentLoaded', initPage);
