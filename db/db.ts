// I am using IndexDB to store email, name, profile of the user;

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface User {
  id: string;
  name: string;
  email: string;
  selectedCharacter: Object;
}

export enum Stores {
  Users = 'users',
}

// CREATE INDEXDB!

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      console.error('IndexedDB is not available on the server side.');
      return resolve(false);
    }

    const request = indexedDB.open('aniverseDB', 1);

    request.onupgradeneeded = (event) => {
      db = request.result;

      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log('Creating IndexDB!');
        db.createObjectStore(Stores.Users, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      console.log('db created - initDB', db.version);
      resolve(true);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', request.error);
      reject(false);
    };
  });
};


// ADD DATA

export const addData = <T>(storeName: string, data: T): Promise<T|string|null> => {
    return new Promise((resolve) => {
      request = indexedDB.open('aniverseDB', version);
  
      request.onsuccess = () => {
        console.log('request.onsuccess - addData', data);
        db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.add(data);
        resolve(data);
      };
  
      request.onerror = () => {
        const error = request.error?.message
        if (error) {
          resolve(error);
        } else {
          resolve('Unknown error');
        }
      };
    });
  };


// GET DATA

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      request = indexedDB.open('aniverseDB');
  
      request.onsuccess = () => {
        console.log('request.onsuccess - getAllData');
        db = request.result;
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const res = store.getAll();
        
        res.onsuccess = () => {
          console.log("res.onsuccess: ", res.result);
          resolve(res.result);
        };

        res.onerror = (event) => {
          reject((event.target as IDBRequest).error); // Reject on getAll() error
        };

        request.onblocked = (event) => {
          console.warn("request.onblocked", event);
        };
      
      };
    });
  };


// DELETE USER

export const deleteData = (storeName: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // again open the connection
    request = indexedDB.open('myDB', version);

    request.onsuccess = () => {
      console.log('request.onsuccess - deleteData', key);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      // add listeners that will resolve the Promise
      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      }
    };
  });
};

