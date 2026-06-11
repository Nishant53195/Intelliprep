// src/dashboard/sections/SettingsAndExports.jsx
import React, { useState } from 'react';
import { db } from '../../database/dexie';
import { syncEngine } from '../../database/services/syncEngine';
import { auth } from '../../firebase/firestore/config';

export default function SettingsAndExports() {
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleSyncToCloud = async () => {
    const user = auth.currentUser;
    if (!user) {
      setStatusText("Authentication Missing: Please sign in to back up data.");
      return;
    }

    setSyncing(true);
    setStatusText("Uploading local changes to Cloud Firestore...");
    try {
      const res = await syncEngine.pushLocalChangesToCloud(user.uid);
      if (res.success) {
        setStatusText(`Success! Cleaned queue and synced ${res.count} items to the cloud.`);
      }
    } catch (err) {
      setStatusText("Synchronization failed. Check your internet connection.");
    } finally {
      setSyncing(false);
    }
  };

  const handleLoadFromCloud = async () => {
    const user = auth.currentUser;
    if (!user) {
      setStatusText("Authentication Missing: Please sign in to recover data.");
      return;
    }

    if (!window.confirm("Warning: Loading data will overwrite your local data with your last saved cloud snapshot. Proceed?")) {
      return;
    }

    setLoading(true);
    setStatusText("Downloading backup snapshot from Firestore...");
    try {
      const res = await syncEngine.pullCloudChangesToLocal(user.uid);
      if (res.success) {
        setStatusText("Success! Local IndexedDB has been completely reloaded from the cloud.");
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) {
      setStatusText("Failed to pull data from cloud server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto text-slate-200">
      <div className="border border-slate-800 bg-slate-900 rounded-xl p-6 space-y-4 shadow-xl">
        <div>
          <h3 className="text-lg font-semibold text-white">Manual Cloud Workspace Synchronization</h3>
          <p className="text-xs text-slate-400 mt-1">
            Back up your local daily tasks, completed metrics, and structural changes, or recover your workspace history onto a brand new machine.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleSyncToCloud}
            disabled={syncing || loading}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
          >
            {syncing ? "Syncing..." : "Sync to Firestore"}
          </button>

          <button
            onClick={handleLoadFromCloud}
            disabled={syncing || loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
          >
            {loading ? "Loading..." : "Load from Firestore"}
          </button>
        </div>

        {statusText && (
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <p className="text-xs font-mono text-slate-300 leading-relaxed">{statusText}</p>
          </div>
        )}
      </div>
      
      {/* Rest of your existing exports / resets components here... */}
    </div>
  );
}