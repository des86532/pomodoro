if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

export function newDB(dbname, version) {
  if (!dbname) return;
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbname, version);

    request.onupgradeneeded = function(e) {
      let db = e.target.result;
      resolve(db);
    }

    request.onsuccess = function(e) {
      let db = request.result;
      resolve(db);
    }

    request.onerror = function(e) {
      reject(e);
    }
  })
}

export function newSheet(db, sheetname, key) {
  return new Promise((resolve, reject) => {
    const objectStore = db.createObjectStore(sheetname, { keyPath: key });
    resolve(objectStore);
  })
}

export function newIndex(objectStore, ...index) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < index.length; i++) {
      objectStore.createIndex(index[i], index[i], { unique: false });
    }
    resolve();
  })
}