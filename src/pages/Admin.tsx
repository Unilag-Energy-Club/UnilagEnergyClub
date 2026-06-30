import { useState } from 'react';
import PocketBase from 'pocketbase';
import { Lock, LogOut, Download, RefreshCw, Users, ShieldCheck, KeyRound } from 'lucide-react';

const PB_URL =
  import.meta.env.VITE_POCKETBASE_URL ||
  'https://unilag-energy-club-backend.up.railway.app';

const SHARED_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

const COLLECTION = 'et360_finale_registrations';

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  referral_source: string;
  created: string;
}

type Mode = 'admin' | 'shared';

const inputClass =
  'w-full min-h-[48px] px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-gray-400 transition-all duration-200';

const fmtDate = (s: string) => {
  if (!s) return '—';
  const d = new Date(s.replace(' ', 'T'));
  if (isNaN(d.getTime())) return s;
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [mode, setMode] = useState<Mode>('admin');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sharedPw, setSharedPw] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [records, setRecords] = useState<Registration[]>([]);
  const [pb, setPb] = useState<PocketBase | null>(null);

  const loadRecords = async (client: PocketBase) => {
    const list = await client.collection(COLLECTION).getFullList<Registration>({
      sort: '-created',
    });
    setRecords(list);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const client = new PocketBase(PB_URL);
      await client.collection('_superusers').authWithPassword(email.trim(), password);
      await loadRecords(client);
      setPb(client);
      setAuthed(true);
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message;
      setError(msg || 'Login failed. Check your PocketBase admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSharedLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!SHARED_PASSWORD) {
      setError('Shared password is not configured. Set VITE_ADMIN_PASSWORD, or use PocketBase admin login.');
      setLoading(false);
      return;
    }
    if (sharedPw !== SHARED_PASSWORD) {
      setError('Incorrect password.');
      setLoading(false);
      return;
    }

    try {
      const client = new PocketBase(PB_URL);
      await loadRecords(client);
      setPb(client);
      setAuthed(true);
    } catch {
      setError(
        'Password accepted, but registrations could not be loaded. The collection may require admin access — use admin login instead.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!pb) return;
    setLoading(true);
    setError(null);
    try {
      await loadRecords(pb);
    } catch {
      setError('Could not refresh. Your session may have expired — log in again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    pb?.authStore.clear();
    setPb(null);
    setAuthed(false);
    setRecords([]);
    setPassword('');
    setSharedPw('');
  };

  const exportCsv = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'Role', 'Referral Source', 'Registered'];
    const esc = (v: string) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = records.map((r) =>
      [r.full_name, r.email, r.phone_number, r.role, r.referral_source, fmtDate(r.created)]
        .map(esc)
        .join(',')
    );
    const csv = [headers.map(esc).join(','), ...rows].join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `et360-finale-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-green-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-yellow-400" strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-black text-green-950">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-1">ET360° Grand Finale registrations</p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setMode('admin'); setError(null); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'admin' ? 'bg-white text-green-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Admin login
            </button>
            <button
              type="button"
              onClick={() => { setMode('shared'); setError(null); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'shared' ? 'bg-white text-green-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <KeyRound className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Team password
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            {mode === 'admin' ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Sign in with your PocketBase superuser account. Securely authorises reading the registrations.
                </p>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required autoComplete="username" className={inputClass} placeholder="admin@email.com"
                />
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required autoComplete="current-password" className={inputClass} placeholder="Password"
                />
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700" role="alert">{error}</div>
                )}
                <button
                  type="submit" disabled={loading}
                  className="w-full min-h-[48px] py-3.5 rounded-full font-bold text-sm bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] transition-all disabled:bg-gray-300 disabled:text-gray-500"
                >
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSharedLogin} className="space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enter the shared team password to view registrations.
                </p>
                <input
                  type="password" value={sharedPw} onChange={(e) => setSharedPw(e.target.value)}
                  required autoComplete="current-password" className={inputClass} placeholder="Team password"
                />
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700" role="alert">{error}</div>
                )}
                <button
                  type="submit" disabled={loading}
                  className="w-full min-h-[48px] py-3.5 rounded-full font-bold text-sm bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] transition-all disabled:bg-gray-300 disabled:text-gray-500"
                >
                  {loading ? 'Unlocking…' : 'Unlock'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="bg-green-950 text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-yellow-400 text-[11px] font-bold uppercase tracking-widest">UNILAG Energy Club</p>
            <h1 className="text-lg font-black">ET360° Finale · Registrations</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
          >
            <LogOut className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 max-w-6xl py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-700" strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl font-black text-green-950 leading-none tabular-nums">{records.length}</p>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-0.5">Total registrations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh} disabled={loading}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-full transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} strokeWidth={2} aria-hidden="true" />
              Refresh
            </button>
            <button
              onClick={exportCsv} disabled={records.length === 0}
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-full transition-all disabled:bg-gray-300"
            >
              <Download className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Export CSV
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6" role="alert">{error}</div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-5 py-4 font-bold">#</th>
                  <th className="px-5 py-4 font-bold">Name</th>
                  <th className="px-5 py-4 font-bold">Email</th>
                  <th className="px-5 py-4 font-bold">Phone</th>
                  <th className="px-5 py-4 font-bold">Role</th>
                  <th className="px-5 py-4 font-bold">Heard via</th>
                  <th className="px-5 py-4 font-bold">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center text-gray-400">
                      No registrations yet.
                    </td>
                  </tr>
                ) : (
                  records.map((r, i) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 font-medium tabular-nums">{i + 1}</td>
                      <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{r.full_name}</td>
                      <td className="px-5 py-4 text-gray-600">
                        <a href={`mailto:${r.email}`} className="hover:text-green-600">{r.email}</a>
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{r.phone_number}</td>
                      <td className="px-5 py-4 text-gray-600">{r.role}</td>
                      <td className="px-5 py-4 text-gray-600">{r.referral_source}</td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap tabular-nums">{fmtDate(r.created)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
