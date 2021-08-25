import { ConfigService } from '@nestjs/config';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import * as admin from 'firebase-admin';

const FirebaseConfig = FirebaseAdminModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    credential: admin.credential.cert({
      clientEmail: config.get('FIREBASE_CLIENT_EMAIL'),
      privateKey: config.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      projectId: config.get('FIREBASE_PROJECT_ID')
    })
  }),
  inject: [ConfigService]
});

export default FirebaseConfig;
