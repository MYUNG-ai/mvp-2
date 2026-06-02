'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import Icon from '@/components/ui/Icon';
import MyDataView from './MyDataView';
import SavedView from './SavedView';
import FriendsView from './FriendsView';

type Tab = 'data' | 'saved' | 'friends';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'data', label: '명식', icon: 'os' },
  { id: 'saved', label: '저장', icon: 'bookmark' },
  { id: 'friends', label: '관계', icon: 'users' },
];

export default function MyScreen() {
  const { user, setName, setBirthDate, setBirthTime, setMbti, setCareerStatus, setRelationStatus, reset } = useUserStore();
  const [tab, setTab] = useState<Tab>('data');
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBirth, setEditBirth] = useState(user.birthDate);
  const [editTime, setEditTime] = useState(user.birthTime || '');
  const [editMbti, setEditMbti] = useState(user.mbti);
  const [editCareer, setEditCareer] = useState(user.careerStatus);
  const [editRelation, setEditRelation] = useState(user.relationStatus);

  const handleSave = () => {
    setName(editName);
    setBirthDate(editBirth);
    setBirthTime(editTime || null);
    setMbti(editMbti);
    setCareerStatus(editCareer);
    setRelationStatus(editRelation);
    setEditing(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div className="app-header">
        <div className="title">MY</div>
        <div className="right" style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setEditing(!editing); setEditName(user.name); setEditBirth(user.birthDate); setEditTime(user.birthTime || ''); setEditMbti(user.mbti); setEditCareer(user.careerStatus); setEditRelation(user.relationStatus); }} style={{ width: 32, height: 32, borderRadius: 999, background: editing ? 'var(--brand)' : 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={editing ? 'x' : 'edit'} size={15} color={editing ? '#fff' : 'var(--fg-3)'} />
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className="pad-x" style={{ paddingTop: 16, paddingBottom: 0 }}>
        {editing ? (
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div className="stack" style={{ gap: 12 }}>
              <div className="field">
                <label className="field-label">이름</label>
                <input className="input" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="이름" />
              </div>
              <div className="field">
                <label className="field-label">생년월일</label>
                <input className="input" type="date" value={editBirth} onChange={(e) => setEditBirth(e.target.value)} />
              </div>
              <div className="field">
                <label className="field-label">출생 시간 (선택)</label>
                <input className="input" type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} />
              </div>
              <div className="field">
                <label className="field-label">MBTI</label>
                <input className="input" value={editMbti} onChange={(e) => setEditMbti(e.target.value.toUpperCase().slice(0, 4))} placeholder="ENFP" />
              </div>
              <div className="field">
                <label className="field-label">진로 상태</label>
                <input className="input" value={editCareer} onChange={(e) => setEditCareer(e.target.value)} placeholder="직장인" />
              </div>
              <div className="field">
                <label className="field-label">관계 상태</label>
                <input className="input" value={editRelation} onChange={(e) => setEditRelation(e.target.value)} placeholder="연애" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setEditing(false)}>취소</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>저장</button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--brand-alpha)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>🌙</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--fg-1)', letterSpacing: '-0.02em' }}>
                {user.name || '—'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 5 }}>
                {user.birthDate && (
                  <span className="chip" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>{user.birthDate}</span>
                )}
                {user.mbti && (
                  <span className="chip" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>{user.mbti}</span>
                )}
                {user.careerStatus && (
                  <span className="chip" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>{user.careerStatus}</span>
                )}
                {user.relationStatus && (
                  <span className="chip" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>{user.relationStatus}</span>
                )}
                {!user.birthDate && !user.mbti && (
                  <span style={{ fontSize: 12, color: 'var(--fg-4)' }}>정보를 입력해주세요</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-muted)', borderRadius: 10, padding: 3, marginBottom: 16 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: tab === t.id ? 'var(--surface)' : 'transparent',
                color: tab === t.id ? 'var(--fg-1)' : 'var(--fg-4)',
                fontSize: 12, fontWeight: 600,
                boxShadow: tab === t.id ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              <Icon name={t.icon} size={13} color={tab === t.id ? 'var(--brand)' : 'var(--fg-4)'} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="scroll" style={{ flex: 1 }}>
        {tab === 'data' && <MyDataView />}
        {tab === 'saved' && <SavedView />}
        {tab === 'friends' && <FriendsView />}

        {/* Settings footer */}
        <div className="pad-x" style={{ paddingBottom: 32 }}>
          <hr className="hr" style={{ margin: '0 0 16px' }} />
          <button
            onClick={() => { if (confirm('모든 데이터를 초기화하고 온보딩을 다시 시작할까요?')) reset(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 0', color: 'var(--fg-4)', fontSize: 13 }}
          >
            <Icon name="log-out" size={15} color="var(--fg-4)" />
            <span>초기화 및 재시작</span>
          </button>
        </div>
      </div>
    </div>
  );
}
