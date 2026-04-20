import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService implements OnModuleInit {
  private db!: admin.firestore.Firestore;
  private readonly logger = new Logger(FirestoreService.name);
  private _ready = false;

  constructor(private configService: ConfigService) {}

  get ready() {
    return this._ready;
  }

  onModuleInit() {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID', 'statscoreapp');
    const keyPath = this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS');

    try {
      if (!admin.apps.length) {
        const options: admin.AppOptions = { projectId };
        if (keyPath) {
          options.credential = admin.credential.cert(keyPath);
        }
        admin.initializeApp(options);
      }

      this.db = admin.firestore();
      this._ready = true;
      this.logger.log(`Firestore initialized for project: ${projectId}`);
    } catch (err) {
      this.logger.warn(`Firestore initialization failed: ${err}. Running without persistence.`);
    }
  }

  collection(name: string) {
    if (!this._ready) {
      throw new Error('Firestore is not initialized');
    }
    return this.db.collection(name);
  }

  onSnapshot(
    collectionName: string,
    callback: (snapshot: admin.firestore.QuerySnapshot) => void,
  ) {
    if (!this._ready) return () => {};
    return this.db.collection(collectionName).onSnapshot(callback);
  }
}
